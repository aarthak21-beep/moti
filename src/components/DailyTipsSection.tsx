import React, { useState } from 'react';
import { Language, DailyHealthTip } from '../types';
import { translations } from '../data/translations';
import { DAILY_HEALTH_TIPS } from '../data/healthData';
import { Lightbulb, CheckCircle2, ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';

interface DailyTipsSectionProps {
  language: Language;
}

export const DailyTipsSection: React.FC<DailyTipsSectionProps> = ({ language }) => {
  const [selectedTipIndex, setSelectedTipIndex] = useState(0);
  const t = translations[language];
  const tip = DAILY_HEALTH_TIPS[selectedTipIndex];

  const handlePrev = () => {
    setSelectedTipIndex((prev) => (prev > 0 ? prev - 1 : DAILY_HEALTH_TIPS.length - 1));
  };

  const handleNext = () => {
    setSelectedTipIndex((prev) => (prev < DAILY_HEALTH_TIPS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-12 sm:py-16 bg-emerald-950 text-white relative overflow-hidden" id="daily-tips">
      {/* Background soft ambient leaf glow */}
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-800/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'आरोग्यवर्धक दिनचर्या' : 'Daily Micro-Habits'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.dailyTips.title}
            </h2>
            <p className="text-emerald-200/80 text-sm sm:text-base mt-1">
              {t.dailyTips.subtitle}
            </p>
          </div>

          {/* Day Selector Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 max-w-full" role="group" aria-label={language === 'mr' ? 'दिवसानुसार आरोग्य टिप निवडा' : 'Choose a daily health tip'}>
            {DAILY_HEALTH_TIPS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setSelectedTipIndex(idx)}
                aria-pressed={selectedTipIndex === idx}
                className={`min-h-11 min-w-11 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 ${
                  selectedTipIndex === idx
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-emerald-900/60 text-emerald-300 hover:bg-emerald-900 hover:text-white'
                }`}
              >
                {item.day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Tip Spotlight Card */}
        <div className="bg-emerald-900/50 border border-emerald-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              {/* Category & Day Info */}
              <div className="flex items-center gap-2 text-xs text-emerald-300 mb-2">
                <span className="font-bold uppercase tracking-wider text-emerald-400">
                  {tip.category[language]}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-emerald-200">
                  <Calendar className="w-3 h-3" />
                  <span>{tip.day}</span>
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                {tip.title[language]}
              </h3>

              {/* Tip Explanation */}
              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {tip.tip[language]}
              </p>

              {/* Actionable Step for Today */}
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700/60 flex items-start gap-3">
                <div className="p-1 rounded-full bg-emerald-700 text-emerald-100 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-0.5">
                    {t.dailyTips.actionStep}:
                  </div>
                  <div className="text-xs sm:text-sm text-emerald-100 font-medium">
                    {tip.actionableStep[language]}
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Navigation Arrows */}
            <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
              <button
                onClick={handlePrev}
                className="min-h-11 min-w-11 p-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
                aria-label={t.dailyTips.prevTip}
                title={t.dailyTips.prevTip}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono tabular-nums text-emerald-300" aria-live="polite" aria-atomic="true">
                {selectedTipIndex + 1} / {DAILY_HEALTH_TIPS.length}
              </span>
              <button
                onClick={handleNext}
                className="p-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white transition-colors"
                aria-label={t.dailyTips.nextTip}
                title={t.dailyTips.nextTip}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
