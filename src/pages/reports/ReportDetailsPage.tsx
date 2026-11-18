import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  AlertTriangle,
  Building,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useApp } from '../../context/AppContext';
import { ReportStatus } from '../../types';

export const ReportDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { reports } = useApp();

  const report = reports.find((r) => r.id === id) || reports[0];

  if (!report) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-sm text-[#687871]">Report not found.</p>
        <Link to="/app/reports">
          <Button variant="outline" size="sm">
            Back to Reports
          </Button>
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'Submitted':
        return <Badge variant="info">Submitted</Badge>;
      case 'Under Review':
        return <Badge variant="warning">Under Review</Badge>;
      case 'Additional Information Required':
        return <Badge variant="danger">Action Required</Badge>;
      case 'Closed':
        return <Badge variant="success">Investigation Closed</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/app/reports"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#167A55] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Reports</span>
        </Link>
        {getStatusBadge(report.status)}
      </div>

      {/* Main Report Card */}
      <div className="bg-white rounded-2xl border border-[#E4ECE7] shadow-xs p-6 sm:p-8 space-y-6">
        {/* Title and ID */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4ECE7]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#167A55] bg-[#EBF3EF] px-2 py-0.5 rounded">
                {report.id}
              </span>
              <span className="text-xs text-[#687871]">Filed on {report.submissionDate}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#172923] mt-2">
              {report.medicineName}
            </h2>
            <p className="text-xs text-[#D64B4B] font-semibold mt-0.5">
              Reason: {report.reason}
            </p>
          </div>
        </div>

        {/* 1. Submitted Information Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#687871]">
            Submitted Incident Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F7FAF8] rounded-xl border border-[#E4ECE7] p-4 text-xs text-[#172923]">
            <div>
              <span className="text-[#687871] block">Batch Number:</span>
              <span className="font-mono font-bold text-sm text-[#167A55]">
                {report.batchNumber}
              </span>
            </div>
            <div>
              <span className="text-[#687871] block">Manufacturer (Indicated):</span>
              <span className="font-medium">{report.manufacturer}</span>
            </div>
            <div>
              <span className="text-[#687871] block">Purchase Location:</span>
              <span className="font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#167A55]" />
                {report.purchaseLocation}
              </span>
            </div>
            <div>
              <span className="text-[#687871] block">Purchase Date:</span>
              <span className="font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#167A55]" />
                {report.purchaseDate}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Detailed Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#687871]">
            User Description & Observations
          </h3>
          <div className="p-4 bg-white rounded-xl border border-[#E4ECE7] text-xs text-[#172923] leading-relaxed">
            {report.description}
          </div>
        </div>

        {/* 3. Uploaded Evidence Files */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#687871]">
            Attached Visual Evidence ({report.evidence.length})
          </h3>
          {report.evidence.length === 0 ? (
            <p className="text-xs text-[#687871] italic">No image attachments provided.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {report.evidence.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3 bg-[#F7FAF8] border border-[#E4ECE7] rounded-xl flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E4ECE7] flex items-center justify-center shrink-0 text-[#167A55]">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#172923] truncate">{ev.label}</p>
                    <p className="text-[11px] text-[#687871]">{ev.name} • {ev.size}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Investigation Timeline */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#687871]">
            Review & Investigation Timeline
          </h3>

          <div className="space-y-3 border-l-2 border-[#167A55]/30 pl-4 ml-2">
            {report.timeline.map((evt, idx) => (
              <div key={idx} className="relative space-y-1">
                <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-[#167A55] ring-4 ring-white" />
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#172923]">{evt.title}</span>
                  <span className="text-[11px] text-[#687871]">{evt.date}</span>
                </div>
                <p className="text-xs text-[#687871] leading-relaxed">{evt.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Additional Notes / Resolution */}
        {report.notes && (
          <div className="p-4 bg-[#F0F8F4] border border-[#D1EBDD] rounded-xl text-xs text-[#165C39] space-y-1">
            <p className="font-bold">Demonstration Review Desk Note:</p>
            <p>{report.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};
