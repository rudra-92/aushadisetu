import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7FAF8] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <Logo size="md" showTagline linkTo="/" />
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#687871] hover:text-[#167A55] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Form Center */}
      <div className="w-full max-w-md mx-auto my-8">
        <div className="bg-white rounded-2xl border border-[#E4ECE7] shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8">
          <Outlet />
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-md w-full mx-auto text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs text-[#167A55] font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>Encrypted Demonstration Healthcare Portal</span>
        </div>
        <p className="text-[11px] text-[#687871]">
          AushadhiSetu does not store unencrypted health data. Demonstration sandbox active.
        </p>
      </div>
    </div>
  );
};
