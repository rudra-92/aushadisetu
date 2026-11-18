import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      required,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <div className="flex justify-between items-center text-xs">
            <label
              htmlFor={inputId}
              className="font-medium text-[#172923] flex items-center gap-1"
            >
              {label}
              {required && <span className="text-[#D64B4B]">*</span>}
            </label>
          </div>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-[#687871] pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={`
              w-full bg-white text-sm text-[#172923] placeholder:text-[#9AA8A1] rounded-lg border transition-colors
              py-2.5 px-3.5
              ${leftIcon ? 'pl-9' : ''}
              ${rightIcon ? 'pr-9' : ''}
              ${
                error
                  ? 'border-[#D64B4B] focus:border-[#D64B4B] focus:ring-1 focus:ring-[#D64B4B]'
                  : 'border-[#E4ECE7] hover:border-[#CCD8D1] focus:border-[#167A55] focus:ring-1 focus:ring-[#167A55]'
              }
              disabled:bg-[#F7FAF8] disabled:text-[#9AA8A1] disabled:cursor-not-allowed
              ${className}
            `}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 text-[#687871] flex items-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-xs text-[#D64B4B] flex items-center gap-1 mt-1 font-medium">
            <svg
              className="w-3.5 h-3.5 shrink-0"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm-.75-9.75a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-1.5 0v-4zm.75 6.75a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z"
              />
            </svg>
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-[#687871]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
