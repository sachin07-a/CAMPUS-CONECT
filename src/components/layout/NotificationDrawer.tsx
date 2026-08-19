import React from "react";
import { X, CheckCheck, Bell, Megaphone, BookOpen, Calendar, Briefcase, MessageSquare, ShieldAlert } from "lucide-react";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, id?: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useData();
  const { currentUser } = useAuth();

  if (!isOpen) return null;

  const userNotifications = notifications.filter(
    n => n.userId === "all" || n.userId === currentUser?.id || (n.userId === "usr_admin_1" && currentUser?.role === "admin")
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "announcement":
        return <Megaphone className="w-4 h-4 text-amber-500" />;
      case "note":
        return <BookOpen className="w-4 h-4 text-brand-royalblue" />;
      case "event":
        return <Calendar className="w-4 h-4 text-pink-500" />;
      case "placement":
        return <Briefcase className="w-4 h-4 text-teal-500" />;
      case "community":
        return <MessageSquare className="w-4 h-4 text-purple-500" />;
      case "moderation":
        return <ShieldAlert className="w-4 h-4 text-red-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationAsRead(notif.id);
    if (notif.targetTab) {
      onNavigate(notif.targetTab, notif.targetId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-campus-darkcard border-l border-slate-200 dark:border-slate-800 shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-royalblue/10 text-brand-royalblue dark:text-blue-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Notifications</h3>
              <p className="text-xs text-slate-500">{userNotifications.filter(n => !n.read).length} unread alerts</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={markAllNotificationsAsRead}
              title="Mark all as read"
              className="p-2 text-slate-400 hover:text-brand-royalblue dark:hover:text-blue-400 rounded-lg transition-colors"
            >
              <CheckCheck className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {userNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-slate-400">
              <Bell className="w-10 h-10 mb-2 opacity-30" />
              <p className="text-sm font-semibold">You&apos;re all caught up!</p>
              <p className="text-xs text-slate-500 mt-1">No new notifications right now.</p>
            </div>
          ) : (
            userNotifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  notif.read
                    ? "bg-white dark:bg-slate-900/40 border-slate-100 dark:border-slate-800 opacity-75"
                    : "bg-blue-50/40 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/40 shadow-xs"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-xs shrink-0 mt-0.5">
                    {getCategoryIcon(notif.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        {notif.title}
                      </h5>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-brand-royalblue shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                      {notif.message}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[10px] text-slate-400">
                      <span className="capitalize">{notif.category}</span>
                      <span>{new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <Button variant="outline" size="sm" className="w-full" onClick={markAllNotificationsAsRead}>
            Mark All as Read
          </Button>
        </div>
      </div>
    </div>
  );
};