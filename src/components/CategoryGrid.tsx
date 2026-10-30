import React from 'react';
import { Category, Language } from '../types';
import { translations } from '../data/translations';
import { 
  Activity, 
  Brain, 
  Salad, 
  Flower2, 
  Dumbbell, 
  HeartHandshake, 
  Shield, 
  Smile, 
  Users, 
  Moon, 
  Heart, 
  FileHeart, 
  Crosshair, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string) => void;
  language: Language;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  language,
}) => {
  const t = translations[language];

  // Helper to render appropriate Lucide icon safely
  const renderIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6' };
    switch (iconName) {
      case 'Activity': return <Activity {...props} />;
      case 'Brain': return <Brain {...props} />;
      case 'Salad': return <Salad {...props} />;
      case 'Flower2': return <Flower2 {...props} />;
      case 'Dumbbell': return <Dumbbell {...props} />;
      case 'HeartHandshake': return <HeartHandshake {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'Smile': return <Smile {...props} />;
      case 'Users': return <Users {...props} />;
      case 'Moon': return <Moon {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'FileHeart': return <FileHeart {...props} />;
      case 'Crosshair': return <Crosshair {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      default: return <Activity {...props} />;
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white" id="categories-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="text-xs font-semibold text-emerald-700 tracking-wider uppercase mb-1">
              {language === 'mr' ? 'आरोग्य शिक्षण ज्ञानभांडार' : 'Comprehensive Medical Education'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.categories.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              {t.categories.subtitle}
            </p>
          </div>

          {selectedCategoryId && (
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline decoration-emerald-300 self-start md:self-auto"
            >
              {language === 'mr' ? 'सर्व वर्ग दाखवा' : 'Show All Categories'}
            </button>
          )}
        </div>

        {/* 14 Attractive Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((cat, idx) => {
            const isSelected = selectedCategoryId === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`text-left p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between group relative ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-600/20'
                    : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50/80 bg-white'
                }`}
              >
                <div>
                  {/* Icon & Index */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-emerald-700 text-white'
                          : 'bg-emerald-100/70 text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white'
                      }`}
                    >
                      {renderIcon(cat.iconName)}
                    </div>
                    {/* Clean unboxed numerical index */}
                    <span className="text-xs font-mono tabular-nums text-slate-400">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title in selected language */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-1.5 leading-snug">
                    {cat.name[language]}
                  </h3>

                  {/* Secondary language subtitle */}
                  <div className="text-xs text-slate-500 mb-2 font-medium">
                    {language === 'mr' ? cat.name.en : cat.name.mr}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {cat.description[language]}
                  </p>
                </div>

                {/* Footer metadata: Zero-pill discipline */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    {cat.articleCount ?? 10} {t.categories.articlesCount}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                    <span>{language === 'mr' ? 'वाचा' : 'Explore'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
