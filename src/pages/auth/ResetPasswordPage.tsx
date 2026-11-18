import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { KeyRound, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/auth/login');
      }, 1500);
    }, 700);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <div className="w-12 h-12 rounded-xl bg-[#167A55]/10 text-[#167A55] flex items-center justify-center mx-auto mb-2">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#172923]">Reset Your Password</h2>
        <p className="text-xs text-[#687871]">
          Create a new strong password for your AushadhiSetu account.
        </p>
      </div>

      {isSuccess ? (
        <div className="p-4 bg-[#F0F8F4] border border-[#D1EBDD] rounded-xl text-center space-y-2 animate-in fade-in">
          <CheckCircle2 className="w-8 h-8 text-[#218653] mx-auto" />
          <h4 className="text-sm font-semibold text-[#165C39]">Password Reset Completed</h4>
          <p className="text-xs text-[#687871]">Redirecting to login with your updated credentials...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="New Password"
            required
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(null);
            }}
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

          <Input
            type={showPassword ? 'text' : 'password'}
            label="Confirm New Password"
            required
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (error) setError(null);
            }}
            error={error || undefined}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Update Password
          </Button>

          <div className="text-center pt-2">
            <Link to="/auth/login" className="text-xs text-[#167A55] hover:underline font-medium">
              Cancel & Return to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};
