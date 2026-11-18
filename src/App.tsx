import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { AppLayout } from './layouts/AppLayout';

// Public & Landing
import { LandingPage } from './pages/landing/LandingPage';

// Auth & Onboarding
import { WelcomePage } from './pages/auth/WelcomePage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { OtpVerificationPage } from './pages/auth/OtpVerificationPage';
import { LoginPage } from './pages/auth/LoginPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { AuthSuccessPage } from './pages/auth/AuthSuccessPage';
import { OnboardingPage } from './pages/onboarding/OnboardingPage';

// Protected App Pages
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { VerificationPage } from './pages/verification/VerificationPage';
import { VerificationResultPage } from './pages/verification/VerificationResultPage';
import { MedicineDetailsPage } from './pages/verification/MedicineDetailsPage';
import { HistoryPage } from './pages/history/HistoryPage';
import { ReportPage } from './pages/reports/ReportPage';
import { MyReportsPage } from './pages/reports/MyReportsPage';
import { ReportDetailsPage } from './pages/reports/ReportDetailsPage';
import { SafetyPage } from './pages/safety/SafetyPage';
import { ArticleDetailPage } from './pages/safety/ArticleDetailPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { SupportPage } from './pages/support/SupportPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            {/* Public Layout Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/support" element={<SupportPage />} />
            </Route>

            {/* Authentication Layout Routes */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="welcome" element={<WelcomePage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="verify-otp" element={<OtpVerificationPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
              <Route path="success" element={<AuthSuccessPage />} />
              <Route index element={<Navigate to="/auth/welcome" replace />} />
            </Route>

            {/* User Onboarding Flow */}
            <Route path="/onboarding" element={<OnboardingPage />} />

            {/* Authenticated Application Routes */}
            <Route path="/app" element={<AppLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="verify" element={<VerificationPage />} />
              <Route path="verify/result" element={<VerificationResultPage />} />
              <Route path="medicine/:id" element={<MedicineDetailsPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="reports/new" element={<ReportPage />} />
              <Route path="reports" element={<MyReportsPage />} />
              <Route path="reports/:id" element={<ReportDetailsPage />} />
              <Route path="safety" element={<SafetyPage />} />
              <Route path="safety/:slug" element={<ArticleDetailPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route index element={<Navigate to="/app/dashboard" replace />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
