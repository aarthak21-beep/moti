/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Article, Category, Language, FontSizeScale } from './types';
import { CATEGORIES, INITIAL_ARTICLES } from './data/healthData';
import { translations } from './data/translations';
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
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  CheckCircle2, 
  Filter, 
  Heart,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  // 1. Language state: 'mr' (Marathi) or 'en' (English)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('moti_language');
    return (saved === 'en' || saved === 'mr') ? saved : 'mr';
  });

  // 2. Font size scale for Senior Citizens accessibility: 'sm' | 'md' | 'lg'
  const [fontScale, setFontScale] = useState<FontSizeScale>(() => {
    const saved = localStorage.getItem('moti_font_scale');
    return (saved === 'sm' || saved === 'md' || saved === 'lg') ? saved : 'md';
  });

  // 3. Navigation Tab
  const [activeTab, setActiveTab] = useState<string>('home');

  // 4. Articles Data (Loaded from localStorage or initialized with verified seed data)
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('moti_articles');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved articles:', e);
    }
    return INITIAL_ARTICLES;
  });

  // 5. Bookmarks State
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('moti_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [isBookmarksDrawerOpen, setIsBookmarksDrawerOpen] = useState(false);

  // 6. Selected Category Filter
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // 7. Search Query State
  const [searchQuery, setSearchQuery] = useState('');

  // 8. Active Article for detailed reading view
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);

  // Sync Language
  useEffect(() => {
    localStorage.setItem('moti_language', language);
    document.documentElement.lang = language === 'mr' ? 'mr' : 'en';
  }, [language]);

  // Sync Font Scale
  useEffect(() => {
    localStorage.setItem('moti_font_scale', fontScale);
    document.body.classList.remove('font-scale-sm', 'font-scale-md', 'font-scale-lg');
    document.body.classList.add(`font-scale-${fontScale}`);
  }, [fontScale]);

  // Sync Articles to localStorage
  const handleSaveArticle = (updatedArticle: Article) => {
    setArticles((prev) => {
      const exists = prev.some((a) => a.id === updatedArticle.id);
      let updated: Article[];
      if (exists) {
        updated = prev.map((a) => (a.id === updatedArticle.id ? updatedArticle : a));
      } else {
        updated = [updatedArticle, ...prev];
      }
      localStorage.setItem('moti_articles', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteArticle = (articleId: string) => {
    setArticles((prev) => {
      const updated = prev.filter((a) => a.id !== articleId);
      localStorage.setItem('moti_articles', JSON.stringify(updated));
      return updated;
    });
    setBookmarkedIds((prev) => prev.filter((id) => id !== articleId));
  };

  // Toggle Bookmark
  const handleToggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) => {
      const isAlready = prev.includes(articleId);
      const updated = isAlready ? prev.filter((id) => id !== articleId) : [...prev, articleId];
      localStorage.setItem('moti_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  // WhatsApp Share Handler
  const handleShareWhatsApp = (article: Article) => {
    const title = article.title[language];
    const excerpt = article.excerpt[language];
    const url = window.location.href;
    const text = `🌿 *MOTI Health Education*\n\n*${title}*\n\n${excerpt}\n\n👉 मोफत वाचा (Read for free): ${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Handle Search Submission
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

  // Filtered Articles based on category and search query
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      !selectedCategoryId || selectedCategoryId === 'all' || article.categoryId === selectedCategoryId;

    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();
    const matchTitleEn = article.title.en.toLowerCase().includes(q);
    const matchTitleMr = article.title.mr.toLowerCase().includes(q);
    const matchExcerptEn = article.excerpt.en.toLowerCase().includes(q);
    const matchExcerptMr = article.excerpt.mr.toLowerCase().includes(q);
    const matchCategory = article.categoryId.toLowerCase().includes(q);
    const matchOverviewEn = article.overview.en.toLowerCase().includes(q);
    const matchOverviewMr = article.overview.mr.toLowerCase().includes(q);

    return (
      matchTitleEn ||
      matchTitleMr ||
      matchExcerptEn ||
      matchExcerptMr ||
      matchCategory ||
      matchOverviewEn ||
      matchOverviewMr
    );
  });

  const bookmarkedArticlesList = articles.filter((a) => bookmarkedIds.includes(a.id));
  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      
      {/* 1. Global Medical Emergency Banner */}
      <EmergencyBanner
        language={language}
        onViewFirstAid={() => {
          setActiveTab('guides');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 2. Top Navigation Bar */}
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

      {/* 3. Main Views Router */}
      <main className="flex-1">
        {/* VIEW: HOME */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
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

            {/* Daily Health Tips Section */}
            <DailyTipsSection language={language} />

            {/* Health Categories Showcase Grid */}
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

            {/* Core Educational Guides Catalog */}
            <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200" id="articles-anchor">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header with Live Filter Controls */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div>
                    <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1">
                      {language === 'mr' ? 'मोफत आरोग्य ज्ञान' : 'Free Health Knowledge'}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {t.articles.latest}
                    </h2>
                    <p className="text-slate-600 text-sm mt-1">
                      {t.categories.subtitle}
                    </p>
                  </div>

                  {/* Filter Status & Reset */}
                  {(selectedCategoryId && selectedCategoryId !== 'all') || searchQuery ? (
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

                {/* Article Cards Grid */}
                {filteredArticles.length === 0 ? (
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

                {/* Free Health Education Pledge Card */}
                <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {language === 'mr' ? 'आरोग्य ज्ञान प्रत्येकाचा हक्क आहे' : 'Free Health Knowledge for Everyone'}
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
                    <span>{language === 'mr' ? 'विशेष मार्गदर्शक पाहा' : 'Explore Special Guides'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW: CATEGORIES */}
        {activeTab === 'categories' && (
          <div>
            <div className="py-8 bg-emerald-950 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold">{t.categories.title}</h1>
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
              </div>
            </section>
          </div>
        )}

        {/* VIEW: GUIDES */}
        {activeTab === 'guides' && (
          <SpecialGuidesView
            language={language}
            onNavigateToCategory={(catId) => {
              setSelectedCategoryId(catId);
              setActiveTab('categories');
            }}
          />
        )}

        {/* VIEW: DAILY TIPS */}
        {activeTab === 'daily-tips' && (
          <div className="py-8">
            <DailyTipsSection language={language} />
            <div className="max-w-4xl mx-auto px-4 py-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {language === 'mr' ? 'आरोग्य दिनचर्येचे महत्त्व' : 'The Science of Daily Health Habits'}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {language === 'mr'
                  ? 'आरोग्य हे एका दिवसात कमावता येत नाही, तर दररोजच्या लहान सवयींचे ते फलित असते. वेळेवर पाणी पिणे, जेवणानंतर १० मिनिटे चालणे आणि मन शांत ठेवणे या साध्या गोष्टींमुळे भविष्यातील मोठे आजार सहज टाळता येतात.'
                  : 'Preventive healthcare is built on continuous micro-habits rather than occasional drastic interventions. Consistent morning hydration, 10-minute post-meal strolls, and restorative sleep hygiene yield compounding longevity.'}
              </p>
            </div>
          </div>
        )}

        {/* VIEW: ABOUT MOTI */}
        {activeTab === 'about' && <AboutView language={language} />}

        {/* VIEW: CONTACT */}
        {activeTab === 'contact' && <ContactView language={language} />}

        {/* VIEW: ADMIN DASHBOARD */}
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

      {/* 4. Full Article Reading Modal */}
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

      {/* 5. Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksDrawerOpen}
        onClose={() => setIsBookmarksDrawerOpen(false)}
        bookmarkedArticles={bookmarkedArticlesList}
        language={language}
        onSelectArticle={(art) => setReadingArticle(art)}
        onRemoveBookmark={handleToggleBookmark}
      />

      {/* 6. Footer */}
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
