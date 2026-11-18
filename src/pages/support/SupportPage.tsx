import React, { useState } from 'react';
import {
  HelpCircle,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Mail,
  Send,
  ChevronDown,
  BookOpen,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { FAQS_DATA } from '../../data/faqsData';

export const SupportPage: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!contactForm.name.trim()) errs.name = 'Name is required.';
    if (!contactForm.email.trim() || !contactForm.email.includes('@')) {
      errs.email = 'Valid email is required.';
    }
    if (!contactForm.subject.trim()) errs.subject = 'Subject is required.';
    if (!contactForm.message.trim()) errs.message = 'Message cannot be empty.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 4000);
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in">
      {/* Header */}
      <div className="pb-2 border-b border-[#E4ECE7] space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#167A55]">
          <HelpCircle className="w-4 h-4" />
          <span>Patient & Consumer Assistance Desk</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#172923]">Help & Support Centre</h2>
        <p className="text-xs sm:text-sm text-[#687871]">
          Guides on medicine scanning, understanding verification outcomes, and contacting technical support.
        </p>
      </div>

      {/* 1. INTERACTIVE GUIDES SECTION */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#172923]">Essential User Guides</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-[#E4ECE7] p-5 space-y-2.5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#167A55]/10 text-[#167A55] flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-[#172923]">How to Scan a Medicine</h4>
            <p className="text-xs text-[#687871] leading-relaxed">
              Find the 2D DataMatrix code on your carton, ensure adequate lighting without glare, and hold your phone 10-15 cm away.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#E4ECE7] p-5 space-y-2.5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#218653]/10 text-[#218653] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-[#172923]">Understanding Results</h4>
            <p className="text-xs text-[#687871] leading-relaxed">
              A <strong>Matched</strong> result confirms the batch serial is registered. An <strong>Unmatched</strong> result advises re-inspection and reporting if packaging looks suspicious.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#E4ECE7] p-5 space-y-2.5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#D64B4B]/10 text-[#D64B4B] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-[#172923]">How to Submit a Report</h4>
            <p className="text-xs text-[#687871] leading-relaxed">
              Snap a clear photo of the suspicious label or receipt, select the reason (e.g. broken seal or spelling error), and submit for simulated tracking.
            </p>
          </div>
        </div>
      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS */}
      <div id="faq" className="space-y-4">
        <h3 className="text-base font-bold text-[#172923]">Frequently Asked Questions</h3>

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
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-sm text-[#172923] hover:text-[#167A55]"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#687871] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#167A55]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-[#687871] leading-relaxed border-t border-[#E4ECE7]/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. CONTACT US FORM */}
      <div className="bg-white rounded-2xl border border-[#E4ECE7] shadow-xs p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E4ECE7] pb-4 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#167A55]">
            <Mail className="w-4 h-4" />
            <span>Support Inquiry Form</span>
          </div>
          <h3 className="text-lg font-bold text-[#172923]">Contact Platform Support</h3>
          <p className="text-xs text-[#687871]">
            Have inquiries regarding verification errors or platform features? Send us a simulated support ticket.
          </p>
        </div>

        {isSent && (
          <div className="p-4 bg-[#F0F8F4] border border-[#D1EBDD] rounded-xl text-xs text-[#165C39] flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-[#218653] shrink-0" />
            <div>
              <p className="font-semibold text-sm">Inquiry Dispatched Successfully</p>
              <p className="text-[11px] text-[#687871]">
                Thank you for reaching out. In an active production environment, support agents respond within 24 business hours.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Your Name"
              required
              placeholder="e.g. Aarav Sharma"
              value={contactForm.name}
              onChange={(e) => {
                setContactForm({ ...contactForm, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              error={errors.name}
            />

            <Input
              type="email"
              label="Email Address"
              required
              placeholder="e.g. user@example.com"
              value={contactForm.email}
              onChange={(e) => {
                setContactForm({ ...contactForm, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              error={errors.email}
            />
          </div>

          <Input
            label="Subject"
            required
            placeholder="e.g. Question about batch scanning or pharmacy reporting"
            value={contactForm.subject}
            onChange={(e) => {
              setContactForm({ ...contactForm, subject: e.target.value });
              if (errors.subject) setErrors({ ...errors, subject: '' });
            }}
            error={errors.subject}
          />

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#172923] flex items-center gap-1">
              Your Message <span className="text-[#D64B4B]">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Please describe your question or issue in detail..."
              value={contactForm.message}
              onChange={(e) => {
                setContactForm({ ...contactForm, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: '' });
              }}
              className={`
                w-full text-xs sm:text-sm bg-white border rounded-lg p-3 text-[#172923] focus:outline-none transition-colors
                ${errors.message ? 'border-[#D64B4B]' : 'border-[#E4ECE7] focus:border-[#167A55]'}
              `}
            />
            {errors.message && (
              <p className="text-xs text-[#D64B4B] font-medium">{errors.message}</p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Submit Support Ticket
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
