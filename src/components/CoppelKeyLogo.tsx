import React from 'react';

interface CoppelKeyLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'yellow-on-blue';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const CoppelKeyLogo: React.FC<CoppelKeyLogoProps> = ({
  className = '',
  variant = 'yellow-on-blue',
  size = 'md',
  showText = true,
}) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-9',
    lg: 'h-12',
    xl: 'h-16',
  };

  const keyColor = variant === 'dark' ? '#004F9F' : '#FFD000';
  const textColor = variant === 'light' ? 'text-slate-900' : variant === 'dark' ? 'text-[#004F9F]' : 'text-white';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Authentic Coppel Key SVG */}
      <svg
        viewBox="0 0 140 70"
        className={`${sizeClasses[size]} w-auto shrink-0 drop-shadow-sm`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Coppel Key Logo"
      >
        {/* Key Bow (Circular Head) */}
        <circle cx="35" cy="35" r="28" fill={keyColor} />
        <circle cx="35" cy="35" r="14" fill={variant === 'yellow-on-blue' ? '#003D82' : '#ffffff'} />

        {/* Key Shaft (Horizontal stem) */}
        <path
          d="M58 29H125C128.3 29 131 31.7 131 35C131 38.3 128.3 41 125 41H58V29Z"
          fill={keyColor}
        />

        {/* Key Teeth (Bottom notches) */}
        <path
          d="M95 40H107V57C107 58.7 105.7 60 104 60H98C96.3 60 95 58.7 95 57V40Z"
          fill={keyColor}
        />
        <path
          d="M115 40H127V53C127 54.7 125.7 56 124 56H118C116.3 56 115 54.7 115 53V40Z"
          fill={keyColor}
        />
      </svg>

      {showText && (
        <span
          className={`font-black tracking-tight uppercase ${textColor} ${
            size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : size === 'lg' ? 'text-3xl' : 'text-4xl'
          } font-sans`}
          style={{ letterSpacing: '-0.03em' }}
        >
          Coppel<span className="text-[#FFD000]">.</span>
        </span>
      )}
    </div>
  );
};
