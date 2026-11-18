import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  QrCode,
  AlertTriangle,
  FileSearch,
  History,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Smartphone,
  Eye,
  Info
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { FAQS_DATA } from '../../data/faqsData';

export const LandingPage: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="space-y-20 sm:space-y-28 py-6 sm:py-12">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#167A55]/10 text-[#167A55] text-xs font-semibold border border-[#167A55]/20">
              <span className="w-2 h-2 rounded-full bg-[#167A55]" />
              <span>Pharmaceutical Safety & Traceability</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#172923] leading-[1.15]">
              Know Your Medicine. <br className="hidden sm:block" />
              <span className="text-[#167A55]">Protect Your Health.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#687871] max-w-2xl leading-relaxed">
              Verify medicine information, identify potentially suspicious products and make more informed healthcare decisions through one simple platform.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link to="/auth/welcome">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  fullWidth
                >
                  Get Started
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" fullWidth>
                  How It Works
                </Button>
              </a>
            </div>

            {/* Micro reassurance badges */}
            <div className="pt-4 border-t border-[#E4ECE7] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#687871]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#218653] shrink-0" />
                <span>2D Matrix & Barcodes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#218653] shrink-0" />
                <span>Direct Batch Lookup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#218653] shrink-0" />
                <span>Educational Awareness</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column: Realistic Medicine Package + Smartphone Scanner */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Clean Medicine Carton Representation */}
              <div className="bg-white rounded-2xl border border-[#E4ECE7] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 space-y-5">
                {/* Pharmaceutical Strip / Carton Header */}
                <div className="flex items-start justify-between border-b border-[#E4ECE7] pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#167A55] bg-[#EBF3EF] px-2 py-0.5 rounded">
                      Standard Prescription
                    </span>
                    <h3 className="text-lg font-bold text-[#172923] mt-1">Paracetamol Tablets IP</h3>
                    <p className="text-xs text-[#687871]">500 mg • 10 Film-coated Tablets</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-[#F7FAF8] border border-[#E4ECE7] flex items-center justify-center text-[#167A55]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>

                {/* Smartphone Scanner Overlay Frame */}
                <div className="relative bg-[#F7FAF8] rounded-xl border border-[#E4ECE7] p-4 space-y-3 overflow-hidden">
                  <div className="flex items-center justify-between text-xs text-[#687871]">
                    <span className="flex items-center gap-1.5 font-medium text-[#172923]">
                      <Smartphone className="w-3.5 h-3.5 text-[#167A55]" />
                      AushadhiSetu Optical Scanner
                    </span>
                    <span className="text-[10px] bg-[#218653]/10 text-[#218653] font-semibold px-2 py-0.5 rounded">
                      Live Focus
                    </span>
                  </div>

                  {/* Simulated 2D Matrix Code Area with Target Box */}
                  <div className="relative bg-white rounded-lg border border-[#E4ECE7] p-4 flex items-center justify-center h-44">
                    {/* Viewfinder brackets */}
                    <div className="absolute inset-4 pointer-events-none">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#167A55]" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#167A55]" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#167A55]" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#167A55]" />
                      <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#167A55]/40 animate-pulse" />
                    </div>

                    {/* Clean Data Matrix Graphic */}
                    <div className="flex flex-col items-center gap-2">
                      <QrCode className="w-20 h-20 text-[#172923]/80" />
                      <div className="text-[10px] font-mono text-[#687871] bg-[#F7FAF8] px-2 py-0.5 rounded border border-[#E4ECE7]">
                        AS-PAR-500-001 • PCM2026A01
                      </div>
                    </div>
                  </div>

                  {/* Immediate Match Pill */}
                  <div className="bg-[#F0F8F4] border border-[#D1EBDD] rounded-lg p-2.5 flex items-center justify-between text-xs text-[#165C39]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#218653]" />
                      <span className="font-semibold">Match Found in Registry</span>
                    </div>
                    <span className="text-[10px] text-[#218653] font-bold">EXP 12/2027</span>
                  </div>
                </div>

                {/* Carton Info Footer */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#687871] pt-1">
                  <div>
                    <span className="block text-[#9AA8A1]">Batch Number:</span>
                    <span className="font-mono font-medium text-[#172923]">PCM2026A01</span>
                  </div>
                  <div>
                    <span className="block text-[#9AA8A1]">Manufacturer:</span>
                    <span className="font-medium text-[#172923]">Example Pharma Ltd.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#167A55]">
            Simple Three-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172923]">
            How AushadhiSetu Works
          </h2>
          <p className="text-sm text-[#687871]">
            Fast, accessible verification designed for everyday consumers at the pharmacy counter or at home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-xl border border-[#E4ECE7] p-6 sm:p-8 space-y-4 hover:border-[#167A55]/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#167A55] bg-[#EBF3EF] px-2.5 py-1 rounded">
                01
              </span>
              <QrCode className="w-6 h-6 text-[#167A55]" />
            </div>
            <h3 className="text-lg font-semibold text-[#172923]">Scan Packaging</h3>
            <p className="text-sm text-[#687871] leading-relaxed">
              Scan the QR code, GS1 2D DataMatrix, or standard barcode on your medicine packaging using your device camera or upload an image.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl border border-[#E4ECE7] p-6 sm:p-8 space-y-4 hover:border-[#167A55]/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#167A55] bg-[#EBF3EF] px-2.5 py-1 rounded">
                02
              </span>
              <FileSearch className="w-6 h-6 text-[#167A55]" />
            </div>
            <h3 className="text-lg font-semibold text-[#172923]">Verify Information</h3>
            <p className="text-sm text-[#687871] leading-relaxed">
              Check the available medicine information, registered manufacturer records, batch status, and expiration timeline.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl border border-[#E4ECE7] p-6 sm:p-8 space-y-4 hover:border-[#167A55]/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#167A55] bg-[#EBF3EF] px-2.5 py-1 rounded">
                03
              </span>
              <BookOpen className="w-6 h-6 text-[#167A55]" />
            </div>
            <h3 className="text-lg font-semibold text-[#172923]">Stay Informed & Report</h3>
            <p className="text-sm text-[#687871] leading-relaxed">
              Review product details, learn about safe packaging standards, and file a structured report if a product looks damaged or doubtful.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#167A55]">
            Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172923]">
            Comprehensive Pharmaceutical Safety Tools
          </h2>
          <p className="text-sm text-[#687871]">
            Engineered to empower consumers with clarity, safety awareness, and verifiable product traceability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl border border-[#E4ECE7] p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#167A55]/10 text-[#167A55] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#172923]">Medicine Authentication</h3>
            <p className="text-xs sm:text-sm text-[#687871] leading-relaxed">
              Cross-references product packaging serials, batch numbers, and manufacturer identifiers against demonstration safety registries.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl border border-[#E4ECE7] p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#2B9C8A]/10 text-[#2B9C8A] flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#172923]">QR & Barcode Scanning</h3>
            <p className="text-xs sm:text-sm text-[#687871] leading-relaxed">
              Direct mobile camera capture with visual viewfinder support, high-resolution upload, and automatic code format identification.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl border border-[#E4ECE7] p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#3978B8]/10 text-[#3978B8] flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#172923]">Medicine Information</h3>
            <p className="text-xs sm:text-sm text-[#687871] leading-relaxed">
              Review active pharmaceutical ingredients, manufacturer details, dosage formats, storage conditions, and schedule classifications.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-xl border border-[#E4ECE7] p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#D64B4B]/10 text-[#D64B4B] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#172923]">Suspicious Product Reporting</h3>
            <p className="text-xs sm:text-sm text-[#687871] leading-relaxed">
              Report smudged barcodes, misspelled labels, damaged tamper seals, or expired stock with photo evidence and purchase receipts.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-xl border border-[#E4ECE7] p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#D99126]/10 text-[#D99126] flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#172923]">Verification History</h3>
            <p className="text-xs sm:text-sm text-[#687871] leading-relaxed">
              Maintain an encrypted personal audit log of every medicine checked, filter by status, and review previous verification results anytime.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-xl border border-[#E4ECE7] p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#167A55]/10 text-[#167A55] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#172923]">Medicine Safety Awareness</h3>
            <p className="text-xs sm:text-sm text-[#687871] leading-relaxed">
              Practical consumer articles on inspecting packaging irregularities, reading expiration dates, proper medicine storage, and responsible purchasing.
            </p>
          </div>
        </div>
      </section>

      {/* 4. WHY AUSHADHISETU? */}
      <section id="why-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E4ECE7] p-8 sm:p-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#167A55]">
              The Core Problem & Mission
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#172923]">
              Why AushadhiSetu?
            </h2>
            <p className="text-sm sm:text-base text-[#687871] leading-relaxed">
              Global healthcare systems face significant hurdles with substandard, compromised, and unverified pharmaceutical packaging entering consumer hands. AushadhiSetu bridges the gap between complex supply chain serialization and ordinary consumers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 mt-6 border-t border-[#E4ECE7]">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#172923]">
                Medicine Authentication
              </h4>
              <p className="text-xs text-[#687871] leading-relaxed">
                Empowering consumers to verify whether printed batch identifiers correspond with genuine manufacturing sequences.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#172923]">
                Consumer Awareness
              </h4>
              <p className="text-xs text-[#687871] leading-relaxed">
                Educating citizens on how to spot poorly printed cartons, tampered seals, altered expiry stamps, and suspicious pills.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#172923]">
                Medicine Traceability
              </h4>
              <p className="text-xs text-[#687871] leading-relaxed">
                Promoting transparent serialization standards that link batch codes to authorized manufacturing facilities.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#172923]">
                Accessible Verification
              </h4>
              <p className="text-xs text-[#687871] leading-relaxed">
                Accessible directly from any smartphone browser without requiring expensive proprietary hardware or complex software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#167A55]">
            Common Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172923]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#687871]">
            Clear, transparent answers on platform functionality, verification scopes, and healthcare limits.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS_DATA.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-[#E4ECE7] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#172923] hover:text-[#167A55]"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#687871] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#167A55]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#687871] leading-relaxed border-t border-[#E4ECE7]/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#115B42] text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2B9C8A] bg-white/10 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Experience The Interactive Application</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Ready to verify medicine packaging?
            </h3>
            <p className="text-sm text-[#E4ECE7] leading-relaxed">
              Try our live demonstration scanner, test all verification scenarios, inspect medicine details, and submit a report.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link to="/auth/welcome" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full font-semibold"
              >
                Launch Verification Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
