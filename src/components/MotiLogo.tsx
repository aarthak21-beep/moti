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
  const wordSizes = {
    sm: 'text-2xl',
    md: 'text-3xl sm:text-4xl',
    lg: 'text-4xl sm:text-5xl',
  };
  const subSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
  };
  const pearlSizes = {
    sm: 'w-6 h-7',
    md: 'w-8 h-9',
    lg: 'w-10 h-11',
  };
  const mainColor = lightMode ? 'text-white' : 'text-emerald-950';
  const subColor = lightMode ? 'text-emerald-200' : 'text-emerald-700';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div className="flex flex-col leading-none">
        <span className={`inline-flex items-center font-black tracking-[-0.075em] ${wordSizes[size]} ${mainColor}`}>
          <span>M</span>
          <span className={`relative inline-flex items-center justify-center ${pearlSizes[size]} mx-0.5`} aria-label="pearl">
            <svg viewBox="0 0 44 48" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
              <path d="M3 19C5 8 13 3 22 3s17 5 19 16L22 43 3 19Z" fill={lightMode ? "#10B981" : "#059669"} />
              <path d="M3 19 11 15 15 22 22 13 29 22 33 15 41 19" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 25 22 43 38 25" fill="#065F46" />
              <circle cx="22" cy="25" r="10.5" fill="#F8FAFC" />
              <circle cx="19" cy="21.5" r="3.2" fill="white" />
              <circle cx="22" cy="25" r="10.5" stroke="#D6B875" strokeWidth="1.2" />
            </svg>
          </span>
          <span>T</span><span>I</span>
        </span>
        <span className={`font-extrabold tracking-tight ${subSizes[size]} ${subColor} mt-0.5`}>
          HealthSphere
        </span>
        {showTagline && (
          <span className={`text-[9px] sm:text-[10px] font-medium tracking-wide mt-1 ${lightMode ? 'text-emerald-100/90' : 'text-slate-500'}`}>
            Your Daily Guide to Better Health.
          </span>
        )}
      </div>
    </div>
  );
};
