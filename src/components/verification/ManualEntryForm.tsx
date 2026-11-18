import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Zap, HelpCircle } from 'lucide-react';

interface ManualEntryFormProps {
  onVerify: (data: {
    medicineName: string;
    manufacturer?: string;
    batchNumber: string;
    mfgDate?: string;
    expDate?: string;
    productCode?: string;
  }) => void;
  initialValues?: {
    medicineName?: string;
    manufacturer?: string;
    batchNumber?: string;
    mfgDate?: string;
    expDate?: string;
    productCode?: string;
  };
}

export const ManualEntryForm: React.FC<ManualEntryFormProps> = ({
  onVerify,
  initialValues
}) => {
  const [formData, setFormData] = useState({
    medicineName: initialValues?.medicineName || '',
    manufacturer: initialValues?.manufacturer || '',
    batchNumber: initialValues?.batchNumber || '',
    mfgDate: initialValues?.mfgDate || '',
    expDate: initialValues?.expDate || '',
    productCode: initialValues?.productCode || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.medicineName.trim()) {
      newErrors.medicineName = 'Medicine Name is required.';
    }
    if (!formData.batchNumber.trim()) {
      newErrors.batchNumber = 'Batch Number is required (printed as B.No. or Lot on strip).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onVerify(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#E4ECE7] p-5 sm:p-6 space-y-4">
      <div className="border-b border-[#E4ECE7] pb-3 mb-2">
        <h4 className="text-sm font-semibold text-[#172923]">Manual Medicine Information Entry</h4>
        <p className="text-xs text-[#687871] mt-0.5">
          Enter details printed directly on the outer carton, blister strip, or bottle label.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Medicine / Brand Name"
          required
          placeholder="e.g. Paracetamol 500 mg"
          value={formData.medicineName}
          onChange={(e) => {
            setFormData({ ...formData, medicineName: e.target.value });
            if (errors.medicineName) setErrors({ ...errors, medicineName: '' });
          }}
          error={errors.medicineName}
          helperText="Generic chemical name or commercial brand name"
        />

        <Input
          label="Manufacturer"
          placeholder="e.g. Example Pharmaceuticals Ltd."
          value={formData.manufacturer}
          onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
          helperText="Pharmaceutical company indicated on the packaging"
        />

        <Input
          label="Batch / Lot Number"
          required
          placeholder="e.g. PCM2026A01"
          value={formData.batchNumber}
          onChange={(e) => {
            setFormData({ ...formData, batchNumber: e.target.value });
            if (errors.batchNumber) setErrors({ ...errors, batchNumber: '' });
          }}
          error={errors.batchNumber}
          helperText="Alphanumeric lot code stamped or debossed on packaging"
        />

        <Input
          label="Product Code / Barcode Identifier"
          placeholder="e.g. AS-PAR-500-001 or GTIN"
          value={formData.productCode}
          onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
          helperText="GTIN, barcode number, or 2D matrix string if visible"
        />

        <Input
          type="month"
          label="Manufacturing Date (Mfg. Dt.)"
          value={formData.mfgDate}
          onChange={(e) => setFormData({ ...formData, mfgDate: e.target.value })}
        />

        <Input
          type="month"
          label="Expiry Date (Exp. Dt.)"
          value={formData.expDate}
          onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
          helperText="Expiration month and year"
        />
      </div>

      <div className="bg-[#F7FAF8] rounded-lg p-3 text-xs text-[#687871] flex items-start gap-2 border border-[#E4ECE7]">
        <HelpCircle className="w-4 h-4 text-[#167A55] shrink-0 mt-0.5" />
        <span>
          Tip: Look for embossed or dot-matrix printed text near the edge of the blister strip or on the flap of the outer paper box.
        </span>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          leftIcon={<Zap className="w-4 h-4" />}
          className="w-full sm:w-auto px-6"
        >
          Verify Medicine Details
        </Button>
      </div>
    </form>
  );
};
