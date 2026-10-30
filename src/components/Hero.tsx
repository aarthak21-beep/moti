
import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Search,
  HeartPulse,
  ShieldCheck,
  Activity,
  Stethoscope,
} from 'lucide-react';

interface HeroProps {
  language: Language;
  onExploreClick: () => void;
  onFreeLearnClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onExploreClick,
  onFreeLearnClick,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  const t = translations[language];

  const features = [
    {
      icon: ShieldCheck,
      mr: 'सोप्या भाषेत आरोग्य माहिती',
      en: 'Easy-to-understand health information',
    },
    {
      icon: HeartPulse,
      mr: 'प्रतिबंधात्मक आरोग्य मार्गदर्शन',
      en: 'Preventive health education',
    },
    {
      icon: BookOpen,
      mr: 'पूर्णपणे मोफत ज्ञान',
      en: 'Free learning for everyone',
    },
  ];

  const popularSearches = [
    { mr: 'मधुमेह', en: 'Diabetes' },
    { mr: 'रक्तदाब', en: 'Blood Pressure' },
    { mr: 'पोषण', en: 'Nutrition' },
    { mr: 'योग', en: 'Yoga' },
    { mr: 'प्रथमोपचार', en: 'First Aid' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-14 sm:py-20 lg:py-24">
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-teal-100/50 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-800 shadow-sm mb-7">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              {language === 'mr'
                ? 'MOTI HealthSphere — निरोगी आयुष्याचा रोजचा मार्गदर्शक'
                : 'Your Daily Guide to Better Health.'}
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 mb-6"
              style={{ textWrap: 'balance' }}
            >
              {language === 'mr' ? (
                <>
                  निरोगी जीवनाची
                  <span className="block text-emerald-700">
                    सुरुवात इथूनच!
                  </span>
                </>
              ) : (
                <>
                  Your Journey to
                  <span className="block text-emerald-700">
                    Better Health Starts Here.
                  </span>
                </>
              )}
            </h1>

            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 mb-8">
              {language === 'mr'
                ? 'आरोग्य, पोषण, फिटनेस आणि मानसिक स्वास्थ्य याबद्दल सोप्या भाषेत माहिती मिळवा. स्वतःच्या आरोग्याबद्दल जागरूक व्हा आणि निरोगी जीवनशैलीकडे एक पाऊल टाका.'
                : 'Explore simple, useful information about health, nutrition, fitness and mental wellbeing. Make informed choices and take a positive step towards a healthier lifestyle.'}
            </p>

            <form onSubmit={onSearchSubmit} className="max-w-xl mb-4">
              <div className="flex items-center rounded-2xl border border-emerald-200 bg-white p-2 shadow-lg shadow-emerald-900/5 focus-within:ring-4 focus-within:ring-emerald-100">
                <Search className="ml-3 h-5 w-5 shrink-0 text-emerald-700" />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={t.search.placeholder}
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm sm:text-base text-slate-800 outline-none placeholder:text-slate-400"
                  aria-label={language === 'mr' ? 'आरोग्य विषय शोधा' : 'Search health topics'}
                />

                <button
                  type="submit"
                  className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
                >
                  {language === 'mr' ? 'शोधा' : 'Search'}
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center gap-2 mb-8 text-xs">
              <span className="font-semibold text-slate-500">
                {language === 'mr' ? 'लोकप्रिय विषय:' : 'Popular topics:'}
              </span>

              {popularSearches.map((item) => (
                <button
                  key={item.en}
                  type="button"
                  onClick={() =>
                    onSearchChange(language === 'mr' ? item.mr : item.en)
                  }
                  className="rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-emerald-800 transition hover:border-emerald-400 hover:bg-emerald-50"
                >
                  {language === 'mr' ? item.mr : item.en}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-900"
              >
                {language === 'mr' ? 'आरोग्य विषय पाहा' : 'Explore Health'}
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onFreeLearnClick}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-6 py-3.5 text-sm font-bold text-emerald-900 transition hover:bg-emerald-50"
              >
                <BookOpen className="h-4 w-4" />
                {language === 'mr' ? 'मोफत वाचा' : 'Learn for Free'}
              </button>
            </div>

            <div className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-emerald-100 pt-6">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div key={feature.en} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <Icon className="h-5 w-5 shrink-0 text-emerald-700" />
                    <span>
                      {language === 'mr' ? feature.mr : feature.en}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-emerald-200 to-teal-100 blur-xl opacity-60" />

              <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-white p-6 sm:p-8 shadow-2xl shadow-emerald-950/10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                      MOTI HEALTHSPHERE
                    </p>
                    <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                      {language === 'mr' ? 'आरोग्य प्रथम!' : 'Health Comes First!'}
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
                    <HeartPulse className="h-7 w-7" />
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-800 p-6 text-white mb-5">
                  <Activity className="h-10 w-10 mb-5 text-emerald-100" />
                  <h3 className="text-2xl font-extrabold leading-snug">
                    {language === 'mr'
                      ? 'छोट्या सवयी, निरोगी आयुष्य.'
                      : 'Small Habits. Healthier Life.'}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-emerald-50">
                    {language === 'mr'
                      ? 'दररोज आरोग्यासाठी एक चांगले पाऊल टाका.'
                      : 'Take one positive step for your health every day.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-emerald-50 p-4">
                    <HeartPulse className="h-6 w-6 text-emerald-700 mb-2" />
                    <p className="text-sm font-bold text-slate-800">
                      {language === 'mr' ? 'हृदयाचे आरोग्य' : 'Heart Health'}
                    </p>
                  </div>

                  <div className="rounded-xl bg-teal-50 p-4">
                    <Stethoscope className="h-6 w-6 text-teal-700 mb-2" />
                    <p className="text-sm font-bold text-slate-800">
                      {language === 'mr' ? 'आरोग्य जागरूकता' : 'Health Awareness'}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-100 bg-white p-3 text-xs text-slate-600">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  {language === 'mr'
                    ? 'सोपे, मोफत आणि द्विभाषिक आरोग्य शिक्षण'
                    : 'Simple, free and bilingual health education'}
                </div>
              </div>

              <div className="absolute -bottom-4 -right-3 hidden sm:flex items-center gap-2 rounded-xl border border-emerald-100 bg-white px-4 py-3 shadow-lg">
                <ShieldCheck className="h-5 w-5 text-emerald-700" />
                <span className="text-xs font-bold text-slate-700">
                  {language === 'mr' ? 'आरोग्य जागरूकता' : 'Health Education'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
