import React from 'react';

interface MotiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  lightMode?: boolean;
}

export const MotiLogo: React.FC<MotiLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  lightMode = false,
}) => {
  const sizes = {
    sm: { word: 'text-3xl', pearl: 'h-7 w-7', brand: 'text-base', tagline: 'text-[8px]' },
    md: { word: 'text-5xl sm:text-[54px]', pearl: 'h-10 w-10', brand: 'text-xl sm:text-2xl', tagline: 'text-[10px]' },
    lg: { word: 'text-6xl sm:text-7xl', pearl: 'h-12 w-12', brand: 'text-2xl sm:text-3xl', tagline: 'text-xs' },
  }[size];
  const primary = lightMode ? 'text-white' : 'text-emerald-950';
  const secondary = lightMode ? 'text-emerald-200' : 'text-emerald-800';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className={`flex items-center font-serif font-black leading-none tracking-[-0.09em] ${sizes.word} ${primary}`}>
        <span className="flex h-[.76em] items-center">M</span>
        <span className={`relative mx-[2px] inline-flex h-[.76em] shrink-0 items-center justify-center ${sizes.pearl} rounded-[48%_48%_42%_42%] bg-gradient-to-b from-emerald-200 via-emerald-700 to-emerald-950 shadow-md`}>
          <span className="absolute inset-x-[8%] top-[7%] h-[47%] rounded-t-full bg-gradient-to-b from-emerald-100 to-emerald-400"/>
          <span className="absolute bottom-[7%] left-[8%] h-[34%] w-[84%] rounded-b-full bg-emerald-950/70"/>
          <span className="relative z-10 h-[58%] w-[58%] rounded-full border-2 border-amber-100 bg-[radial-gradient(circle_at_30%_25%,#fff_0%,#fffdf5_38%,#d8c9ae_75%,#9c896e_100%)] shadow-[0_1px_8px_#fff]"/>
        </span>
        <span className="flex h-[.76em] items-center">TI</span>
      </div>
      <div className="flex min-w-0 flex-col justify-center leading-none">
        <span className={`font-extrabold tracking-tight ${sizes.brand} ${secondary}`}>HealthSphere</span>
        {showTagline && <span className={`mt-1 whitespace-nowrap font-medium tracking-normal ${sizes.tagline} ${lightMode ? 'text-emerald-100' : 'text-slate-600'}`}>Your Daily Guide to Better Health.</span>}
      </div>
    </div>
  );
};
