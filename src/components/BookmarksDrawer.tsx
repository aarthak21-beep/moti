import React from 'react';
import { Article, Language } from '../types';
import { translations } from '../data/translations';
import { Bookmark, X, ArrowRight, Trash2, BookOpen } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  language: Language;
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  language,
  onSelectArticle,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div role="dialog" aria-modal="true" aria-labelledby="bookmarks-title" className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slideLeft">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-emerald-700 fill-emerald-100" />
            <h2 id="bookmarks-title" className="text-lg font-bold text-slate-900">
              {t.nav.savedArticles} ({bookmarkedArticles.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="min-h-11 min-w-11 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            aria-label="Close bookmarks"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-3">
          {bookmarkedArticles.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">
                {language === 'mr' ? 'कोणताही लेख जतन केलेला नाही' : 'No articles bookmarked yet'}
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                {language === 'mr'
                  ? 'वाचताना कोणत्याही लेखावरील बुकमार्क चिन्हावर क्लिक करून तो येथे जतन करा.'
                  : 'Click the bookmark icon on any guide while browsing to save it here for quick offline reference.'}
              </p>
            </div>
          ) : (
            bookmarkedArticles.map((art) => (
              <div
                key={art.id}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 bg-white hover:bg-slate-50 transition-all flex items-start justify-between gap-3 group"
              >
                <button
                  type="button"
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="text-left cursor-pointer flex-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  aria-label={language === 'mr' ? 'लेख उघडा' : 'Open article'}
                >
                  <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                    {art.categoryId}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-800 line-clamp-2">
                    {art.title[language]}
                  </h4>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {art.readTimeMinutes} {t.articles.readTime}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onRemoveBookmark(art.id)}
                  className="min-h-11 min-w-11 p-2 rounded-lg text-slate-400 hover:text-rose-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                  title={language === 'mr' ? 'जतन केलेला लेख काढा' : 'Remove bookmark'}
                  aria-label={language === 'mr' ? 'जतन केलेल्या लेखांतून काढा' : 'Remove bookmark'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center text-xs text-slate-500">
          {language === 'mr'
            ? 'सर्व लेख आपल्या ब्राउझरमध्ये सुरक्षित सेव्ह आहेत'
            : 'Stored securely in your local browser'}
        </div>
      </div>
    </div>
  );
};
