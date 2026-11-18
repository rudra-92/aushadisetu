import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Info,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useApp } from '../../context/AppContext';
import { NotificationItem } from '../../types';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    unreadCount,
    markNotificationAsRead,
    markAllNotificationsAsRead
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'verification':
        return <CheckCircle2 className="w-5 h-5 text-[#218653]" />;
      case 'report':
        return <AlertTriangle className="w-5 h-5 text-[#D64B4B]" />;
      case 'safety':
        return <BookOpen className="w-5 h-5 text-[#167A55]" />;
      default:
        return <Info className="w-5 h-5 text-[#3978B8]" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E4ECE7]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#172923]">Notification Centre</h2>
          <p className="text-xs sm:text-sm text-[#687871]">
            Verification updates, reported incident progress, and pharmaceutical safety alerts.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllNotificationsAsRead}
            leftIcon={<CheckCheck className="w-4 h-4 text-[#167A55]" />}
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
            filter === 'all'
              ? 'bg-[#167A55] text-white'
              : 'bg-white border border-[#E4ECE7] text-[#687871] hover:text-[#172923]'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
            filter === 'unread'
              ? 'bg-[#167A55] text-white'
              : 'bg-white border border-[#E4ECE7] text-[#687871] hover:text-[#172923]'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List or Empty */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E4ECE7] p-12 text-center max-w-sm mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#167A55]/10 text-[#167A55] flex items-center justify-center mx-auto">
            <Bell className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-semibold text-[#172923]">No Notifications</h4>
          <p className="text-xs text-[#687871]">
            {filter === 'unread' ? 'You have read all notifications.' : 'No alerts logged yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`
                p-4 rounded-xl border transition-all flex items-start gap-3.5
                ${
                  notif.read
                    ? 'bg-white border-[#E4ECE7]'
                    : 'bg-[#F2F7F4] border-[#D1EBDD] shadow-xs'
                }
              `}
            >
              <div className="pt-0.5 shrink-0">{getIcon(notif.type)}</div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-[#172923]">{notif.title}</h4>
                  <span className="text-[11px] text-[#9AA8A1] shrink-0 whitespace-nowrap">
                    {notif.timestamp}
                  </span>
                </div>
                <p className="text-xs text-[#687871] leading-relaxed">{notif.description}</p>

                {notif.link && (
                  <Link
                    to={notif.link}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#167A55] hover:underline pt-1"
                  >
                    <span>View Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>

              {!notif.read && (
                <span className="w-2 h-2 rounded-full bg-[#167A55] shrink-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
