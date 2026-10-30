
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
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-lime-50">
      <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-emerald-100/70 blur-3xl"/>
      <div className="mx-auto grid max-w-7xl items-center gap-0 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-8">
        <div className="relative z-10 py-5">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800"><HeartPulse className="h-5 w-5"/> {language==='mr'?'चांगले आरोग्य • उज्ज्वल भविष्य':'Better Health  ·  Brighter Future'}</div>
          <div className="font-serif text-7xl font-black leading-[.9] tracking-[-.08em] text-emerald-950 sm:text-8xl lg:text-[112px]">M<span className="relative mx-1 inline-flex h-[.82em] w-[.76em] items-center justify-center rounded-[48%_48%_42%_42%] bg-gradient-to-b from-emerald-300 via-emerald-700 to-emerald-950 align-middle shadow-lg"><span className="absolute inset-x-[8%] top-[10%] h-[45%] rounded-t-full bg-gradient-to-b from-emerald-100 to-emerald-500"/><span className="relative z-10 h-[.42em] w-[.42em] rounded-full border-[3px] border-amber-100 bg-[radial-gradient(circle_at_32%_25%,white_0%,#fff8e8_38%,#c5b59a_100%)] shadow-[0_2px_9px_#fff]"/></span>TI</div>
          <h1 className="mb-1 text-5xl font-black leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">Health<span className="text-emerald-700">Sphere</span></h1>
          <p className="mb-5 text-2xl font-medium text-slate-700 sm:text-3xl">Your Daily Guide to Better Health.</p>
          <div className="mb-5 h-1 w-16 rounded-full bg-emerald-600"/>
          <p className="mb-7 text-lg font-semibold text-emerald-800 sm:text-xl">{language==='mr'?'समजून घ्या आरोग्य, जगा निरोगी आयुष्य.':'Simple knowledge. Healthier choices. A better life.'}</p>
          <div className="mb-6 flex flex-wrap gap-3">
            <button onClick={onFreeLearnClick} className="inline-flex items-center gap-3 rounded-full bg-emerald-950 px-7 py-4 text-sm font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-emerald-800"><BookOpen className="h-5 w-5"/>{language==='mr'?'लेख वाचा':'Explore Articles'}<ArrowRight className="h-4 w-4"/></button>
            <button onClick={onExploreClick} className="inline-flex items-center gap-3 rounded-full border border-emerald-500 bg-white/80 px-7 py-4 text-sm font-bold text-emerald-900 hover:bg-emerald-50"><HeartPulse className="h-5 w-5"/>{language==='mr'?'विभाग पाहा':'Browse Categories'}</button>
          </div>
          <form onSubmit={onSearchSubmit} className="max-w-lg"><div className="flex items-center rounded-full border border-emerald-200 bg-white/90 p-1.5 shadow-sm"><Search className="ml-3 h-5 w-5 text-emerald-700"/><input type="search" value={searchQuery} onChange={e=>onSearchChange(e.target.value)} placeholder={t.search.placeholder} aria-label="Search health topics" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none"/><button type="submit" className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-bold text-white">{language==='mr'?'शोधा':'Search'}</button></div></form>
        </div>
        <div className="relative mx-auto w-full max-w-[620px]">
          <div className="absolute inset-10 rounded-full bg-emerald-200/60 blur-3xl"/>
          <svg viewBox="0 0 600 520" className="relative w-full drop-shadow-xl" role="img" aria-label="Pearl in an open shell surrounded by health symbols">
            <defs><radialGradient id="pearl" cx="30%" cy="25%"><stop stopColor="white"/><stop offset=".55" stopColor="#fff9eb"/><stop offset="1" stopColor="#b9a88e"/></radialGradient><linearGradient id="shell" x2="1" y2="1"><stop stopColor="white"/><stop offset="1" stopColor="#c8b89e"/></linearGradient><linearGradient id="leaf" x2="1" y2="1"><stop stopColor="#a5d9a7"/><stop offset=".55" stopColor="#16845c"/><stop offset="1" stopColor="#07523e"/></linearGradient></defs>
            <g fill="url(#leaf)" stroke="#0b694b" strokeWidth="2"><path d="M300 440Q160 310 65 390Q165 490 300 440Z"/><path d="M300 440Q440 310 535 390Q435 490 300 440Z"/><path d="M300 450Q220 355 160 420Q235 475 300 450Z"/><path d="M300 450Q380 355 440 420Q365 475 300 450Z"/></g>
            <path d="M155 345Q155 185 300 155Q445 185 445 345Q425 425 300 450Q175 425 155 345Z" fill="url(#shell)" stroke="#c7b79e" strokeWidth="4"/>
            <path d="M178 340Q190 220 300 185Q410 220 422 340Q390 405 300 425Q210 405 178 340Z" fill="#fffdf7" stroke="white" strokeWidth="5"/>
            <g stroke="#dfd2bf" strokeWidth="3" fill="none" opacity=".8"><path d="M300 415Q210 320 200 225"/><path d="M300 415Q245 300 250 195"/><path d="M300 415V180"/><path d="M300 415Q355 300 350 195"/><path d="M300 415Q390 320 400 225"/></g>
            <path d="M145 350Q300 420 455 350Q430 455 300 475Q170 455 145 350Z" fill="url(#shell)" stroke="#c7b79e" strokeWidth="4"/><path d="M175 365Q300 425 425 365Q395 445 300 450Q205 445 175 365Z" fill="#fffdf7"/>
            <circle cx="300" cy="315" r="72" fill="#a18b6d" opacity=".18"/><circle cx="300" cy="300" r="58" fill="url(#pearl)" stroke="white" strokeWidth="5"/><ellipse cx="280" cy="278" rx="18" ry="12" fill="white" opacity=".9"/>
            <g fill="#fafffc" stroke="#b7e2d1" strokeWidth="3"><circle cx="300" cy="50" r="38"/><circle cx="485" cy="145" r="35"/><circle cx="520" cy="320" r="35"/><circle cx="80" cy="320" r="35"/><circle cx="115" cy="145" r="35"/></g>
            <g fill="none" stroke="#07835e" strokeWidth="4" strokeLinecap="round"><path d="M280 50h12l8-14 9 28 8-14h14"/><path d="M475 145q12-20 24 0q-12 20-24 0Z"/><path d="M510 310h20v20h-20zM506 308l14-10 14 10"/><path d="M65 320h30M80 305v30M103 145q12-20 24 0q-12 20-24 0Z"/></g>
            <g fill="none" stroke="#b4dfcf" strokeWidth="2" strokeDasharray="4 7"><path d="M300 90v90M150 165l80 90M450 165l-80 90M115 320h110M485 320H375"/></g>
          </svg>
        </div>
      </div>
      <div className="border-t border-emerald-100 bg-white/70"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-6 sm:grid-cols-4 sm:px-8 lg:px-10">
        {[{icon:BookOpen,value:'100+',label:language==='mr'?'आरोग्य लेख':'Health Articles'},{icon:HeartPulse,value:'10+',label:language==='mr'?'आरोग्य विभाग':'Health Categories'},{icon:ShieldCheck,value:language==='mr'?'विश्वासार्ह':'Trusted Information',label:language==='mr'?'तुमच्या निरोगी आयुष्यासाठी':'For a Healthier You'},{icon:HeartPulse,value:'100% Free',label:language==='mr'?'वर्गणी नाही • नोंदणी नाही':'No Subscription · No Registration'}].map(item=>{const Icon=item.icon;return <div key={item.value} className="flex items-center gap-3 sm:px-3"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-900"><Icon className="h-7 w-7"/></span><span><strong className="block text-lg font-extrabold text-emerald-900">{item.value}</strong><small className="text-xs text-slate-500">{item.label}</small></span></div>})}
      </div></div>
    </section>
  );
};
