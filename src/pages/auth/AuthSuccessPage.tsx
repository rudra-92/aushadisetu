import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export const AuthSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="text-center space-y-6 py-4 animate-in fade-in">
      <div className="w-16 h-16 rounded-2xl bg-[#218653]/10 text-[#218653] flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[#172923]">
          Account Verified Successfully
        </h2>
        <p className="text-sm text-[#687871] max-w-sm mx-auto leading-relaxed">
          Welcome to AushadhiSetu, <strong className="text-[#172923]">{user?.name || 'Aarav'}</strong>. Preparing your personalized medicine safety portal...
        </p>
      </div>

      <div className="bg-[#F7FAF8] rounded-xl border border-[#E4ECE7] p-3 text-xs text-[#167A55] inline-flex items-center gap-2">
        <ShieldCheck className="w-4 h-4" />
        <span>Secure authentication token initialized</span>
      </div>

      <div className="pt-4">
        <Button
          variant="primary"
          fullWidth
          onClick={() => navigate('/onboarding')}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Proceed to Onboarding Setup
        </Button>
      </div>
    </div>
  );
};
