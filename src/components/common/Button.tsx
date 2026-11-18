import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167A55] focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-[#167A55] hover:bg-[#115B42] active:bg-[#0D4834] text-white shadow-xs border border-transparent',
    secondary:
      'bg-[#EBF3EF] hover:bg-[#DFECE6] active:bg-[#D2E4DC] text-[#115B42] border border-[#D5E4DC]',
    outline:
      'bg-white hover:bg-[#F7FAF8] active:bg-[#EDF3EF] text-[#172923] border border-[#E4ECE7] shadow-xs',
    danger:
      'bg-[#D64B4B] hover:bg-[#BD3D3D] active:bg-[#A63434] text-white shadow-xs border border-transparent',
    ghost:
      'bg-transparent hover:bg-[#F2F6F4] active:bg-[#E5EEE8] text-[#172923]'
  };

  const sizes: Record<ButtonSize, string> = {
    sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5',
    md: 'text-sm px-4 py-2 rounded-lg gap-2',
    lg: 'text-base px-5 py-2.5 rounded-lg gap-2.5'
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
