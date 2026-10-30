import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { AlertTriangle, PhoneCall, ChevronRight } from 'lucide-react';

interface EmergencyBannerProps {
  language: Language;
  onViewFirstAid: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  language,
  onViewFirstAid,
}) => {
  const t = translations[language];

  return (
    <aside 
      aria-label={language === 'mr' ? 'आपत्कालीन वैद्यकीय मदत' : 'Emergency medical assistance'}
      className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-4 py-3 sm:py-2.5 emergency-banner"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <div className="p-1 rounded-full bg-white/20 shrink-0">
            <AlertTriangle className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium text-white/95">
            <strong>{language === 'mr' ? 'वैद्यकीय आणीबाणी:' : 'Medical Emergency:'}</strong>{' '}
            {t.emergency.bannerText}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:108"
            className="min-h-11 inline-flex items-center gap-2 px-4 py-2 bg-white text-red-700 hover:bg-red-50 font-bold rounded-xl shadow-sm transition-colors whitespace-nowrap text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-700"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? '१०८ कॉल करा' : 'Call 108'}</span>
          </a>

          <button
            onClick={onViewFirstAid}
            className="min-h-11 inline-flex items-center gap-1 px-2 text-white/95 hover:text-white underline decoration-white/50 text-xs font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg"
          >
            <span>{t.emergency.viewGuide}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </aside>
  );
};
