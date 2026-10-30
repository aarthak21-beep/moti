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
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* MOTI Emblem: Heart intertwined with Living Leaf */}
      <div
        className={`relative ${iconSizes[size]} shrink-0 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-1.5 flex items-center justify-center shadow-sm shadow-emerald-900/10`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
        >
          {/* Heart Base Path */}
          <path
            d="M16 27.5C16 27.5 5 20.5 5 12.5C5 7.8 8.8 4 13.5 4C14.4 4 15.3 4.2 16 4.5C16.7 4.2 17.6 4 18.5 4C23.2 4 27 7.8 27 12.5C27 20.5 16 27.5 16 27.5Z"
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner Living Sprout / Leaf growing from the heart center */}
          <path
            d="M16 23C16 17 21 13 22 8C17 9 13.5 13 14 18"
            stroke="#A7F3D0"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 18C12 16 10 16 9 17"
            stroke="#A7F3D0"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={`font-extrabold tracking-tight ${textSizes[size]} ${
            lightMode ? 'text-white' : 'text-emerald-950'
          }`}
          style={{ letterSpacing: '-0.03em' }}
        >
          MOTI
        </span>
        {showTagline && (
          <span
            className={`text-[10px] font-medium tracking-wider uppercase mt-0.5 ${
              lightMode ? 'text-emerald-200' : 'text-emerald-700'
            }`}
          >
            Health & Wellness
          </span>
        )}
      </div>
    </div>
  );
};
