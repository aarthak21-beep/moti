import React, { useState } from 'react';
import { Article, Language, FontSizeScale } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  Printer, 
  Share2, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  AlertCircle, 
  Clock, 
  Calendar, 
  ExternalLink,
  HeartPulse,
  Sparkles
} from 'lucide-react';

interface ArticleDetailModalProps {
  article: Article;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  fontScale: FontSizeScale;
  onFontScaleChange: (scale: FontSizeScale) => void;
  onShareWhatsApp: (article: Article) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  language,
  onLanguageChange,
  isBookmarked,
  onToggleBookmark,
  fontScale,
  onFontScaleChange,
  onShareWhatsApp,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const t = translations[language];

  // Simple Web Speech API handler for audio narration
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert(language === 'mr' ? 'आपल्या ब्राउझरमध्ये ऑडिओ सुविधा उपलब्ध नाही.' : 'Speech synthesis not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title[language]}. ${article.overview[language]}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = language === 'mr' ? 'mr-IN' : 'en-US';
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const fontClasses = {
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-relaxed',
    lg: 'text-lg sm:text-xl leading-loose',
  }[fontScale];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex justify-center p-2 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col article-print-container">
        
        {/* Sticky Action Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 no-print">
          {/* Article Language Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => onLanguageChange('mr')}
              className={`min-h-10 px-3 py-2 rounded-lg font-medium transition-colors ${
                language === 'mr' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                language === 'en' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
          </div>

          {/* Quick Toolbar: Font Size, Audio, Print, Share, Bookmark, Close */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Senior font scale adjuster */}
            <div className="hidden sm:flex items-center gap-0.5 bg-slate-100 rounded-lg p-0.5 text-xs text-slate-700">
              <button
                onClick={() => onFontScaleChange('sm')}
                className={`px-2 py-1 rounded font-semibold ${fontScale === 'sm' ? 'bg-white shadow-xs text-emerald-800' : 'hover:bg-slate-200'}`}
                title="Small Text"
              >
                A-
              </button>
              <button
                onClick={() => onFontScaleChange('md')}
                className={`px-2 py-1 rounded font-semibold ${fontScale === 'md' ? 'bg-white shadow-xs text-emerald-800' : 'hover:bg-slate-200'}`}
                title="Normal Text"
              >
                A
              </button>
              <button
                onClick={() => onFontScaleChange('lg')}
                className={`px-2 py-1 rounded font-semibold ${fontScale === 'lg' ? 'bg-white shadow-xs text-emerald-800' : 'hover:bg-slate-200'}`}
                title="Large Text for Senior Citizens"
              >
                A+
              </button>
            </div>

            {/* Audio Listen */}
            <button
              onClick={handleToggleSpeech}
              className={`p-2 rounded-lg border transition-colors ${
                isPlayingAudio 
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title={isPlayingAudio ? 'Stop Audio' : t.articles.listen}
              aria-label={t.articles.listen}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4 text-emerald-700" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Print Article */}
            <button
              onClick={handlePrint}
              className="min-w-10 min-h-10 p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
              title={t.articles.print}
              aria-label={t.articles.print}
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* WhatsApp Share */}
            <button
              onClick={() => onShareWhatsApp(article)}
              className="min-h-10 inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
              title={t.articles.shareWhatsapp}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked 
                  ? 'bg-emerald-700 text-white border-emerald-700' 
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title={isBookmarked ? t.articles.bookmarked : t.articles.bookmark}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>

            {/* Close Modal */}
            <button
              onClick={() => {
                if (isPlayingAudio) window.speechSynthesis.cancel();
                onClose();
              }}
              className="min-w-10 min-h-10 p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Content */}
        <div className="p-6 sm:p-8 md:p-10 max-h-[85vh] overflow-y-auto">
          {/* Category & Metadata: Zero-pill discipline */}
          <div className="flex items-center gap-2.5 text-xs text-slate-500 mb-3 flex-wrap">
            <span className="font-bold text-emerald-800 uppercase tracking-wider">
              {article.categoryId.replace('-', ' ')}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.readTimeMinutes} {t.articles.readTime}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.articles.publishedOn}: {article.publishDate}</span>
            </span>
</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
            {article.title[language]}
          </h1>

          {/* Educational Free Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200/60 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.hero.freeBadge}</span>
          </div>

          {/* Hero Featured Article Image */}
          {article.image && (
            <div className="rounded-xl overflow-hidden mb-8 border border-slate-200 max-h-[380px] bg-slate-100">
              <img
                src={article.image}
                alt={article.title[language]}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Overview / Introduction */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              {language === 'mr' ? 'सोप्या भाषेत समजून घ्या' : 'Understanding in Simple Words'}
            </h2>
            <p className={`${fontClasses} text-slate-700 font-normal`}>
              {article.overview[language]}
            </p>
          </div>

          {/* Core Sections */}
          <div className="space-y-8 mb-10">
            {article.sections.map((section, idx) => (
              <div key={idx} className="border-t border-slate-100 pt-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {section.title[language]}
                </h3>
                <p className={`${fontClasses} text-slate-700 mb-4`}>
                  {section.content[language]}
                </p>

                {section.bulletPoints && (
                  <ul className="space-y-2.5 pl-5 list-disc text-slate-700">
                    {section.bulletPoints[language].map((point, pIdx) => (
                      <li key={pIdx} className={fontClasses}>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Prevention & Healthy Lifestyle Guidance Box */}
          <div className="p-6 rounded-xl bg-emerald-50/70 border border-emerald-200/80 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-emerald-700 shrink-0" />
              <h3 className="text-lg font-bold text-emerald-950">
                {t.articles.prevention}
              </h3>
            </div>
            <ul className="space-y-2 pl-5 list-disc text-slate-800">
              {article.preventionTips[language].map((tip, idx) => (
                <li key={idx} className={fontClasses}>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* When to Consult a Doctor (Crucial Medical Safety Section) */}
          <div className="p-6 rounded-xl bg-amber-50/80 border border-amber-200/80 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <HeartPulse className="w-5 h-5 text-amber-700 shrink-0" />
              <h3 className="text-lg font-bold text-amber-950">
                {t.articles.whenToSeeDoctor}
              </h3>
            </div>
            <p className="text-xs text-amber-900 font-medium mb-3">
              {language === 'mr'
                ? 'खालीलपैकी कोणतीही लक्षणे जाणवल्यास घरगुती उपचारांवर अवलंबून न राहता तात्काळ पात्र डॉक्टरांचा सल्ला घ्या:'
                : 'If you experience any of the following signs, do not rely on home measures; consult a qualified medical doctor promptly:'}
            </p>
            <ul className="space-y-2 pl-5 list-disc text-slate-800">
              {article.whenToSeeDoctor[language].map((sign, idx) => (
                <li key={idx} className={fontClasses}>
                  {sign}
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Warning Signs (if applicable) */}
          {article.emergencyWarningSigns && (
            <div className="p-6 rounded-xl bg-rose-50 border border-rose-200 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />
                <h3 className="text-lg font-bold text-rose-950">
                  {t.articles.emergencySigns}
                </h3>
              </div>
              <ul className="space-y-2 pl-5 list-disc text-rose-900 font-medium">
                {article.emergencyWarningSigns[language].map((sign, idx) => (
                  <li key={idx} className={fontClasses}>
                    {sign}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-rose-200 text-xs text-rose-800 font-semibold flex items-center justify-between">
                <span>{language === 'mr' ? 'राष्ट्रीय आपत्कालीन रुग्णवाहिका संपर्क:' : 'National Ambulance Service:'}</span>
                <a href="tel:108" className="underline font-bold text-rose-950 text-sm">
                  108 / 112
                </a>
              </div>
            </div>
          )}

          {/* Trusted Medical References (WHO, NHS, ICMR, AIIMS) */}
          <div className="border-t border-slate-200 pt-6 mb-8">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              {t.articles.references}
            </h3>
            <div className="space-y-2">
              {article.references.map((ref, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="font-mono text-slate-400">[{idx + 1}]</span>
                  <span>
                    <strong className="text-slate-800">{ref.source}</strong> ({ref.year || '2024'}): {ref.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Medical Safety Disclaimer Box */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <p className="font-semibold text-slate-800 mb-1">
              {language === 'mr' ? 'महत्त्वाची वैद्यकीय सूचना (MOTI Disclaimer):' : 'Important Medical Safety Disclaimer (MOTI):'}
            </p>
            <p>
              {language === 'mr'
                ? 'MOTI हे केवळ एक आरोग्य शिक्षण व्यासपीठ आहे, वैद्यकीय निदान सेवा नाही. येथे दिलेली माहिती रोगाचे निदान किंवा औषधोपचार ठरवण्यासाठी वापरू नये. तुमच्या आरोग्यासंबंधी कोणत्याही शंकेसाठी नेहमी नोंदणीकृत वैद्यकीय तज्ज्ञांचा सल्ला घ्या. डॉक्टरांनी दिलेली कोणतीही औषधे परस्पर बंद करू नका.'
                : 'MOTI is an educational initiative, not a medical diagnosis service. The information provided here is for health literacy and does not constitute clinical medical diagnosis, prescription, or treatment. Always seek direct counsel from a licensed healthcare practitioner for medical issues. Never discontinue prescribed medical therapy without physician approval.'}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-200 p-4 bg-slate-50 flex items-center justify-between no-print">
          <div className="text-xs text-slate-500">
            {language === 'mr' ? 'MOTI मोफत आरोग्य शिक्षण उपक्रम' : 'MOTI Free Health Education Initiative'}
          </div>
          <button
            onClick={() => {
              if (isPlayingAudio) window.speechSynthesis.cancel();
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors"
          >
            {language === 'mr' ? 'बंद करा' : 'Close Article'}
          </button>
        </div>

      </div>
    </div>
  );
};
