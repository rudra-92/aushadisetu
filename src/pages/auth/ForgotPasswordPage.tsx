import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid registered email address.');
      return;
    }
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 700);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <div className="w-12 h-12 rounded-xl bg-[#167A55]/10 text-[#167A55] flex items-center justify-center mx-auto mb-2">
          <Mail className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#172923]">Forgot Password</h2>
        <p className="text-xs text-[#687871]">
          Enter your email to receive a password reset link.
        </p>
      </div>

      {isSent ? (
        <div className="space-y-4 text-center">
          <div className="p-4 bg-[#F0F8F4] border border-[#D1EBDD] rounded-xl text-xs text-[#165C39] space-y-1.5">
            <CheckCircle2 className="w-5 h-5 text-[#218653] mx-auto" />
            <p className="font-semibold text-sm">Reset Link Dispatched</p>
            <p className="text-[#687871]">
              A demonstration password reset email has been simulated for{' '}
              <strong className="text-[#172923]">{email}</strong>.
            </p>
          </div>

          <div className="pt-2 space-y-2">
            <Link to="/auth/reset-password">
              <Button variant="primary" fullWidth size="md">
                Proceed to Reset Password Page
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="ghost" fullWidth size="md">
                Return to Login
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email Address"
            required
            placeholder="e.g. name@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
            Send Reset Link
          </Button>

          <div className="text-center pt-2">
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#167A55] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};
