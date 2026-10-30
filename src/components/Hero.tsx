import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  ShieldCheck, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Sparkles,
  Search,
  Heart
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-white pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-emerald-950/5">
      {/* Subtle organic background foliage glow */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-10 left-10 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition & Action */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Mission Statement Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/60 text-emerald-900 text-xs font-semibold mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
              <span>
                {language === 'mr' ? 'मोफत व विश्वासार्ह आरोग्य शिक्षण' : 'Free & Reliable Health Education for Everyone'}
              </span>
            </div>

            {/* Hero Heading: Exact user requested copy */}
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-emerald-950 leading-[1.18] mb-6"
              style={{ textWrap: 'balance' }}
            >
              {language === 'mr' ? (
                <span>
                  तुमच्या आरोग्याची काळजी, आता <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy underline-offset-8">MOTI</span> सोबत!
                </span>
              ) : (
                <span>
                  Your Health. Your Wellness. Your <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy underline-offset-8">MOTI</span>.
                </span>
              )}
            </h1>

            {/* Subtitle: Exact user copy */}
            <p 
              className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed mb-8 max-w-2xl font-normal"
              style={{ textWrap: 'balance' }}
            >
              {language === 'mr' ? t.hero.marathiSubtitle : t.hero.subtitle}
            </p>

            {/* Instant Working Search Bar */}
            <form 
              onSubmit={onSearchSubmit}
              className="w-full max-w-xl mb-8 relative"
            >
              <div className="relative flex items-center shadow-md rounded-xl bg-white border-2 border-emerald-600/30 focus-within:border-emerald-600 focus-within:ring-3 focus-within:ring-emerald-100 transition-all">
                <Search className="w-5 h-5 text-emerald-700 ml-4 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={t.search.placeholder}
                  className="w-full py-3.5 pl-3 pr-28 text-slate-900 text-sm sm:text-base placeholder-slate-400 focus:outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shadow-xs"
                >
                  {language === 'mr' ? 'शोधा' : 'Search'}
                </button>
              </div>

              {/* Instant suggested quick queries */}
              <div className="flex items-center gap-2 mt-2.5 text-xs text-slate-500 flex-wrap">
                <span className="font-medium text-slate-600">
                  {language === 'mr' ? 'लोकप्रिय शोध:' : 'Trending:'}
                </span>
                {['मधुमेह (Diabetes)', 'उच्च रक्तदाब (BP)', 'संतुलित आहार (Diet)', 'योगासने (Yoga)', 'प्रथमोपचार (First Aid)'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      const cleanTag = tag.split(' ')[0];
                      onSearchChange(cleanTag);
                    }}
                    className="hover:text-emerald-700 hover:underline transition-colors"
                  >
                    {tag} ·
                  </button>
                ))}
              </div>
            </form>

            {/* CTAs: Explore Health & Learn for Free */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm sm:text-base shadow-md shadow-emerald-950/15 transition-all hover:translate-y-[-1px] whitespace-nowrap"
              >
                <span>{language === 'mr' ? 'आरोग्य विषय पाहा' : 'Explore Health'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onFreeLearnClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 font-semibold text-sm sm:text-base border border-emerald-950/15 shadow-xs transition-all whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>{language === 'mr' ? 'मोफत शिका' : 'Learn for Free'}</span>
              </button>
            </div>

            {/* Free Health Knowledge Guarantee Bar */}
            <div className="pt-4 border-t border-slate-200/80 w-full flex items-center gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'mr' ? '१००% विनामूल्य' : '100% Free Knowledge'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'mr' ? 'नोंदणीची गरज नाही' : 'No Registration Needed'}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'mr' ? 'डॉक्टरांनी तपासलेले' : 'Doctor Reviewed'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Impact Visual Carrier */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-950/15 border-4 border-white aspect-[4/3] lg:aspect-[5/4] bg-emerald-100">
              <img
                src="/src/assets/images/hero_wellness_lifestyle_1793352072364.jpg"
                alt="Healthy multi-generational Indian family walking joyfully together with vitality"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Subtle gradient vignette at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 fill-white/20" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 leading-tight">
                      {language === 'mr' ? 'MOTI आरोग्य चळवळ' : 'MOTI Health Initiative'}
                    </h2>
                    <p className="text-xs text-slate-600">
                      {language === 'mr'
                        ? 'महाराष्ट्रातील व भारतातील प्रत्येकासाठी सोपे व मोफत आरोग्य ज्ञान'
                        : 'Free, reliable and easy-to-understand health education for everyone.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating verification badge */}
            <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl shadow-lg border border-emerald-100 text-xs font-semibold text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>WHO & ICMR Standards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
