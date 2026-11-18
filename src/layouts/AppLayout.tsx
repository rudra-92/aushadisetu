import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';
import { Header } from '../components/navigation/Header';
import { MobileNav } from '../components/navigation/MobileNav';
import { useAuth } from '../context/AuthContext';
import { X } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7FAF8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#167A55] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-[#687871] font-medium">Loading AushadhiSetu...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#172923]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#687871] hover:text-[#172923] hover:bg-[#F2F6F4]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar onNavigate={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        <Header onToggleMobileMenu={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
};
