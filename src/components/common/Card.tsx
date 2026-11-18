import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  onClick,
  hoverable = false
}) => {
  const paddings = {
    none: '',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl border border-[#E4ECE7] shadow-[0_1px_3px_rgba(0,0,0,0.03)]
        ${paddings[padding]}
        ${hoverable ? 'hover:border-[#C8D9D0] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
