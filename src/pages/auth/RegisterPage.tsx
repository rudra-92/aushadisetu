import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const passwordScore = getPasswordStrength(formData.password);

  const getStrengthLabel = (score: number) => {
    if (formData.password.length === 0) return { label: '', color: 'bg-transparent', textColor: '' };
    if (score <= 1) return { label: 'Weak', color: 'bg-[#D64B4B]', textColor: 'text-[#D64B4B]' };
    if (score === 2) return { label: 'Fair', color: 'bg-[#D99126]', textColor: 'text-[#D99126]' };
    if (score === 3) return { label: 'Good', color: 'bg-[#2B9C8A]', textColor: 'text-[#2B9C8A]' };
    return { label: 'Strong', color: 'bg-[#218653]', textColor: 'text-[#218653]' };
  };

  const strengthInfo = getStrengthLabel(passwordScore);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Mobile number is required.';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid mobile number.';
    }

    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      errs.password = 'Password must be at least 8 characters long.';
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.acceptTerms) {
      errs.acceptTerms = 'You must accept the terms and privacy policy.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Store pending register details in sessionStorage for OTP step
    sessionStorage.setItem('aushadhi_pending_reg', JSON.stringify({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    }));

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/auth/verify-otp');
    }, 700);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-[#172923]">Create Your Account</h2>
        <p className="text-xs text-[#687871]">
          Join AushadhiSetu to verify medicines and keep personal safety records.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          required
          placeholder="e.g. Aarav Sharma"
          value={formData.fullName}
          onChange={(e) => {
            setFormData({ ...formData, fullName: e.target.value });
            if (errors.fullName) setErrors({ ...errors, fullName: '' });
          }}
          error={errors.fullName}
        />

        <Input
          type="email"
          label="Email Address"
          required
          placeholder="e.g. aarav.sharma@example.com"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          error={errors.email}
        />

        <Input
          type="tel"
          label="Mobile Number"
          required
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={(e) => {
            setFormData({ ...formData, phone: e.target.value });
            if (errors.phone) setErrors({ ...errors, phone: '' });
          }}
          error={errors.phone}
        />

        {/* Password Field with Visibility Toggle */}
        <div className="space-y-1">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            required
            placeholder="At least 8 characters"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            error={errors.password}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#687871] hover:text-[#172923] p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />

          {/* Password Strength Indicator */}
          {formData.password.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#687871]">Password Strength:</span>
                <span className={`font-semibold ${strengthInfo.textColor}`}>
                  {strengthInfo.label}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1 h-1.5">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`rounded-full transition-colors ${
                      passwordScore >= step ? strengthInfo.color : 'bg-[#E4ECE7]'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Requirements Checklist */}
          <div className="pt-1.5 space-y-1 text-[11px] text-[#687871]">
            <p className="flex items-center gap-1.5">
              <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                formData.password.length >= 8 ? 'bg-[#218653] text-white' : 'bg-[#E4ECE7] text-[#687871]'
              }`}>
                ✓
              </span>
              <span>8 or more characters</span>
            </p>
            <p className="flex items-center gap-1.5">
              <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'bg-[#218653] text-white' : 'bg-[#E4ECE7] text-[#687871]'
              }`}>
                ✓
              </span>
              <span>Both uppercase & lowercase letters</span>
            </p>
            <p className="flex items-center gap-1.5">
              <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                /[0-9]/.test(formData.password) || /[^A-Za-z0-9]/.test(formData.password) ? 'bg-[#218653] text-white' : 'bg-[#E4ECE7] text-[#687871]'
              }`}>
                ✓
              </span>
              <span>At least one number or special character</span>
            </p>
          </div>
        </div>

        {/* Confirm Password */}
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          label="Confirm Password"
          required
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={(e) => {
            setFormData({ ...formData, confirmPassword: e.target.value });
            if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
          }}
          error={errors.confirmPassword}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-[#687871] hover:text-[#172923] p-1"
              aria-label="Toggle confirm password visibility"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        {/* Terms and Privacy Policy Checkbox */}
        <div className="space-y-1 pt-1">
          <label className="flex items-start gap-2.5 text-xs text-[#687871] cursor-pointer">
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => {
                setFormData({ ...formData, acceptTerms: e.target.checked });
                if (errors.acceptTerms) setErrors({ ...errors, acceptTerms: '' });
              }}
              className="mt-0.5 rounded border-[#E4ECE7] text-[#167A55] focus:ring-[#167A55]"
            />
            <span>
              I agree to the{' '}
              <a href="#terms" className="text-[#167A55] font-medium hover:underline">
                Terms of Service
              </a>{' '}
              and acknowledge the{' '}
              <a href="#privacy" className="text-[#167A55] font-medium hover:underline">
                Medical Privacy Policy
              </a>
              .
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-xs text-[#D64B4B]">{errors.acceptTerms}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create Account
          </Button>
        </div>
      </form>

      {/* Existing account link */}
      <div className="text-center pt-2 border-t border-[#E4ECE7] text-xs text-[#687871]">
        Already have an account?{' '}
        <Link to="/auth/login" className="font-semibold text-[#167A55] hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};
