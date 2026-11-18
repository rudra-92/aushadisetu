import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  QrCode,
  History,
  AlertOctagon,
  FileText,
  BookOpen,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  className = '',
  onNavigate
}) => {
  const { user, logout } = useAuth();
  const { unreadCount } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Overview', to: '/app/dashboard', icon: LayoutDashboard },
    { label: 'Verify Medicine', to: '/app/verify', icon: QrCode, highlight: true },
    { label: 'Verification History', to: '/app/history', icon: History },
    { label: 'Report Medicine', to: '/app/reports/new', icon: AlertOctagon },
    { label: 'My Reports', to: '/app/reports', icon: FileText },
    { label: 'Medicine Safety', to: '/app/safety', icon: BookOpen },
    { label: 'Notifications', to: '/app/notifications', icon: Bell, badge: unreadCount },
    { label: 'Settings', to: '/app/settings', icon: Settings },
    { label: 'Help & Support', to: '/app/support', icon: HelpCircle }
  ];

  return (
    <aside
      className={`
        flex flex-col h-full bg-white border-r border-[#E4ECE7] select-none
        ${collapsed ? 'w-20' : 'w-64'}
        transition-all duration-200 ${className}
      `}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-5 border-b border-[#E4ECE7] justify-between">
        {!collapsed ? (
          <Logo size="md" showTagline linkTo="/app/dashboard" />
        ) : (
          <div className="mx-auto">
            <Logo size="sm" linkTo="/app/dashboard" />
          </div>
        )}
      </div>

      {/* Primary Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="text-[11px] font-semibold tracking-wider text-[#687871] uppercase px-3 pb-2">
          {!collapsed && 'Main Menu'}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
                ${
                  isActive
                    ? 'bg-[#167A55]/10 text-[#167A55] font-semibold'
                    : 'text-[#687871] hover:text-[#172923] hover:bg-[#F2F6F4]'
                }
                ${item.highlight && !isActive ? 'text-[#167A55]' : ''}
              `}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-105 ${
                  item.highlight ? 'text-[#167A55]' : ''
                }`}
              />
              {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
              {!collapsed && item.badge !== undefined && item.badge > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#167A55] text-white">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Safety Notice Callout in Sidebar */}
      {!collapsed && (
        <div className="p-3 mx-3 mb-3 bg-[#F0F8F4] border border-[#D1EBDD] rounded-xl text-xs text-[#165C39] space-y-1">
          <div className="flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#167A55]" />
            <span>Demonstration Mode</span>
          </div>
          <p className="text-[11px] text-[#687871] leading-tight">
            Simulated registry connected. Suitable for portfolio evaluation.
          </p>
        </div>
      )}

      {/* User Profile & Logout Section */}
      <div className="p-3 border-t border-[#E4ECE7] space-y-2">
        <NavLink
          to="/app/profile"
          onClick={onNavigate}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F6F4] transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-[#167A55] text-white flex items-center justify-center font-semibold text-xs shrink-0 shadow-xs">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AS'}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#172923] truncate">
                {user?.name || 'Aarav Sharma'}
              </p>
              <p className="text-[11px] text-[#687871] truncate">{user?.role || 'Consumer'}</p>
            </div>
          )}
          {!collapsed && <ChevronRight className="w-4 h-4 text-[#687871] group-hover:text-[#172923]" />}
        </NavLink>

        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[#D64B4B] hover:bg-[#FDF3F3] transition-colors
            ${collapsed ? 'justify-center' : ''}
          `}
          title="Logout"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
};
