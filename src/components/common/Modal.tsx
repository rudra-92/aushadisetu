import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#172923]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Dialog box */}
      <div
        className={`relative w-full ${maxWidths[maxWidth]} bg-white rounded-2xl border border-[#E4ECE7] shadow-xl p-6 z-10 animate-in fade-in zoom-in-95 duration-150`}
        role="dialog"
      >
        <div className="flex items-start justify-between pb-3 border-b border-[#E4ECE7]">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-[#172923]">{title}</h3>
            )}
            {description && (
              <p className="text-xs text-[#687871] mt-0.5">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[#687871] hover:text-[#172923] p-1 rounded-lg hover:bg-[#F2F6F4] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
