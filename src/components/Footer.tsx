import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MotiLogo } from './MotiLogo';
import { ShieldCheck, Lock, Heart, PhoneCall, ExternalLink, X } from 'lucide-react';

interface FooterProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);
  const t = translations[language];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#052e24] via-emerald-950 to-[#064e3b] text-emerald-100 border-t border-emerald-900 pt-12 pb-8">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-10 border-b border-emerald-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <MotiLogo size="lg" lightMode={true} showTagline={true} />
            <p className="text-emerald-300 font-semibold text-sm mt-3 tracking-wide">
              {language === 'mr' ? t.footer.marathiTagline : t.footer.tagline}
            </p>
            <p className="text-emerald-200/70 text-xs leading-relaxed mt-2 max-w-sm">
              {language === 'mr'
                ? 'भारतातील प्रत्येकासाठी मोफत, विश्वासार्ह आणि सोप्या भाषेत आरोग्य व निरोगीपणा शिक्षण.'
                : 'Free, reliable, and easy-to-understand health and wellness education for everyone in India.'}
            </p>
            
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{language === 'mr' ? '१००% मोफत · नो पेवॉल' : 'Free Health Education · Marathi & English'}</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-[0.16em] mb-4">
              {language === 'mr' ? 'नेव्हिगेशन' : 'Navigation'}
            </h3>
            <ul className="space-y-2.5 text-xs text-emerald-200/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.categories}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guides')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.guides}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  {t.footer.aboutUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  {t.footer.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Medical Safety */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {language === 'mr' ? 'वैद्यकीय सुरक्षा व आणीबाणी' : 'Emergency & Safety'}
            </h3>
            <div className="p-5 rounded-2xl bg-white/[0.06] border border-emerald-700/70 text-xs space-y-3 shadow-lg shadow-black/10">
              <div className="flex items-center gap-2 text-rose-300 font-bold">
                <PhoneCall className="w-4 h-4" />
                <span>{language === 'mr' ? 'तातडीची रुग्णवाहिका: १०८ / ११२' : 'National Ambulance: 108 / 112'}</span>
              </div>
              <p className="text-emerald-200/70 leading-relaxed text-[11px]">
                {language === 'mr'
                  ? 'MOTI हे शैक्षणिक व्यासपीठ आहे, वैद्यकीय निदान सेवा नाही. आपत्कालीन स्थितीत तात्काळ डॉक्टरांशी संपर्क साधा.'
                  : 'MOTI is an educational platform, not a medical diagnosis service. For emergencies, contact hospital services immediately.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Mandatory Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
          <div>
            © {new Date().getFullYear()} MOTI HealthSphere. {t.footer.tagline}
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors"
            >
              {t.footer.aboutUs}
            </button>
            <span aria-hidden="true">|</span>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors"
            >
              {t.footer.contact}
            </button>
            <span aria-hidden="true">|</span>
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-white transition-colors"
            >
              {t.footer.privacy}
            </button>
            <span aria-hidden="true">|</span>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-white transition-colors"
            >
              {t.footer.terms}
            </button>
            <span aria-hidden="true">|</span>
            <button
              onClick={() => setModalType('disclaimer')}
              className="hover:text-white transition-colors text-emerald-200 font-semibold underline decoration-emerald-500"
            >
              {t.footer.medicalDisclaimer}
            </button>
            <span aria-hidden="true">|</span>
            <button
              onClick={() => onNavigate('admin')}
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-200 font-mono transition-colors"
              title="Admin Editorial Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Simple Policy Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-lg text-slate-900">
                {modalType === 'disclaimer' && (language === 'mr' ? 'वैद्यकीय अस्वीकरण (Medical Disclaimer)' : 'Medical Disclaimer')}
                {modalType === 'privacy' && (language === 'mr' ? 'गोपनीयता धोरण (Privacy Policy)' : 'Privacy Policy')}
                {modalType === 'terms' && (language === 'mr' ? 'अटी व शर्ती (Terms of Use)' : 'Terms of Use')}
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              {modalType === 'disclaimer' && (
                <>
                  <p className="font-semibold text-slate-900">
                    MOTI is an educational platform, not a medical diagnosis service.
                  </p>
                  <p>
                    1. MOTI does not diagnose diseases, prescribe medicines or dosages, or recommend stopping or altering any prescribed medication.
                  </p>
                  <p>
                    2. Articles are intended for general education. Please check the references provided with each article and consult a qualified healthcare professional for personal medical advice.
                  </p>
                  <p>
                    3. If you are experiencing serious or sudden symptoms (such as acute chest pain, severe shortness of breath, loss of speech or consciousness), immediately call 108 or 112 or visit the nearest emergency facility.
                  </p>
                </>
              )}

              {modalType === 'privacy' && (
                <>
                  <p>
                    At MOTI, we respect your privacy. All educational health guides are freely accessible without mandatory registration, login walls, or third-party tracking.
                  </p>
                  <p>
                    We do not sell, rent, or monetize your personal health queries. Bookmarks are saved entirely inside your local browser storage.
                  </p>
                </>
              )}

              {modalType === 'terms' && (
                <>
                  <p>
                    MOTI educational materials are published under an open educational mission to promote public health awareness across India in Marathi and English.
                  </p>
                  <p>
                    Content may be referenced with attribution to MOTI Health Education. Do not republish content to promote unverified commercial health supplements or medications.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-right">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg transition-colors"
              >
                {language === 'mr' ? 'समजले' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
