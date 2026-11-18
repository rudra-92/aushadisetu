import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  linkTo?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  linkTo = '/',
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl'
  };

  const logoContent = (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Precision Healthcare Shield + Capsule Icon */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-lg bg-[#167A55] text-white shadow-sm transition-transform hover:scale-[1.02]`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          {/* Shield Outline */}
          <path
            d="M12 2.5L19 6V12C19 16.5 15.8 20.2 12 21.5C8.2 20.2 5 16.5 5 12V6L12 2.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Medical Plus Cross Inside */}
          <path
            d="M12 8.5V15.5M8.5 12H15.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-semibold tracking-tight text-[#172923] ${textSizes[size]}`}
        >
          Aushadhi<span className="text-[#167A55]">Setu</span>
        </span>
        {showTagline && (
          <span className="text-[10px] font-medium tracking-wide text-[#687871] uppercase">
            Medicine Safety Platform
          </span>
        )}
      </div>
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo} className="inline-block">{logoContent}</Link>;
  }

  return logoContent;
};
