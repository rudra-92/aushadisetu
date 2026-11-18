import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  CheckCheck,
  ExternalLink,
  User,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAllNotificationsAsRead } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current page title based on path
  const getPageTitle = (path: string) => {
    if (path.includes('/dashboard')) return 'Medicine Safety Dashboard';
    if (path.includes('/verify/result')) return 'Verification Result';
    if (path.includes('/verify')) return 'Medicine Verification';
    if (path.includes('/history')) return 'Verification History';
    if (path.includes('/reports/new')) return 'Report Suspicious Medicine';
    if (path.includes('/reports')) return 'Submitted Reports';
    if (path.includes('/safety/')) return 'Safety Article';
    if (path.includes('/safety')) return 'Medicine Safety & Awareness';
    if (path.includes('/notifications')) return 'Notification Centre';
    if (path.includes('/profile')) return 'User Profile';
    if (path.includes('/settings')) return 'Settings';
    if (path.includes('/support')) return 'Help & Support';
    return 'Overview';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/app/history?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E4ECE7] px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-[#687871] hover:text-[#172923] hover:bg-[#F2F6F4]"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-semibold text-[#172923]">
            {getPageTitle(location.pathname)}
          </h1>
          <p className="hidden sm:block text-xs text-[#687871]">
            AushadhiSetu Pharmaceutical Platform
          </p>
        </div>
      </div>

      {/* Right: Quick Search, Notifications, Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex relative items-center">
          <Search className="w-4 h-4 text-[#687871] absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search medicine or batch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-56 lg:w-64 py-1.5 pl-9 pr-3 text-xs bg-[#F7FAF8] border border-[#E4ECE7] rounded-lg focus:outline-none focus:border-[#167A55] focus:bg-white text-[#172923] transition-colors"
          />
        </form>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-2 rounded-lg text-[#687871] hover:text-[#172923] hover:bg-[#F2F6F4] transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#167A55] ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E4ECE7] rounded-xl shadow-lg p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E4ECE7]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-[#172923]">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.2 text-[10px] bg-[#167A55] text-white rounded-full font-medium">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-[#167A55] hover:underline flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2">
                {notifications.length === 0 ? (
                  <p className="text-xs text-[#687871] text-center py-6">No notifications yet.</p>
                ) : (
                  notifications.slice(0, 4).map((notif) => (
                    <Link
                      key={notif.id}
                      to={notif.link || '/app/notifications'}
                      onClick={() => setShowNotifications(false)}
                      className={`block p-2.5 rounded-lg border transition-colors ${
                        notif.read
                          ? 'border-transparent bg-transparent hover:bg-[#F7FAF8]'
                          : 'border-[#E4ECE7] bg-[#F2F7F4]/60 hover:bg-[#EBF3EF]'
                      }`}
                    >
                      <p className="text-xs font-semibold text-[#172923]">{notif.title}</p>
                      <p className="text-[11px] text-[#687871] line-clamp-2 mt-0.5">
                        {notif.description}
                      </p>
                      <p className="text-[10px] text-[#9AA8A1] mt-1">{notif.timestamp}</p>
                    </Link>
                  ))
                )}
              </div>

              <div className="pt-2 mt-2 border-t border-[#E4ECE7] text-center">
                <Link
                  to="/app/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-medium text-[#167A55] hover:underline flex items-center justify-center gap-1"
                >
                  View all notifications
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-[#F2F6F4] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#167A55] text-white flex items-center justify-center font-semibold text-xs shadow-xs">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AS'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-[#172923] leading-tight">
                {user?.name || 'Aarav Sharma'}
              </p>
              <p className="text-[10px] text-[#687871] leading-tight">{user?.role || 'Consumer'}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#687871]" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E4ECE7] rounded-xl shadow-lg p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-[#E4ECE7] mb-1">
                <p className="text-xs font-semibold text-[#172923] truncate">{user?.name}</p>
                <p className="text-[10px] text-[#687871] truncate">{user?.email}</p>
              </div>

              <Link
                to="/app/profile"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-[#172923] rounded-lg hover:bg-[#F2F6F4]"
              >
                <User className="w-4 h-4 text-[#687871]" />
                Profile Details
              </Link>

              <Link
                to="/app/settings"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-[#172923] rounded-lg hover:bg-[#F2F6F4]"
              >
                <Settings className="w-4 h-4 text-[#687871]" />
                Account Settings
              </Link>

              <div className="border-t border-[#E4ECE7] my-1" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#D64B4B] rounded-lg hover:bg-[#FDF3F3]"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
