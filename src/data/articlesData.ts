import { SafetyArticle } from '../types';

export const SAFETY_ARTICLES: SafetyArticle[] = [
  {
    id: 'art-1',
    slug: 'understanding-medicine-packaging',
    title: 'Understanding Medicine Packaging: Reading Labels Correctly',
    category: 'Packaging Standards',
    readTime: '4 min read',
    summary: 'A comprehensive consumer guide to decoding pharmaceutical labeling, identifying batch numbers, regulatory markings, and active ingredients.',
    sections: [
      {
        heading: 'Why Packaging Information Matters',
        paragraphs: [
          'Pharmaceutical packaging is not merely a container; it serves as a legally mandated identity card for the medicine. Every detail printed on a pharmaceutical carton, bottle, or blister strip provides essential data verifying its manufacturing provenance, potency, and shelf life.',
          'Understanding these labels empowers consumers to avoid dispensing errors, recognize compromised stock, and verify manufacturing batch codes with confidence.'
        ]
      },
      {
        heading: 'Key Elements on Every Genuine Strip or Carton',
        paragraphs: [
          'Legitimate manufacturers adhere to strict national and international pharmaceutical labeling guidelines. Whenever examining a medicine carton, locate these vital fields:'
        ],
        checklist: [
          'Generic / International Nonproprietary Name (INN) displayed prominently under the brand name.',
          'Exact composition per dosage unit (e.g., "Each uncoated tablet contains...").',
          'Batch / Lot Number (prefixed by "B.No." or "Batch:").',
          'Manufacturing Date ("Mfg. Dt.") and Expiry Date ("Exp. Dt.").',
          'Manufacturing License Number ("Mfg. Lic. No.").',
          'Complete name and corporate address of both manufacturer and marketeer.',
          'Storage instructions and warning schedules (e.g., Red Line / Schedule H warnings).'
        ]
      },
      {
        heading: 'Understanding 2D Matrix and Barcodes',
        paragraphs: [
          'Modern pharmaceutical packaging increasingly carries 2D DataMatrix codes or GS1 barcodes. These machine-readable patterns contain serialized alphanumeric codes encoding the Global Trade Item Number (GTIN), batch identifier, expiry date, and unique serial number.',
          'Scanning these codes with tools like AushadhiSetu allows instant cross-referencing against verified manufacturer registries.'
        ]
      }
    ],
    relatedSlugs: ['identifying-packaging-irregularities', 'checking-expiry-dates']
  },
  {
    id: 'art-2',
    slug: 'checking-expiry-dates',
    title: 'Checking Expiry Dates: Why Shelf Life Determines Potency and Safety',
    category: 'Consumer Guidance',
    readTime: '3 min read',
    summary: 'Learn how pharmaceutical expiration dates are determined, how to spot tampered date stamps, and why taking expired medicines can be hazardous.',
    sections: [
      {
        heading: 'What Does an Expiration Date Actually Mean?',
        paragraphs: [
          'The expiration date on a medicine is the final date up to which the pharmaceutical manufacturer guarantees the full chemical stability, potency, and safety of the product under recommended storage conditions.',
          'Past this date, chemical degradation can render active ingredients ineffective. In antibiotics, sub-potent degraded molecules fail to eradicate bacterial colonies, fostering drug-resistant superbugs. In liquid suspensions, microbial contamination risks increase markedly.'
        ]
      },
      {
        heading: 'How to Read Formats and Avoid Misinterpretation',
        paragraphs: [
          'Dates are typically printed in formats such as "EXP 12/2027" or "EXP DEC 27". When only a month and year are specified, the medicine remains valid until the final day of that designated calendar month.'
        ],
        checklist: [
          'Never rely on handwritten or marker-annotated dates on retail boxes.',
          'Compare the expiry stamped on the outer carton with the one debossed on the inner blister strip.',
          'Inspect the stamp font: genuine dates are mechanically embossed, laser-etched, or dot-matrix printed, not stamped with uneven ink rubber stamps.'
        ]
      },
      {
        heading: 'What to Do With Expired Medicines',
        paragraphs: [
          'Do not discard expired antibiotics or hormones into domestic sinks or toilets, as wastewater runoff introduces pharmaceuticals into municipal aquatic ecosystems. Check with your community pharmacy for safe pharmaceutical return receptacles.'
        ]
      }
    ],
    relatedSlugs: ['understanding-medicine-packaging', 'safe-medicine-storage']
  },
  {
    id: 'art-3',
    slug: 'identifying-packaging-irregularities',
    title: 'Identifying Packaging Irregularities: Visual Red Flags for Consumers',
    category: 'Counterfeit Prevention',
    readTime: '5 min read',
    summary: 'Practical inspection techniques to identify poorly printed labels, broken tamper seals, spelling discrepancies, and unusual physical characteristics.',
    sections: [
      {
        heading: 'Visual Indicators of Substandard or Suspicious Medicines',
        paragraphs: [
          'Substandard and counterfeit medicine syndicates frequently lack the high-precision printing presses and cleanroom packaging lines maintained by legitimate pharmaceutical companies.',
          'Careful visual observation before opening or ingesting any medication is your first line of defense.'
        ]
      },
      {
        heading: 'Common Red Flags to Check For',
        paragraphs: [
          'Examine the container thoroughly under clear lighting. Be alert to any of the following abnormalities:'
        ],
        checklist: [
          'Typographical and grammatical errors in brand names, manufacturer addresses, or instruction leaflets.',
          'Blurry, bleeding, or smeared typography indicating cheap desktop printing.',
          'Missing security features such as color-shifting ink, holographic strips, or microtext.',
          'Loose blister foils where capsules can be dislodged without tearing the seal.',
          'Inconsistent tablet coloration, chipping, crumbling edges, or unusual odor in pills from the same strip.',
          'Absence of tamper-evident break rings on syrup bottle caps.'
        ]
      },
      {
        heading: 'Immediate Next Steps',
        paragraphs: [
          'If you observe any of these anomalies, do not ingest the medication. Retain all packaging, receipts, and cartons, and file a verification check or suspicious report using AushadhiSetu.'
        ]
      }
    ],
    relatedSlugs: ['what-to-do-when-medicine-looks-suspicious', 'purchasing-medicines-responsibly']
  },
  {
    id: 'art-4',
    slug: 'safe-medicine-storage',
    title: 'Safe Medicine Storage: Protecting Chemical Integrity at Home',
    category: 'Home Care',
    readTime: '4 min read',
    summary: 'Guidelines on temperature control, light exposure, moisture avoidance, and child-safe medicine organization.',
    sections: [
      {
        heading: 'The Impact of Heat and Humidity on Active Ingredients',
        paragraphs: [
          'Even 100% genuine, verified pharmaceutical products will lose potency and undergo chemical breakdown if stored improperly. The common household practice of storing medicines in bathroom vanity cabinets exposes them to damaging steam, humidity, and heat spikes.',
          'Always check the packaging for specific storage advisories such as "Store below 25°C" or "Protect from light".'
        ]
      },
      {
        heading: 'Storage Best Practices',
        paragraphs: [
          'Follow these practical rules to preserve your medications:'
        ],
        checklist: [
          'Designate a dry, cool, dark cupboard or dedicated first-aid box away from direct kitchen stoves and bathroom steam.',
          'Refrigerate only products explicitly marked "Store between 2°C and 8°C" (such as insulin vials, vaccines, and certain eye drops). Never freeze them.',
          'Keep silica gel desiccants inside tablet bottles until all tablets are consumed.',
          'Always keep all medications in their original packaging with labels intact.',
          'Ensure storage areas are elevated and secure from infants, children, and pets.'
        ]
      }
    ],
    relatedSlugs: ['checking-expiry-dates', 'understanding-medicine-packaging']
  },
  {
    id: 'art-5',
    slug: 'purchasing-medicines-responsibly',
    title: 'Purchasing Medicines Responsibly: Verified Pharmacies vs Unregulated Sellers',
    category: 'Consumer Guidance',
    readTime: '4 min read',
    summary: 'How to verify licensed retail and online pharmacies, avoid unregulated black-market sellers, and demand valid tax invoices.',
    sections: [
      {
        heading: 'Why Your Purchase Channel Dictates Safety',
        paragraphs: [
          'The vast majority of counterfeit or compromised medications enter consumer circulation through unregulated third-party market stalls, unlicensed online social media sellers, and informal cross-border vendors.',
          'Licensed pharmacies are legally bound to obtain supplies through audited supply chains, certified cold storage transport, and legitimate distributor networks.'
        ]
      },
      {
        heading: 'Safe Purchasing Guidelines',
        paragraphs: [
          'Protect yourself and your family with these purchasing standards:'
        ],
        checklist: [
          'Buy exclusively from licensed physical retail pharmacies or accredited, regulated online pharmacy platforms.',
          'Always insist on a formal retail bill or tax invoice displaying the pharmacy license number, medicine name, batch number, and expiry date.',
          'Beware of steep, unrealistic discounts (e.g. 70-80% off brand medications) offered by unknown online webshops.',
          'Never purchase prescription medicines from vendors who do not request a valid prescription from a registered medical practitioner.'
        ]
      }
    ],
    relatedSlugs: ['identifying-packaging-irregularities', 'what-to-do-when-medicine-looks-suspicious']
  },
  {
    id: 'art-6',
    slug: 'what-to-do-when-medicine-looks-suspicious',
    title: 'What to Do When Medicine Looks Suspicious: A Step-by-Step Action Plan',
    category: 'Safety Action Protocol',
    readTime: '3 min read',
    summary: 'A step-by-step checklist on handling, preserving evidence, reporting, and consulting doctors when a medication appears doubtful.',
    sections: [
      {
        heading: 'Do Not Panic, But Do Not Ingest',
        paragraphs: [
          'If you open a newly purchased medication and suspect an issue—whether because the packaging looks irregular, the batch code fails to match, or the physical taste, smell, or texture feels completely unusual—prioritize your health first: do not take the medication.'
        ]
      },
      {
        heading: 'Four-Step Action Protocol',
        paragraphs: [
          'Follow these structured steps immediately:'
        ],
        checklist: [
          'Step 1: Stop Consumption immediately. Do not take the medication or give it to family members.',
          'Step 2: Preserve the Evidence. Keep the blister pack, outer carton, leaflets, and retail purchase bill in a safe zip-lock bag.',
          'Step 3: Submit a Suspicious Product Report on AushadhiSetu, attaching photos of the packaging, batch number, and receipt.',
          'Step 4: Contact Your Prescribing Physician or Pharmacist to obtain a replacement from a verified stock lot so your medical treatment is not interrupted.'
        ]
      },
      {
        heading: 'Educational and Safety Notice',
        paragraphs: [
          'AushadhiSetu provides authentication verification assistance and educational community awareness. If you have ingested a suspicious substance and experience adverse symptoms, seek emergency medical care immediately.'
        ]
      }
    ],
    relatedSlugs: ['identifying-packaging-irregularities', 'purchasing-medicines-responsibly']
  }
];
