import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Eye, AlertCircle, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge, BadgeVariant } from '../../components/common/Badge';
import { useApp } from '../../context/AppContext';
import { ReportStatus } from '../../types';

export const MyReportsPage: React.FC = () => {
  const { reports } = useApp();

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'Submitted':
        return <Badge variant="info">Submitted</Badge>;
      case 'Under Review':
        return <Badge variant="warning">Under Review</Badge>;
      case 'Additional Information Required':
        return <Badge variant="danger">Info Needed</Badge>;
      case 'Closed':
        return <Badge variant="success">Closed</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E4ECE7]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#172923]">My Submitted Reports</h2>
          <p className="text-xs sm:text-sm text-[#687871]">
            Track the simulated review status of suspicious medicine packaging reports you filed.
          </p>
        </div>

        <Link to="/app/reports/new">
          <Button variant="danger" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            File New Report
          </Button>
        </Link>
      </div>

      {/* Reports Table or Empty State */}
      {reports.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E4ECE7] p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#D64B4B]/10 text-[#D64B4B] flex items-center justify-center mx-auto">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-[#172923]">No Reports Filed Yet</h3>
          <p className="text-xs text-[#687871] leading-relaxed">
            If you encounter medicine packaging that looks damaged, tampered, expired, or has spelling errors, submit a report here.
          </p>
          <Link to="/app/reports/new">
            <Button variant="danger" size="md" leftIcon={<Plus className="w-4 h-4" />}>
              Submit Suspicious Product Report
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E4ECE7] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F7FAF8] text-[#687871] border-b border-[#E4ECE7] font-medium text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Report ID</th>
                  <th className="py-3 px-4">Medicine Name</th>
                  <th className="py-3 px-4">Reason for Suspicion</th>
                  <th className="py-3 px-4">Date Filed</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4ECE7] text-[#172923]">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-[#F7FAF8]/70 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-mono text-xs font-semibold text-[#167A55]">
                      {report.id}
                    </td>
                    <td className="py-3.5 px-4 font-medium">
                      <div className="truncate max-w-xs">{report.medicineName}</div>
                      <div className="text-[11px] font-mono text-[#687871]">
                        Batch: {report.batchNumber}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#687871]">
                      {report.reason}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#687871] whitespace-nowrap">
                      {report.submissionDate}
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(report.status)}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <Link
                        to={`/app/reports/${report.id}`}
                        className="text-xs font-semibold text-[#167A55] hover:text-[#115B42] hover:underline inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Simulated Notice */}
      <div className="p-4 bg-[#F7FAF8] border border-[#E4ECE7] rounded-xl text-xs text-[#687871] space-y-1">
        <p className="font-semibold text-[#172923]">Demonstration Workflow Notice:</p>
        <p>
          Report statuses ("Submitted", "Under Review", "Closed") represent simulated consumer incident response workflows. In a production integration, verified alerts are channeled to national drug regulatory authorities.
        </p>
      </div>
    </div>
  );
};
