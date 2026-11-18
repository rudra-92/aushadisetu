import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Camera, UploadCloud, FileEdit, ShieldCheck, AlertCircle } from 'lucide-react';
import { CameraScanner } from '../../components/verification/CameraScanner';
import { ImageUploader } from '../../components/verification/ImageUploader';
import { ManualEntryForm } from '../../components/verification/ManualEntryForm';
import { VerificationLoader } from '../../components/verification/VerificationLoader';
import { DemoPresets } from '../../components/verification/DemoPresets';
import { verificationService } from '../../services/verificationService';
import { useApp } from '../../context/AppContext';

export const VerificationPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { recordVerification, setLastVerificationResult } = useApp();

  const activeTabParam = searchParams.get('tab') || 'camera';
  const [activeTab, setActiveTab] = useState<'camera' | 'upload' | 'manual'>(
    activeTabParam === 'upload' ? 'upload' : activeTabParam === 'manual' ? 'manual' : 'camera'
  );

  const [isLoading, setIsLoading] = useState(false);
  const [presetHint, setPresetHint] = useState<string | undefined>();
  const [manualInitialData, setManualInitialData] = useState<any>(undefined);

  // Sync tab with query param
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'camera' || tab === 'upload' || tab === 'manual') {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: 'camera' | 'upload' | 'manual') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handlePresetSelect = (preset: {
    type: 'matched' | 'expired' | 'unmatched' | 'no-code';
    code?: string;
    medicineName?: string;
    batchNumber?: string;
    mfgDate?: string;
    expDate?: string;
    manufacturer?: string;
  }) => {
    setPresetHint(preset.code);

    if (activeTab === 'manual') {
      setManualInitialData({
        medicineName: preset.medicineName || '',
        manufacturer: preset.manufacturer || '',
        batchNumber: preset.batchNumber || '',
        mfgDate: preset.mfgDate || '',
        expDate: preset.expDate || '',
        productCode: preset.code || ''
      });
    } else {
      // Trigger verification directly using preset for demonstration convenience
      triggerVerification({
        method: activeTab,
        detectedCode: preset.code,
        manualData: {
          medicineName: preset.medicineName || 'Demo Product',
          batchNumber: preset.batchNumber || 'DEMO-BATCH',
          productCode: preset.code
        }
      });
    }
  };

  const triggerVerification = async (input: {
    method: 'camera' | 'upload' | 'manual';
    imageDataUrl?: string;
    detectedCode?: string;
    manualData?: any;
  }) => {
    setIsLoading(true);
    try {
      const result = await verificationService.verifyMedicine(input);
      recordVerification(result);
      setLastVerificationResult(result);
      navigate('/app/verify/result');
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleCameraCapture = (imageDataUrl: string, detectedCodeHint?: string) => {
    triggerVerification({
      method: 'camera',
      imageDataUrl,
      detectedCode: presetHint || detectedCodeHint || 'AS-PAR-500-001'
    });
  };

  const handleImageUploadVerify = (imageDataUrl: string, _fileName: string, presetCode?: string) => {
    triggerVerification({
      method: 'upload',
      imageDataUrl,
      detectedCode: presetHint || presetCode || 'AS-PAR-500-001'
    });
  };

  const handleManualVerify = (data: any) => {
    triggerVerification({
      method: 'manual',
      manualData: data,
      detectedCode: data.productCode
    });
  };

  if (isLoading) {
    return <VerificationLoader />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#167A55]">
          <ShieldCheck className="w-4 h-4" />
          <span>Core Authentication Module</span>
        </div>
        <h2 className="text-2xl font-bold text-[#172923]">Verify Your Medicine</h2>
        <p className="text-xs sm:text-sm text-[#687871]">
          Choose how you would like to check your medicine packaging.
        </p>
      </div>

      {/* Demonstration Shortcut Presets */}
      <DemoPresets onSelectPreset={handlePresetSelect} />

      {/* Tab Switcher */}
      <div className="bg-white rounded-xl border border-[#E4ECE7] p-1.5 flex items-center gap-1 shadow-xs">
        <button
          type="button"
          onClick={() => handleTabChange('camera')}
          className={`
            flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all
            ${
              activeTab === 'camera'
                ? 'bg-[#167A55] text-white shadow-xs'
                : 'text-[#687871] hover:text-[#172923] hover:bg-[#F2F6F4]'
            }
          `}
        >
          <Camera className="w-4 h-4" />
          <span>Take a Photo / Camera</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('upload')}
          className={`
            flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all
            ${
              activeTab === 'upload'
                ? 'bg-[#167A55] text-white shadow-xs'
                : 'text-[#687871] hover:text-[#172923] hover:bg-[#F2F6F4]'
            }
          `}
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload an Image</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('manual')}
          className={`
            flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all
            ${
              activeTab === 'manual'
                ? 'bg-[#167A55] text-white shadow-xs'
                : 'text-[#687871] hover:text-[#172923] hover:bg-[#F2F6F4]'
            }
          `}
        >
          <FileEdit className="w-4 h-4" />
          <span>Enter Details Manually</span>
        </button>
      </div>

      {/* Tab Content Panes */}
      <div className="pt-2">
        {activeTab === 'camera' && (
          <CameraScanner onCapture={handleCameraCapture} presetCode={presetHint} />
        )}

        {activeTab === 'upload' && (
          <ImageUploader onVerify={handleImageUploadVerify} presetCode={presetHint} />
        )}

        {activeTab === 'manual' && (
          <ManualEntryForm
            key={manualInitialData ? JSON.stringify(manualInitialData) : 'empty'}
            onVerify={handleManualVerify}
            initialValues={manualInitialData}
          />
        )}
      </div>

      {/* Demo Data Disclaimer */}
      <div className="p-3.5 bg-[#F7FAF8] border border-[#E4ECE7] rounded-xl text-xs text-[#687871] flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-[#167A55] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#172923]">DEMO RESULT NOTICE:</strong> This demonstration platform simulates pharmaceutical serialization verification and is not connected to a live statutory government database. Simulated matching does not independently guarantee chemical bioequivalence or authenticity.
        </p>
      </div>
    </div>
  );
};
