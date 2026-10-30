import { Article, Category, DailyHealthTip, FirstAidItem, YogaAsana } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'general-health',
    slug: 'general-health',
    name: {
      en: 'General Health',
      mr: 'सामान्य आरोग्य',
    },
    description: {
      en: 'Everyday vitality, vital signs, immunity, hydration, and preventive health checks.',
      mr: 'दैनंदिन ऊर्जा, प्रतिकारशक्ती, पाण्याचे प्रमाण आणि नियमित आरोग्य तपासणी.',
    },
    iconName: 'Activity',
    color: 'emerald',
    articleCount: 12,
  },
  {
    id: 'mental-health',
    slug: 'mental-health',
    name: {
      en: 'Mental Health',
      mr: 'मानसिक आरोग्य',
    },
    description: {
      en: 'Emotional well-being, anxiety management, burnout prevention, and mindfulness.',
      mr: 'भावनिक स्वास्थ्य, चिंता व्यवस्थापन, मानसिक थकवा दूर करणे आणि सजगता.',
    },
    iconName: 'Brain',
    color: 'teal',
    articleCount: 9,
  },
  {
    id: 'nutrition-diet',
    slug: 'nutrition-diet',
    name: {
      en: 'Nutrition & Diet',
      mr: 'पोषण आणि आहार',
    },
    description: {
      en: 'Balanced Indian thali, local millets, proteins, hydration, and mindful eating.',
      mr: 'संतुलित भारतीय थाळी, पौष्टिक तृणधान्ये, प्रथिने आणि सकस आहाराचे नियम.',
    },
    iconName: 'Salad',
    color: 'green',
    articleCount: 15,
  },
  {
    id: 'yoga-meditation',
    slug: 'yoga-meditation',
    name: {
      en: 'Yoga & Meditation',
      mr: 'योग आणि ध्यान',
    },
    description: {
      en: 'Pranayama breathing techniques, daily asanas, posture alignment, and dhyana.',
      mr: 'प्राणायाम श्वसन पद्धती, दैनंदिन योगासने, शरीराची योग्य स्थिती आणि ध्यान.',
    },
    iconName: 'Flower2',
    color: 'emerald',
    articleCount: 11,
  },
  {
    id: 'fitness-exercise',
    slug: 'fitness-exercise',
    name: {
      en: 'Fitness & Exercise',
      mr: 'व्यायाम आणि तंदुरुस्ती',
    },
    description: {
      en: 'Cardio, strength building, brisk walking routines, and joint mobility.',
      mr: 'कार्डिओ, स्नायूंची ताकद, जलद चालणे आणि सांध्यांची लवचिकता टिकवणे.',
    },
    iconName: 'Dumbbell',
    color: 'teal',
    articleCount: 10,
  },
  {
    id: 'womens-health',
    slug: 'womens-health',
    name: {
      en: "Women's Health",
      mr: 'महिलांचे आरोग्य',
    },
    description: {
      en: 'Hormonal balance, maternal care, bone density, anemia prevention, and PCOS.',
      mr: 'हार्मोनल संतुलन, मातृत्व काळजी, हाडांची बळकटी, ॲनिमिया प्रतिबंध आणि पीसीओएस.',
    },
    iconName: 'HeartHandshake',
    color: 'rose',
    articleCount: 14,
  },
  {
    id: 'mens-health',
    slug: 'mens-health',
    name: {
      en: "Men's Health",
      mr: 'पुरुषांचे आरोग्य',
    },
    description: {
      en: 'Cardiovascular fitness, prostate awareness, stress management, and metabolic health.',
      mr: 'हृदयाचे आरोग्य, प्रोस्टेट जनजागृती, कामाचा ताण आणि चयापचय सुदृढता.',
    },
    iconName: 'Shield',
    color: 'blue',
    articleCount: 8,
  },
  {
    id: 'child-health',
    slug: 'child-health',
    name: {
      en: 'Child Health',
      mr: 'बाल आरोग्य',
    },
    description: {
      en: 'Immunization schedules, pediatric nutrition, screen-time balance, and growth tracking.',
      mr: 'लसीकरण वेळापत्रक, मुलांचे पोषण, स्क्रीन वेळ नियंत्रण आणि वाढीचे टप्पे.',
    },
    iconName: 'Smile',
    color: 'amber',
    articleCount: 10,
  },
  {
    id: 'senior-health',
    slug: 'senior-health',
    name: {
      en: 'Senior Citizen Health',
      mr: 'ज्येष्ठ नागरिकांचे आरोग्य',
    },
    description: {
      en: 'Active aging, fall prevention, blood pressure control, memory care, and social vitality.',
      mr: 'सक्रिय वार्धक्य, पडणे टाळणे, रक्तदाब नियंत्रण, स्मरणशक्ती आणि सांधेदुखी उपाय.',
    },
    iconName: 'Users',
    color: 'indigo',
    articleCount: 12,
  },
  {
    id: 'sleep-stress',
    slug: 'sleep-stress',
    name: {
      en: 'Sleep & Stress Management',
      mr: 'झोप आणि तणाव व्यवस्थापन',
    },
    description: {
      en: 'Circadian rhythms, deep restorative sleep habits, insomnia solutions, and relaxation.',
      mr: 'शांत झोपेची दिनचर्या, निद्रानाश दूर करणे आणि मानसिक ताण हलका करण्याचे मार्ग.',
    },
    iconName: 'Moon',
    color: 'purple',
    articleCount: 9,
  },
  {
    id: 'heart-health',
    slug: 'heart-health',
    name: {
      en: 'Heart Health',
      mr: 'हृदय आरोग्य',
    },
    description: {
      en: 'Lipid control, cholesterol awareness, hypertension, early warning signs, and cardio care.',
      mr: 'कोलेस्टेरॉल नियंत्रण, उच्च रक्तदाब प्रतिबंध, हृदयाची काळजी आणि चेतावणीची लक्षणे.',
    },
    iconName: 'Heart',
    color: 'red',
    articleCount: 16,
  },
  {
    id: 'diabetes-awareness',
    slug: 'diabetes-awareness',
    name: {
      en: 'Diabetes Awareness',
      mr: 'मधुमेह जनजागृती',
    },
    description: {
      en: 'HbA1c targets, blood sugar monitoring, glycemic index, foot care, and insulin safety.',
      mr: 'HbA1c चे महत्त्व, रक्तातील साखरेची चाचणी, ग्लायसेमिक इंडेक्स आणि पायांची काळजी.',
    },
    iconName: 'FileHeart',
    color: 'orange',
    articleCount: 13,
  },
  {
    id: 'first-aid',
    slug: 'first-aid',
    name: {
      en: 'First Aid',
      mr: 'प्रथमोपचार',
    },
    description: {
      en: 'Emergency resuscitation (CPR), burn treatment, bleeding control, heatstroke, and 108 protocol.',
      mr: 'सीपीआर कृती, भाजणे व जखमांवर उपाय, उष्माघात प्रथमोपचार आणि १०८ आपत्कालीन नियम.',
    },
    iconName: 'Crosshair',
    color: 'red',
    articleCount: 8,
  },
  {
    id: 'healthy-lifestyle',
    slug: 'healthy-lifestyle',
    name: {
      en: 'Healthy Lifestyle',
      mr: 'निरोगी जीवनशैली',
    },
    description: {
      en: 'Daily circadian habits, environmental wellness, tobacco cessation, and preventative care.',
      mr: 'सूर्योदय ते सूर्यास्त दिनचर्या, व्यसनमुक्ती, शुद्ध हवा-पाणी आणि निरोगी सवयी.',
    },
    iconName: 'Sparkles',
    color: 'emerald',
    articleCount: 11,
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'heart-health-hypertension-guide',
    slug: 'heart-health-hypertension-guide',
    categoryId: 'heart-health',
    title: {
      en: 'Managing Blood Pressure Naturally: The Indian Lifestyle Guide',
      mr: 'उच्च रक्तदाब नैसर्गिकरीत्या नियंत्रित ठेवण्यासाठी भारतीय जीवनशैली मार्गदर्शक',
    },
    excerpt: {
      en: 'Learn how simple dietary adjustments, low sodium intake, brisk walking, and stress management can keep your cardiovascular system strong.',
      mr: 'आहारातील बदल, मिठाचे योग्य प्रमाण, दररोज जलद चालणे आणि तणावमुक्तीद्वारे आपले हृदय निरोगी ठेवण्याचे सोपे शास्त्रीय उपाय जाणून घ्या.',
    },
    image: '/src/assets/images/heart_active_lifestyle_1793352073138.jpg',
    readTimeMinutes: 6,
    publishDate: '2026-03-15',
    lastReviewedDate: '2026-09-20',
    reviewer: {
      name: {
        en: 'Dr. Rajesh Patil, MD (Cardiology), MBBS',
        mr: 'डॉ. राजेश पाटील, एमडी (हृदयरोगतज्ज्ञ), एमबीबीएस',
      },
      role: {
        en: 'Senior Consultant Cardiologist & MOTI Medical Advisory Board Member',
        mr: 'ज्येष्ठ हृदयरोगतज्ज्ञ आणि MOTI वैद्यकीय सल्लागार मंडळ सदस्य',
      },
    },
    overview: {
      en: 'High blood pressure (hypertension) is often called the "silent killer" because it rarely displays noticeable early symptoms. In India, more than one in four adults have elevated blood pressure, often exacerbated by high dietary salt, sedentary lifestyles, and chronic emotional stress. Understanding your numbers (normal is below 120/80 mmHg) is the first line of defense.',
      mr: 'उच्च रक्तदाबाला "शांत मारेकरी" म्हटले जाते कारण सुरुवातीला याची कोणतीही स्पष्ट लक्षणे दिसत नाहीत. भारतात चार प्रौढांमागे एकाला उच्च रक्तदाबाचा त्रास असतो. जेवणातील अतिरिक्त मीठ, बैठी जीवनशैली आणि सततचा मानसिक ताण ही याची प्रमुख कारणे आहेत. आपला रक्तदाब नियमित तपासणे (सामान्य प्रमाण १२०/८० mmHg च्या आत) ही सुरक्षिततेची पहिली पायरी आहे.',
    },
    sections: [
      {
        title: {
          en: 'Understanding Blood Pressure Numbers',
          mr: 'रक्तदाबाचे आकडे समजून घ्या',
        },
        content: {
          en: 'Blood pressure is recorded as two numbers: Systolic (the pressure when your heart beats) over Diastolic (the pressure when your heart rests between beats). A reading under 120/80 mmHg is ideal. Readings consistently above 140/90 mmHg require clinical evaluation.',
          mr: 'रक्तदाब दोन आकड्यांमध्ये मोजला जातो: सिस्टोलिक (हृदय आकुंचन पावत असतानाचा दाब) आणि डायस्टोलिक (हृदय विश्रांती घेत असतानाचा दाब). १२०/८० च्या आत असणे आदर्श मानले जाते. जर हा आकडा सातत्याने १४०/९० च्या वर राहिला तर डॉक्टरांचा सल्ला घेणे अनिवार्य आहे.',
        },
      },
      {
        title: {
          en: 'Key Dietary Changes for Healthy Arteries',
          mr: 'निरोगी रक्तवाहिन्यांसाठी आवश्यक आहार बदल',
        },
        content: {
          en: 'A low-sodium diet rich in potassium, magnesium, and dietary fiber has been proven by clinical studies to lower systolic blood pressure significantly within weeks.',
          mr: 'पोटॅशियम, मॅग्नेशियम आणि फायबरयुक्त आहार उच्च रक्तदाब नियंत्रित ठेवण्यास अतिशय प्रभावी ठरतो.',
        },
        bulletPoints: {
          en: [
            'Limit total salt intake to under 1 teaspoon (5 grams) per day, avoiding processed snacks like papad, pickle, and salty namkeen.',
            'Increase potassium-rich fresh fruits and vegetables: banana, tender coconut water, spinach, and drumstick leaves.',
            'Include whole grains like Jowar (sorghum) and Bajra (pearl millet) instead of refined maida.',
            'Stay well-hydrated by drinking at least 2.5 to 3 liters of water throughout the day.',
          ],
          mr: [
            'दररोज मिठाचे प्रमाण १ लहान चमच्यापेक्षा (५ ग्रॅम) कमी ठेवा. पापड, लोणची आणि खारे फरसाण टाळा.',
            'पोटॅशियमयुक्त फळे व भाज्यांचा आहारात समावेश करा: केळी, शहाळ्याचे पाणी, पालक आणि शेवग्याची पाने.',
            'मैद्याऐवजी ज्वारी, बाजरी, नाचणी यांसारख्या पारंपरिक धान्यांचा वापर वाढवा.',
            'दिवसभरात २.५ ते ३ लिटर पाणी पिऊन शरीर हायड्रेटेड ठेवा.',
          ],
        },
      },
      {
        title: {
          en: 'Exercise & Breathing Practices',
          mr: 'व्यायाम आणि श्वसन व्यायाम',
        },
        content: {
          en: 'Engaging in 30 minutes of moderate aerobic exercise such as brisk walking 5 days a week relaxes blood vessel walls. Slow, deep abdominal breathing and Anulom Vilom pranayama help activate the parasympathetic nervous system, dampening hypertensive adrenaline spikes.',
          mr: 'आठवड्यातून किमान ५ दिवस रोज ३० मिनिटे जलद चालण्याने रक्तवाहिन्या लवचिक राहतात. संथ व खोल श्वासोच्छ्वास तसेच अनुलोम-विलोम प्राणायामामुळे मज्जासंस्था शांत होते आणि ताणामुळे वाढणारा रक्तदाब पूर्ववत होण्यास मदत होते.',
        },
      },
    ],
    whenToSeeDoctor: {
      en: [
        'Blood pressure reading persistently above 140/90 mmHg across multiple readings.',
        'Frequent morning headaches located at the back of the head or throbbing temples.',
        'Unexplained dizziness, lightheadedness, or sudden blurred vision.',
        'Palpitations or rapid irregular heart rhythm during rest.',
        'Never discontinue or alter prescribed blood pressure medication without your doctor’s direct instructions.',
      ],
      mr: [
        'रक्तदाब सातत्याने १४०/९० mmHg पेक्षा जास्त आढळल्यास.',
        'सकाळी उठल्यावर डोक्याच्या मागच्या भागात तीव्र डोकेदुखी किंवा चकरा येणे.',
        'अचानक दृष्टी अंधुक होणे किंवा सतत थकवा जाणवणे.',
        'विश्रांतीच्या वेळीही हृदयाचे ठोके अनियंत्रित वेगाने वाढणे.',
        'डॉक्टरांनी सुरू केलेली रक्तदाबाची औषधे डॉक्टरांच्या सल्ल्याशिवाय स्वतःहून कधीही बंद करू नका.',
      ],
    },
    preventionTips: {
      en: [
        'Schedule a routine blood pressure check-up at least once every 6 months for adults over 30.',
        'Maintain a waist circumference under 90 cm for men and under 80 cm for women to prevent visceral fat buildup.',
        'Strictly avoid tobacco, bidi, gutkha, and limit alcohol consumption.',
        'Practice 15 minutes of quiet mindfulness or shavasana before bedtime.',
      ],
      mr: [
        'वयाच्या ३० वर्षांनंतर दर ६ महिन्यांनी किमान एकदा रक्तदाबाची नियमित तपासणी करून घ्या.',
        'पोटाचा घेर पुरुषांसाठी ९० सेमी आणि स्त्रियांसाठी ८० सेमीच्या आत ठेवण्याचा प्रयत्न करा.',
        'तंबाखू, गुटखा, बिडी आणि मद्यपान यांपासून पूर्णपणे दूर राहा.',
        'झोपण्यापूर्वी १५ मिनिटे शांत बसून ध्यान किंवा शवासन करा.',
      ],
    },
    emergencyWarningSigns: {
      en: [
        'Sudden, severe crushing chest pain radiating to the left arm, jaw, or upper back.',
        'Severe shortness of breath accompanied by cold sweating.',
        'Sudden facial drooping, arm weakness, or slurred speech (Signs of Stroke).',
        'Blood pressure higher than 180/120 mmHg (Hypertensive Crisis) — Seek Emergency Room Care immediately.',
      ],
      mr: [
        'छातीत तीव्र दाब, जडपणा किंवा डाव्या हाताकडे, जबड्याकडे जाणारी कळ.',
        'श्वास घेण्यास तीव्र अडचण आणि अचानक थंड घाम सुटणे.',
        'तोंड एका बाजूला वाकडे होणे, हात लुळा पडणे किंवा बोलण्यात अडखळणे (पक्षाघाताची लक्षणे).',
        'रक्तदाब १८०/१२० पेक्षा जास्त असणे (अतितातडीची स्थिती) — त्वरित आपत्कालीन वैद्यकीय मदत घ्या.',
      ],
    },
    references: [
      {
        title: 'WHO Guidelines for the pharmacological and lifestyle treatment of hypertension in adults',
        source: 'World Health Organization (WHO)',
        year: '2023',
      },
      {
        title: 'Management of Hypertension in India: Consensus and Clinical Guidance',
        source: 'Indian Council of Medical Research (ICMR)',
        year: '2022',
      },
      {
        title: 'High blood pressure (hypertension) overview & lifestyle prevention',
        source: 'NHS UK Health Guidance',
        year: '2024',
      },
    ],
    isFeatured: true,
  },
  {
    id: 'balanced-indian-nutrition-guide',
    slug: 'balanced-indian-nutrition-guide',
    categoryId: 'nutrition-diet',
    title: {
      en: 'The Balanced Indian Thali: Essential Nutrition for Lifelong Vitality',
      mr: 'संतुलित भारतीय थाळी: निरोगी आणि दीर्घायुष्यासाठी आवश्यक पोषण',
    },
    excerpt: {
      en: 'Discover how traditional Indian staples, diverse pulses, seasonal vegetables, and probiotic curd combine into a complete nutritional powerhouse.',
      mr: 'आपल्या रोजच्या जेवणात डाळी, कडधान्ये, स्थानिक पालेभाज्या आणि ताजे दही यांचा समतोल साधून पोषक आहार कसा तयार करावा ते जाणून घ्या.',
    },
    image: '/src/assets/images/nutrition_healthy_thali_1793352073265.jpg',
    readTimeMinutes: 5,
    publishDate: '2026-03-20',
    lastReviewedDate: '2026-09-25',
    reviewer: {
      name: {
        en: 'Dr. Ananya Kulkarni, MBBS, M.Sc (Clinical Nutrition)',
        mr: 'डॉ. अनन्य कुलकर्णी, एमबीबीएस, एमएससी (क्लिनिकल न्यूट्रिशन)',
      },
      role: {
        en: 'Clinical Nutritionist & MOTI Health Educator',
        mr: 'क्लिनिकल आहारतज्ज्ञ आणि MOTI आरोग्य मार्गदर्शक',
      },
    },
    overview: {
      en: 'Traditional Indian cuisine has always celebrated harmony of flavors and seasonal ingredients. However, modern urban habits often tip our plates toward excessive refined carbohydrates (white rice, refined wheat) while lacking sufficient protein and micronutrients. By applying the "Plate Method," we can achieve complete nourishment without abandoning beloved regional foods.',
      mr: 'पारंपरिक भारतीय आहारामध्ये ऋतूनुसार विविध धान्यांचा आणि भाज्यांचा समावेश असतो. मात्र अलीकडच्या काळात आहारात पांढरा भात, मैदा आणि साखरेचे प्रमाण वाढून प्रथिनांची (प्रोटीन) कमतरता भासू लागली आहे. "थाळी पद्धती"चा वापर करून आपण आपल्या पारंपरिक अन्नातूनच संपूर्ण पोषण कसे मिळवू शकतो हे समजून घेणे आवश्यक आहे.',
    },
    sections: [
      {
        title: {
          en: 'The 50-25-25 Indian Plate Rule',
          mr: '५०-२५-२५ थाळीचा सुवर्णनियम',
        },
        content: {
          en: 'Divide your lunch and dinner plate into three clear proportions for optimal blood sugar balance, sustained energy, and digestive health.',
          mr: 'रक्तातील साखर नियंत्रित ठेवण्यासाठी आणि पचनक्रिया उत्तम राहण्यासाठी जेवणाच्या ताटाची तीन भागांत विभागणी करा.',
        },
        bulletPoints: {
          en: [
            '50% (Half the Plate): Fresh cooked greens and raw crunchy vegetables like cucumber, carrot, radish, spinach, fenugreek (methi), and bottle gourd.',
            '25% (One Quarter): High-quality protein source — cooked lentils (toor, moong, masoor), sprouted beans (matki, chana), paneer, tofu, or boiled eggs.',
            '25% (One Quarter): Complex slow-digesting carbohydrates — whole Jowar bhakri, Bajra roti, red rice, or brown rice.',
            'Side Addition: 1 small cup of fresh probiotic curd (dahi) or spiced buttermilk (taak) to foster gut microbiome health.',
          ],
          mr: [
            '५०% (अर्धे ताट): ताज्या भाज्या आणि सॅलड — पालक, मेथी, शेवगा, काकडी, गाजर, मुळा आणि दुधी भोपळा.',
            '२५% (एक चतुर्थांश): दर्जेदार प्रथिने (प्रोटीन) — मूग डाळ, तूर डाळ, मटकी किंवा चण्याची उसळ, पनीर किंवा उकडलेले अंडे.',
            '२५% (एक चतुर्थांश): संथ पचणारे कर्बोदके — ज्वारीची किंवा बाजरीची भाकरी, नाचणीची भाकरी किंवा हातसडीचा भात.',
            'सोबत: एक वाटी ताजे घरचे दही किंवा जिरे घातलेले ताक, ज्यामुळे पोटाचे आरोग्य उत्तम राहते.',
          ],
        },
      },
      {
        title: {
          en: 'The Role of Local Superfoods',
          mr: 'आपल्या परिसरातील सुपरफूड्सचे महत्त्व',
        },
        content: {
          en: 'You do not need expensive imported superfoods. Native Indian seeds, fruits, and millets offer exceptional nutritional density at affordable costs.',
          mr: 'महागड्या परदेशी पदार्थांपेक्षा आपल्या मातीतील स्थानिक धान्ये, बिया आणि फळे शरीरासाठी कितीतरी पटीने अधिक लाभदायक असतात.',
        },
        bulletPoints: {
          en: [
            'Amla (Indian Gooseberry): Exceptionally concentrated in natural Vitamin C, supporting immune cell function and iron absorption.',
            'Flaxseeds (Jawas) & Sesame (Til): Rich in plant-based Omega-3 fatty acids, calcium, and lignans for heart and joint health.',
            'Moringa (Drumstick Leaves): Packed with plant iron, calcium, and bioflavonoids.',
            'Turmeric (Haldi) with black pepper: Enhances curcumin bioavailability, curbing chronic systemic inflammation.',
          ],
          mr: [
            'आवळा: नैसर्गिक व्हिटॅमिन ' + 'C' + ' चा समृद्ध स्रोत, जो प्रतिकारशक्ती वाढवतो आणि शरीरातील लोह शोषून घेण्यास मदत करतो.',
            'जवस आणि तीळ: हाडांच्या मजबुतीसाठी आणि हृदयासाठी आवश्यक असणारे ओमेगा-३ आणि कॅल्शियम देणारे उत्तम अन्न.',
            'शेवग्याची पाने: लोह, कॅल्शियम आणि अँटीऑक्सिडंट्सचा उत्तम खजिना.',
            'हळद आणि काळी मिरी: शरीरातील सूज कमी करण्यासाठी आणि पेशींच्या संरक्षणासाठी अत्यंत गुणकारी.',
          ],
        },
      },
    ],
    whenToSeeDoctor: {
      en: [
        'Persistent fatigue, pale skin, or shortness of breath (possible signs of iron-deficiency anemia).',
        'Unexplained rapid weight loss or sudden weight gain without change in appetite.',
        'Chronic digestive distress, prolonged constipation, severe bloating, or acid reflux lasting more than two weeks.',
        'Diabetic or hypertensive individuals should always work with a qualified dietitian before adopting restrictive diets.',
      ],
      mr: [
        'सतत थकवा, त्वचा फिकट पडणे किंवा धाप लागणे (ॲनिमिया किंवा रक्ताची कमतरता असण्याची शक्यता).',
        'कोणत्याही कारणाशिवाय अचानक वजन खूप कमी होणे किंवा वाढणे.',
        'सतत बद्धकोष्ठता, अपचन किंवा पोट फुगण्याचा त्रास दोन आठवड्यांपेक्षा जास्त काळ राहिल्यास.',
        'मधुमेह किंवा इतर आजार असलेल्या व्यक्तींनी कोणताही कडक डाएट सुरू करण्यापूर्वी आहारतज्ज्ञांचा सल्ला घ्यावा.',
      ],
    },
    preventionTips: {
      en: [
        'Cut out ultra-processed packaged snacks and aerated sugary beverages.',
        'Cook in moderate amounts of cold-pressed mustard, groundnut, or sesame oil instead of repeatedly reheated refined oils.',
        'Chew each bite slowly without digital screens to allow leptin satiety hormones to signal fullness.',
      ],
      mr: [
        'पॅकेज्ड स्नॅक्स, चिप्स आणि कृत्रिम साखरेचे शीतपेये पिणे पूर्णपणे बंद करा.',
        'तळण्यासाठी वारंवार वापरलेले तेल टाळा; शुद्ध शेंगदाणा किंवा तिळाचे तेल माफक प्रमाणात वापरा.',
        'जेवताना मोबाईल किंवा टीव्ही पाहणे टाळा आणि अन्न सावकाश चावून खा.',
      ],
    },
    references: [
      {
        title: 'Dietary Guidelines for Indians',
        source: 'National Institute of Nutrition (NIN) & ICMR',
        year: '2024',
      },
      {
        title: 'Healthy Diet Fact Sheet and Guidelines',
        source: 'World Health Organization (WHO)',
        year: '2023',
      },
    ],
    isFeatured: true,
  },
  {
    id: 'yoga-pranayama-daily-routine',
    slug: 'yoga-pranayama-daily-routine',
    categoryId: 'yoga-meditation',
    title: {
      en: 'Yoga & Pranayama: 20-Minute Morning Routine for Stress Relief',
      mr: 'योग आणि प्राणायाम: तणावमुक्तीसाठी २० मिनिटांची सकाळची दिनचर्या',
    },
    excerpt: {
      en: 'Gentle, joint-friendly postures and controlled breathwork designed to calm the nervous system, improve lung capacity, and sharpen mental clarity.',
      mr: 'मज्जासंस्था शांत करण्यासाठी, फुफ्फुसांची क्षमता वाढवण्यासाठी आणि मन प्रसन्न ठेवण्यासाठी साधी, प्रभावी योगासने आणि प्राणायाम.',
    },
    image: '/src/assets/images/yoga_meditation_morning_1793352073426.jpg',
    readTimeMinutes: 5,
    publishDate: '2026-03-22',
    lastReviewedDate: '2026-10-01',
    reviewer: {
      name: {
        en: 'Dr. Meera Deshpande, BAMS, MD (Ayurveda), Yoga Specialist',
        mr: 'डॉ. मीरा देशपांडे, बीएएमएस, एमडी (आयुर्वेद), योग तज्ज्ञ',
      },
      role: {
        en: 'Integrative Wellness Advisor at MOTI',
        mr: 'एकात्मिक आरोग्य सल्लागार, MOTI',
      },
    },
    overview: {
      en: 'Yoga is not about acrobatic flexibility; it is the deliberate union of breath, body, and awareness. Research shows that just 15 to 20 minutes of daily conscious movement and pranayama reduces circulating cortisol levels, regulates blood sugar, and enhances heart rate variability.',
      mr: 'योगाभ्यास म्हणजे कठीण आसने करणे नव्हे, तर शरीर, श्वास आणि मन यांचा सुंदर समन्वय साधणे होय. संशोधनानुसार, रोज केवळ १५ ते २० मिनिटे केलेला शांत योगाभ्यास तणावाचे हार्मोन्स (कॉर्टिसोल) कमी करतो, रक्तातील साखर नियंत्रित ठेवण्यास मदत करतो आणि मनाला शांती देतो.',
    },
    sections: [
      {
        title: {
          en: 'Morning Pranayama Routine (10 Minutes)',
          mr: 'सकाळचा प्राणायाम (१० मिनिटे)',
        },
        content: {
          en: 'Perform these seated upright on a comfortable mat with a relaxed spine in a well-ventilated space.',
          mr: 'हवेशीर जागेत चटईवर पाठीचा कणा ताठ ठेवून आरामात बसा आणि पुढील प्राणायाम करा.',
        },
        bulletPoints: {
          en: [
            'Deep Diaphragmatic Breathing (3 mins): Inhale deeply through the nose expanding the belly; exhale slowly twice as long as the inhalation.',
            'Anulom Vilom / Nadi Shodhana (4 mins): Alternate nostril breathing that balances the sympathetic and parasympathetic nervous systems.',
            'Bhramari (Humming Bee Breath, 3 mins): Inhale gently, close the ears with thumbs, and exhale producing a soothing low-frequency humming sound.',
          ],
          mr: [
            'दीर्घ श्वसन (३ मिनिटे): नाकाने दीर्घ श्वास घेताना पोट फुगवा आणि श्वास सोडताना हळूहळू पोट आत घ्या.',
            'अनुलोम-विलोम प्राणायाम (४ मिनिटे): एका नाकपुडीने श्वास घेणे आणि दुसऱ्या नाकपुडीने सोडणे; यामुळे मज्जासंस्थेचा समतोल राखला जातो.',
            'भ्रामरी प्राणायाम (३ मिनिटे): कान बंद करून नाकाने ओंकाराचा गुंजारव करत संथ श्वास सोडा; यामुळे डोकेदुखी आणि मानसिक तणाव दूर होतो.',
          ],
        },
      },
      {
        title: {
          en: 'Essential Asanas for Spinal Health',
          mr: 'पाठीच्या आरोग्यासाठी आवश्यक आसने',
        },
        content: {
          en: 'Sedentary desk work compresses the spine. Gentle movement releases lumbar tension and restores circulation.',
          mr: 'सतत बसून काम केल्याने पाठीवर आणि मानेवर येणारा ताण कमी करण्यासाठी ही आसने अतिशय उपयुक्त ठरतात.',
        },
        bulletPoints: {
          en: [
            'Marjariasana-Bitilasana (Cat-Cow Stretch): Gently mobilizes cervical and thoracic vertebrae.',
            'Vrikshasana (Tree Pose): Enhances neuromuscular balance and lower limb stability.',
            'Bhujangasana (Gentle Cobra Pose): Strengthens back extensor muscles without straining the lower spine.',
            'Shavasana (Corpse Pose, 3 mins): Complete conscious muscular release to integrate practice benefits.',
          ],
          mr: [
            'मार्जरी आसन (Cat-Cow Pose): पाठीचा कणा लवचिक बनवण्यासाठी आणि मानेचा ताण कमी करण्यासाठी.',
            'वृक्षासन: शारीरिक समतोल साधण्यासाठी आणि पायांचे स्नायू बळकट करण्यासाठी.',
            'भुजंगासन (सौम्य कोब्रा पोज): पाठीचे स्नायू बळकट करण्यासाठी आणि छातीचे स्नायू मोकळे करण्यासाठी.',
            'शवासन (३ मिनिटे): सर्व स्नायूंना संपूर्ण विश्रांती देऊन शरीराला ताजेतवाने करण्यासाठी.',
          ],
        },
      },
    ],
    whenToSeeDoctor: {
      en: [
        'Do not perform rapid breathwork (like Kapalabhati) if you have unmanaged high blood pressure, heart disease, or are pregnant.',
        'Consult an orthopedic specialist if you experience sharp shooting pain or numbness in the legs during bending.',
      ],
      mr: [
        'जर आपल्याला अनियंत्रित उच्च रक्तदाब किंवा हृदयाचा त्रास असेल, किंवा गरोदरपणात कपालभाती सारखे जलद प्राणायाम डॉक्टरांच्या सल्ल्याशिवाय करू नका.',
        'खाली वाकताना कमरेत किंवा पायात तीव्र कळा येत असल्यास तज्ज्ञ डॉक्टरांचा सल्ला घ्या.',
      ],
    },
    preventionTips: {
      en: [
        'Always practice yoga on an empty stomach or at least 3 hours after a main meal.',
        'Never force your body into painful postures; stretch only to your comfortable edge.',
      ],
      mr: [
        'योगाभ्यास नेहमी रिकाम्या पोटी किंवा जेवणानंतर किमान ३ तासांनी करावा.',
        'शरीराला त्रास होईल अशी कोणतीही कृती करू नका; क्षमतेनुसार हळूहळू सराव वाढवा.',
      ],
    },
    references: [
      {
        title: 'Common Yoga Protocol for Health and Well-being',
        source: 'Ministry of Ayush, Government of India',
        year: '2023',
      },
      {
        title: 'Mind-Body Interventions in Cardiovascular Disease and Stress Reduction',
        source: 'AIIMS New Delhi Clinical Research',
        year: '2022',
      },
    ],
    isFeatured: true,
  },
  {
    id: 'diabetes-prevention-management',
    slug: 'diabetes-prevention-management',
    categoryId: 'diabetes-awareness',
    title: {
      en: 'Type 2 Diabetes Prevention: Understanding HbA1c and Blood Sugar',
      mr: 'टाइप २ मधुमेह प्रतिबंध: HbA1c आणि रक्तातील साखर समजून घ्या',
    },
    excerpt: {
      en: 'Everything you need to know about prediabetes, insulin sensitivity, glycemic control, and actionable daily steps to protect your vital organs.',
      mr: 'प्री-डायबिटीस, इन्सुलिनची कार्यक्षमता आणि रक्तातील साखर आटोक्यात ठेवून अवयवांचे रक्षण कसे करावे याची सविस्तर शास्त्रीय माहिती.',
    },
    image: '/src/assets/images/hero_wellness_lifestyle_1793352072364.jpg',
    readTimeMinutes: 7,
    publishDate: '2026-03-25',
    lastReviewedDate: '2026-10-12',
    reviewer: {
      name: {
        en: 'Dr. Sunil Shinde, MD (General Medicine), Diabetologist',
        mr: 'डॉ. सुनील शिंदे, एमडी (जनरल मेडिसिन), मधुमेह तज्ज्ञ',
      },
      role: {
        en: 'Consultant Diabetologist & Clinical Educator',
        mr: 'मधुमेह तज्ज्ञ आणि वैद्यकीय मार्गदर्शक',
      },
    },
    overview: {
      en: 'India is home to over 100 million individuals living with diabetes, with an estimated 136 million more in the prediabetic phase. Type 2 diabetes develops gradually when cells become resistant to insulin. The good news is that prediabetes is largely reversible through targeted nutritional adjustments and consistent physical movement.',
      mr: 'भारतात १० कोटींपेक्षा जास्त लोक मधुमेहाने ग्रस्त आहेत आणि १३ कोटींहून अधिक नागरिक प्री-डायबिटीस टप्प्यात आहेत. जेव्हा पेशी इन्सुलिनला योग्य प्रतिसाद देत नाहीत, तेव्हा टाइप २ मधुमेहाची सुरुवात होते. आनंदाची गोष्ट म्हणजे योग्य आहार आणि नियमित व्यायामाद्वारे प्री-डायबिटीस पूर्णपणे पूर्ववत करता येतो.',
    },
    sections: [
      {
        title: {
          en: 'Understanding Diagnostic Metrics',
          mr: 'तपासणीचे महत्त्वाचे निकष',
        },
        content: {
          en: 'Do not rely on feeling "fine". Testing is essential for early diagnosis before vascular damage occurs.',
          mr: 'काही त्रास होत नाही म्हणून दुर्लक्ष करू नका; रक्ताची चाचणी वेळेवर करणे अत्यंत गरजेचे आहे.',
        },
        bulletPoints: {
          en: [
            'Fasting Blood Glucose: Normal is under 100 mg/dL; 100–125 indicates prediabetes; 126 or above indicates diabetes.',
            'HbA1c (3-Month Average): Below 5.7% is normal; 5.7% to 6.4% is prediabetes; 6.5% and above confirms diabetes.',
            'Postprandial (2 Hours after meal): Normal is under 140 mg/dL; above 200 mg/dL signals diabetes.',
          ],
          mr: [
            'उपाशीपोटी रक्तातील साखर (Fasting): १०० mg/dL च्या आत सामान्य; १०० ते १२५ म्हणजे प्री-डायबिटीस; १२६ किंवा जास्त म्हणजे मधुमेह.',
            'HbA1c (३ महिन्यांची सरासरी): ५.७% च्या आत उत्तम; ५.७% ते ६.४% प्री-डायबिटीस; ६.५% किंवा जास्त म्हणजे मधुमेह.',
            'जेवणानंतर २ तासांनी (PP): १४० mg/dL च्या आत सामान्य; २०० च्या वर असणे मधुमेहाचे लक्षण.',
          ],
        },
      },
      {
        title: {
          en: 'Daily Action Plan for Reversal',
          mr: 'साखर नियंत्रणासाठी दैनंदिन कृती आराखडा',
        },
        content: {
          en: 'Muscles are the largest glucose sink in the human body. Simple post-meal movement stimulates insulin-independent glucose uptake into muscle cells.',
          mr: 'शरीरातील स्नायू रक्तातील साखरेचा सर्वाधिक वापर करतात. जेवणानंतर केलेले चालणे साखरेची पातळी झपाट्याने नियंत्रणात आणते.',
        },
        bulletPoints: {
          en: [
            '10-Minute Post-Meal Walk: A gentle 10 to 15-minute stroll after lunch and dinner blunts the glucose spike dramatically.',
            'Swap High Glycemic Foods: Replace white rice, white bread, and sugary sweets with whole millets, legumes, and fiber.',
            'Resistance Training: Doing bodyweight squats, push-ups, or resistance band exercises twice weekly builds muscle insulin sensitivity.',
          ],
          mr: [
            'जेवणानंतर १० मिनिटे शतपावली: दुपारच्या व रात्रीच्या जेवणानंतर लगेच बसून न राहता १०-१५ मिनिटे चालल्याने रक्तातील साखर वाढत नाही.',
            'कमी ग्लायसेमिक आहाराची निवड: पांढरा भात, मैदा आणि गोड पदार्थ टाळून संपूर्ण कडधान्ये आणि भाज्या खा.',
            'स्नायूंचा व्यायाम: आठवड्यातून दोनदा जोर-बैठका किंवा हलके वजन उचलल्याने शरीराची साखर वापरण्याची क्षमता वाढते.',
          ],
        },
      },
    ],
    whenToSeeDoctor: {
      en: [
        'Excessive thirst (polydipsia), frequent nighttime urination (polyuria), and sudden unexplained weight loss.',
        'Slow-healing cuts, sores, or recurrent skin and fungal infections.',
        'Tingling, burning, or loss of sensation in the feet or toes (diabetic neuropathy).',
      ],
      mr: [
        'सतत अतिशय तहान लागणे, रात्री वारंवार लघवीला जावे लागणे आणि अचानक वजन कमी होणे.',
        'जखम झाल्यावर ती लवकर न भरणे किंवा त्वचेवर सतत इन्फेक्शन होणे.',
        'पायांच्या तळव्यांना मुंग्या येणे, आग होणे किंवा संवेदना कमी होणे.',
      ],
    },
    preventionTips: {
      en: [
        'Check HbA1c annually if you are over 30 or have a family history of diabetes.',
        'Prioritize 7-8 hours of sound sleep; sleep deprivation triggers cortisol which spikes insulin resistance.',
      ],
      mr: [
        'कुटुंबात कोणाला मधुमेह असल्यास किंवा वय ३० पूर्ण झाल्यावर दरवर्षी एकदा HbA1c चाचणी जरूर करा.',
        'दररोज ७ ते ८ तास शांत झोप घ्या; झोप अपुरी झाल्यास रक्तातील साखर वाढते.',
      ],
    },
    references: [
      {
        title: 'ICMR Guidelines for Management of Type 2 Diabetes',
        source: 'Indian Council of Medical Research (ICMR)',
        year: '2023',
      },
      {
        title: 'Global Report on Diabetes and Glycemic Management',
        source: 'World Health Organization (WHO)',
        year: '2024',
      },
    ],
    isFeatured: true,
  },
  {
    id: 'first-aid-emergency-cpr-guide',
    slug: 'first-aid-emergency-cpr-guide',
    categoryId: 'first-aid',
    title: {
      en: 'Hands-Only CPR & Essential Emergency First Aid Protocols',
      mr: 'हँड्स-ओन्ली सीपीआर (CPR) आणि अत्यावश्यक प्रथमोपचार पद्धती',
    },
    excerpt: {
      en: 'Clear, step-by-step emergency actions that can save a life before the ambulance arrives. How to perform chest compressions, treat burns, and stop severe bleeding.',
      mr: 'रुग्णवाहिका येईपर्यंत एखाद्या व्यक्तीचा जीव वाचवण्यासाठी करायच्या तातडीच्या उपाययोजना. सीपीआर देण्याची योग्य पद्धत, भाजल्यास करायचे उपाय आणि रक्तस्त्राव थांबवणे.',
    },
    image: '/src/assets/images/hero_wellness_lifestyle_1793352072364.jpg',
    readTimeMinutes: 5,
    publishDate: '2026-03-28',
    lastReviewedDate: '2026-10-15',
    reviewer: {
      name: {
        en: 'Dr. Vivek Joshi, MBBS, MEM (Emergency Medicine)',
        mr: 'डॉ. विवेक जोशी, एमबीबीएस, एमईएम (आपत्कालीन औषधशास्त्र)',
      },
      role: {
        en: 'Emergency Medicine Specialist & MOTI First Aid Trainer',
        mr: 'आपत्कालीन औषधशास्त्र तज्ज्ञ व MOTI प्रथमोपचार मार्गदर्शक',
      },
    },
    overview: {
      en: 'In a sudden cardiac arrest, every single minute without CPR reduces the chance of survival by 7 to 10 percent. "Hands-Only CPR" can be performed by any bystander without medical training. Knowing these basic first-aid protocols empowers you to act decisively during critical emergencies.',
      mr: 'हृदयविकाराच्या झटक्यात (कार्डिॲक अरेस्ट) सीपीआर न मिळाल्यास जगण्याची शक्यता प्रति मिनिट ७ ते १० टक्क्यांनी कमी होते. "हँड्स-ओन्ली सीपीआर" ही साधी पद्धत कोणताही सामान्य माणूस शिकू शकतो. या प्राथमिक उपायांची माहिती असणे प्रत्येकासाठी अत्यंत गरजेचे आहे.',
    },
    sections: [
      {
        title: {
          en: 'Hands-Only CPR in 3 Steps',
          mr: 'हँड्स-ओन्ली सीपीआर ३ पायऱ्यांमध्ये',
        },
        content: {
          en: 'If a teen or adult suddenly collapses and is unresponsive and not breathing normally:',
          mr: 'जर एखादी व्यक्ती अचानक बेशुद्ध पडली आणि तिचा श्वास थांबला असेल, तर:',
        },
        bulletPoints: {
          en: [
            'Step 1: Check responsiveness and immediately call 108 (Ambulance) or 112 (National Emergency). Put phone on speaker.',
            'Step 2: Position hands in the center of the chest (lower half of breastbone). Interlock fingers.',
            'Step 3: Push hard and fast in the center of the chest at 100 to 120 beats per minute (to the beat of a fast rhythm), compressing 2 inches deep. Do not stop until medical help arrives.',
          ],
          mr: [
            'पायरी १: व्यक्तीला हलवून हाक मारा; प्रतिसाद न मिळाल्यास लगेच १०८ (रुग्णवाहिका) किंवा ११२ वर कॉल करा आणि फोन स्पीकरवर ठेवा.',
            'पायरी २: व्यक्तीला पाठीवर सपाट झोपवा. तुमच्या दोन्ही हातांची बोटे एकमेकांत गुंफून छातीच्या मधोमध ठेवा.',
            'पायरी ३: छातीवर वेगाने आणि जोराने दाब द्या (प्रति मिनिट १०० ते १२० वेळा). किमान २ इंच खोलीपर्यंत दाब पडला पाहिजे. मदत येईपर्यंत थांबवू नका.',
          ],
        },
      },
      {
        title: {
          en: 'First Aid for Thermal Burns',
          mr: 'आगीत भाजल्यास करायचे प्राथमिक उपचार',
        },
        content: {
          en: 'Immediately cool the burn under gentle running tap water for at least 15 to 20 minutes.',
          mr: 'भाजलेल्या भागावर त्वरित नळाचे वाहते साधे पाणी १५ ते २० मिनिटे सतत टाका.',
        },
        bulletPoints: {
          en: [
            'DO: Cool with clean, cool running water. Cover loosely with a clean, sterile cloth or plastic cling wrap.',
            'DO NOT: Apply ice, toothpaste, butter, raw eggs, or turmeric paste — these trap heat and breed severe bacterial infections.',
            'DO NOT: Pop blisters or remove clothing stuck directly to charred flesh.',
          ],
          mr: [
            'हे करा: वाहत्या साध्या पाण्याने थंड करा आणि स्वच्छ सुती कापडाने सैल झाका.',
            'हे करू नका: भाजलेल्या भागावर बर्फ, टूथपेस्ट, तेल, तूप किंवा हळद लावू नका; यामुळे इन्फेक्शन वाढते.',
            'हे करू नका: आलेले फोड फोडू नका किंवा त्वचेला चिकटलेले कपडे खेचून काढू नका.',
          ],
        },
      },
    ],
    whenToSeeDoctor: {
      en: [
        'Burns larger than the size of the patient’s palm, or burns located on the face, hands, joints, or genitals require hospital emergency care.',
        'Any situation involving loss of consciousness, uncontrolled bleeding, or suspected spine injury.',
      ],
      mr: [
        'हाताच्या तळव्यापेक्षा मोठी जखम असल्यास किंवा चेहरा, हात, सांधे भाजल्यास त्वरित रुग्णालयात घेऊन जा.',
        'व्यक्ती बेशुद्ध पडल्यास किंवा जास्त रक्तस्त्राव होत असल्यास वेळ न दवडता तातडीने डॉक्टरकडे जा.',
      ],
    },
    preventionTips: {
      en: [
        'Keep a certified first-aid kit stocked at home with sterile gauze, micropore tape, antiseptic solution, and emergency contact numbers clearly listed.',
      ],
      mr: [
        'घरात प्रथमोपचार पेटी नेहमी तयार ठेवा, ज्यामध्ये निर्जंतुक बँडेज, मलम आणि आपत्कालीन फोन नंबर लिहिलेले असावेत.',
      ],
    },
    references: [
      {
        title: 'Resuscitation & Hands-Only CPR Clinical Guidelines',
        source: 'American Heart Association & WHO',
        year: '2024',
      },
      {
        title: 'Emergency Medical Services Protocols India',
        source: 'Ministry of Health and Family Welfare India',
        year: '2023',
      },
    ],
    isFeatured: true,
  },
  {
    id: 'sleep-hygiene-circadian-rest',
    slug: 'sleep-hygiene-circadian-rest',
    categoryId: 'sleep-stress',
    title: {
      en: 'The Science of Deep Sleep: Mastering Sleep Hygiene and Rest',
      mr: 'गाढ झोपेचे विज्ञान: शांत झोप आणि निरोगी विश्रांतीसाठी मार्गदर्शन',
    },
    excerpt: {
      en: 'Tired of tossing and turning? Learn how light exposure, evening digital cutoffs, room temperature, and bedtime wind-down rituals restore natural melatonin cycles.',
      mr: 'रात्री सतत कुस बदलणे बंद करा. प्रकाशाचा प्रभाव, संध्याकाळी मोबाईल बंद करणे आणि शांत झोपेसाठी आवश्यक सवयी समजून घ्या.',
    },
    image: '/src/assets/images/heart_active_lifestyle_1793352073138.jpg',
    readTimeMinutes: 5,
    publishDate: '2026-03-30',
    lastReviewedDate: '2026-10-18',
    reviewer: {
      name: {
        en: 'Dr. Radhika Sharma, MD (Psychiatry), Sleep Medicine Fellow',
        mr: 'डॉ. राधिका शर्मा, एमडी (मानसोपचार), स्लीप मेडिसिन फेलो',
      },
      role: {
        en: 'Sleep Specialist & MOTI Mental Health Contributor',
        mr: 'झोप व मानसिक आरोग्य तज्ज्ञ, MOTI',
      },
    },
    overview: {
      en: 'Sleep is the master regulator of human cellular repair, brain waste clearance (the glymphatic system), and metabolic hormone balance. Chronic sleep deprivation of under 6 hours a night elevates cortisol, increases hunger hormone ghrelin, and weakens cardiovascular resilience.',
      mr: 'झोप ही शरीराच्या आणि मेंदूच्या पेशींची दुरुस्ती करणारी नैसर्गिक प्रक्रिया आहे. दररोज ६ तासांपेक्षा कमी झोप घेतल्यास शरीरात ताणाचे प्रमाण वाढते, भूक वाढवणारे हार्मोन्स सक्रिय होतात आणि हृदयावर ताण पडतो. शांत झोपेसाठी काही साध्या सवयी अंगीकारणे आवश्यक आहे.',
    },
    sections: [
      {
        title: {
          en: 'Setting the Circadian Anchor',
          mr: 'जैविक घड्याळाची लय टिकवणे',
        },
        content: {
          en: 'Our body operates on a 24-hour internal clock driven by natural sunlight and darkness cues.',
          mr: 'आपले शरीर २४ तासांच्या नैसर्गिक जैविक घड्याळावर चालते, जे सूर्यप्रकाश आणि अंधारानुसार कार्य करते.',
        },
        bulletPoints: {
          en: [
            'Morning Sunlight: View 10 to 15 minutes of natural morning sunlight within an hour of waking to set daytime cortisol and timer for night melatonin.',
            'Digital Sunset: Turn off smartphones, laptops, and LED screens at least 60 minutes before bed; blue wavelength light suppresses melatonin synthesis.',
            'Cool, Dark Sleeping Cave: Keep your bedroom pitch-dark and moderately cool (around 20-22°C or well-ventilated).',
            'Caffeine Curfew: Avoid chai, coffee, and energy drinks after 2:00 PM because caffeine has a half-life of 5 to 7 hours.',
          ],
          mr: [
            'सकाळचा कोवळा ऊन: सकाळी उठल्यावर १०-१५ मिनिटे कोवळ्या उन्हात बसा, ज्यामुळे रात्री वेळेवर झोप येण्यास मदत होते.',
            'मोबाईलपासून विश्रांती: झोपण्याच्या किमान १ तास आधी मोबाईल, टीव्ही आणि लॅपटॉप पूर्णपणे बंद करा.',
            'शांत आणि अंधारी खोली: झोपण्याची खोली थंड, हवेशीर आणि अंधारी असावी.',
            'दुपारनंतर चहा-कॉफी टाळा: दुपारी २ नंतर चहा किंवा कॉफी पिणे टाळा, कारण त्यातील कॅफिन रात्री मेंदूला जागे ठेवते.',
          ],
        },
      },
    ],
    whenToSeeDoctor: {
      en: [
        'Loud chronic snoring accompanied by gasping or pauses in breathing (signs of Obstructive Sleep Apnea).',
        'Severe insomnia lasting more than 4 consecutive weeks interfering with daytime functioning.',
      ],
      mr: [
        'रात्री खूप जोरात घोरणे किंवा अचानक श्वास अडकून जाग येणे (स्लीप ॲप्निया आजाराची शक्यता).',
        'सलग ४ आठवड्यांपेक्षा जास्त काळ अजिबात झोप न येणे किंवा निद्रानाश होणे.',
      ],
    },
    preventionTips: {
      en: [
        'Maintain the same sleep and wake time every day, even on weekends.',
        'Do not stay in bed awake for more than 20 minutes; get up, read a printed book in dim light, and return when drowsy.',
      ],
      mr: [
        'सुट्टीच्या दिवशीही रोज एकाच वेळेवर झोपण्याची आणि उठण्याची सवय ठेवा.',
        'झोप येत नसेल तर अंथरुणावर पडून राहू नका; उठून मंद प्रकाशात पुस्तक वाचा आणि झोप आल्यावर झोपा.',
      ],
    },
    references: [
      {
        title: 'Sleep Health and Neurological Recovery Guidelines',
        source: 'National Sleep Foundation & NHS',
        year: '2023',
      },
      {
        title: 'Clinical Practice Guideline for the Pharmacologic and Non-pharmacologic Treatment of Chronic Insomnia',
        source: 'American Academy of Sleep Medicine',
        year: '2022',
      },
    ],
    isFeatured: false,
  },
];

export const DAILY_HEALTH_TIPS: DailyHealthTip[] = [
  {
    id: 'tip-1',
    day: 'Monday',
    category: {
      en: 'Hydration',
      mr: 'पाण्याचे प्रमाण',
    },
    title: {
      en: 'Start Your Morning with 2 Glasses of Lukewarm Water',
      mr: 'सकाळी उठल्यावर २ पेले कोमट पाणी प्या',
    },
    tip: {
      en: 'After 7-8 hours of sleep, your body is naturally dehydrated. Lukewarm water gently awakens the digestive tract and jumpstarts cellular metabolism.',
      mr: 'रात्रीच्या ७-८ तासांच्या झोपेनंतर शरीर डिहायड्रेटेड झालेले असते. कोमट पाणी प्यायल्याने पचनक्रिया सक्रिय होते आणि शरीरातील विषारी घटक बाहेर पडण्यास मदत होते.',
    },
    actionableStep: {
      en: 'Keep a copper or stainless steel water bottle by your bedside tonight so it is ready the moment you wake up.',
      mr: 'आज रात्री झोपताना जवळ तांब्याची किंवा स्टीलची पाण्याची बाटली भरून ठेवा, जेणेकरून सकाळी उठल्या उठल्या पाणी पिता येईल.',
    },
  },
  {
    id: 'tip-2',
    day: 'Tuesday',
    category: {
      en: 'Physical Activity',
      mr: 'शारीरिक व्यायाम',
    },
    title: {
      en: 'The 10-Minute Post-Meal Stroll',
      mr: 'जेवणानंतर १० मिनिटे शतपावली करा',
    },
    tip: {
      en: 'Walking lightly for just 10 to 15 minutes after lunch or dinner pulls glucose directly into your leg muscles, significantly flattening after-meal sugar spikes.',
      mr: 'दुपारच्या किंवा रात्रीच्या जेवणानंतर लगेच बसून न राहता संथ गतीने १०-१५ मिनिटे चालल्याने रक्तातील साखरेचे प्रमाण अचानक वाढत नाही.',
    },
    actionableStep: {
      en: 'Set an alarm for 15 minutes after your dinner today to take a gentle indoor or terrace stroll.',
      mr: 'आज रात्री जेवण संपल्यावर १५ मिनिटांचा अलार्म लावा आणि घराच्या आवारात किंवा गच्चीवर १० मिनिटे शांतपणे चाला.',
    },
  },
  {
    id: 'tip-3',
    day: 'Wednesday',
    category: {
      en: 'Eye Health & Screens',
      mr: 'डोळ्यांचे आरोग्य',
    },
    title: {
      en: 'Protect Your Vision with the 20-20-20 Rule',
      mr: '२०-२०-२० नियमाने डोळ्यांचे रक्षण करा',
    },
    tip: {
      en: 'Continuous screen exposure strains ciliary eye muscles. Every 20 minutes, look at an object 20 feet away for 20 seconds.',
      mr: 'मोबाईल किंवा कॉम्प्युटरकडे सतत पाहिल्याने डोळ्यांवर ताण येतो. दर २० मिनिटांनी २० फूट अंतरावरील वस्तूवर २० सेकंद नजर ठेवा.',
    },
    actionableStep: {
      en: 'Blink intentionally 10 times right now to re-lubricate your corneas.',
      mr: 'आत्ताच डोळ्यांची १० वेळा संथपणे उघडझाप करा जेणेकरून डोळ्यांचा कोरडेपणा कमी होईल.',
    },
  },
  {
    id: 'tip-4',
    day: 'Thursday',
    category: {
      en: 'Nutrition',
      mr: 'पौष्टिक आहार',
    },
    title: {
      en: 'Add a Fistful of Sprouted Moong or Chana to Lunch',
      mr: 'दुपारच्या जेवणात एक मूठ मोड आलेली कडधान्ये खा',
    },
    tip: {
      en: 'Sprouting multiplies enzymatic activity and bioavailable Vitamin B complex while adding clean plant-based fiber to prevent afternoon crashes.',
      mr: 'कडधान्यांना मोड आणल्याने त्यातील जीवनसत्त्वे अनेक पटींनी वाढतात आणि त्यातील फायबरमुळे पोट दीर्घकाळ भरलेले राहून ऊर्जा टिकून राहते.',
    },
    actionableStep: {
      en: 'Soak whole green moong in water today so they are sprouted and ready for your meal tomorrow.',
      mr: 'उद्याच्या जेवणासाठी आजच हिरवे मूग पाण्यात भिजवून मोड येण्यासाठी कापडात बांधून ठेवा.',
    },
  },
  {
    id: 'tip-5',
    day: 'Friday',
    category: {
      en: 'Mental Wellness',
      mr: 'मानसिक शांतता',
    },
    title: {
      en: '4-7-8 Breathing to Release Workweek Tension',
      mr: '४-७-८ श्वसनाने आठवड्याचा ताण दूर करा',
    },
    tip: {
      en: 'Inhale for 4 seconds, hold gently for 7 seconds, and exhale slowly for 8 seconds. This rhythm physically shifts your heart into parasympathetic rest.',
      mr: '४ सेकंद नाकाने श्वास घ्या, ७ सेकंद रोखून धरा आणि ८ सेकंदात हळूहळू तोंडाने सोडा. यामुळे मनातील अस्वस्थता त्वरित कमी होते.',
    },
    actionableStep: {
      en: 'Try 4 cycles of this breathing exercise right now with your eyes closed.',
      mr: 'आत्ताच डोळे मिटून या श्वसनाची ४ आवर्तने करून पाहा आणि शरीराला शांतता अनुभवा.',
    },
  },
  {
    id: 'tip-6',
    day: 'Saturday',
    category: {
      en: 'Joints & Bones',
      mr: 'सांधे आणि हाडे',
    },
    title: {
      en: 'Soak in 15 Minutes of Early Morning Sunlight',
      mr: 'सकाळच्या कोवळ्या उन्हात १५ मिनिटे बसा',
    },
    tip: {
      en: 'Sunlight synthesized Vitamin D is critical for calcium absorption, strong bones, and immune regulation against seasonal respiratory infections.',
      mr: 'सूर्यप्रकाशामुळे शरीरात व्हिटॅमिन D तयार होते, जे हाडे मजबूत ठेवण्यासाठी आणि संसर्गापासून रक्षण करण्यासाठी अत्यंत आवश्यक आहे.',
    },
    actionableStep: {
      en: 'Enjoy your morning tea or warm water outdoors between 7:30 AM and 9:00 AM.',
      mr: 'सकाळी ७:३० ते ९:०० दरम्यान बाल्कनीत किंवा अंगणात बसून १५ मिनिटे कोवळे ऊन अंगावर घ्या.',
    },
  },
  {
    id: 'tip-7',
    day: 'Sunday',
    category: {
      en: 'Digestive Rest',
      mr: 'पचनास विश्रांती',
    },
    title: {
      en: 'Finish Dinner 3 Hours Before Sleeping',
      mr: 'झोपण्याच्या ३ तास आधी रात्रीचे जेवण संपवा',
    },
    tip: {
      en: 'Going to sleep with a full stomach causes nocturnal acid reflux and forces your heart to pump extra blood to the gut instead of cellular repair.',
      mr: 'भरल्या पोटी झोपल्याने ॲसिडिटी होते आणि रात्री हृदयाला विश्रांती मिळण्याऐवजी पचनासाठी जास्त काम करावे लागते.',
    },
    actionableStep: {
      en: 'Aim to complete your Sunday evening meal by 8:00 PM tonight for the deepest sleep of the week.',
      mr: 'आज रात्री ८:०० वाजेपर्यंत हलके जेवण संपवा आणि गाढ झोपेचा अनुभव घ्या.',
    },
  },
];

export const YOGA_ASANAS: YogaAsana[] = [
  {
    id: 'vrikshasana',
    name: {
      en: 'Tree Pose',
      mr: 'वृक्षासन',
      sanskrit: 'Vrikshasana',
    },
    level: {
      en: 'Beginner',
      mr: 'सुरुवातीसाठी',
    },
    duration: '1-2 minutes per side',
    benefits: {
      en: [
        'Improves balance, posture, and mental concentration.',
        'Strengthens calves, ankles, and thigh muscles.',
        'Relieves mild sciatica pain.',
      ],
      mr: [
        'शारीरिक समतोल, एकाग्रता आणि आत्मविश्वास वाढवतो.',
        'पायांचे स्नायू, घोटा आणि मांडी बळकट करतो.',
        'पाठदुखी कमी करण्यास उपयुक्त.',
      ],
    },
    steps: {
      en: [
        'Stand tall and shift your weight slightly onto your left foot.',
        'Place the sole of your right foot on your inner left thigh or calf (never directly on the knee joint).',
        'Bring hands together in Namaste position at the chest or extend upward toward the ceiling.',
        'Fix your gaze on an unmoving spot in front of you and breathe smoothly for 5 to 8 breaths.',
        'Repeat on the opposite side.',
      ],
      mr: [
        'सरळ उभे राहा आणि डाव्या पायावर शरीराचा तोल सांभाळा.',
        'उजव्या पायाचा तळवा डाव्या मांडीच्या आतील भागावर किंवा पोटरीवर ठेवा (गुडघ्यावर ठेवू नका).',
        'दोन्ही हात छातीसमोर जोडून नमस्कार स्थितीत आणा किंवा वर आकाशाकडे न्या.',
        'समोर एका स्थिर बिंदूवर नजर ठेवून ५ ते ८ संथ श्वास घ्या.',
        'दुसऱ्या पायानेही हीच कृती पुन्हा करा.',
      ],
    },
    caution: {
      en: 'If you have severe vertigo or arthritis, stand near a wall for hand support.',
      mr: 'चक्कर येत असल्यास किंवा गुडघेदुखी असल्यास भिंतीचा आधार घेऊन हे आसन करा.',
    },
  },
  {
    id: 'bhujangasana',
    name: {
      en: 'Cobra Pose',
      mr: 'भुजंगासन',
      sanskrit: 'Bhujangasana',
    },
    level: {
      en: 'Beginner to Intermediate',
      mr: 'मध्यम',
    },
    duration: '30-45 seconds, 3 rounds',
    benefits: {
      en: [
        'Strengthens entire spinal column and relieves desk-slouch stiffness.',
        'Opens chest and lungs to improve breathing capacity.',
        'Tones abdominal organs.',
      ],
      mr: [
        'पाठीचा कणा मजबूत करतो आणि बसून येणारा ताठरपणा दूर करतो.',
        'छाती आणि फुफ्फुसे मोकळी करून श्वास घेण्याची क्षमता वाढवतो.',
        'पोटाच्या स्नायूंना हलका ताण देतो.',
      ],
    },
    steps: {
      en: [
        'Lie face down on the mat with forehead touching the floor and feet hip-distance apart.',
        'Place palms flat beneath the shoulders, elbows tucked close to the ribs.',
        'Inhale and gently peel the chest off the floor using back muscles, keeping elbows slightly bent.',
        'Do not hyperextend the neck; gaze comfortably forward.',
        'Hold for 15-20 seconds breathing normally, then exhale and lower slowly.',
      ],
      mr: [
        'पोटावर जमिनीवर झोपा आणि कपाळ जमिनीला टेकवा.',
        'दोन्ही हाताचे तळवे छातीजवळ खांद्याखाली ठेवा आणि कोपरे बरगड्यांजवळ ठेवा.',
        'श्वास घेत छाती हळूहळू वर उचला; कोपरे किंचित वाकलेले ठेवा.',
        'मानेवर अतिरिक्त ताण न देता समोर पाहा.',
        '१५-२० सेकंद संथ श्वास घेत राहा आणि श्वास सोडत पूर्वस्थितीत या.',
      ],
    },
    caution: {
      en: 'Avoid during pregnancy, recent abdominal surgery, or severe lumbar hernia.',
      mr: 'गरोदरपणात किंवा पोट शस्त्रक्रिया झाली असल्यास हे आसन करू नका.',
    },
  },
  {
    id: 'anulom-vilom',
    name: {
      en: 'Alternate Nostril Breathing',
      mr: 'अनुलोम-विलोम प्राणायाम',
      sanskrit: 'Nadi Shodhana',
    },
    level: {
      en: 'All Levels',
      mr: 'सर्वांसाठी',
    },
    duration: '5-10 minutes daily',
    benefits: {
      en: [
        'Instantly soothes high heart rate and nervous anxiety.',
        'Clears nasal passages and improves oxygenation.',
        'Helps lower high blood pressure naturally.',
      ],
      mr: [
        'वाढलेले हृदयाचे ठोके आणि मानसिक चिंता त्वरित शांत करतो.',
        'श्वास नलिका मोकळी करतो आणि शरीरात ऑक्सिजन वाढवतो.',
        'रक्तदाब नैसर्गिकरीत्या नियंत्रित ठेवण्यास मदत करतो.',
      ],
    },
    steps: {
      en: [
        'Sit comfortably with spine straight and eyes closed.',
        'Close right nostril gently with right thumb; inhale deeply and slowly through left nostril.',
        'Close left nostril with ring finger; release thumb and exhale smoothly through right nostril.',
        'Inhale through right nostril; close right with thumb and exhale through left nostril.',
        'This completes one cycle. Continue for 10 to 15 calm cycles.',
      ],
      mr: [
        'पाठीचा कणा सरळ ठेवून आरामात बसा आणि डोळे मिटा.',
        'उजव्या हाताच्या अंगठ्याने उजवी नाकपुडी बंद करा; डाव्या नाकपुडीने दीर्घ संथ श्वास घ्या.',
        'करंगळी शेजारील बोटाने डावी नाकपुडी बंद करा आणि उजव्या नाकपुडीने श्वास हळूहळू सोडा.',
        'आता उजव्या नाकपुडीने श्वास घ्या आणि डाव्या नाकपुडीने सोडा.',
        'हे एक चक्र झाले. असे १० ते १५ वेळा शांतपणे करा.',
      ],
    },
    caution: {
      en: 'Never strain the breath. Do not hold breath forcibly if you have cardiovascular conditions.',
      mr: 'श्वास बळजबरीने रोखून धरू नका; सहज आणि संथ गतीने श्वास घ्या.',
    },
  },
];

export const FIRST_AID_PROTOCOLS: FirstAidItem[] = [
  {
    id: 'cardiac-arrest',
    title: {
      en: 'Cardiac Arrest & Chest Compressions',
      mr: 'कार्डिॲक अरेस्ट आणि छातीवर दाब देणे (CPR)',
    },
    urgency: 'critical',
    symptoms: {
      en: ['Sudden collapse', 'Unresponsiveness to shouting/tapping', 'No normal breathing or only gasping'],
      mr: ['अचानक कोसळणे / बेशुद्ध होणे', 'हाक मारल्यास कोणताही प्रतिसाद नसणे', 'श्वास पूर्णपणे बंद असणे किंवा केवळ तडफडणे'],
    },
    immediateSteps: {
      en: [
        'Call 108 or 112 immediately. Turn phone on speaker.',
        'Place heel of one hand in the center of the victim’s chest; place other hand on top and interlock fingers.',
        'Push down hard and fast at 100 to 120 compressions per minute (depth of 5 cm / 2 inches).',
        'Allow chest to fully recoil between each compression. Do not stop until help arrives.',
      ],
      mr: [
        'त्वरित १०८ किंवा ११२ वर कॉल करा आणि फोन स्पीकरवर ठेवा.',
        'छातीच्या मधोमध एका हाताचा तळवा ठेवा आणि दुसरा हात त्यावर गुंफा.',
        'प्रति मिनिट १०० ते १२० वेगाने छातीवर जोरात दाब द्या (२ इंच खोल).',
        'प्रत्येक दाबानंतर छाती पूर्ववत वर येऊ द्या. रुग्णवाहिका येईपर्यंत थांबू नका.',
      ],
    },
    dontDo: {
      en: ['Do not waste time searching for a pulse if untrained.', 'Do not give oral fluids or water to an unconscious person.'],
      mr: ['नाडी शोधण्यात मौल्यवान वेळ वाया घालवू नका.', 'बेशुद्ध व्यक्तीच्या तोंडात पाणी किंवा कोणतेही औषध घालू नका.'],
    },
    emergencyCall: '108',
  },
  {
    id: 'choking-adult',
    title: {
      en: 'Choking (Heimlich Maneuver)',
      mr: 'घशात अन्न अडकणे (हायमलिक पद्धत)',
    },
    urgency: 'high',
    symptoms: {
      en: ['Inability to speak, cry, or cough', 'Clutching the throat with hands (universal sign)', 'Turning blue in lips or face'],
      mr: ['बोलता किंवा खोकता न येणे', 'घशाला दोन्ही हातांनी धरून धडपड करणे', 'ओठ किंवा चेहरा निळसर पडणे'],
    },
    immediateSteps: {
      en: [
        'Stand behind the person and wrap your arms around their waist.',
        'Make a fist with one hand and place the thumb side just above their navel (well below breastbone).',
        'Grasp your fist with your other hand and deliver quick, upward abdominal thrusts.',
        'Repeat until the lodged object is expelled or the person breathes freely.',
      ],
      mr: [
        'व्यक्तीच्या मागे उभे राहून दोन्ही हातांनी तिच्या कमरेभोवती विळखा घाला.',
        'एका हाताची मूठ वळा आणि नाभीच्या (बेंबीच्या) किंचित वर ठेवा.',
        'दुसऱ्या हाताने ती मूठ घट्ट पकडा आणि आत व वरच्या दिशेने जोराने धक्के द्या.',
        'अन्नाचा तुकडा बाहेर पडेपर्यंत किंवा व्यक्ती श्वास घेईपर्यंत ही कृती सुरू ठेवा.',
      ],
    },
    dontDo: {
      en: ['Do not slap the back while person is standing upright (this may lodge the object deeper).', 'Do not reach blindly into mouth with fingers.'],
      mr: ['व्यक्ती सरळ उभी असताना पाठीवर थाप मारू नका, तुकडा आणखी आत जाऊ शकतो.', 'अंधारात तोंडात बोटे घालून अडकलेली वस्तू शोधण्याचा प्रयत्न करू नका.'],
    },
    emergencyCall: '108',
  },
  {
    id: 'snakebite',
    title: {
      en: 'Snakebite Emergency Care',
      mr: 'सर्पदंश प्रथमोपचार',
    },
    urgency: 'critical',
    symptoms: {
      en: ['Pair of puncture wounds', 'Severe burning pain and swelling', 'Drowsiness, heavy eyelids, or blurred vision'],
      mr: ['दोन दातांचे स्पष्ट व्रण', 'तीव्र आग होणे व सूज येणे', 'गुंगी येणे, डोळ्यांची पापणी जड होणे किंवा श्वास घेण्यास त्रास'],
    },
    immediateSteps: {
      en: [
        'Keep the victim calm and completely still; physical movement spreads venom faster through lymphatic system.',
        'Immobilize the bitten limb using a splint or sling at heart level (like a bone fracture).',
        'Remove rings, watches, and tight clothing before swelling begins.',
        'Transport immediately to the nearest government civil hospital or primary health center with Anti-Snake Venom (ASV).',
      ],
      mr: [
        'व्यक्तीला पूर्णपणे शांत झोपवा; हालचालीमुळे विष शरीरात वेगाने पसरते.',
        'दंश झालेल्या हाताला किंवा पायाला लाकडी पट्टी बांधून हालचाल पूर्णपणे थांबवा.',
        'अंगठ्या, घड्याळ आणि घट्ट कपडे सूज येण्यापूर्वी लगेच काढून टाका.',
        'त्वरित अँटी-स्नेक व्हेनम (ASV) उपलब्ध असणाऱ्या जवळच्या सरकारी किंवा ग्रामीण रुग्णालयात घेऊन जा.',
      ],
    },
    dontDo: {
      en: [
        'DO NOT cut the wound with blades or suck the venom.',
        'DO NOT tie tight rope tourniquets (causes limb necrosis / amputation).',
        'DO NOT apply ice, herbs, or cow dung.',
      ],
      mr: [
        'जखमेवर ब्लेडने कापा मारू नका किंवा विष चोखून काढण्याचा प्रयत्न करू नका.',
        'घट्ट दोरी किंवा पट्टी बांधू नका; यामुळे रक्तपुरवठा बंद होऊन अवयव कापावा लागू शकतो.',
        'कोणत्याही पालापाचोळा किंवा जडीबुटीच्या नादी लागून वेळ वाया घालवू नका.',
      ],
    },
    emergencyCall: '108 / 112',
  },
  {
    id: 'heatstroke',
    title: {
      en: 'Heat Stroke (Sunstroke)',
      mr: 'उष्माघात (Sunstroke)',
    },
    urgency: 'high',
    symptoms: {
      en: ['Extremely high body temperature (>104°F / 40°C)', 'Hot, dry skin with cessation of sweating', 'Confusion, delirium, or loss of consciousness'],
      mr: ['शरीराचे तापमान खूप वाढणे (१०४°F पेक्षा जास्त)', 'घाम येणे पूर्ण बंद होऊन त्वचा कोरडी व गरम पडणे', 'भ्रम निर्माण होणे, चक्कर येणे किंवा बेशुद्ध पडणे'],
    },
    immediateSteps: {
      en: [
        'Move person immediately to a cool, shaded, or air-conditioned room.',
        'Remove excess outer clothing.',
        'Cool aggressively with cold wet towels or spray water over body while fanning continuously.',
        'Place cold packs on armpits, groin, and neck where major blood vessels run.',
        'Call 108 if consciousness is impaired.',
      ],
      mr: [
        'व्यक्तीला लगेच सावलीत किंवा थंड खोलीत घेऊन या.',
        'अंगावरील जास्तीचे जाड कपडे काढून टाका.',
        'गार पाण्याचे फडके अंगावर ठेवा किंवा पाण्याचा शिडकावा करून सतत पंख्याने वारा घाला.',
        'मानेवर, काखेत आणि जांघेत थंड पाण्याच्या पट्ट्या ठेवा.',
        'व्यक्ती बेशुद्ध असल्यास त्वरित १०८ वर फोन करा.',
      ],
    },
    dontDo: {
      en: ['Do not give ice-cold drinks to an altered or vomiting patient.', 'Do not give aspirin or paracetamol (heat stroke is not an infection).'],
      mr: ['बेशुद्ध व्यक्तीला जबरदस्तीने पाणी किंवा सरबत पाजू नका.', 'उष्माघातामध्ये तापाच्या गोळ्या (पॅरासिटामॉल) देऊ नका, कारण हा संसर्ग नसून उष्णतेचा झटका आहे.'],
    },
    emergencyCall: '108',
  },
];
