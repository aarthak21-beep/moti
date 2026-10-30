/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Article, Language, FontSizeScale } from './types';
import { CATEGORIES } from './data/healthData';
import { translations } from './data/translations';
import { supabase } from './supabase';

import { Navbar } from './components/Navbar';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { SpecialGuidesView } from './components/SpecialGuidesView';
import { DailyTipsSection } from './components/DailyTipsSection';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { AdminDashboard } from './components/AdminDashboard';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { Footer } from './components/Footer';

import {
  Search,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('moti_language');
    return saved === 'en' || saved === 'mr' ? saved : 'mr';
  });

  const [fontScale, setFontScale] = useState<FontSizeScale>(() => {
    const saved = localStorage.getItem('moti_font_scale');
    return saved === 'sm' || saved === 'md' || saved === 'lg'
      ? saved
      : 'md';
  });

  const [activeTab, setActiveTab] = useState<string>('home');

  // Blogs are loaded from Supabase only.
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [articleError, setArticleError] = useState('');

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('moti_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isBookmarksDrawerOpen, setIsBookmarksDrawerOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);

  // Load blogs. Supabase RLS controls which rows are visible:
  // public visitors see published posts; admins can see all posts.
  const loadArticles = async () => {
    setLoadingArticles(true);
    setArticleError('');

    const { data, error } = await supabase
      .from('posts')
      .select('id, slug, status, article_data')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Could not load blogs:', error);
      setArticleError('Blogs load झाले नाहीत. कृपया पुन्हा प्रयत्न करा.');
      setArticles([]);
      setLoadingArticles(false);
      return;
    }

    const loadedArticles: Article[] = (data || [])
      .filter((row: any) => row.article_data)
      .map((row: any) => ({
        ...row.article_data,
        id: row.id,
        slug: row.slug || row.article_data.slug,
      }));

    setArticles(loadedArticles);
    setLoadingArticles(false);
  };

  useEffect(() => {
    loadArticles();

    // Reload when admin signs in or signs out.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadArticles();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('moti_language', language);
    document.documentElement.lang = language === 'mr' ? 'mr' : 'en';
  }, [language]);

  useEffect(() => {
    localStorage.setItem('moti_font_scale', fontScale);
    document.body.classList.remove(
      'font-scale-sm',
      'font-scale-md',
      'font-scale-lg'
    );
    document.body.classList.add(`font-scale-${fontScale}`);
  }, [fontScale]);

  // Save blog to Supabase.
  // New blogs are always saved as drafts until reviewed.
  const handleSaveArticle = async (updatedArticle: Article) => {
    const articleData = {
      ...updatedArticle,
    };

    const { error } = await supabase
      .from('posts')
      .upsert(
        {
          slug: updatedArticle.slug,
          title_en: updatedArticle.title.en,
          title_mr: updatedArticle.title.mr,
          excerpt_en: updatedArticle.excerpt.en,
          excerpt_mr: updatedArticle.excerpt.mr,
          content_en: updatedArticle.overview.en,
          content_mr: updatedArticle.overview.mr,
          category: updatedArticle.categoryId,
          status: 'draft',
          article_data: articleData,
        },
        { onConflict: 'slug' }
      );

    if (error) {
      console.error('Save failed:', error);
      throw error;
    }

    await loadArticles();
  };

  // Delete blog from Supabase.
  const handleDeleteArticle = async (articleId: string) => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', articleId);

    if (error) {
      console.error('Delete failed:', error);
      throw error;
    }

    setArticles((prev) => prev.filter((article) => article.id !== articleId));
    setBookmarkedIds((prev) => prev.filter((id) => id !== articleId));
  };

  const handleToggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) => {
      const isAlready = prev.includes(articleId);
      const updated = isAlready
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId];

      localStorage.setItem('moti_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const handleShareWhatsApp = (article: Article) => {
    const title = article.title[language];
    const excerpt = article.excerpt[language];
    const url = window.location.href;

    const text =
      `🌿 *MOTI Health Education*\n\n*${title}*\n\n${excerpt}\n\n👉 मोफत वाचा (Read for free): ${url}`;

    const whatsappUrl =
      `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab !== 'categories' && activeTab !== 'home') {
      setActiveTab('categories');
    }

    const target = document.getElementById('articles-anchor');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      !selectedCategoryId ||
      selectedCategoryId === 'all' ||
      article.categoryId === selectedCategoryId;

    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();

    return (
      article.title.en.toLowerCase().includes(q) ||
      article.title.mr.toLowerCase().includes(q) ||
      article.excerpt.en.toLowerCase().includes(q) ||
      article.excerpt.mr.toLowerCase().includes(q) ||
      article.categoryId.toLowerCase().includes(q) ||
      article.overview.en.toLowerCase().includes(q) ||
      article.overview.mr.toLowerCase().includes(q)
    );
  });

  const bookmarkedArticlesList = articles.filter((article) =>
    bookmarkedIds.includes(article.id)
  );

  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">

      <EmergencyBanner
        language={language}
        onViewFirstAid={() => {
          setActiveTab('guides');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        fontScale={fontScale}
        onFontScaleChange={setFontScale}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'categories') setSelectedCategoryId('all');
        }}
        bookmarkedCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksDrawerOpen(true)}
      />

      <main className="flex-1">

        {/* HOME */}
        {activeTab === 'home' && (
          <div>
            <Hero
              language={language}
              onExploreClick={() => {
                setActiveTab('categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onFreeLearnClick={() => {
                const el = document.getElementById('articles-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchSubmit={handleSearchSubmit}
            />

            <DailyTipsSection language={language} />

            <CategoryGrid
              categories={CATEGORIES}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={(catId) => {
                setSelectedCategoryId(catId);
                const el = document.getElementById('articles-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              language={language}
            />

            <section
              className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200"
              id="articles-anchor"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div>
                    <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1">
                      {language === 'mr'
                        ? 'मोफत आरोग्य ज्ञान'
                        : 'Free Health Knowledge'}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {t.articles.latest}
                    </h2>

                    <p className="text-slate-600 text-sm mt-1">
                      {t.categories.subtitle}
                    </p>
                  </div>

                  {(selectedCategoryId && selectedCategoryId !== 'all') ||
                  searchQuery ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">
                        {filteredArticles.length} {t.search.resultsCount}
                      </span>

                      <button
                        onClick={() => {
                          setSelectedCategoryId('all');
                          setSearchQuery('');
                        }}
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline"
                      >
                        {t.search.clear}
                      </button>
                    </div>
                  ) : null}
                </div>

                {loadingArticles ? (
                  <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                    <p className="text-sm text-slate-500">
                      {language === 'mr'
                        ? 'ब्लॉग लोड होत आहेत...'
                        : 'Loading articles...'}
                    </p>
                  </div>
                ) : articleError ? (
                  <div className="p-12 text-center bg-white rounded-2xl border border-rose-200">
                    <p className="text-sm text-rose-700">{articleError}</p>
                    <button
                      onClick={loadArticles}
                      className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs"
                    >
                      पुन्हा प्रयत्न करा
                    </button>
                  </div>
                ) : filteredArticles.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                    <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />

                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {t.search.noResults}
                    </h3>

                    <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                      {t.search.trySearching}
                    </p>

                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategoryId('all');
                      }}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold"
                    >
                      {t.search.clear}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        language={language}
                        onReadArticle={(art) => setReadingArticle(art)}
                        isBookmarked={bookmarkedIds.includes(article.id)}
                        onToggleBookmark={handleToggleBookmark}
                        onShareWhatsApp={handleShareWhatsApp}
                      />
                    ))}
                  </div>
                )}

                <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <BookOpen className="w-6 h-6" />
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {language === 'mr'
                          ? 'आरोग्य ज्ञान प्रत्येकाचा हक्क आहे'
                          : 'Free Health Knowledge for Everyone'}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                        {language === 'mr'
                          ? 'MOTI वरील सर्व लेख मोफत उपलब्ध आहेत. कोणतीही वर्गणी नाही, कोणतीही छुपी फी नाही आणि नोंदणीचीही सक्ती नाही.'
                          : 'All articles are accessible 100% free with no subscriptions, paywalls, or mandatory registration.'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('guides');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold whitespace-nowrap shadow-xs transition-colors shrink-0"
                  >
                    <span>
                      {language === 'mr'
                        ? 'विशेष मार्गदर्शक पाहा'
                        : 'Explore Special Guides'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* CATEGORIES */}
        {activeTab === 'categories' && (
          <div>
            <div className="py-8 bg-emerald-950 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold">
                  {t.categories.title}
                </h1>

                <p className="text-emerald-200/80 text-sm mt-1 max-w-2xl">
                  {t.categories.subtitle}
                </p>
              </div>
            </div>

            <CategoryGrid
              categories={CATEGORIES}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={(catId) => setSelectedCategoryId(catId)}
              language={language}
            />

            <section className="py-12 bg-slate-50 border-t border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedCategoryId && selectedCategoryId !== 'all'
                      ? `${CATEGORIES.find((c) => c.id === selectedCategoryId)?.name[language]} (${filteredArticles.length})`
                      : `${t.articles.latest} (${filteredArticles.length})`}
                  </h2>
                </div>

                {loadingArticles ? (
                  <p className="text-center py-10 text-slate-500">
                    ब्लॉग लोड होत आहेत...
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        language={language}
                        onReadArticle={(art) => setReadingArticle(art)}
                        isBookmarked={bookmarkedIds.includes(article.id)}
                        onToggleBookmark={handleToggleBookmark}
                        onShareWhatsApp={handleShareWhatsApp}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* GUIDES */}
        {activeTab === 'guides' && (
          <SpecialGuidesView
            language={language}
            onNavigateToCategory={(catId) => {
              setSelectedCategoryId(catId);
              setActiveTab('categories');
            }}
          />
        )}

        {/* DAILY TIPS */}
        {activeTab === 'daily-tips' && (
          <div className="py-8">
            <DailyTipsSection language={language} />

            <div className="max-w-4xl mx-auto px-4 py-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {language === 'mr'
                  ? 'आरोग्य दिनचर्येचे महत्त्व'
                  : 'The Science of Daily Health Habits'}
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {language === 'mr'
                  ? 'आरोग्य हे एका दिवसात कमावता येत नाही, तर दररोजच्या लहान सवयींचे ते फलित असते. वेळेवर पाणी पिणे, जेवणानंतर १० मिनिटे चालणे आणि मन शांत ठेवणे या साध्या गोष्टींमुळे भविष्यातील मोठे आजार सहज टाळता येतात.'
                  : 'Preventive healthcare is built on continuous micro-habits rather than occasional drastic interventions. Consistent morning hydration, 10-minute post-meal strolls, and restorative sleep hygiene yield compounding longevity.'}
              </p>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {activeTab === 'about' && <AboutView language={language} />}

        {/* CONTACT */}
        {activeTab === 'contact' && <ContactView language={language} />}

        {/* ADMIN */}
        {activeTab === 'admin' && (
          <AdminDashboard
            articles={articles}
            categories={CATEGORIES}
            onSaveArticle={handleSaveArticle}
            onDeleteArticle={handleDeleteArticle}
            language={language}
          />
        )}
      </main>

      {readingArticle && (
        <ArticleDetailModal
          article={readingArticle}
          onClose={() => setReadingArticle(null)}
          language={language}
          onLanguageChange={setLanguage}
          isBookmarked={bookmarkedIds.includes(readingArticle.id)}
          onToggleBookmark={handleToggleBookmark}
          fontScale={fontScale}
          onFontScaleChange={setFontScale}
          onShareWhatsApp={handleShareWhatsApp}
        />
      )}

      <BookmarksDrawer
        isOpen={isBookmarksDrawerOpen}
        onClose={() => setIsBookmarksDrawerOpen(false)}
        bookmarkedArticles={bookmarkedArticlesList}
        language={language}
        onSelectArticle={(article) => setReadingArticle(article)}
        onRemoveBookmark={handleToggleBookmark}
      />

      <Footer
        language={language}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
