import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  User,
  HeartHandshake,
  Users,
  Camera,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Logo } from '../../components/common/Logo';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole>('Consumer');
  const { completeOnboarding, user } = useAuth();
  const navigate = useNavigate();

  const handleFinish = () => {
    completeOnboarding(selectedRole);
    navigate('/app/dashboard');
  };

  const handleSkip = () => {
    completeOnboarding('Consumer');
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="max-w-xl w-full mx-auto flex items-center justify-between">
        <Logo size="sm" showTagline />
        {currentStep < 4 && (
          <button
            onClick={handleSkip}
            className="text-xs font-medium text-[#687871] hover:text-[#172923]"
          >
            Skip for now
          </button>
        )}
      </div>

      {/* Main Container */}
      <div className="w-full max-w-xl mx-auto my-6">
        <div className="bg-white rounded-2xl border border-[#E4ECE7] shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6">
          {/* Step Progress Bar */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#167A55]">
              Step {currentStep} of 4
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-6 h-1.5 rounded-full transition-colors ${
                    step <= currentStep ? 'bg-[#167A55]' : 'bg-[#E4ECE7]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* STEP 1: WELCOME */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="w-14 h-14 rounded-2xl bg-[#167A55]/10 text-[#167A55] flex items-center justify-center">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-[#172923]">
                  Welcome to AushadhiSetu
                </h2>
                <p className="text-sm text-[#687871] leading-relaxed">
                  Hello {user?.name || 'there'}! AushadhiSetu is built to provide transparency in pharmaceutical packaging, helping you inspect medicines, verify registered batches, and stay informed on drug safety.
                </p>
              </div>

              <div className="bg-[#F7FAF8] rounded-xl border border-[#E4ECE7] p-4 space-y-3 text-xs text-[#172923]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#167A55] shrink-0 mt-0.5" />
                  <span>Scan 2D DataMatrix and barcodes directly with your camera</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#167A55] shrink-0 mt-0.5" />
                  <span>Check manufacturer batch registration and expiry status</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#167A55] shrink-0 mt-0.5" />
                  <span>Flag suspicious packaging or smudged lot numbers safely</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  variant="primary"
                  onClick={() => setCurrentStep(2)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: USER TYPE */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#172923]">
                  How will you use AushadhiSetu?
                </h2>
                <p className="text-xs text-[#687871]">
                  Select the profile that best describes your healthcare primary focus.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    role: 'Consumer' as UserRole,
                    title: 'Consumer',
                    desc: 'Checking personal prescriptions, family medicines, and everyday over-the-counter health items.',
                    icon: User
                  },
                  {
                    role: 'Caregiver' as UserRole,
                    title: 'Caregiver',
                    desc: 'Managing and verifying regular medical supplies for elderly family members, patients, or children.',
                    icon: HeartHandshake
                  },
                  {
                    role: 'Other' as UserRole,
                    title: 'Other Healthcare Interest',
                    desc: 'Student, academic researcher, pharmacist, or community health worker evaluating pharmaceutical traceability.',
                    icon: Users
                  }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedRole === item.role;
                  return (
                    <div
                      key={item.role}
                      onClick={() => setSelectedRole(item.role)}
                      className={`
                        p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5
                        ${
                          isSelected
                            ? 'border-[#167A55] bg-[#F0F8F4]/80 ring-1 ring-[#167A55]'
                            : 'border-[#E4ECE7] hover:border-[#CCD8D1] bg-white'
                        }
                      `}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-[#167A55] text-white' : 'bg-[#F2F6F4] text-[#687871]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-[#172923]">{item.title}</h4>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#167A55]" />}
                        </div>
                        <p className="text-xs text-[#687871] mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setCurrentStep(3)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: CAMERA PERMISSION EXPLANATION */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="w-14 h-14 rounded-2xl bg-[#3978B8]/10 text-[#3978B8] flex items-center justify-center">
                <Camera className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-[#172923]">
                  Camera Access for Medicine Scanning
                </h2>
                <p className="text-sm text-[#687871] leading-relaxed">
                  AushadhiSetu uses your camera to quickly read 2D DataMatrix codes, GS1 barcodes, and capture packaging condition photos.
                </p>
              </div>

              <div className="bg-[#F2F7FB] border border-[#D5E5F2] rounded-xl p-4 text-xs text-[#2B639B] space-y-2">
                <p className="font-semibold text-sm">Privacy-First Permissions:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Your browser will only ask for camera permission when you explicitly choose to scan.</li>
                  <li>No camera feed or images are analyzed without your deliberate action.</li>
                  <li>You can always upload existing gallery photos or enter batch codes manually if you prefer not to use the camera.</li>
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setCurrentStep(4)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  I Understand
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: COMPLETE */}
          {currentStep === 4 && (
            <div className="space-y-6 text-center animate-in fade-in py-2">
              <div className="w-16 h-16 rounded-full bg-[#218653]/10 text-[#218653] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-[#172923]">
                  You're Ready to Use AushadhiSetu
                </h2>
                <p className="text-sm text-[#687871] max-w-sm mx-auto leading-relaxed">
                  Your safety portal is active. You can now verify medicine packaging, explore educational safety articles, and review verification records anytime.
                </p>
              </div>

              <div className="pt-4 max-w-xs mx-auto">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleFinish}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-xl w-full mx-auto text-center text-xs text-[#687871]">
        <span>AushadhiSetu Pharmaceutical Platform • Demonstration Prototype</span>
      </div>
    </div>
  );
};
