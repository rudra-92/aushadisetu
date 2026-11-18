import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/common/Logo';
import { Button } from '../../components/common/Button';
import { ShieldCheck, UserPlus, LogIn, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const WelcomePage: React.FC = () => {
  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleDemoAccess = () => {
    loginAsDemo();
    navigate('/app/dashboard');
  };

  return (
    <div className="space-y-6 text-center">
      {/* Brand Icon Header */}
      <div className="flex justify-center pb-1">
        <Logo size="lg" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-[#172923]">
          Welcome to AushadhiSetu
        </h2>
        <p className="text-xs sm:text-sm text-[#687871] max-w-sm mx-auto leading-relaxed">
          Your digital bridge to verified medicine information, packaging security, and consumer healthcare safety.
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="bg-[#F7FAF8] rounded-xl border border-[#E4ECE7] p-4 text-left space-y-2.5 text-xs text-[#172923]">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#167A55] shrink-0" />
          <span>Verify 2D DataMatrix and barcodes instantly</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#167A55] shrink-0" />
          <span>Check batch numbers & expiration details</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#167A55] shrink-0" />
          <span>Report suspicious or damaged packaging</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2">
        <Link to="/auth/register" className="block">
          <Button
            variant="primary"
            size="md"
            fullWidth
            leftIcon={<UserPlus className="w-4 h-4" />}
          >
            Create New Account
          </Button>
        </Link>

        <Link to="/auth/login" className="block">
          <Button
            variant="outline"
            size="md"
            fullWidth
            leftIcon={<LogIn className="w-4 h-4" />}
          >
            Sign In with Existing Account
          </Button>
        </Link>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E4ECE7]" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
            <span className="bg-white px-2 text-[#687871]">Evaluation Mode</span>
          </div>
        </div>

        {/* Demo / Guest Fast Pass */}
        <Button
          type="button"
          variant="secondary"
          size="md"
          fullWidth
          onClick={handleDemoAccess}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Continue as Guest (Demo Access)
        </Button>
      </div>

      <p className="text-[11px] text-[#687871]">
        By continuing, you agree to our terms and acknowledge the platform safety notice.
      </p>
    </div>
  );
};
