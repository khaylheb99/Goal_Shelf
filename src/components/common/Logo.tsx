import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showTagline = false, size = 'md' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Original GoalShelf Emblem: Football perched atop illuminated shelf & goal crossbar */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_12px_rgba(57,255,20,0.5)]">
          {/* Goal Frame / Shelf Structure */}
          <path
            d="M6 38H42"
            stroke="#39FF14"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Goal Net / Depth Ribs */}
          <path
            d="M10 38L15 18H33L38 38"
            stroke="#00C853"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeOpacity="0.8"
          />
          {/* Shelf Crossbar Accent */}
          <path
            d="M14 18H34"
            stroke="#39FF14"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Crown/Trophy Shelf Notch */}
          <path
            d="M20 42H28"
            stroke="#FFD700"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* The Football Sphere on the Shelf */}
          <circle cx="24" cy="18" r="9.5" fill="#0B110D" stroke="#FFFFFF" strokeWidth="2" />
          {/* Football Pentagons & Seams */}
          <polygon points="24,14 27,16 26,19 22,19 21,16" fill="#39FF14" />
          <line x1="24" y1="14" x2="24" y2="9.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="27" y1="16" x2="31" y2="14" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="26" y1="19" x2="29" y2="23" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="22" y1="19" x2="19" y2="23" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="21" y1="16" x2="17" y2="14" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center tracking-wider font-extrabold uppercase font-display leading-none">
          <span className={`${textSizes[size]} text-white`}>GOAL</span>
          <span className={`${textSizes[size]} text-[#39FF14] neon-glow`}>SHELF</span>
        </div>
        {showTagline && (
          <span className="text-[10px] tracking-widest text-[#A7B2AA] uppercase font-mono mt-0.5">
            YOUR GOALS. YOUR GLORY. YOUR SHELF.
          </span>
        )}
      </div>
    </div>
  );
};
