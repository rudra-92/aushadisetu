import { MOCK_MEDICINES } from '../data/mockData';
import { MedicineRecord, VerificationResult, VerificationStatusType } from '../types';

export interface VerificationInput {
  method: 'camera' | 'upload' | 'manual';
  imageDataUrl?: string;
  detectedCode?: string;
  manualData?: {
    medicineName: string;
    manufacturer?: string;
    batchNumber?: string;
    mfgDate?: string;
    expDate?: string;
    productCode?: string;
  };
}

export const verificationService = {
  /**
   * Evaluates input and returns a simulated VerificationResult.
   * Logic is encapsulated cleanly to allow real backend API swapping later.
   */
  async verifyMedicine(input: VerificationInput): Promise<VerificationResult> {
    // Realistic simulated network & cryptographic processing time
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const id = `res-${Date.now()}`;
    const timestamp = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Check for explicit "NO CODE DETECTED" triggers
    if (
      input.detectedCode === 'BLURRY-CODE' ||
      input.detectedCode === 'NO-CODE' ||
      (input.method === 'upload' && input.detectedCode === 'TRIGGER_NO_CODE')
    ) {
      return {
        id,
        status: 'NO_CODE_DETECTED',
        timestamp,
        inputMethod: input.method,
        submittedImage: input.imageDataUrl,
        mismatchReason: 'The uploaded image did not contain an identifiable 2D DataMatrix, QR Code, or standard GS1-128 barcode. The image may be blurry, have glare, or the code may be cut off.'
      };
    }

    // Check for explicit "NOT FOUND / UNMATCHED" triggers
    if (
      input.detectedCode === 'FAKE-SYRUP-99' ||
      input.detectedCode === 'UNK-99410-Q' ||
      input.manualData?.productCode?.toUpperCase().includes('FAKE') ||
      input.manualData?.batchNumber?.toUpperCase().includes('FAKE') ||
      (input.manualData?.medicineName && input.manualData.medicineName.toLowerCase().includes('unknown'))
    ) {
      return {
        id,
        status: 'NOT_FOUND',
        timestamp,
        inputMethod: input.method,
        submittedImage: input.imageDataUrl,
        detectedCode: input.detectedCode || input.manualData?.productCode || 'UNK-99410-Q',
        codeFormat: input.method === 'manual' ? 'Manual Input' : 'EAN-13 / 2D Matrix',
        mismatchReason: 'The submitted product identifier was not found in the demonstration registry. Please verify the batch number or report this medicine if packaging appears suspicious.',
        submittedInfo: input.manualData
      };
    }

    // Try finding matching record from mock database
    let matchedMed: MedicineRecord | undefined;

    if (input.detectedCode) {
      const code = input.detectedCode.trim().toUpperCase();
      matchedMed = MOCK_MEDICINES.find(
        (m) =>
          m.productCode.toUpperCase() === code ||
          m.batchNumber.toUpperCase() === code ||
          code.includes(m.productCode.toUpperCase()) ||
          code.includes(m.batchNumber.toUpperCase())
      );
    }

    if (!matchedMed && input.manualData) {
      const name = input.manualData.medicineName.trim().toLowerCase();
      const batch = input.manualData.batchNumber?.trim().toUpperCase();
      const code = input.manualData.productCode?.trim().toUpperCase();

      matchedMed = MOCK_MEDICINES.find(
        (m) =>
          (code && m.productCode.toUpperCase() === code) ||
          (batch && m.batchNumber.toUpperCase() === batch) ||
          (name && m.name.toLowerCase().includes(name))
      );
    }

    // Default fallback matching if testing generic camera/upload demo
    if (!matchedMed && (input.method === 'camera' || input.method === 'upload')) {
      // Default to Paracetamol 500 mg match for standard demo scans
      matchedMed = MOCK_MEDICINES[0];
    }

    if (matchedMed) {
      // Determine if expired
      const isExpired = matchedMed.verifiedStatus === 'EXPIRED';
      const status: VerificationStatusType = isExpired ? 'EXPIRED' : 'MATCHED';

      return {
        id,
        status,
        timestamp,
        inputMethod: input.method,
        submittedImage: input.imageDataUrl,
        detectedCode: matchedMed.productCode,
        codeFormat: 'GS1 DataMatrix (2D)',
        medicine: matchedMed,
        submittedInfo: input.manualData
      };
    }

    // If nothing matched
    return {
      id,
      status: 'NOT_FOUND',
      timestamp,
      inputMethod: input.method,
      submittedImage: input.imageDataUrl,
      detectedCode: input.detectedCode || input.manualData?.productCode || 'UNKNOWN-CODE',
      codeFormat: 'Standard Barcode',
      mismatchReason: 'The submitted details could not be matched with any active pharmaceutical entry in our demonstration records.',
      submittedInfo: input.manualData
    };
  }
};
