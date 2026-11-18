import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, Database, CheckCircle2 } from 'lucide-react';

export const VerificationLoader: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { label: 'Reading barcode & packaging data...', icon: Search },
    { label: 'Cross-referencing batch registry...', icon: Database },
    { label: 'Verifying manufacturing records...', icon: ShieldCheck },
    { label: 'Finalizing verification outcome...', icon: CheckCircle2 }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 350);
    const timer2 = setTimeout(() => setStep(2), 750);
    const timer3 = setTimeout(() => setStep(3), 1150);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-[#E4ECE7] p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs space-y-6 animate-in fade-in duration-200">
      {/* Precision spinning radar indicator */}
      <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-3 border-[#E4ECE7]" />
        <div className="absolute inset-0 rounded-full border-3 border-[#167A55] border-t-transparent animate-spin" />
        <div className="w-12 h-12 rounded-full bg-[#167A55]/10 text-[#167A55] flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 animate-pulse" />
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-semibold text-[#172923]">
          Checking available medicine information...
        </h3>
        <p className="text-xs text-[#687871]">
          Please wait while we inspect the product identifier against available records.
        </p>
      </div>

      {/* Progress sequence */}
      <div className="bg-[#F7FAF8] rounded-xl border border-[#E4ECE7] p-4 text-left space-y-2.5">
        {steps.map((s, index) => {
          const Icon = s.icon;
          const isDone = index < step;
          const isCurrent = index === step;
          return (
            <div
              key={s.label}
              className={`flex items-center gap-2.5 text-xs transition-colors duration-200 ${
                isDone
                  ? 'text-[#218653] font-medium'
                  : isCurrent
                  ? 'text-[#167A55] font-semibold'
                  : 'text-[#9AA8A1]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                  isDone
                    ? 'bg-[#218653] text-white border-[#218653]'
                    : isCurrent
                    ? 'border-[#167A55] text-[#167A55] bg-white'
                    : 'border-[#E4ECE7] text-[#9AA8A1] bg-white'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Icon className={`w-3 h-3 ${isCurrent ? 'animate-pulse' : ''}`} />
                )}
              </div>
              <span>{s.label}</span>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-[#9AA8A1]">
        DEMO RESULT – Not connected to a live pharmaceutical database.
      </p>
    </div>
  );
};
