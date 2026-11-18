export type UserRole = 'Consumer' | 'Caregiver' | 'Other';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  totalScans: number;
  totalReports: number;
}

export type VerificationStatusType = 'MATCHED' | 'NOT_FOUND' | 'NO_CODE_DETECTED' | 'EXPIRED';

export interface MedicineRecord {
  id: string;
  name: string;
  brandName: string;
  manufacturer: string;
  category: string;
  dosageForm: string;
  strength: string;
  batchNumber: string;
  manufacturingDate: string;
  expiryDate: string;
  productCode: string;
  composition: string;
  packagingType: string;
  verifiedStatus: 'VERIFIED' | 'EXPIRED' | 'UNMATCHED';
  dataSource: string;
  storageCondition: string;
  schedule: string;
  description: string;
}

export interface VerificationResult {
  id: string;
  status: VerificationStatusType;
  timestamp: string;
  inputMethod: 'camera' | 'upload' | 'manual';
  submittedImage?: string;
  detectedCode?: string;
  codeFormat?: string;
  mismatchReason?: string;
  medicine?: MedicineRecord;
  submittedInfo?: {
    medicineName?: string;
    manufacturer?: string;
    batchNumber?: string;
    mfgDate?: string;
    expDate?: string;
    productCode?: string;
  };
}

export interface VerificationHistoryItem {
  id: string;
  medicineName: string;
  batchNumber: string;
  dateChecked: string;
  status: 'Matched' | 'Unmatched' | 'Incomplete' | 'Expired';
  productCode: string;
  medicineId?: string;
  result: VerificationResult;
}

export type ReportReason =
  | 'Suspicious Packaging'
  | 'Damaged Packaging'
  | 'Incorrect Product Information'
  | 'Unusual Appearance'
  | 'QR / Barcode Mismatch'
  | 'Expired Product'
  | 'Other';

export type ReportStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Additional Information Required'
  | 'Closed';

export interface ReportEvidence {
  id: string;
  type: 'packaging' | 'barcode' | 'receipt' | 'other';
  label: string;
  name: string;
  size: string;
  dataUrl: string;
}

export interface ReportTimelineEvent {
  date: string;
  title: string;
  note: string;
  status: ReportStatus;
}

export interface MedicineReport {
  id: string;
  medicineName: string;
  manufacturer: string;
  batchNumber: string;
  purchaseLocation: string;
  purchaseDate: string;
  reason: ReportReason;
  description: string;
  status: ReportStatus;
  submissionDate: string;
  evidence: ReportEvidence[];
  timeline: ReportTimelineEvent[];
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'verification' | 'report' | 'safety' | 'system';
  link?: string;
}

export interface SafetyArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  sections: {
    heading: string;
    paragraphs: string[];
    checklist?: string[];
  }[];
  relatedSlugs: string[];
}
