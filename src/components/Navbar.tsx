import React, { useState } from 'react';
import { MotiLogo } from './MotiLogo';
import { Language, FontSizeScale } from '../types';
import { translations } from '../data/translations';
import { 
  Bookmark, 
  Menu, 
  X, 
  Globe, 
  Sparkles,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  fontScale: FontSizeScale;
  onFontScaleChange: (scale: FontSizeScale) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  bookmarkedCount: number;
  onOpenBookmarks: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  fontScale,
  onFontScaleChange,
  activeTab,
  onTabChange,
  bookmarkedCount,
  onOpenBookmarks,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'categories', label: t.nav.categories },
    { id: 'guides', label: t.nav.guides },
    { id: 'daily-tips', label: t.nav.dailyTips },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10">
      {/* Top mini-bar for emergency & accessibility */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.brand.missionBadge}</span>
            </span>
            <span className="hidden md:inline text-emerald-600">·</span>
            <span className="hidden md:inline text-emerald-300/80">
              100% Free · WHO & ICMR Grounded
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Senior Citizen Font Sizer */}
            <div className="flex items-center gap-1 bg-emerald-900/60 rounded px-2 py-0.5">
              <span className="text-[11px] text-emerald-300 mr-1 hidden sm:inline">
                {t.articles.fontSize}:
              </span>
              <button
                onClick={() => onFontScaleChange('sm')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  fontScale === 'sm' ? 'bg-emerald-700 text-white font-bold' : 'text-emerald-300 hover:text-white'
                }`}
                title="Small Font"
              >
                A-
              </button>
              <button
                onClick={() => onFontScaleChange('md')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  fontScale === 'md' ? 'bg-emerald-700 text-white font-bold' : 'text-emerald-300 hover:text-white'
                }`}
                title="Standard Font"
              >
                A
              </button>
              <button
                onClick={() => onFontScaleChange('lg')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  fontScale === 'lg' ? 'bg-emerald-700 text-white font-bold' : 'text-emerald-300 hover:text-white'
                }`}
                title="Large Font for Senior Citizens"
              >
                A+
              </button>
            </div>

            {/* Emergency Hotline Quick Access */}
            <a
              href="tel:108"
              className="inline-flex items-center gap-1 text-rose-300 hover:text-rose-200 transition-colors font-medium whitespace-nowrap"
            >
              <PhoneCall className="w-3 h-3" />
              <span>108 / 112</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Action / Switcher) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single element brand wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg whitespace-nowrap shrink-0"
          >
            <MotiLogo size="md" showTagline={true} />
          </button>

          {/* Zone 2: 4-5 single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-slate-700">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-emerald-800 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language Switcher & Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Bilingual Switcher (Marathi / English) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
              <button
                onClick={() => onLanguageChange('mr')}
                className={`px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  language === 'mr'
                    ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-label="मराठी भाषा निवडा"
              >
                मराठी
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  language === 'en'
                    ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-label="Select English Language"
              >
                English
              </button>
            </div>

            {/* Bookmarks Icon Button */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
              title={t.nav.savedArticles}
              aria-label={t.nav.savedArticles}
            >
              <Bookmark className="w-5 h-5" />
              {bookmarkedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {bookmarkedCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('categories')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.hero.exploreBtn}</span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  activeTab === link.id
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {language === 'mr' ? 'भाषा बदला:' : 'Change Language:'}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onLanguageChange('mr')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                    language === 'mr' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  मराठी
                </button>
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                    language === 'en' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
