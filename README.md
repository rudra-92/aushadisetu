# AushadhiSetu (औषधि सेतु)
> **"Your Health. Your Trust. Our Priority."**
> A Digital Bridge Between Consumers and Safer Medicines.

A complete, responsive, high-quality HealthTech frontend application for **Medicine Authentication and Pharmaceutical Safety**. Built with React 19, TypeScript, Vite, Tailwind CSS, Lucide React, and React Router.

---

## 🌟 Key Capabilities & Features

### 1. Core Medicine Verification Module (`/app/verify`)
- **Camera Capture**: Live video camera stream (`getUserMedia`) with targeting reticle viewfinder, camera flip, canvas snapshot preview, retake, and native mobile camera fallback (`accept="image/*" capture="environment"`).
- **Upload Image**: Drag-and-drop file uploader supporting PNG, JPG, JPEG, and WEBP (up to 5 MB) with thumbnail preview, file size validation, removal, and replace actions.
- **Manual Details Entry**: Direct input form for brand name, manufacturer, batch/lot number, manufacturing date, expiry date, and product code.
- **1-Click Test Scenarios (Demo Presets)**:
  - **Paracetamol 500 mg** → Matched Result
  - **Amoxicillin 500 mg** → Expired State Simulation
  - **Unknown Cough Syrup** → Unmatched / Not Found Result
  - **Blurry Packaging Photo** → No Code Detected State

### 2. Verification Outcomes & Results (`/app/verify/result`)
- **Matched Result**: Green verified badge, complete pharmaceutical details, dosage form, composition, and downloadable/printable **Verification Audit Certificate**.
- **Expired State**: Clear distinction between authentic batch match and expired safety hazard warning.
- **Unmatched State**: Clear explanation that an unindexed code does not solely imply counterfeit, with direct one-click routing to report the product.
- **No Code Detected**: Practical consumer scanning tips (lighting, framing, focus) with fast manual fallback.
- **Prominent Demonstration Disclaimer** on every result.

### 3. Suspicious Product Reporting & Tracking (`/app/reports/new` & `/app/reports`)
- **Structured Reporting Form**: Medicine name, indicated manufacturer, batch code, purchase location, date, suspicion category (damages, label spelling errors, broken seals, unverified barcodes), and notes.
- **Visual Evidence Upload**: Supports uploading photos of packaging, smudged barcodes, and purchase tax receipts.
- **Report Lifecycle Tracking**: Generates unique tracking IDs (`RPT-2026-XXXX`) with a simulated progress timeline (*Submitted*, *Under Review*, *Closed*).

### 4. Interactive Educational Knowledge Base (`/app/safety`)
- 6 comprehensive consumer guides with category filters, read times, and practical checklists:
  1. *Understanding Medicine Packaging*
  2. *Checking Expiry Dates*
  3. *Identifying Packaging Irregularities*
  4. *Safe Medicine Storage*
  5. *Purchasing Medicines Responsibly*
  6. *What to Do When Medicine Looks Suspicious*

### 5. Complete Authentication & User Onboarding
- **Welcome Screen** (`/auth/welcome`) with 1-click guest access.
- **Registration** (`/auth/register`) with real-time password strength meter and validation.
- **6-Digit Email OTP Verification** (`/auth/verify-otp`) with timer countdown and auto-focusing inputs.
- **Sign In** (`/auth/login`) with pre-filled demonstration credentials.
- **Password Recovery** (`/auth/forgot-password` & `/auth/reset-password`).
- **4-Step User Onboarding Flow** (`/onboarding`) for user type selection (Consumer / Caregiver / Other) and camera permissions explanation.

### 6. User Dashboard, History & Profile
- **Overview Dashboard** (`/app/dashboard`) with live statistics, quick action verification cards, and recent checks table.
- **Verification History** (`/app/history`) with live text search, status filters, sorting, and pagination.
- **User Profile & Settings** (`/app/profile` & `/app/settings`) with editable contact details, notification preferences, privacy governance, and accessibility controls (font scaling & reduced motion).
- **Help & Support** (`/app/support`) with interactive scanning guides, FAQs accordion, and working contact inquiry form.

---

## 🎨 Design System & Visual Restraint

- **Light Theme Only**: Strictly complies with the requested healthcare color tokens:
  - Primary Green: `#167A55`
  - Dark Green: `#115B42`
  - Secondary Teal: `#2B9C8A`
  - Main Background: `#F7FAF8`
  - Clean Surface: `#FFFFFF`
  - Primary Text: `#172923`
  - Secondary Text: `#687871`
  - Border: `#E4ECE7`
  - Status Colors: Success (`#218653`), Warning (`#D99126`), Danger (`#D64B4B`), Info (`#3978B8`)
- **Zero Dark Mode, Zero AI Gradients, Zero Glassmorphism**: Clean borders (6px–12px radius), natural whitespace, and professional typography using Inter.

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```
