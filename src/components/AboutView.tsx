import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MotiLogo } from './MotiLogo';
import { 
  ShieldCheck, 
  BookOpen, 
  Heart, 
  Users, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

interface AboutViewProps {
  language: Language;
}

export const AboutView: React.FC<AboutViewProps> = ({ language }) => {
  const t = translations[language];

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Lockup */}
        <div className="text-center mb-12">
          <div className="inline-flex justify-center mb-4">
            <MotiLogo size="lg" showTagline={true} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            {t.about.title}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>

        {/* Verbatim Mission Statement Card */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-teal-50 border border-emerald-200/80 mb-12 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-800 text-white shrink-0 mt-1">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                {language === 'mr' ? 'आमचे ध्येय व संकल्प' : 'Our Sole Purpose'}
              </div>
              <blockquote className="text-lg sm:text-xl font-medium text-slate-900 leading-relaxed italic">
                "{t.about.mainText}"
              </blockquote>
              <div className="mt-4 pt-3 border-t border-emerald-200 text-xs text-emerald-800 font-semibold">
                MOTI Health & Wellness Education · 100% Free for India
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles Bento Grid */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            {t.about.corePillarsTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-white">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                {t.about.pillar1Title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.about.pillar1Desc}
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                {t.about.pillar2Title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.about.pillar2Desc}
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                {t.about.pillar3Title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.about.pillar3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Verified Medical Safety Pledge */}
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {t.about.safetyDisclaimerTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.about.safetyDisclaimerText}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'mr' ? 'कोणतेही औषध स्वतःहून सुचवले जात नाही' : 'Zero unauthorized drug prescribing'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'mr' ? 'WHO आणि ICMR मानके वापरली जातात' : 'WHO & ICMR research protocols'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'mr' ? 'डॉक्टरांच्या सल्ल्याशिवाय औषध बंद करू नका' : 'Prescriptions are never countermanded'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'mr' ? '१०८ आपत्कालीन मार्गदर्शनाचा समावेश' : '108 / 112 emergency routing'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
