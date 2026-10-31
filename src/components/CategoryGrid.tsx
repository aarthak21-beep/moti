
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
  ArrowRight,
  Stethoscope,
} from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
  selectedCategoryId: string | null;
  articleCounts: Record<string, number>;
  onSelectCategory: (categoryId: string) => void;
  language: Language;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  selectedCategoryId,
  articleCounts,
  onSelectCategory,
  language,
}) => {
  const t = translations[language];

  const renderIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 stroke-[1.8]' };

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
      default: return <Stethoscope {...props} />;
    }
  };

  return (
    <section
      className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-emerald-50/70 via-white to-white"
      id="categories-section"
    >
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-64 h-64 rounded-full bg-teal-100/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-9 sm:mb-12 gap-5">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide mb-4">
              <Activity className="w-3.5 h-3.5" />
              {language === 'mr'
                ? 'आरोग्याची योग्य माहिती, निरोगी आयुष्य'
                : 'Trusted Health Knowledge for Everyday Life'}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.categories.title}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              {t.categories.subtitle}
            </p>
          </div>

          {selectedCategoryId && (
            <button
              onClick={() => onSelectCategory('all')}
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900 transition-colors self-start md:self-auto"
            >
              {language === 'mr' ? 'सर्व विषय पहा' : 'View All Topics'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((cat, idx) => {
            const isSelected = selectedCategoryId === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                aria-pressed={isSelected}
                className={`group relative text-left min-h-[205px] p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-br from-emerald-50 to-white border-emerald-500 shadow-xl shadow-emerald-900/10 ring-2 ring-emerald-500/20'
                    : 'bg-white border-emerald-100 shadow-sm hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1'
                }`}
              >
                <div
                  className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full transition-colors ${
                    isSelected
                      ? 'bg-emerald-100/80'
                      : 'bg-slate-50 group-hover:bg-emerald-50'
                  }`}
                />

                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                        isSelected
                          ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                          : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white'
                      }`}
                    >
                      {renderIcon(cat.iconName)}
                    </div>

                    <span className="text-[11px] font-extrabold tracking-[0.18em] text-emerald-200">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {cat.name[language]}
                  </h3>

                  <p className="text-xs font-semibold text-emerald-700/80 mt-1.5 mb-2">
                    {language === 'mr' ? cat.name.en : cat.name.mr}
                  </p>

                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {cat.description[language]}
                  </p>
                </div>

                <div className="relative mt-5 pt-4 border-t border-emerald-50 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500 font-medium">
                    {articleCounts[cat.id] ?? 0} {t.categories.articlesCount}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:gap-2.5 transition-all">
                    {language === 'mr' ? 'विषय पहा' : 'Explore'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-500">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>
            {language === 'mr'
              ? 'आरोग्यविषयक माहिती समजून घेण्यासाठी एक विश्वासार्ह व्यासपीठ'
              : 'A learning platform to help you understand health information'}
          </span>
        </div>
      </div>
    </section>
  );
};
