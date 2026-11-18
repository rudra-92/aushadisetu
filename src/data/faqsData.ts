export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is AushadhiSetu?',
    answer: 'AushadhiSetu is a modern Medicine Authentication and Pharmaceutical Safety Platform designed to bridge the trust gap between pharmaceutical supply chains and everyday consumers. It enables users to verify medicine packaging codes, inspect verified product information, recognize potential packaging red flags, and report suspicious products.'
  },
  {
    id: 'faq-2',
    category: 'Verification',
    question: 'How do I verify a medicine?',
    answer: 'You can verify your medicine in three easy ways: 1) Point your smartphone camera at the 2D DataMatrix, QR code, or barcode printed on the packaging; 2) Upload a clear photograph of the carton or blister pack; or 3) Enter the medicine details (brand name, manufacturer, and batch number) manually into our verification tool.'
  },
  {
    id: 'faq-3',
    category: 'Verification',
    question: 'What happens if a code cannot be matched?',
    answer: 'If a submitted code or batch number cannot be matched against our demonstration registry, AushadhiSetu displays an Unmatched result. An unmatched result does not by itself prove that a product is counterfeit—it may reflect missing registry entries, typographical errors, or unindexed batches. You are provided with direct options to review the entered data, retry with better lighting, or file a suspicious medicine report for further scrutiny.'
  },
  {
    id: 'faq-4',
    category: 'Reporting',
    question: 'Can I report suspicious medicine packaging?',
    answer: 'Yes. AushadhiSetu provides a dedicated, structured reporting workflow where you can submit photos of questionable packaging, broken tamper seals, smudged lot numbers, or purchase receipts along with notes on where and when the item was bought.'
  },
  {
    id: 'faq-5',
    category: 'Safety & Disclaimer',
    question: 'Does verification guarantee medicine safety?',
    answer: 'No digital platform can independently guarantee clinical chemical safety, purity, or patient suitability. Verification cross-references packaging identifiers against authorized reference records. Always purchase medications from licensed pharmacies, inspect physical seals, and consult a qualified medical professional for health advice.'
  },
  {
    id: 'faq-6',
    category: 'General',
    question: 'How does AushadhiSetu protect user privacy?',
    answer: 'AushadhiSetu does not sell personal health or verification data. Scanned images and verification records in this platform demonstration are stored locally on your device or in simulated secure session storage.'
  }
];
