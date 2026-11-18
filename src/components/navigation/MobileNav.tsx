import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, QrCode, History, AlertOctagon, BookOpen } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const tabs = [
    { label: 'Home', to: '/app/dashboard', icon: LayoutDashboard },
    { label: 'Verify', to: '/app/verify', icon: QrCode, isFab: true },
    { label: 'History', to: '/app/history', icon: History },
    { label: 'Report', to: '/app/reports/new', icon: AlertOctagon },
    { label: 'Safety', to: '/app/safety', icon: BookOpen }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E4ECE7] pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          if (tab.isFab) {
            return (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) => `
                  relative -top-3 flex flex-col items-center justify-center
                  w-12 h-12 rounded-full shadow-md text-white transition-transform active:scale-95
                  ${isActive ? 'bg-[#115B42]' : 'bg-[#167A55]'}
                `}
                aria-label="Verify Medicine"
              >
                <Icon className="w-6 h-6" />
              </NavLink>
            );
          }

          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) => `
                flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-medium transition-colors
                ${isActive ? 'text-[#167A55] font-semibold' : 'text-[#687871] hover:text-[#172923]'}
              `}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
