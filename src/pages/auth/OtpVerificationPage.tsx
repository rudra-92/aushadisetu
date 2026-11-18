import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, CheckCircle2, ArrowRight, RotateCw } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export const OtpVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerifiedSuccess, setIsVerifiedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Retrieve pending registration info
  const pendingReg = JSON.parse(sessionStorage.getItem('aushadhi_pending_reg') || '{}');
  const targetEmail = pendingReg.email || 'aarav.sharma@example.com';

  useEffect(() => {
    // Focus first input
    inputRefs.current[0]?.focus();

    // Timer countdown
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    setError(null);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(['', '', '', '', '', '']);
    setResendTimer(30);
    setCanResend(false);
    setError(null);
    inputRefs.current[0]?.focus();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }

    setIsVerifying(true);
    setError(null);

    // Complete local registration session
    await register(
      pendingReg.name || 'Demo User',
      pendingReg.email || targetEmail,
      pendingReg.phone || '+91 98765 43210',
      pendingReg.password || 'Secret123!'
    );

    setTimeout(() => {
      setIsVerifying(false);
      setIsVerifiedSuccess(true);
      setTimeout(() => {
        navigate('/auth/success');
      }, 1200);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Icon & Title */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-[#167A55]/10 text-[#167A55] flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#172923]">Verify Your Email</h2>
        <p className="text-xs text-[#687871] max-w-xs mx-auto leading-relaxed">
          We sent a demonstration 6-digit verification code to:
          <br />
          <span className="font-semibold text-[#172923]">{targetEmail}</span>
        </p>
      </div>

      {isVerifiedSuccess ? (
        <div className="p-4 bg-[#F0F8F4] border border-[#D1EBDD] rounded-xl text-center space-y-2 animate-in fade-in">
          <div className="w-10 h-10 rounded-full bg-[#218653] text-white flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-[#165C39]">Email Verified Successfully</p>
          <p className="text-xs text-[#687871]">Redirecting to onboarding setup...</p>
        </div>
      ) : (
        <form onSubmit={handleVerify} className="space-y-5">
          {/* 6 Digit Inputs */}
          <div>
            <div className="flex items-center justify-center gap-2 sm:gap-2.5" onPaste={handlePaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => { inputRefs.current[idx] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className={`
                    w-11 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold font-mono rounded-lg border transition-all
                    ${
                      digit
                        ? 'border-[#167A55] bg-white text-[#172923] shadow-xs'
                        : 'border-[#E4ECE7] bg-[#F7FAF8] text-[#172923]'
                    }
                    focus:outline-none focus:border-[#167A55] focus:bg-white focus:ring-2 focus:ring-[#167A55]/20
                  `}
                />
              ))}
            </div>

            {error && (
              <p className="text-xs text-[#D64B4B] text-center mt-2 font-medium">
                {error}
              </p>
            )}

            <div className="bg-[#F7FAF8] border border-[#E4ECE7] rounded-lg p-2.5 mt-4 text-center text-[11px] text-[#687871]">
              <span>Demo Mode Tip: Any 6 digits (e.g. </span>
              <button
                type="button"
                onClick={() => setOtp(['1', '2', '3', '4', '5', '6'])}
                className="font-mono font-semibold text-[#167A55] underline"
              >
                123456
              </button>
              <span>) are accepted for simulation.</span>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isVerifying}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Verify & Continue
          </Button>

          {/* Resend OTP & Change Email */}
          <div className="flex flex-col items-center gap-2 pt-2 text-xs text-[#687871]">
            <div className="flex items-center gap-1.5">
              <span>Didn't receive the code?</span>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="font-semibold text-[#167A55] hover:underline flex items-center gap-1"
                >
                  <RotateCw className="w-3 h-3" />
                  Resend Code
                </button>
              ) : (
                <span className="font-mono text-[#9AA8A1]">
                  Resend in {resendTimer}s
                </span>
              )}
            </div>

            <Link
              to="/auth/register"
              className="text-[#167A55] hover:underline text-[11px]"
            >
              Change Email Address
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};
