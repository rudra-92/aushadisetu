import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  History,
  QrCode,
  Calendar,
  Eye,
  Trash2,
  FileDown,
  ArrowUpDown,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { useApp } from '../../context/AppContext';

export const HistoryPage: React.FC = () => {
  const { history, clearHistory, setLastVerificationResult } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showClearModal, setShowClearModal] = useState(false);

  const itemsPerPage = 6;

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return history
      .filter((item) => {
        const matchesSearch =
          item.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.productCode.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === 'all' ||
          item.status.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortOrder === 'latest') {
          return new Date(b.dateChecked).getTime() - new Date(a.dateChecked).getTime();
        }
        return new Date(a.dateChecked).getTime() - new Date(b.dateChecked).getTime();
      });
  }, [history, searchTerm, statusFilter, sortOrder]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Matched':
        return <Badge variant="success">Matched</Badge>;
      case 'Unmatched':
        return <Badge variant="danger">Unmatched</Badge>;
      case 'Expired':
        return <Badge variant="warning">Expired Date</Badge>;
      case 'Incomplete':
        return <Badge variant="neutral">No Code</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const handleViewItem = (item: (typeof history)[0]) => {
    setLastVerificationResult(item.result);
    navigate('/app/verify/result');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E4ECE7]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#172923]">
            Verification History
          </h2>
          <p className="text-xs sm:text-sm text-[#687871]">
            Track, filter, and audit all previously verified medicines and packaging checks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowClearModal(true)}
              leftIcon={<Trash2 className="w-3.5 h-3.5 text-[#D64B4B]" />}
              className="text-[#D64B4B] hover:bg-[#FDF3F3]"
            >
              Clear Log
            </Button>
          )}
          <Link to="/app/verify">
            <Button variant="primary" size="sm" leftIcon={<QrCode className="w-4 h-4" />}>
              Verify Medicine
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-[#E4ECE7] p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#687871] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by medicine name, batch or code..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full py-2 pl-9 pr-3 text-xs sm:text-sm bg-[#F7FAF8] border border-[#E4ECE7] rounded-lg focus:outline-none focus:border-[#167A55] focus:bg-white text-[#172923]"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-[#687871] bg-[#F7FAF8] border border-[#E4ECE7] rounded-lg px-2.5 py-1.5">
            <Filter className="w-3.5 h-3.5 text-[#167A55]" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent focus:outline-none text-[#172923] font-medium cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="matched">Matched Only</option>
              <option value="unmatched">Unmatched</option>
              <option value="expired">Expired Date</option>
              <option value="incomplete">Incomplete / No Code</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="flex items-center gap-1.5 text-xs text-[#687871] bg-[#F7FAF8] border border-[#E4ECE7] rounded-lg px-2.5 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'latest' | 'oldest')}
              className="bg-transparent focus:outline-none text-[#172923] font-medium cursor-pointer"
            >
              <option value="latest">Sort: Latest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Table or Empty States */}
      {history.length === 0 ? (
        /* Zero State: Entire history is empty */
        <div className="bg-white rounded-2xl border border-[#E4ECE7] p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#167A55]/10 text-[#167A55] flex items-center justify-center mx-auto">
            <History className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-[#172923]">No Verifications Yet</h3>
          <p className="text-xs text-[#687871] leading-relaxed">
            You haven't scanned or verified any medicines yet. Use our verification scanner to check packaging serials and batch information.
          </p>
          <Link to="/app/verify">
            <Button variant="primary" size="md" leftIcon={<QrCode className="w-4 h-4" />}>
              Start First Verification
            </Button>
          </Link>
        </div>
      ) : filteredItems.length === 0 ? (
        /* No search results match */
        <div className="bg-white rounded-2xl border border-[#E4ECE7] p-8 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-[#687871] mx-auto" />
          <h4 className="text-sm font-semibold text-[#172923]">No matching verifications found</h4>
          <p className="text-xs text-[#687871]">
            No records matched your search query "{searchTerm}" or selected status filter.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}
          >
            Clear Search & Filters
          </Button>
        </div>
      ) : (
        /* Populated Table */
        <div className="bg-white rounded-2xl border border-[#E4ECE7] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F7FAF8] text-[#687871] border-b border-[#E4ECE7] font-medium text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Medicine Name</th>
                  <th className="py-3 px-4">Batch Number</th>
                  <th className="py-3 px-4">Date Checked</th>
                  <th className="py-3 px-4">Verification Status</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4ECE7] text-[#172923]">
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F7FAF8]/70 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-medium">
                      <div className="max-w-xs truncate">{item.medicineName}</div>
                      <div className="text-[11px] font-mono text-[#9AA8A1]">
                        Code: {item.productCode}
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
                        onClick={() => handleViewItem(item)}
                        className="text-xs font-semibold text-[#167A55] hover:text-[#115B42] hover:underline inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="px-4 sm:px-6 py-3 border-t border-[#E4ECE7] bg-[#F7FAF8] flex items-center justify-between text-xs text-[#687871]">
              <span>
                Showing page {currentPage} of {totalPages} ({filteredItems.length} records)
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal to Clear History */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Clear Verification History?"
        description="This will remove your local audit records from this browser session."
      >
        <div className="space-y-4 text-xs text-[#687871]">
          <p>
            Are you sure you want to clear your verification records? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setShowClearModal(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                clearHistory();
                setShowClearModal(false);
              }}
            >
              Clear All Records
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
