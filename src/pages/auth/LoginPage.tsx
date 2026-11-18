import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, LogIn, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState('aarav.sharma@example.com');
  const [password, setPassword] = useState('SafetyFirst2026!');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/app/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError('Please enter your email or mobile number.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    const result = await login(identifier, password, rememberMe);
    setIsLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Invalid credentials.');
    }
  };

  const handleDemoLogin = () => {
    loginAsDemo();
    navigate(from, { replace: true });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-[#172923]">Sign In to AushadhiSetu</h2>
        <p className="text-xs text-[#687871]">
          Access your medicine verification history and safety dashboard.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-[#FDF3F3] border border-[#F8D2D2] rounded-lg text-xs text-[#C73838] flex items-center gap-2">
          <span>{error}</span>
        </div>
      )}

      {/* Demo Quick-Fill Pill */}
      <div className="bg-[#F0F8F4] border border-[#D1EBDD] rounded-xl p-3 flex items-center justify-between text-xs text-[#165C39]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#167A55]" />
          <span>Demo credentials pre-filled</span>
        </div>
        <button
          type="button"
          onClick={handleDemoLogin}
          className="font-semibold text-[#167A55] hover:underline"
        >
          1-Click Login →
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email or Mobile Number"
          required
          placeholder="e.g. user@example.com or mobile"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
            if (error) setError(null);
          }}
        />

        <div className="space-y-1">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            required
            placeholder="Enter your password"
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
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-[#687871] cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-[#E4ECE7] text-[#167A55] focus:ring-[#167A55]"
            />
            <span>Remember me</span>
          </label>
          <Link
            to="/auth/forgot-password"
            className="text-[#167A55] hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <div className="pt-2 space-y-2">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            rightIcon={<LogIn className="w-4 h-4" />}
          >
            Sign In
          </Button>

          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={handleDemoLogin}
          >
            Continue as Guest (Demo Access)
          </Button>
        </div>
      </form>

      <div className="text-center pt-2 border-t border-[#E4ECE7] text-xs text-[#687871]">
        Don't have an account yet?{' '}
        <Link to="/auth/register" className="font-semibold text-[#167A55] hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  );
};
