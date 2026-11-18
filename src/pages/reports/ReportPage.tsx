import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  AlertTriangle,
  UploadCloud,
  X,
  CheckCircle2,
  Image as ImageIcon,
  FileText,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { useApp } from '../../context/AppContext';
import { ReportReason, ReportEvidence } from '../../types';

export const ReportPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { submitMedicineReport } = useApp();

  const [formData, setFormData] = useState({
    medicineName: searchParams.get('medicineName') || '',
    manufacturer: '',
    batchNumber: searchParams.get('batch') || '',
    purchaseLocation: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    reason: (searchParams.get('reason') as ReportReason) || 'Suspicious Packaging',
    description: ''
  });

  const [evidenceList, setEvidenceList] = useState<ReportEvidence[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submittedReportId, setSubmittedReportId] = useState<string | null>(null);

  const reasonsList: ReportReason[] = [
    'Suspicious Packaging',
    'Damaged Packaging',
    'Incorrect Product Information',
    'Unusual Appearance',
    'QR / Barcode Mismatch',
    'Expired Product',
    'Other'
  ];

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'packaging' | 'barcode' | 'receipt' | 'other',
    label: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5 MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newEv: ReportEvidence = {
        id: `ev-${Date.now()}`,
        type,
        label,
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        dataUrl
      };
      setEvidenceList((prev) => [...prev, newEv]);
    };
    reader.readAsDataURL(file);
  };

  const removeEvidence = (id: string) => {
    setEvidenceList((prev) => prev.filter((ev) => ev.id !== id));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.medicineName.trim()) {
      errs.medicineName = 'Medicine Name is required.';
    }
    if (!formData.batchNumber.trim()) {
      errs.batchNumber = 'Batch Number is required.';
    }
    if (!formData.purchaseLocation.trim()) {
      errs.purchaseLocation = 'Purchase Location / Pharmacy Name is required.';
    }
    if (!formData.purchaseDate) {
      errs.purchaseDate = 'Purchase Date is required.';
    }
    if (!formData.description.trim()) {
      errs.description = 'Please provide details on what aroused your suspicion.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInitiateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setShowConfirmModal(true);
    }
  };

  const handleFinalSubmit = () => {
    const createdReport = submitMedicineReport({
      medicineName: formData.medicineName,
      manufacturer: formData.manufacturer || 'Unspecified Manufacturer',
      batchNumber: formData.batchNumber,
      purchaseLocation: formData.purchaseLocation,
      purchaseDate: formData.purchaseDate,
      reason: formData.reason,
      description: formData.description,
      evidence: evidenceList
    });

    setShowConfirmModal(false);
    setSubmittedReportId(createdReport.id);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D64B4B]">
          <ShieldAlert className="w-4 h-4" />
          <span>Product Safety & Tamper Reporting</span>
        </div>
        <h2 className="text-2xl font-bold text-[#172923]">Report Suspicious Medicine</h2>
        <p className="text-xs sm:text-sm text-[#687871]">
          Submit visual evidence and purchase details to log packaging anomalies, broken seals, or unverified lot numbers.
        </p>
      </div>

      {submittedReportId ? (
        /* SUCCESS CONFIRMATION STATE */
        <div className="bg-white rounded-2xl border border-[#D1EBDD] shadow-xs p-6 sm:p-8 text-center space-y-5 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-[#218653]/10 text-[#218653] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-[#172923]">Your Report Has Been Submitted</h3>
            <p className="text-xs text-[#687871]">
              Demonstration incident logged with Tracking ID:
            </p>
            <div className="inline-block font-mono text-base font-bold text-[#167A55] bg-[#EBF3EF] px-4 py-1.5 rounded-lg border border-[#D5E4DC]">
              {submittedReportId}
            </div>
          </div>

          <div className="bg-[#F7FAF8] rounded-xl border border-[#E4ECE7] p-4 text-xs text-[#687871] max-w-lg mx-auto text-left space-y-2">
            <p className="font-semibold text-[#172923]">Demonstration Workflow Notice:</p>
            <p>
              This report has been added to your local profile. In an active production deployment, reports are reviewed by pharmaceutical quality assurance teams and dispatched to statutory drug regulators.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to={`/app/reports/${submittedReportId}`}>
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View Report Timeline
              </Button>
            </Link>
            <Link to="/app/reports">
              <Button variant="outline" size="md">
                View My Reports
              </Button>
            </Link>
            <Link to="/app/dashboard">
              <Button variant="ghost" size="md">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* REPORT FORM */
        <form onSubmit={handleInitiateSubmit} className="space-y-6">
          {/* Section 1: Medicine & Purchase Information */}
          <div className="bg-white rounded-2xl border border-[#E4ECE7] p-5 sm:p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-[#172923] border-b border-[#E4ECE7] pb-3">
              1. Product & Purchase Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Medicine Name"
                required
                placeholder="e.g. Paracetamol 500 mg or Cough Syrup"
                value={formData.medicineName}
                onChange={(e) => {
                  setFormData({ ...formData, medicineName: e.target.value });
                  if (errors.medicineName) setErrors({ ...errors, medicineName: '' });
                }}
                error={errors.medicineName}
              />

              <Input
                label="Manufacturer (if visible)"
                placeholder="e.g. Example Pharma Ltd."
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
              />

              <Input
                label="Batch / Lot Number"
                required
                placeholder="e.g. B.No. CTZ-2025-B4"
                value={formData.batchNumber}
                onChange={(e) => {
                  setFormData({ ...formData, batchNumber: e.target.value });
                  if (errors.batchNumber) setErrors({ ...errors, batchNumber: '' });
                }}
                error={errors.batchNumber}
              />

              <Input
                type="date"
                label="Purchase Date"
                required
                value={formData.purchaseDate}
                onChange={(e) => {
                  setFormData({ ...formData, purchaseDate: e.target.value });
                  if (errors.purchaseDate) setErrors({ ...errors, purchaseDate: '' });
                }}
                error={errors.purchaseDate}
              />

              <div className="sm:col-span-2">
                <Input
                  label="Purchase Location / Pharmacy Store"
                  required
                  placeholder="e.g. Metro Chemist, Station Road Market or Online Pharmacy"
                  value={formData.purchaseLocation}
                  onChange={(e) => {
                    setFormData({ ...formData, purchaseLocation: e.target.value });
                    if (errors.purchaseLocation) setErrors({ ...errors, purchaseLocation: '' });
                  }}
                  error={errors.purchaseLocation}
                  helperText="Name of retail chemist, hospital dispensary, or online merchant"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Reason and Description */}
          <div className="bg-white rounded-2xl border border-[#E4ECE7] p-5 sm:p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-[#172923] border-b border-[#E4ECE7] pb-3">
              2. Nature of Suspicion
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#172923] flex items-center gap-1">
                  Primary Reason for Suspicion <span className="text-[#D64B4B]">*</span>
                </label>
                <select
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value as ReportReason })
                  }
                  className="w-full text-xs sm:text-sm bg-white border border-[#E4ECE7] rounded-lg p-2.5 text-[#172923] focus:border-[#167A55] focus:outline-none"
                >
                  {reasonsList.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#172923] flex items-center gap-1">
                  Detailed Description <span className="text-[#D64B4B]">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe irregularities observed: e.g. broken tamper band, misspelled brand name, missing hologram, smudged batch stamp, or unusual pill texture..."
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    if (errors.description) setErrors({ ...errors, description: '' });
                  }}
                  className={`
                    w-full text-xs sm:text-sm bg-white border rounded-lg p-3 text-[#172923] focus:outline-none transition-colors
                    ${
                      errors.description
                        ? 'border-[#D64B4B] focus:border-[#D64B4B]'
                        : 'border-[#E4ECE7] focus:border-[#167A55]'
                    }
                  `}
                />
                {errors.description && (
                  <p className="text-xs text-[#D64B4B] font-medium">{errors.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Evidence Upload */}
          <div className="bg-white rounded-2xl border border-[#E4ECE7] p-5 sm:p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-[#172923] border-b border-[#E4ECE7] pb-3">
              3. Visual Evidence & Documentation (Recommended)
            </h3>
            <p className="text-xs text-[#687871]">
              Attach clear photographs to support packaging review:
            </p>

            {/* Quick Upload Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="border border-dashed border-[#E4ECE7] hover:border-[#167A55] hover:bg-[#F0F8F4] rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'packaging', 'Outer Packaging Photo')}
                  className="hidden"
                />
                <ImageIcon className="w-5 h-5 text-[#167A55] mb-1.5" />
                <span className="text-xs font-medium text-[#172923]">Packaging Photo</span>
                <span className="text-[10px] text-[#687871]">Carton or blister pack</span>
              </label>

              <label className="border border-dashed border-[#E4ECE7] hover:border-[#167A55] hover:bg-[#F0F8F4] rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'barcode', 'Barcode / Lot Photo')}
                  className="hidden"
                />
                <UploadCloud className="w-5 h-5 text-[#167A55] mb-1.5" />
                <span className="text-xs font-medium text-[#172923]">Barcode / Lot Photo</span>
                <span className="text-[10px] text-[#687871]">Printed lot code & matrix</span>
              </label>

              <label className="border border-dashed border-[#E4ECE7] hover:border-[#167A55] hover:bg-[#F0F8F4] rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'receipt', 'Purchase Tax Invoice')}
                  className="hidden"
                />
                <FileText className="w-5 h-5 text-[#167A55] mb-1.5" />
                <span className="text-xs font-medium text-[#172923]">Receipt / Invoice</span>
                <span className="text-[10px] text-[#687871]">Proof of retail purchase</span>
              </label>
            </div>

            {/* Uploaded Evidence Gallery */}
            {evidenceList.length > 0 && (
              <div className="space-y-2 pt-2">
                <p className="text-xs font-semibold text-[#172923]">Attached Files ({evidenceList.length}):</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {evidenceList.map((ev) => (
                    <div
                      key={ev.id}
                      className="flex items-center justify-between p-2.5 bg-[#F7FAF8] border border-[#E4ECE7] rounded-lg text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <ImageIcon className="w-4 h-4 text-[#167A55] shrink-0" />
                        <div className="truncate">
                          <p className="font-medium text-[#172923] truncate">{ev.label}</p>
                          <p className="text-[10px] text-[#687871]">{ev.name} ({ev.size})</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeEvidence(ev.id)}
                        className="p-1 text-[#687871] hover:text-[#D64B4B]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Action Bar */}
          <div className="flex items-center justify-between pt-2">
            <Link to="/app/reports">
              <Button variant="ghost" size="md">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="danger"
              size="md"
              leftIcon={<AlertTriangle className="w-4 h-4" />}
            >
              Submit Suspicious Product Report
            </Button>
          </div>
        </form>
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Submit Suspicious Medicine Report?"
        description="Verify submitted details before logging"
      >
        <div className="space-y-4 text-xs text-[#687871]">
          <p>
            You are filing a demonstration report for:{' '}
            <strong className="text-[#172923]">{formData.medicineName}</strong> (Batch:{' '}
            <span className="font-mono text-[#172923]">{formData.batchNumber}</span>).
          </p>
          <div className="bg-[#FDF9F2] p-3 rounded-lg border border-[#F5E5C9] text-[#9E6510]">
            Please retain original packaging, cartons, and purchase receipts safely in case regulatory inspection is required.
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setShowConfirmModal(false)}>
              Review Form
            </Button>
            <Button variant="danger" size="sm" onClick={handleFinalSubmit}>
              Confirm & Submit Report
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
