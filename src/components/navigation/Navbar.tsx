import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Features', href: '/#features' },
    { label: 'Why AushadhiSetu', href: '/#why-us' },
    { label: 'FAQ', href: '/#faq' }
  ];

  const scrollToHash = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E4ECE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Logo size="md" showTagline />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToHash(e, link.href)}
                className="text-sm font-medium text-[#687871] hover:text-[#167A55] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/app/dashboard">
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/auth/welcome">
                  <Button
                    variant="primary"
                    size="sm"
                    rightIcon={<ShieldCheck className="w-4 h-4" />}
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#687871] hover:text-[#172923] hover:bg-[#F2F6F4] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E4ECE7] bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToHash(e, link.href)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-[#172923] hover:bg-[#F2F6F4] hover:text-[#167A55]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-[#E4ECE7] space-y-2">
            {isAuthenticated ? (
              <Link to="/app/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" fullWidth size="md">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" fullWidth size="md">
                    Login
                  </Button>
                </Link>
                <Link to="/auth/welcome" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" fullWidth size="md">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
