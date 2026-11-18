import { MedicineRecord, VerificationHistoryItem, MedicineReport, NotificationItem } from '../types';

export const MOCK_MEDICINES: MedicineRecord[] = [
  {
    id: 'med-paracetamol-500',
    name: 'Paracetamol 500 mg',
    brandName: 'Calmura Paracetamol Tab IP',
    manufacturer: 'Example Pharmaceuticals Ltd.',
    category: 'Analgesics & Antipyretics',
    dosageForm: 'Film-coated Tablet',
    strength: '500 mg',
    batchNumber: 'PCM2026A01',
    manufacturingDate: 'January 2026',
    expiryDate: 'December 2027',
    productCode: 'AS-PAR-500-001',
    composition: 'Paracetamol IP 500 mg per tablet',
    packagingType: 'Alu-Alu Blister Pack (10 Tablets)',
    verifiedStatus: 'VERIFIED',
    dataSource: 'Standard Pharmaceutical Demonstration Registry (Simulated)',
    storageCondition: 'Store in a dry place below 30°C. Protect from direct sunlight.',
    schedule: 'Schedule H / OTC depends on local regulation',
    description: 'Widely used antipyretic and analgesic agent for the temporary relief of mild to moderate pain and fever reduction.'
  },
  {
    id: 'med-cetirizine-10',
    name: 'Cetirizine 10 mg',
    brandName: 'Aleron Cetirizine Hydrochloride',
    manufacturer: 'Aushadhi Life Sciences Corp.',
    category: 'Antihistamines',
    dosageForm: 'Film-coated Tablet',
    strength: '10 mg',
    batchNumber: 'CTZ-2025-B4',
    manufacturingDate: 'November 2025',
    expiryDate: 'October 2028',
    productCode: 'AS-CTZ-010-044',
    composition: 'Cetirizine Hydrochloride IP 10 mg',
    packagingType: 'Strip of 10 Tablets',
    verifiedStatus: 'VERIFIED',
    dataSource: 'Standard Pharmaceutical Demonstration Registry (Simulated)',
    storageCondition: 'Store protected from moisture at a temperature not exceeding 25°C.',
    schedule: 'Prescription Drug',
    description: 'Second-generation antihistamine used in the symptomatic treatment of allergic rhinitis, conjunctivitis, and chronic urticaria.'
  },
  {
    id: 'med-amoxicillin-500',
    name: 'Amoxicillin 500 mg',
    brandName: 'AmoxiTrust 500 Capsules',
    manufacturer: 'BioMedix Formulations Ltd.',
    category: 'Antibiotics (Penicillin)',
    dosageForm: 'Hard Gelatin Capsule',
    strength: '500 mg',
    batchNumber: 'AMX-2023-X9',
    manufacturingDate: 'March 2023',
    expiryDate: 'October 2025', // Past date for expired state simulation
    productCode: 'AS-AMX-500-092',
    composition: 'Amoxicillin Trihydrate IP equivalent to Amoxicillin 500 mg',
    packagingType: 'Blister Pack (10 Capsules)',
    verifiedStatus: 'EXPIRED',
    dataSource: 'Standard Pharmaceutical Demonstration Registry (Simulated)',
    storageCondition: 'Store in cool and dry place below 25°C.',
    schedule: 'Schedule H1 Prescription Drug',
    description: 'Broad-spectrum beta-lactam antibiotic used in the treatment of susceptible bacterial infections.'
  },
  {
    id: 'med-vitamin-c-500',
    name: 'Vitamin C 500 mg',
    brandName: 'C-Vita Chewable 500',
    manufacturer: 'NutraCare Healthcare Labs',
    category: 'Vitamins & Dietary Supplements',
    dosageForm: 'Chewable Tablet',
    strength: '500 mg',
    batchNumber: 'VTC-2026-081',
    manufacturingDate: 'February 2026',
    expiryDate: 'January 2029',
    productCode: 'AS-VTC-500-112',
    composition: 'Ascorbic Acid IP 100 mg + Sodium Ascorbate IP 450 mg',
    packagingType: 'Amber Glass Bottle (30 Tablets)',
    verifiedStatus: 'VERIFIED',
    dataSource: 'Standard Pharmaceutical Demonstration Registry (Simulated)',
    storageCondition: 'Keep container tightly closed. Protect from moisture and heat.',
    schedule: 'Nutraceutical / OTC',
    description: 'Essential antioxidant vitamin supporting immune defense, collagen synthesis, and tissue repair.'
  },
  {
    id: 'med-azithromycin-250',
    name: 'Azithromycin 250 mg',
    brandName: 'ZithroCare 250 Tablets',
    manufacturer: 'Zenith Pharmaceuticals Ltd.',
    category: 'Antibiotics (Macrolide)',
    dosageForm: 'Film-coated Tablet',
    strength: '250 mg',
    batchNumber: 'AZM-2025-C1',
    manufacturingDate: 'August 2025',
    expiryDate: 'July 2027',
    productCode: 'AS-AZM-250-708',
    composition: 'Azithromycin Dihydrate IP equivalent to Azithromycin 250 mg',
    packagingType: 'Strip of 6 Tablets',
    verifiedStatus: 'VERIFIED',
    dataSource: 'Standard Pharmaceutical Demonstration Registry (Simulated)',
    storageCondition: 'Store protected from light and moisture below 30°C.',
    schedule: 'Schedule H1 Prescription Drug',
    description: 'Macrolide antibacterial medication prescribed for respiratory tract, ear, and soft tissue infections.'
  }
];

export const INITIAL_HISTORY: VerificationHistoryItem[] = [
  {
    id: 'hist-001',
    medicineName: 'Paracetamol 500 mg',
    batchNumber: 'PCM2026A01',
    dateChecked: '2026-11-16 14:32',
    status: 'Matched',
    productCode: 'AS-PAR-500-001',
    medicineId: 'med-paracetamol-500',
    result: {
      id: 'res-001',
      status: 'MATCHED',
      timestamp: '2026-11-16 14:32',
      inputMethod: 'camera',
      detectedCode: 'AS-PAR-500-001',
      codeFormat: 'DataMatrix 2D',
      medicine: MOCK_MEDICINES[0]
    }
  },
  {
    id: 'hist-002',
    medicineName: 'Cetirizine 10 mg',
    batchNumber: 'CTZ-2025-B4',
    dateChecked: '2026-11-14 10:15',
    status: 'Matched',
    productCode: 'AS-CTZ-010-044',
    medicineId: 'med-cetirizine-10',
    result: {
      id: 'res-002',
      status: 'MATCHED',
      timestamp: '2026-11-14 10:15',
      inputMethod: 'upload',
      detectedCode: 'AS-CTZ-010-044',
      codeFormat: 'GS1-128 Barcode',
      medicine: MOCK_MEDICINES[1]
    }
  },
  {
    id: 'hist-003',
    medicineName: 'Vitamin C 500 mg',
    batchNumber: 'VTC-2026-081',
    dateChecked: '2026-11-10 18:40',
    status: 'Matched',
    productCode: 'AS-VTC-500-112',
    medicineId: 'med-vitamin-c-500',
    result: {
      id: 'res-003',
      status: 'MATCHED',
      timestamp: '2026-11-10 18:40',
      inputMethod: 'upload',
      detectedCode: 'AS-VTC-500-112',
      codeFormat: 'QR Code',
      medicine: MOCK_MEDICINES[3]
    }
  },
  {
    id: 'hist-004',
    medicineName: 'Example Medicine X (Unmatched)',
    batchNumber: 'UNK-99410-Q',
    dateChecked: '2026-11-08 09:20',
    status: 'Unmatched',
    productCode: 'UNK-99410-Q',
    result: {
      id: 'res-004',
      status: 'NOT_FOUND',
      timestamp: '2026-11-08 09:20',
      inputMethod: 'camera',
      detectedCode: 'UNK-99410-Q',
      codeFormat: 'EAN-13',
      mismatchReason: 'The barcode sequence UNK-99410-Q does not match authorized demonstration registry manufacturer entries.'
    }
  },
  {
    id: 'hist-005',
    medicineName: 'Amoxicillin 500 mg (Expired)',
    batchNumber: 'AMX-2023-X9',
    dateChecked: '2026-11-05 16:05',
    status: 'Expired',
    productCode: 'AS-AMX-500-092',
    medicineId: 'med-amoxicillin-500',
    result: {
      id: 'res-005',
      status: 'EXPIRED',
      timestamp: '2026-11-05 16:05',
      inputMethod: 'manual',
      detectedCode: 'AS-AMX-500-092',
      medicine: MOCK_MEDICINES[2]
    }
  },
  {
    id: 'hist-006',
    medicineName: 'Packaging Scan (No Code)',
    batchNumber: 'N/A',
    dateChecked: '2026-11-02 11:50',
    status: 'Incomplete',
    productCode: 'N/A',
    result: {
      id: 'res-006',
      status: 'NO_CODE_DETECTED',
      timestamp: '2026-11-02 11:50',
      inputMethod: 'upload',
      mismatchReason: 'Glare or blur obscured the barcode section. Manual verification recommended.'
    }
  }
];

export const INITIAL_REPORTS: MedicineReport[] = [
  {
    id: 'RPT-2026-8941',
    medicineName: 'Example Cough Syrup 100ml',
    manufacturer: 'Unverified Bottling Unit',
    batchNumber: 'CS-2024-91B',
    purchaseLocation: 'Local Corner Drugstore, Sector 4 Market',
    purchaseDate: '2026-11-07',
    reason: 'Suspicious Packaging',
    description: 'The printed bottle label lacked security hologram, text had spelling errors ("Expriy" instead of "Expiry"), and cap seal had no tamper-evident ring.',
    status: 'Under Review',
    submissionDate: '2026-11-08 10:14',
    evidence: [
      {
        id: 'ev-01',
        type: 'packaging',
        label: 'Front packaging photograph',
        name: 'syrup_front_label.jpg',
        size: '1.8 MB',
        dataUrl: ''
      },
      {
        id: 'ev-02',
        type: 'barcode',
        label: 'Smudged barcode on bottle back',
        name: 'barcode_smudge.jpg',
        size: '1.2 MB',
        dataUrl: ''
      }
    ],
    timeline: [
      {
        date: '2026-11-08 10:14',
        title: 'Report Submitted',
        note: 'Report logged by user and dispatched to demonstration safety queue.',
        status: 'Submitted'
      },
      {
        date: '2026-11-09 14:00',
        title: 'Initial Review Started',
        note: 'Visual evidence analyzed by safety review desk. Packaging irregularities noted.',
        status: 'Under Review'
      }
    ],
    notes: 'Demonstration report: Safety review desk requested manufacturer packaging reference verification.'
  },
  {
    id: 'RPT-2026-7210',
    medicineName: 'Cold Relief Lozenges',
    manufacturer: 'Apex Pharma Ltd.',
    batchNumber: 'CRL-09-2023',
    purchaseLocation: 'Railway Station Kiosk, Platform 2',
    purchaseDate: '2026-10-24',
    reason: 'Expired Product',
    description: 'Product expiry date was overwritten with a black marker pen. Beneath the marker, original expiry date showed 2024.',
    status: 'Closed',
    submissionDate: '2026-10-25 15:30',
    evidence: [
      {
        id: 'ev-03',
        type: 'packaging',
        label: 'Overwritten date photo',
        name: 'altered_date.png',
        size: '2.1 MB',
        dataUrl: ''
      }
    ],
    timeline: [
      {
        date: '2026-10-25 15:30',
        title: 'Report Submitted',
        note: 'Report created with visual proof of marker alteration.',
        status: 'Submitted'
      },
      {
        date: '2026-10-26 11:20',
        title: 'Investigation Completed',
        note: 'Flagged as expired stock relabeling. Demonstration vendor alert simulated.',
        status: 'Closed'
      }
    ],
    notes: 'Demonstration simulated outcome: Vendor advisory logged.'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Verification Matched: Paracetamol 500 mg',
    description: 'Batch PCM2026A01 matched demonstration registry records successfully.',
    timestamp: 'Yesterday at 2:32 PM',
    read: false,
    type: 'verification',
    link: '/app/history'
  },
  {
    id: 'notif-2',
    title: 'Report Status Updated (RPT-2026-8941)',
    description: 'Your report regarding "Example Cough Syrup" is now Under Review.',
    timestamp: '2 days ago',
    read: false,
    type: 'report',
    link: '/app/reports/RPT-2026-8941'
  },
  {
    id: 'notif-3',
    title: 'New Safety Awareness Article',
    description: 'Read: "Identifying Packaging Irregularities: A Practical Guide for Consumers".',
    timestamp: '4 days ago',
    read: true,
    type: 'safety',
    link: '/app/safety/packaging-irregularities'
  },
  {
    id: 'notif-4',
    title: 'Welcome to AushadhiSetu',
    description: 'Your account has been set up with demo verification tools and safe medicine guides.',
    timestamp: '1 week ago',
    read: true,
    type: 'system',
    link: '/app/dashboard'
  }
];
