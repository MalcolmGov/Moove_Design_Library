import { useState } from 'react';
import { Bell, CheckCheck, Clock, TrendingUp, AlertTriangle, MessageSquare, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface NotificationFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'growth' | 'alert' | 'message' | 'system';
}

export function NotificationFlyout({ isOpen, onClose }: NotificationFlyoutProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Revenue Milestone Reached',
      message: 'Total revenue surpassed $78,000 for June, up 12.5% vs last month.',
      time: '12m ago',
      read: false,
      type: 'growth',
    },
    {
      id: '2',
      title: 'High Priority Maintenance',
      message: 'AC Not Cooling reported at Lakeview Homes #MR-1038.',
      time: '45m ago',
      read: false,
      type: 'alert',
    },
    {
      id: '3',
      title: 'New Client Message',
      message: 'Sarah Khan commented on the proposal demo: "Let\'s move ahead".',
      time: '2h ago',
      read: false,
      type: 'message',
    },
    {
      id: '4',
      title: 'Sprint 12 Completion Ahead',
      message: '88% of sprint tasks are marked in review or completed.',
      time: '4h ago',
      read: true,
      type: 'system',
    },
  ]);

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filtered = notifications.filter((n) => (activeFilter === 'unread' ? !n.read : true));
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'growth':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/30 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 h-full shadow-2xl p-6 flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Notifications
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-rose-500 text-white">
                      {unreadCount}
                    </span>
                  )}
                </h3>
                <p className="text-[11px] text-slate-400">System alerts & product activities</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Pills & Mark as Read */}
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setActiveFilter('all')}
                className={cn(
                  'text-xs font-semibold px-2.5 py-1 rounded-lg transition-all',
                  activeFilter === 'all'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                )}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('unread')}
                className={cn(
                  'text-xs font-semibold px-2.5 py-1 rounded-lg transition-all',
                  activeFilter === 'unread'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                )}
              >
                Unread ({unreadCount})
              </button>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={cn(
                  'p-3.5 rounded-2xl border transition-all cursor-pointer relative',
                  item.read
                    ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800/80'
                    : 'bg-slate-50/80 dark:bg-slate-800/60 border-indigo-100 dark:border-indigo-900/40 shadow-xs'
                )}
                onClick={() => {
                  setNotifications((prev) =>
                    prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
                  );
                }}
              >
                {!item.read && (
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 ring-2 ring-white dark:ring-slate-900" />
                )}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-2xs shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {item.message}
                    </p>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-2 block">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
