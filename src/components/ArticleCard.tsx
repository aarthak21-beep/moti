import React from 'react';
import { Article, Language } from '../types';
import { translations } from '../data/translations';
import { 
  Clock, 
  BookOpen, 
  ArrowRight, 
  Bookmark, 
  Share2
} from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  language: Language;
  onReadArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  onShareWhatsApp: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  language,
  onReadArticle,
  isBookmarked,
  onToggleBookmark,
  onShareWhatsApp,
}) => {
  const t = translations[language];

  return (
    <article className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-emerald-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Thumbnail Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-emerald-50">
          <img
            src={article.image}
            alt={article.title[language]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback styling if local image path fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

          {/* Quick Bookmark Action Button */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(article.id);
              }}
              className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                isBookmarked
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white/80 hover:bg-white text-slate-700'
              }`}
              title={isBookmarked ? t.articles.bookmarked : t.articles.bookmark}
              aria-label={isBookmarked ? t.articles.bookmarked : t.articles.bookmark}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Free Educational Badge bottom-left */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-semibold text-white drop-shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
            <span>{language === 'mr' ? 'मोफत आरोग्य शिक्षण' : 'Free Health Education'}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Metadata: Zero-pill discipline with typographical separators */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5 flex-wrap">
            <span className="font-medium text-emerald-800">
              {article.categoryId.replace('-', ' ').toUpperCase()}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{article.readTimeMinutes} {t.articles.readTime}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.publishDate}</span>
          </div>

          {/* Article Title */}
          <h3 
            onClick={() => onReadArticle(article)}
            className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 mb-2 cursor-pointer leading-snug"
          >
            {article.title[language]}
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
            {article.excerpt[language]}
          </p>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-5 pt-0 border-t border-slate-50 mt-2 flex items-center justify-between gap-2">
        <button
          onClick={() => onReadArticle(article)}
          className="min-h-11 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
        >
          <span>{t.articles.readMore}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2">
          {/* Quick WhatsApp Share */}
          <button
            onClick={() => onShareWhatsApp(article)}
            className="min-h-11 inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-medium transition-colors"
            title={t.articles.shareWhatsapp}
            aria-label={t.articles.shareWhatsapp}
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>
        </div>
      </div>
    </article>
  );
};
