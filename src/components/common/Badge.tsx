import React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className = ''
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    success: 'bg-[#218653]/10 text-[#218653] border-[#218653]/20',
    warning: 'bg-[#D99126]/10 text-[#B87515] border-[#D99126]/25',
    danger: 'bg-[#D64B4B]/10 text-[#C73838] border-[#D64B4B]/20',
    info: 'bg-[#3978B8]/10 text-[#2B639B] border-[#3978B8]/20',
    neutral: 'bg-[#F2F6F4] text-[#687871] border-[#E4ECE7]'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-medium'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
