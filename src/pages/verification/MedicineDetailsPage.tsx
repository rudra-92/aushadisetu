import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  Building,
  Package,
  Layers,
  Calendar,
  AlertTriangle,
  QrCode,
  FileCheck2,
  Info,
  Clock
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { MOCK_MEDICINES } from '../../data/mockData';

export const MedicineDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Find medicine by id or fallback to first
  const medicine = MOCK_MEDICINES.find((m) => m.id === id) || MOCK_MEDICINES[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/app/history"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#167A55] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Verification History</span>
        </Link>
        <Badge variant={medicine.verifiedStatus === 'EXPIRED' ? 'warning' : 'success'}>
          {medicine.verifiedStatus === 'EXPIRED' ? 'Expired Product' : 'Verified Record'}
        </Badge>
      </div>

      {/* Main Header Card */}
      <div className="bg-white rounded-2xl border border-[#E4ECE7] shadow-xs p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4ECE7]">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#167A55] bg-[#EBF3EF] px-2.5 py-1 rounded">
              {medicine.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#172923] mt-2">
              {medicine.name}
            </h2>
            <p className="text-sm text-[#687871]">{medicine.brandName}</p>
          </div>

          <div className="flex items-center gap-2">
            <Link to={`/app/verify?tab=manual`}>
              <Button variant="outline" size="sm">
                Verify New Batch
              </Button>
            </Link>
            <Link
              to={`/app/reports/new?medicineName=${encodeURIComponent(
                medicine.name
              )}&batch=${encodeURIComponent(medicine.batchNumber)}`}
            >
              <Button variant="ghost" size="sm" className="text-[#D64B4B] hover:bg-[#FDF3F3]">
                Report Packaging
              </Button>
            </Link>
          </div>
        </div>

        {/* 1. BASIC INFORMATION */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-[#172923] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#167A55]" />
            Basic Pharmaceutical Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#F7FAF8] rounded-xl border border-[#E4ECE7] p-4 text-xs">
            <div>
              <span className="text-[#687871] block">Manufacturer:</span>
              <span className="font-semibold text-sm text-[#172923]">{medicine.manufacturer}</span>
            </div>
            <div>
              <span className="text-[#687871] block">Dosage Form:</span>
              <span className="font-semibold text-sm text-[#172923]">{medicine.dosageForm}</span>
            </div>
            <div>
              <span className="text-[#687871] block">Strength:</span>
              <span className="font-semibold text-sm text-[#172923]">{medicine.strength}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-[#687871] block">Active Composition:</span>
              <span className="font-medium text-[#172923]">{medicine.composition}</span>
            </div>
            <div>
              <span className="text-[#687871] block">Regulatory Schedule:</span>
              <span className="font-medium text-[#172923]">{medicine.schedule}</span>
            </div>
          </div>

          <p className="text-xs text-[#687871] leading-relaxed pt-1">
            {medicine.description}
          </p>
        </div>

        {/* 2. PACKAGING INFORMATION */}
        <div className="space-y-3 pt-4 border-t border-[#E4ECE7]">
          <h3 className="text-sm font-bold text-[#172923] flex items-center gap-2">
            <Package className="w-4 h-4 text-[#167A55]" />
            Packaging & Batch Information
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#F7FAF8] rounded-xl border border-[#E4ECE7] p-4 text-xs">
            <div>
              <span className="text-[#687871] block">Batch Number:</span>
              <span className="font-mono font-bold text-sm text-[#167A55]">
                {medicine.batchNumber}
              </span>
            </div>
            <div>
              <span className="text-[#687871] block">Product Code:</span>
              <span className="font-mono font-medium text-[#172923]">{medicine.productCode}</span>
            </div>
            <div>
              <span className="text-[#687871] block">Manufacturing Date:</span>
              <span className="font-medium text-[#172923]">{medicine.manufacturingDate}</span>
            </div>
            <div>
              <span className="text-[#687871] block">Expiry Date:</span>
              <span
                className={`font-semibold ${
                  medicine.verifiedStatus === 'EXPIRED' ? 'text-[#C73838]' : 'text-[#218653]'
                }`}
              >
                {medicine.expiryDate}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-[#687871] block">Packaging Format:</span>
              <span className="text-[#172923] font-medium">{medicine.packagingType}</span>
            </div>
            <div className="col-span-2">
              <span className="text-[#687871] block">Recommended Storage:</span>
              <span className="text-[#172923] font-medium">{medicine.storageCondition}</span>
            </div>
          </div>
        </div>

        {/* 3. VERIFICATION INFORMATION */}
        <div className="space-y-3 pt-4 border-t border-[#E4ECE7]">
          <h3 className="text-sm font-bold text-[#172923] flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-[#167A55]" />
            Verification Status & Registry Source
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-[#E4ECE7] bg-white">
              <span className="text-[#687871] block">Status:</span>
              <span className="font-semibold text-[#218653]">
                {medicine.verifiedStatus === 'EXPIRED' ? 'Matched — Expired' : 'Matched in Demonstration Registry'}
              </span>
            </div>
            <div className="p-3 rounded-lg border border-[#E4ECE7] bg-white">
              <span className="text-[#687871] block">Data Source:</span>
              <span className="font-medium text-[#172923]">{medicine.dataSource}</span>
            </div>
            <div className="p-3 rounded-lg border border-[#E4ECE7] bg-white">
              <span className="text-[#687871] block">Audit Integrity:</span>
              <span className="font-mono text-[#167A55]">Simulated Cryptographic Pass</span>
            </div>
          </div>
        </div>

        {/* 4. SAFETY NOTICE */}
        <div className="p-4 bg-[#FDF9F2] border border-[#F5E5C9] rounded-xl text-xs text-[#9E6510] space-y-1.5 mt-4">
          <div className="flex items-center gap-1.5 font-bold text-sm text-[#87550C]">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Healthcare Clinical Disclaimer</span>
          </div>
          <p className="leading-relaxed">
            Product information matching does not independently establish medicine authenticity, quality, clinical safety or suitability. Consult a qualified healthcare professional for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};
