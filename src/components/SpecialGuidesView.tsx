import React, { useState, useEffect } from 'react';
import { Language, YogaAsana, FirstAidItem } from '../types';
import { translations } from '../data/translations';
import { YOGA_ASANAS, FIRST_AID_PROTOCOLS } from '../data/healthData';
import { 
  Salad, 
  Flower2, 
  Moon, 
  Heart, 
  Crosshair, 
  Check, 
  AlertTriangle, 
  Play, 
  Pause, 
  RotateCcw,
  Sparkles,
  PhoneCall,
  Clock,
  ArrowRight
} from 'lucide-react';

interface SpecialGuidesViewProps {
  language: Language;
  onNavigateToCategory: (categoryId: string) => void;
}

export const SpecialGuidesView: React.FC<SpecialGuidesViewProps> = ({
  language,
  onNavigateToCategory,
}) => {
  const [activeTab, setActiveTab] = useState<'diet' | 'yoga' | 'sleep' | 'mental' | 'firstAid'>('diet');
  
  // Interactive 4-7-8 Breathing Pacer State for Mental Wellness
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (breathingActive) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 1) return prev - 1;
          
          // Switch phase
          if (breathingPhase === 'Inhale') {
            setBreathingPhase('Hold');
            return 7;
          } else if (breathingPhase === 'Hold') {
            setBreathingPhase('Exhale');
            return 8;
          } else {
            setBreathingPhase('Inhale');
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [breathingActive, breathingPhase]);

  const t = translations[language];

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1">
            {language === 'mr' ? 'आरोग्य कृती पुस्तिका' : 'Interactive Health Protocols'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.guides.title}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {t.guides.subtitle}
          </p>

          {/* Clean Segmented Tab Controls */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-200/80 rounded-xl mt-6">
            <button
              onClick={() => setActiveTab('diet')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'diet' ? 'bg-white text-emerald-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🥗 {t.guides.tabs.diet}
            </button>
            <button
              onClick={() => setActiveTab('yoga')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'yoga' ? 'bg-white text-emerald-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🧘 {t.guides.tabs.yoga}
            </button>
            <button
              onClick={() => setActiveTab('sleep')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'sleep' ? 'bg-white text-emerald-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌙 {t.guides.tabs.sleep}
            </button>
            <button
              onClick={() => setActiveTab('mental')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'mental' ? 'bg-white text-emerald-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🧠 {t.guides.tabs.mental}
            </button>
            <button
              onClick={() => setActiveTab('firstAid')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'firstAid' ? 'bg-rose-700 text-white shadow-xs' : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              🚨 {t.guides.tabs.firstAid}
            </button>
          </div>
        </div>

        {/* 1. DIET TAB */}
        {activeTab === 'diet' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Visual Thali Hero */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 p-6 sm:p-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 text-xs font-semibold mb-3">
                  <Salad className="w-4 h-4 text-emerald-700" />
                  <span>{language === 'mr' ? 'वैज्ञानिक भारतीय थाळी पद्धत' : 'The Scientific Indian Thali'}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  {language === 'mr' ? '५० : २५ : २५ निरोगी थाळीचा नियम' : 'The 50:25:25 Healthy Plate Architecture'}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {language === 'mr'
                    ? 'आपल्या दैनंदिन जेवणात पांढऱ्या भाताचे व मैद्याचे प्रमाण कमी करून भाज्या आणि प्रथिनांचे प्रमाण वाढवल्याने मधुमेह आणि लठ्ठपणा सहज टाळता येतो.'
                    : 'Restructuring your traditional Indian lunch and dinner with 50% fiber-rich greens, 25% plant/dairy proteins, and 25% whole grains balances insulin and prevents fatigue.'}
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                    <span><strong>50% {language === 'mr' ? 'भाज्या व सॅलड' : 'Greens & Salad'}:</strong> {language === 'mr' ? 'पालक, मेथी, काकडी, गाजर, दुधी, शेवगा' : 'Spinach, methi, cucumber, radish, bottle gourd'}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                    <span><strong>25% {language === 'mr' ? 'प्रथिने' : 'Protein'}:</strong> {language === 'mr' ? 'मूग डाळ, मटकी, चणे उसळ, पनीर, उकडलेले अंडे' : 'Moong dal, sprouted legumes, paneer, tofu, boiled egg'}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                    <span><strong>25% {language === 'mr' ? 'पारंपरिक धान्ये' : 'Complex Carbs'}:</strong> {language === 'mr' ? 'ज्वारी किंवा बाजरीची भाकरी, नाचणी, हातसडीचा भात' : 'Jowar, Bajra bhakri, Ragi, brown or hand-pounded rice'}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onNavigateToCategory('nutrition-diet')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900"
                  >
                    <span>{language === 'mr' ? 'सर्व पोषण लेख वाचा' : 'Explore All Nutrition Articles'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 h-full min-h-[300px] bg-emerald-100">
                <img
                  src="/src/assets/images/nutrition_healthy_thali_1793352073265.jpg"
                  alt="Healthy wholesome Indian thali"
                  className="w-full h-full object-cover max-h-[420px]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Local Millets Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-xl bg-white border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  🌾 {language === 'mr' ? 'ज्वारी (Jowar / Sorghum)' : 'Jowar (Sorghum)'}
                </h3>
                <p className="text-xs text-slate-600 mb-3">
                  {language === 'mr' ? 'ग्लुटेन-मुक्त, पचनास हलकी आणि उच्च फायबरयुक्त.' : 'Gluten-free, highly alkaline, rich in polyphenols and magnesium.'}
                </p>
                <div className="text-xs text-emerald-800 font-medium">
                  {language === 'mr' ? 'फायदा: पोटाची ॲसिडिटी व रक्तदाब नियंत्रित ठेवते.' : 'Best for: Lowering cholesterol & soothing gut acidity.'}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  🌾 {language === 'mr' ? 'बाजरी (Bajra / Pearl Millet)' : 'Bajra (Pearl Millet)'}
                </h3>
                <p className="text-xs text-slate-600 mb-3">
                  {language === 'mr' ? 'लोह (Iron) आणि फॉस्फरसचा नैसर्गिक खजिना.' : 'Dense in bioavailable iron, phosphorus, and slow-burning energy.'}
                </p>
                <div className="text-xs text-emerald-800 font-medium">
                  {language === 'mr' ? 'फायदा: ॲनिमिया दूर करते आणि हिवाळ्यात शरीराला ऊर्जा देते.' : 'Best for: Boosting hemoglobin and steady stamina.'}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  🌾 {language === 'mr' ? 'नाचणी (Ragi / Finger Millet)' : 'Ragi (Finger Millet)'}
                </h3>
                <p className="text-xs text-slate-600 mb-3">
                  {language === 'mr' ? 'दुधापेक्षा ३ पट अधिक नैसर्गिक कॅल्शियम.' : 'Contains 344mg calcium per 100g, superior bone mineral support.'}
                </p>
                <div className="text-xs text-emerald-800 font-medium">
                  {language === 'mr' ? 'फायदा: लहान मुलांची वाढ आणि महिलांच्या हाडांचे आरोग्य.' : 'Best for: Child growth, lactation, and osteoporosis prevention.'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. YOGA TAB */}
        {activeTab === 'yoga' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {YOGA_ASANAS.map((asana) => (
                <div key={asana.id} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-emerald-800">{asana.level[language]}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{asana.duration}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-0.5">
                      {asana.name[language]}
                    </h3>
                    <div className="text-xs text-slate-400 italic mb-4">
                      {asana.name.sanskrit}
                    </div>

                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        {language === 'mr' ? 'कृती (पायऱ्या):' : 'Step-by-Step Instructions:'}
                      </h4>
                      <ol className="space-y-2 text-xs text-slate-600 pl-4 list-decimal">
                        {asana.steps[language].map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                        {language === 'mr' ? 'प्रमुख फायदे:' : 'Key Clinical Benefits:'}
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700 pl-4 list-disc">
                        {asana.benefits[language].map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-50 text-[11px] text-amber-900 border border-amber-100">
                    <strong>{language === 'mr' ? 'खबरदारी: ' : 'Caution: '}</strong>
                    {asana.caution[language]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. SLEEP TAB */}
        {activeTab === 'sleep' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm animate-fadeIn">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-50 text-purple-900 text-xs font-semibold mb-3">
                <Moon className="w-4 h-4 text-purple-700" />
                <span>{language === 'mr' ? 'शांत व गाढ झोपेचे शास्त्र' : 'Circadian Sleep Hygiene'}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                {language === 'mr' ? '७-८ तास गाढ झोप मिळवण्यासाठी ६ सुवर्ण नियम' : '6 Non-Negotiables for Restorative Night Sleep'}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                {language === 'mr'
                  ? 'झोप ही केवळ डोळे मिटून पडून राहणे नव्हे, तर दिवसभरात मेंदूमध्ये साठलेले विषारी घटक साफ करण्याची निसर्गाची यंत्रणा आहे.'
                  : 'Sleep activates the glymphatic system which washes neurotoxic beta-amyloid proteins from your brain. Here is the clinical protocol for deeper delta-wave sleep.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    rule: language === 'mr' ? '१. सकाळचा सूर्यप्रकाश' : '1. Morning Sunlight Anchor',
                    desc: language === 'mr' ? 'उठल्यावर १० मिनिटे कोवळ्या उन्हात बसा; यामुळे रात्री मेलाटोनिन वेळेवर तयार होते.' : '10-15 mins of outdoor morning light sets the retinal circadian timer for night rest.',
                  },
                  {
                    rule: language === 'mr' ? '२. डिजिटल सूर्यास्त' : '2. 60-Minute Digital Sunset',
                    desc: language === 'mr' ? 'झोपण्याच्या १ तास आधी मोबाईल, टीव्ही स्क्रीन बंद करा; निळा प्रकाश झोप रोखतो.' : 'Switch off screens 1 hour prior; blue photons aggressively suppress melatonin.',
                  },
                  {
                    rule: language === 'mr' ? '३. दुपारनंतर कॅफिन बंद' : '3. 2:00 PM Caffeine Curfew',
                    desc: language === 'mr' ? 'दुपारी २ नंतर चहा किंवा कॉफी पिणे टाळा, कारण कॅफिन शरीरात ६-८ तास टिकून राहते.' : 'Caffeine blocks adenosine sleep receptors for 6 to 8 hours post-consumption.',
                  },
                  {
                    rule: language === 'mr' ? '४. अंधारी व थंड खोली' : '4. Cold, Pitch-Dark Room',
                    desc: language === 'mr' ? 'झोपण्याची खोली पूर्णपणे अंधारी आणि हवेशीर ठेवा.' : 'Core body temp needs to drop by ~1°C for stage 3 slow-wave sleep initiation.',
                  },
                  {
                    rule: language === 'mr' ? '५. हलके व वेळेवर जेवण' : '5. Dinner 3 Hours Before Bed',
                    desc: language === 'mr' ? 'रात्रीचे जेवण झोपण्याच्या ३ तास आधी हलके घ्या; ॲसिडिटी टाळा.' : 'Late heavy dinners redirect metabolic bloodflow away from cellular muscle repair.',
                  },
                  {
                    rule: language === 'mr' ? '६. ठरावीक उठण्याची वेळ' : '6. Consistent Wake Time',
                    desc: language === 'mr' ? 'शनिवार-रविवारही एकाच वेळेवर उठण्याची सवय ठेवा.' : 'Social jetlag from irregular weekend sleeping degrades immune white-blood cells.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{item.rule}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. MENTAL WELLNESS & INTERACTIVE BREATHING */}
        {activeTab === 'mental' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm animate-fadeIn">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-50 text-teal-900 text-xs font-semibold mb-3">
                <Heart className="w-4 h-4 text-teal-700" />
                <span>{language === 'mr' ? 'संवादात्मक तणावमुक्ती' : 'Interactive Parasympathetic Reset'}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {language === 'mr' ? '४-७-८ शांत श्वसन व्यायाम' : 'The 4-7-8 Deep Relaxation Exercise'}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                {language === 'mr'
                  ? 'जेव्हा तुम्हाला चिंता, भीती किंवा कामाचा प्रचंड ताण जाणवेल, तेव्हा हे श्वसन सुरू करा. यामुळे हृदयाचे ठोके लगेच सामान्य होतात.'
                  : 'Derived from ancient pranayama, the 4-7-8 breathing sequence naturally stimulates the vagus nerve, rapidly lowering elevated blood pressure and anxious adrenaline.'}
              </p>

              {/* Interactive Breathing Visual Circle */}
              <div className="flex flex-col items-center justify-center my-6">
                <div 
                  className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 ${
                    breathingPhase === 'Inhale'
                      ? 'border-emerald-500 bg-emerald-50 scale-110 shadow-lg shadow-emerald-200'
                      : breathingPhase === 'Hold'
                      ? 'border-amber-500 bg-amber-50 scale-110 shadow-lg shadow-amber-200'
                      : 'border-teal-500 bg-teal-50 scale-95 shadow-md'
                  }`}
                >
                  <span className="text-xs uppercase tracking-widest font-semibold text-slate-500 mb-1">
                    {breathingActive ? (
                      breathingPhase === 'Inhale' ? (language === 'mr' ? 'श्वास घ्या' : 'Inhale') :
                      breathingPhase === 'Hold' ? (language === 'mr' ? 'श्वास रोखून धरा' : 'Hold Breath') :
                      (language === 'mr' ? 'हळूहळू सोडा' : 'Exhale Slowly')
                    ) : (
                      language === 'mr' ? 'सुरू करा' : 'Ready'
                    )}
                  </span>
                  <span className="text-5xl font-mono font-extrabold text-slate-800 tabular-nums">
                    {breathingActive ? countdown : 4}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1">
                    {breathingActive ? `${breathingPhase}` : (language === 'mr' ? 'सेकंद' : 'Seconds')}
                  </span>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={() => {
                      setBreathingActive(!breathingActive);
                      if (!breathingActive) {
                        setBreathingPhase('Inhale');
                        setCountdown(4);
                      }
                    }}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-xs ${
                      breathingActive
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                  >
                    {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{breathingActive ? (language === 'mr' ? 'थांबवा' : 'Pause') : (language === 'mr' ? 'सराव सुरू करा' : 'Start Session')}</span>
                  </button>

                  <button
                    onClick={() => {
                      setBreathingActive(false);
                      setBreathingPhase('Inhale');
                      setCountdown(4);
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700"
                    title="Reset"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. FIRST AID PROTOCOLS TAB */}
        {activeTab === 'firstAid' && (
          <div className="space-y-6 animate-fadeIn">
            {/* National Hotline Emergency Strip */}
            <div className="p-4 rounded-xl bg-rose-600 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-6 h-6 text-white shrink-0" />
                <div>
                  <h3 className="font-bold text-sm sm:text-base">
                    {language === 'mr' ? 'अतितातडीच्या वेळी त्वरित १०८ किंवा ११२ वर कॉल करा' : 'Critical Emergency: Dial 108 (Ambulance) or 112 Immediately'}
                  </h3>
                  <p className="text-xs text-rose-100">
                    {language === 'mr' ? 'प्रथमोपचार हा रुग्णवाहिका येईपर्यंतचा तात्पुरता उपाय आहे.' : 'First aid is life-support care until professional paramedical services arrive.'}
                  </p>
                </div>
              </div>
              <a
                href="tel:108"
                className="px-5 py-2 rounded-lg bg-white text-rose-700 hover:bg-rose-50 font-extrabold text-sm whitespace-nowrap shadow-xs"
              >
                108 {language === 'mr' ? 'कॉल करा' : 'Call Now'}
              </a>
            </div>

            {/* Protocol Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FIRST_AID_PROTOCOLS.map((protocol) => (
                <div key={protocol.id} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1">
                        <Crosshair className="w-3.5 h-3.5" />
                        <span>{protocol.urgency.toUpperCase()} PROTOCOL</span>
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        Ambulance: {protocol.emergencyCall}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      {protocol.title[language]}
                    </h3>

                    {/* Symptoms */}
                    <div className="mb-4">
                      <div className="text-xs font-bold text-slate-700 mb-1">
                        {language === 'mr' ? 'लक्षणे ओळखा:' : 'Recognize Symptoms:'}
                      </div>
                      <div className="flex flex-wrap gap-1.5 text-xs text-slate-600">
                        {protocol.symptoms[language].map((s, idx) => (
                          <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Immediate Action Steps */}
                    <div className="mb-4">
                      <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                        {language === 'mr' ? 'तातडीने करावयाची कृती:' : 'Immediate Action Steps:'}
                      </div>
                      <ol className="space-y-2 text-xs text-slate-700 pl-4 list-decimal">
                        {protocol.immediateSteps[language].map((step, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* What NOT to do */}
                    <div className="p-3.5 rounded-lg bg-red-50 border border-red-100 text-xs text-red-900">
                      <div className="font-bold text-red-950 mb-1">
                        {language === 'mr' ? 'हे चुकूनही करू नका (DO NOT):' : 'What NOT to Do:'}
                      </div>
                      <ul className="space-y-1 pl-4 list-disc">
                        {protocol.dontDo[language].map((dont, idx) => (
                          <li key={idx}>{dont}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
