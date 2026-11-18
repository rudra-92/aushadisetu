import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

export type AlertType = 'info' | 'success' | 'warning' | 'danger';

interface AlertProps {
  type?: AlertType;
  title?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  className = '',
  action
}) => {
  const styles: Record<AlertType, { container: string; icon: React.ReactNode; titleColor: string }> = {
    info: {
      container: 'bg-[#F2F7FB] border-[#D5E5F2] text-[#2B639B]',
      icon: <Info className="w-5 h-5 text-[#3978B8] shrink-0" />,
      titleColor: 'text-[#1D4E7E]'
    },
    success: {
      container: 'bg-[#F0F8F4] border-[#D1EBDD] text-[#218653]',
      icon: <CheckCircle2 className="w-5 h-5 text-[#218653] shrink-0" />,
      titleColor: 'text-[#165C39]'
    },
    warning: {
      container: 'bg-[#FDF9F2] border-[#F5E5C9] text-[#9E6510]',
      icon: <AlertTriangle className="w-5 h-5 text-[#D99126] shrink-0" />,
      titleColor: 'text-[#87550C]'
    },
    danger: {
      container: 'bg-[#FDF3F3] border-[#F8D2D2] text-[#B83838]',
      icon: <AlertCircle className="w-5 h-5 text-[#D64B4B] shrink-0" />,
      titleColor: 'text-[#962626]'
    }
  };

  const current = styles[type];

  return (
    <div
      className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border text-sm ${current.container} ${className}`}
    >
      <div className="pt-0.5">{current.icon}</div>
      <div className="flex-1">
        {title && <h5 className={`font-semibold mb-0.5 ${current.titleColor}`}>{title}</h5>}
        <div className="text-xs sm:text-sm leading-relaxed opacity-90">{children}</div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
