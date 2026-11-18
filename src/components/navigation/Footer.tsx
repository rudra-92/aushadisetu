import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { ShieldCheck, Mail, HelpCircle, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E4ECE7] text-[#172923] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#E4ECE7]">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="lg" showTagline />
            <p className="text-sm text-[#687871] max-w-md leading-relaxed">
              "Your Health. Your Trust. Our Priority."
            </p>
            <p className="text-xs text-[#687871] max-w-md leading-relaxed">
              AushadhiSetu is a digital bridge between consumers and verified pharmaceutical product information. We provide intuitive tools to verify packaging serials, spot irregularities, and support safe medicine awareness.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#167A55] font-medium pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Dedicated to Consumer Pharmaceutical Safety & Education</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#172923]">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#687871]">
              <li>
                <Link to="/" className="hover:text-[#167A55] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/app/verify" className="hover:text-[#167A55] transition-colors">
                  Verify Medicine
                </Link>
              </li>
              <li>
                <Link to="/app/safety" className="hover:text-[#167A55] transition-colors">
                  Medicine Safety Articles
                </Link>
              </li>
              <li>
                <Link to="/app/reports/new" className="hover:text-[#167A55] transition-colors">
                  Report Suspicious Product
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-[#167A55] transition-colors">
                  Help & Support Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#172923]">
              Transparency & Legal
            </h4>
            <ul className="space-y-2 text-sm text-[#687871]">
              <li className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <Link to="/support#faq" className="hover:text-[#167A55] transition-colors">
                  Privacy Policy (Demo)
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <Link to="/support#faq" className="hover:text-[#167A55] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <Link to="/support#faq" className="hover:text-[#167A55] transition-colors">
                  Medical Disclaimer
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <Link to="/support" className="hover:text-[#167A55] transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="py-6 border-b border-[#E4ECE7] text-xs text-[#687871] leading-relaxed">
          <p className="font-semibold text-[#172923] mb-1">Important Safety Notice & Disclaimer:</p>
          <p>
            AushadhiSetu is a prototype platform designed for demonstration, educational awareness, and packaging traceability inspection. Matching of batch data or packaging barcodes does not independently establish chemical purity, clinical bioequivalence, or therapeutic safety. Never self-medicate or alter your prescribed therapy without consulting a qualified medical doctor or registered pharmacist. If you suspect an adverse drug reaction or physical danger, seek professional emergency medical attention immediately.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#687871] gap-4">
          <p>© {new Date().getFullYear()} AushadhiSetu. Built for safer, verified healthcare access.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-[#218653]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#218653]" />
              Demo Environment Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
