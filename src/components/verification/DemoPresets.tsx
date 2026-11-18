import React from 'react';
import { Sparkles, CheckCircle2, Clock, AlertTriangle, HelpCircle } from 'lucide-react';

interface DemoPresetsProps {
  onSelectPreset: (preset: {
    type: 'matched' | 'expired' | 'unmatched' | 'no-code';
    code?: string;
    medicineName?: string;
    batchNumber?: string;
    mfgDate?: string;
    expDate?: string;
    manufacturer?: string;
  }) => void;
}

export const DemoPresets: React.FC<DemoPresetsProps> = ({ onSelectPreset }) => {
  return (
    <div className="bg-[#F7FAF8] border border-[#E4ECE7] rounded-xl p-3.5 sm:p-4">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#172923] mb-2.5">
        <Sparkles className="w-4 h-4 text-[#167A55]" />
        <span>Demonstration Testing Shortcuts (1-Click Test Scenarios)</span>
      </div>
      <p className="text-xs text-[#687871] mb-3">
        Quickly test all verification states without needing a physical medicine package:
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() =>
            onSelectPreset({
              type: 'matched',
              code: 'AS-PAR-500-001',
              medicineName: 'Paracetamol 500 mg',
              batchNumber: 'PCM2026A01',
              manufacturer: 'Example Pharmaceuticals Ltd.',
              mfgDate: '2026-01',
              expDate: '2027-12'
            })
          }
          className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E4ECE7] hover:border-[#218653] hover:bg-[#F0F8F4] text-left transition-all group"
        >
          <div className="w-6 h-6 rounded-md bg-[#218653]/10 text-[#218653] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#172923] truncate">Paracetamol</p>
            <p className="text-[10px] text-[#218653] font-medium">Matched Result</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            onSelectPreset({
              type: 'expired',
              code: 'AS-AMX-500-092',
              medicineName: 'Amoxicillin 500 mg',
              batchNumber: 'AMX-2023-X9',
              manufacturer: 'BioMedix Formulations Ltd.',
              mfgDate: '2023-03',
              expDate: '2025-10'
            })
          }
          className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E4ECE7] hover:border-[#D99126] hover:bg-[#FDF9F2] text-left transition-all group"
        >
          <div className="w-6 h-6 rounded-md bg-[#D99126]/10 text-[#D99126] flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#172923] truncate">Amoxicillin</p>
            <p className="text-[10px] text-[#D99126] font-medium">Expired State</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            onSelectPreset({
              type: 'unmatched',
              code: 'FAKE-SYRUP-99',
              medicineName: 'Unregistered Cough Syrup',
              batchNumber: 'UNK-99410-Q',
              manufacturer: 'Unverified Entity'
            })
          }
          className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E4ECE7] hover:border-[#D64B4B] hover:bg-[#FDF3F3] text-left transition-all group"
        >
          <div className="w-6 h-6 rounded-md bg-[#D64B4B]/10 text-[#D64B4B] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#172923] truncate">Unknown Syrup</p>
            <p className="text-[10px] text-[#D64B4B] font-medium">Unmatched Result</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            onSelectPreset({
              type: 'no-code',
              code: 'BLURRY-CODE',
              medicineName: 'Blurry Photo Test'
            })
          }
          className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E4ECE7] hover:border-[#3978B8] hover:bg-[#F2F7FB] text-left transition-all group"
        >
          <div className="w-6 h-6 rounded-md bg-[#3978B8]/10 text-[#3978B8] flex items-center justify-center shrink-0">
            <HelpCircle className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#172923] truncate">Blurry Picture</p>
            <p className="text-[10px] text-[#3978B8] font-medium">No Code State</p>
          </div>
        </button>
      </div>
    </div>
  );
};
