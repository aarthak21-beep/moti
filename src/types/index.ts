export type Language = 'en' | 'mr';

export type FontSizeScale = 'sm' | 'md' | 'lg';

export interface Category {
  id: string;
  slug: string;
  name: {
    en: string;
    mr: string;
  };
  description: {
    en: string;
    mr: string;
  };
  iconName: string;
  color: string;
  articleCount?: number;
}

export interface MedicalReference {
  title: string;
  source: string; // e.g. WHO, NHS, ICMR, AIIMS, Ministry of Health India
  year?: string;
  url?: string;
}

export interface ArticleSection {
  title: {
    en: string;
    mr: string;
  };
  content: {
    en: string;
    mr: string;
  };
  bulletPoints?: {
    en: string[];
    mr: string[];
  };
}

export interface Article {
  id: string;
  slug: string;
  categoryId: string;
  title: {
    en: string;
    mr: string;
  };
  excerpt: {
    en: string;
    mr: string;
  };
  image: string;
  readTimeMinutes: number;
  publishDate: string;
  lastReviewedDate: string;
  reviewer: {
    name: {
      en: string;
      mr: string;
    };
    role: {
      en: string;
      mr: string;
    };
  };
  overview: {
    en: string;
    mr: string;
  };
  sections: ArticleSection[];
  whenToSeeDoctor: {
    en: string[];
    mr: string[];
  };
  preventionTips: {
    en: string[];
    mr: string[];
  };
  emergencyWarningSigns?: {
    en: string[];
    mr: string[];
  };
  references: MedicalReference[];
  isFeatured?: boolean;
}

export interface DailyHealthTip {
  id: string;
  day: string;
  category: {
    en: string;
    mr: string;
  };
  title: {
    en: string;
    mr: string;
  };
  tip: {
    en: string;
    mr: string;
  };
  actionableStep: {
    en: string;
    mr: string;
  };
}

export interface YogaAsana {
  id: string;
  name: {
    en: string;
    mr: string;
    sanskrit: string;
  };
  level: {
    en: string;
    mr: string;
  };
  duration: string;
  benefits: {
    en: string[];
    mr: string[];
  };
  steps: {
    en: string[];
    mr: string[];
  };
  caution: {
    en: string;
    mr: string;
  };
}

export interface FirstAidItem {
  id: string;
  title: {
    en: string;
    mr: string;
  };
  urgency: 'high' | 'critical' | 'moderate';
  symptoms: {
    en: string[];
    mr: string[];
  };
  immediateSteps: {
    en: string[];
    mr: string[];
  };
  dontDo: {
    en: string[];
    mr: string[];
  };
  emergencyCall: string;
}
