import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  Clock,
  QrCode,
  Building,
  Calendar,
  Layers,
  ArrowRight,
  ArrowLeft,
  RotateCw,
  FileDown,
  Printer,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { useApp } from '../../context/AppContext';
import { MOCK_MEDICINES } from '../../data/mockData';

export const VerificationResultPage: React.FC = () => {
  const { lastVerificationResult } = useApp();
  const navigate = useNavigate();
  const [showDemoReportModal, setShowDemoReportModal] = useState(false);

  // If user opens /result directly without scanning, fallback to default matched Paracetamol
  const result = lastVerificationResult || {
    id: 'res-default',
    status: 'MATCHED' as const,
    timestamp: new Date().toLocaleString(),
    inputMethod: 'camera' as const,
    detectedCode: 'AS-PAR-500-001',
    codeFormat: 'GS1 DataMatrix (2D)',
    medicine: MOCK_MEDICINES[0]
  };

  const medicine = result.medicine || MOCK_MEDICINES[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/app/verify"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#167A55] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Verify Another Medicine</span>
        </Link>
        <span className="text-xs text-[#687871]">
          Checked at: <span className="font-medium text-[#172923]">{result.timestamp}</span>
        </span>
      </div>

      {/* --- STATE A: MATCHED RESULT --- */}
      {result.status === 'MATCHED' && (
        <div className="bg-white rounded-2xl border border-[#D1EBDD] shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4ECE7]">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#218653]/10 text-[#218653] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">Verified Match</Badge>
                  <span className="text-[11px] font-mono text-[#687871]">{result.codeFormat}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#172923] mt-1">
                  Medicine Information Matched
                </h2>
                <p className="text-xs sm:text-sm text-[#687871]">
                  Serial and batch identifier successfully matched demonstration pharmaceutical registry.
                </p>
              </div>
            </div>
          </div>

          {/* Core Matched Details Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F7FAF8] rounded-xl border border-[#E4ECE7] p-5">
            <div className="space-y-1">
              <span className="text-xs text-[#687871] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#167A55]" />
                Medicine Name:
              </span>
              <p className="text-base font-bold text-[#172923]">{medicine.name}</p>
              <p className="text-xs text-[#687871]">{medicine.brandName}</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-[#687871] flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#167A55]" />
                Manufacturer:
              </span>
              <p className="text-sm font-semibold text-[#172923]">{medicine.manufacturer}</p>
              <p className="text-xs text-[#687871]">Registered Pharmaceutical Producer</p>
            </div>

            <div className="space-y-1 pt-2 sm:pt-0">
              <span className="text-xs text-[#687871] flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-[#167A55]" />
                Batch / Lot Number:
              </span>
              <p className="text-sm font-mono font-bold text-[#167A55]">{medicine.batchNumber}</p>
              <p className="text-[11px] text-[#687871]">Product Code: {medicine.productCode}</p>
            </div>

            <div className="space-y-1 pt-2 sm:pt-0">
              <span className="text-xs text-[#687871] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#167A55]" />
                Validity Schedule:
              </span>
              <div className="text-xs space-y-0.5">
                <p>
                  Mfg. Date: <strong className="text-[#172923]">{medicine.manufacturingDate}</strong>
                </p>
                <p>
                  Exp. Date: <strong className="text-[#218653] font-semibold">{medicine.expiryDate}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Dosage & Packaging Specifications */}
          <div className="border border-[#E4ECE7] rounded-xl p-4 text-xs space-y-2">
            <h4 className="font-semibold text-[#172923]">Formulation & Packaging:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[#687871]">
              <div>
                <span className="block text-[#9AA8A1]">Dosage Form:</span>
                <span className="text-[#172923] font-medium">{medicine.dosageForm}</span>
              </div>
              <div>
                <span className="block text-[#9AA8A1]">Strength:</span>
                <span className="text-[#172923] font-medium">{medicine.strength}</span>
              </div>
              <div>
                <span className="block text-[#9AA8A1]">Packaging Type:</span>
                <span className="text-[#172923] font-medium">{medicine.packagingType}</span>
              </div>
            </div>
          </div>

          {/* Actions Button Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to={`/app/medicine/${medicine.id}`}>
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View Full Details
              </Button>
            </Link>

            <Button
              variant="outline"
              size="md"
              leftIcon={<FileDown className="w-4 h-4" />}
              onClick={() => setShowDemoReportModal(true)}
            >
              Download Demo Report
            </Button>

            <Link to="/app/verify">
              <Button variant="ghost" size="md">
                Verify Another
              </Button>
            </Link>

            <Link to="/app/dashboard" className="ml-auto">
              <Button variant="ghost" size="md">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* --- STATE D: EXPIRED MEDICINE STATE --- */}
      {result.status === 'EXPIRED' && (
        <div className="bg-white rounded-2xl border border-[#F5E5C9] shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4ECE7]">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#D99126]/10 text-[#D99126] flex items-center justify-center shrink-0">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="warning">Product Expired</Badge>
                  <span className="text-[11px] text-[#687871]">Batch Match Confirmed</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#172923] mt-1">
                  Medicine Information Matched — Expired Product
                </h2>
                <p className="text-xs sm:text-sm text-[#D99126] font-medium">
                  Notice: This medicine has passed its manufacturer guaranteed shelf life.
                </p>
              </div>
            </div>
          </div>

          {/* Expiry Warning Callout */}
          <div className="p-4 bg-[#FDF9F2] border border-[#F5E5C9] rounded-xl text-xs text-[#9E6510] space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-[#87550C]">
              <AlertTriangle className="w-4 h-4" />
              <span>Do Not Ingest Expired Medication</span>
            </div>
            <p className="leading-relaxed">
              The batch record for <strong>{medicine.name}</strong> was confirmed in the registry, but its expiration date was <strong>{medicine.expiryDate}</strong>. Chemical potency and microbiological sterility are no longer guaranteed. Please consult your physician or pharmacist for disposal.
            </p>
          </div>

          {/* Matched Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F7FAF8] rounded-xl border border-[#E4ECE7] p-5 text-xs text-[#172923]">
            <div>
              <span className="text-[#687871] block">Medicine Name:</span>
              <span className="font-bold text-sm">{medicine.name}</span>
            </div>
            <div>
              <span className="text-[#687871] block">Batch Number:</span>
              <span className="font-mono font-bold text-sm">{medicine.batchNumber}</span>
            </div>
            <div>
              <span className="text-[#687871] block">Manufacturer:</span>
              <span className="font-medium">{medicine.manufacturer}</span>
            </div>
            <div>
              <span className="text-[#687871] block">Expiry Date:</span>
              <span className="font-bold text-[#C73838]">{medicine.expiryDate} (EXPIRED)</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to={`/app/reports/new?medicineName=${encodeURIComponent(medicine.name)}&batch=${encodeURIComponent(medicine.batchNumber)}&reason=Expired+Product`}
            >
              <Button variant="danger" size="md" leftIcon={<AlertTriangle className="w-4 h-4" />}>
                Report Expired Medicine Sale
              </Button>
            </Link>
            <Link to="/app/verify">
              <Button variant="outline" size="md">
                Verify Another
              </Button>
            </Link>
            <Link to="/app/dashboard" className="ml-auto">
              <Button variant="ghost" size="md">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* --- STATE B: UNMATCHED RESULT --- */}
      {result.status === 'NOT_FOUND' && (
        <div className="bg-white rounded-2xl border border-[#F8D2D2] shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-3.5 pb-6 border-b border-[#E4ECE7]">
            <div className="w-12 h-12 rounded-xl bg-[#D64B4B]/10 text-[#D64B4B] flex items-center justify-center shrink-0">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div>
              <Badge variant="danger">Unmatched Record</Badge>
              <h2 className="text-xl sm:text-2xl font-bold text-[#172923] mt-1">
                Verification Could Not Be Confirmed
              </h2>
              <p className="text-xs sm:text-sm text-[#687871] mt-0.5">
                The submitted product code could not be matched with the available demonstration records. This does not by itself establish that the medicine is counterfeit.
              </p>
            </div>
          </div>

          <div className="bg-[#FDF3F3] border border-[#F8D2D2] rounded-xl p-4 text-xs text-[#B83838] space-y-2">
            <p className="font-bold text-sm">Submission Inspection Summary:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#172923]">
              <div>
                <span className="text-[#687871]">Detected / Submitted Code:</span>
                <span className="font-mono font-bold block">{result.detectedCode || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[#687871]">Format / Method:</span>
                <span className="font-medium block">{result.codeFormat || result.inputMethod}</span>
              </div>
            </div>
            <p className="pt-1 text-[#962626]">
              Reason: {result.mismatchReason || 'No registered active batch sequence corresponds with the submitted identifier.'}
            </p>
          </div>

          <div className="p-4 bg-[#F7FAF8] rounded-xl border border-[#E4ECE7] text-xs text-[#687871] space-y-1.5">
            <h4 className="font-semibold text-[#172923]">Recommended Consumer Actions:</h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>Inspect the packaging for spelling discrepancies or missing hologram seals.</li>
              <li>Re-enter the batch number manually if the camera scan had glare or blur.</li>
              <li>If purchased from an unauthorized vendor or the packaging looks doubtful, file a suspicious medicine report.</li>
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to={`/app/reports/new?medicineName=${encodeURIComponent(
                result.submittedInfo?.medicineName || 'Unmatched Product'
              )}&batch=${encodeURIComponent(result.detectedCode || '')}&reason=Incorrect+Product+Information`}
            >
              <Button variant="danger" size="md" leftIcon={<AlertTriangle className="w-4 h-4" />}>
                Report This Medicine
              </Button>
            </Link>
            <Link to="/app/verify">
              <Button variant="outline" size="md" leftIcon={<RotateCw className="w-4 h-4" />}>
                Try Again
              </Button>
            </Link>
            <Link to="/app/dashboard" className="ml-auto">
              <Button variant="ghost" size="md">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* --- STATE C: NO CODE DETECTED --- */}
      {result.status === 'NO_CODE_DETECTED' && (
        <div className="bg-white rounded-2xl border border-[#D5E5F2] shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-3.5 pb-6 border-b border-[#E4ECE7]">
            <div className="w-12 h-12 rounded-xl bg-[#3978B8]/10 text-[#3978B8] flex items-center justify-center shrink-0">
              <HelpCircle className="w-7 h-7" />
            </div>
            <div>
              <Badge variant="info">Incomplete Scan</Badge>
              <h2 className="text-xl sm:text-2xl font-bold text-[#172923] mt-1">
                No QR Code or Barcode Detected
              </h2>
              <p className="text-xs sm:text-sm text-[#687871] mt-0.5">
                Our optical analyzer could not locate a clear 2D DataMatrix or GS1 barcode in the provided image.
              </p>
            </div>
          </div>

          {/* Practical suggestions */}
          <div className="bg-[#F2F7FB] border border-[#D5E5F2] rounded-xl p-5 text-xs text-[#2B639B] space-y-3">
            <h4 className="font-bold text-sm text-[#1D4E7E]">Practical Scanning Tips:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#172923]">
              <div className="p-3 bg-white rounded-lg border border-[#D5E5F2]">
                <p className="font-semibold text-xs text-[#2B639B]">1. Improve Lighting</p>
                <p className="text-[11px] text-[#687871] mt-0.5">
                  Avoid shiny glare from blister aluminium foil by angling your phone slightly.
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-[#D5E5F2]">
                <p className="font-semibold text-xs text-[#2B639B]">2. Keep Code Centered</p>
                <p className="text-[11px] text-[#687871] mt-0.5">
                  Position the code entirely inside the frame without cutting off borders.
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-[#D5E5F2]">
                <p className="font-semibold text-xs text-[#2B639B]">3. Avoid Blurry Images</p>
                <p className="text-[11px] text-[#687871] mt-0.5">
                  Hold your camera steady until the optical autofocus locks cleanly.
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-[#D5E5F2]">
                <p className="font-semibold text-xs text-[#2B639B]">4. Enter Details Manually</p>
                <p className="text-[11px] text-[#687871] mt-0.5">
                  Type the printed batch number (e.g. PCM2026A01) directly into the form.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/app/verify?tab=upload">
              <Button variant="primary" size="md">
                Upload Another Image
              </Button>
            </Link>
            <Link to="/app/verify?tab=camera">
              <Button variant="outline" size="md" leftIcon={<RotateCw className="w-4 h-4" />}>
                Try Camera Again
              </Button>
            </Link>
            <Link to="/app/verify?tab=manual">
              <Button variant="secondary" size="md">
                Enter Manually
              </Button>
            </Link>
            <Link to="/app/dashboard" className="ml-auto">
              <Button variant="ghost" size="md">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Demo Data Disclaimer Card */}
      <div className="p-4 bg-[#F7FAF8] border border-[#E4ECE7] rounded-xl text-xs text-[#687871] space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-[#172923]">
          <ShieldCheck className="w-4 h-4 text-[#167A55]" />
          <span>DEMO RESULT DISCLAIMER</span>
        </div>
        <p className="leading-relaxed">
          This result was generated by the AushadhiSetu demonstration engine and is not connected to a live pharmaceutical database. Simulated matching does not independently prove medicine authenticity, purity, or patient clinical suitability. Consult a doctor or licensed pharmacist for medical therapy questions.
        </p>
      </div>

      {/* Demo Report Modal */}
      <Modal
        isOpen={showDemoReportModal}
        onClose={() => setShowDemoReportModal(false)}
        title="Verification Audit Certificate (Demo)"
        description="Simulated pharmaceutical verification summary document"
        maxWidth="lg"
      >
        <div className="space-y-4 text-xs text-[#172923]">
          <div className="p-4 bg-[#F7FAF8] border border-[#E4ECE7] rounded-xl space-y-3 font-mono">
            <div className="flex justify-between border-b border-[#E4ECE7] pb-2">
              <span className="font-bold text-[#167A55]">AUSHADHISETU VERIFICATION AUDIT</span>
              <span>REF: {result.id}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>Product: {medicine.name}</div>
              <div>Batch: {medicine.batchNumber}</div>
              <div>Manufacturer: {medicine.manufacturer}</div>
              <div>Status: MATCHED / DEMO VERIFIED</div>
              <div>Timestamp: {result.timestamp}</div>
              <div>Expiry Date: {medicine.expiryDate}</div>
            </div>
            <div className="border-t border-[#E4ECE7] pt-2 text-[10px] text-[#687871]">
              Verification Engine: AushadhiSetu v2.4 (Simulated Sandbox)<br />
              Cryptographic Checksum: SHA256-SIM-992140A812E
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Printer className="w-4 h-4" />}
              onClick={handlePrint}
            >
              Print Certificate
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowDemoReportModal(false)}
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
