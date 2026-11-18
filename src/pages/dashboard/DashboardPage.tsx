import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  QrCode,
  UploadCloud,
  FileEdit,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  ArrowRight,
  BookOpen,
  Eye,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge, BadgeVariant } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { history, reports, setLastVerificationResult } = useApp();
  const navigate = useNavigate();

  // Compute live statistics from history and reports
  const totalScanned = history.length;
  const matchedRecords = history.filter((h) => h.status === 'Matched').length;
  const unmatchedRecords = history.filter((h) => h.status === 'Unmatched' || h.status === 'Incomplete').length;
  const totalReports = reports.length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Matched':
        return <Badge variant="success">Matched</Badge>;
      case 'Unmatched':
        return <Badge variant="danger">Unmatched</Badge>;
      case 'Expired':
        return <Badge variant="warning">Expired Date</Badge>;
      case 'Incomplete':
        return <Badge variant="neutral">No Code Found</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const handleViewHistoryItem = (item: (typeof history)[0]) => {
    setLastVerificationResult(item.result);
    navigate('/app/verify/result');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* 1. WELCOME SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E4ECE7]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#172923]">
            Welcome back, {user?.name || 'Aarav'}
          </h2>
          <p className="text-xs sm:text-sm text-[#687871] mt-0.5">
            Your Medicine Safety Dashboard • Verify products and keep track of your medicine checks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/app/verify">
            <Button
              variant="primary"
              size="md"
              leftIcon={<QrCode className="w-4 h-4" />}
            >
              Verify New Medicine
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. PRIMARY VERIFICATION ACTION HERO CARD */}
      <div className="bg-white rounded-2xl border border-[#E4ECE7] shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#EBF3EF] text-[#167A55] text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Primary Verification Action</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#172923]">
            Verify a Medicine
          </h3>
          <p className="text-xs sm:text-sm text-[#687871] leading-relaxed">
            Scan a medicine packaging barcode, upload a photograph of the carton/blister, or enter printed batch details to inspect matching demonstration registry records.
          </p>
        </div>

        {/* Three Verification Action Pathways */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <Link
            to="/app/verify?tab=camera"
            className="flex flex-col items-start p-4 rounded-xl border border-[#E4ECE7] hover:border-[#167A55] hover:bg-[#F0F8F4]/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#167A55]/10 text-[#167A55] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <QrCode className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-[#172923]">Scan / Take Photo</h4>
            <p className="text-xs text-[#687871] mt-1">
              Use your device camera to scan 2D DataMatrix or GS1 barcodes directly.
            </p>
            <span className="text-xs font-medium text-[#167A55] mt-3 inline-flex items-center gap-1">
              Open Camera Scanner →
            </span>
          </Link>

          <Link
            to="/app/verify?tab=upload"
            className="flex flex-col items-start p-4 rounded-xl border border-[#E4ECE7] hover:border-[#2B9C8A] hover:bg-[#F0F8F4]/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#2B9C8A]/10 text-[#2B9C8A] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-[#172923]">Upload Packaging Image</h4>
            <p className="text-xs text-[#687871] mt-1">
              Upload an existing photo (PNG, JPG, WEBP up to 5 MB) from your storage.
            </p>
            <span className="text-xs font-medium text-[#167A55] mt-3 inline-flex items-center gap-1">
              Browse Image Files →
            </span>
          </Link>

          <Link
            to="/app/verify?tab=manual"
            className="flex flex-col items-start p-4 rounded-xl border border-[#E4ECE7] hover:border-[#167A55] hover:bg-[#F0F8F4]/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#3978B8]/10 text-[#3978B8] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileEdit className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-[#172923]">Enter Details Manually</h4>
            <p className="text-xs text-[#687871] mt-1">
              Input brand name, manufacturer, and lot/batch code printed on the strip.
            </p>
            <span className="text-xs font-medium text-[#167A55] mt-3 inline-flex items-center gap-1">
              Fill Form Fields →
            </span>
          </Link>
        </div>
      </div>

      {/* 3. KEY STATISTICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#E4ECE7] p-4 sm:p-5 space-y-1">
          <div className="flex items-center justify-between text-[#687871]">
            <span className="text-xs font-medium">Total Scanned</span>
            <QrCode className="w-4 h-4 text-[#167A55]" />
          </div>
          <p className="text-2xl font-bold text-[#172923]">{totalScanned}</p>
          <p className="text-[11px] text-[#687871]">Demonstration checks</p>
        </div>

        <div className="bg-white rounded-xl border border-[#E4ECE7] p-4 sm:p-5 space-y-1">
          <div className="flex items-center justify-between text-[#687871]">
            <span className="text-xs font-medium">Matched Records</span>
            <CheckCircle2 className="w-4 h-4 text-[#218653]" />
          </div>
          <p className="text-2xl font-bold text-[#218653]">{matchedRecords}</p>
          <p className="text-[11px] text-[#218653]">Validated in registry</p>
        </div>

        <div className="bg-white rounded-xl border border-[#E4ECE7] p-4 sm:p-5 space-y-1">
          <div className="flex items-center justify-between text-[#687871]">
            <span className="text-xs font-medium">Unmatched Records</span>
            <AlertTriangle className="w-4 h-4 text-[#D64B4B]" />
          </div>
          <p className="text-2xl font-bold text-[#D64B4B]">{unmatchedRecords}</p>
          <p className="text-[11px] text-[#687871]">Requires re-inspection</p>
        </div>

        <div className="bg-white rounded-xl border border-[#E4ECE7] p-4 sm:p-5 space-y-1">
          <div className="flex items-center justify-between text-[#687871]">
            <span className="text-xs font-medium">Reports Submitted</span>
            <FileText className="w-4 h-4 text-[#3978B8]" />
          </div>
          <p className="text-2xl font-bold text-[#172923]">{totalReports}</p>
          <p className="text-[11px] text-[#687871]">Suspicious products flagged</p>
        </div>
      </div>

      {/* 4. RECENT ACTIVITY TABLE */}
      <div className="bg-white rounded-2xl border border-[#E4ECE7] shadow-xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[#E4ECE7] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-[#172923]">Recent Verification Activity</h3>
            <p className="text-xs text-[#687871]">
              Audit log of recently verified medicines and simulated outcomes.
            </p>
          </div>
          <Link
            to="/app/history"
            className="text-xs font-semibold text-[#167A55] hover:underline inline-flex items-center gap-1"
          >
            <span>View Full History ({history.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#F7FAF8] text-[#687871] border-b border-[#E4ECE7] font-medium text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 sm:px-6">Medicine</th>
                <th className="py-3 px-4">Batch Number</th>
                <th className="py-3 px-4">Date Checked</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4ECE7] text-[#172923]">
              {history.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-[#F7FAF8]/70 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="truncate max-w-xs">{item.medicineName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-[#687871]">
                    {item.batchNumber}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#687871] whitespace-nowrap">
                    {item.dateChecked}
                  </td>
                  <td className="py-3.5 px-4">{getStatusBadge(item.status)}</td>
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <button
                      onClick={() => handleViewHistoryItem(item)}
                      className="text-xs font-semibold text-[#167A55] hover:text-[#115B42] hover:underline inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Result</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. MEDICINE SAFETY AWARENESS HIGHLIGHT */}
      <div className="bg-[#F7FAF8] rounded-2xl border border-[#E4ECE7] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#167A55]">
            <BookOpen className="w-4 h-4" />
            <span>Medicine Safety Awareness & Consumer Guidance</span>
          </div>
          <h4 className="text-base font-bold text-[#172923]">
            Always inspect packaging seals before opening medication
          </h4>
          <p className="text-xs text-[#687871] leading-relaxed">
            Check for broken bottle seals, misspelled manufacturer names, altered expiry stamps, or discolored pills. If anything appears unusual, do not consume it and file a report.
          </p>
        </div>

        <Link to="/app/safety" className="shrink-0">
          <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            Browse Safety Articles
          </Button>
        </Link>
      </div>
    </div>
  );
};
