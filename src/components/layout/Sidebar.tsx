import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  Megaphone,
  CalendarDays,
  Users,
  MessageSquare,
  Briefcase,
  Bookmark,
  ShieldAlert,
  User,
  Settings,
  PlusCircle
} from "lucide-react";
import { Logo } from "../common/Logo";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onOpenUploadNote: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onNavigate,
  onOpenUploadNote
}) => {
  const { currentUser, hasRole } = useAuth();

  const mainNav = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "notes", label: "Academic Notes", icon: BookOpen },
    { id: "announcements", label: "Notice Board", icon: Megaphone },
    { id: "events", label: "Events & Hackathons", icon: CalendarDays },
    { id: "clubs", label: "Clubs & Societies", icon: Users },
    { id: "community", label: "Community Hub", icon: MessageSquare },
    { id: "placements", label: "Placements & Internships", icon: Briefcase },
    { id: "bookmarks", label: "Saved Resources", icon: Bookmark },
  ];

  const adminNav = [
    { id: "admin", label: "Admin Control Center", icon: ShieldAlert }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-white dark:bg-campus-darkcard border-r border-campus-border dark:border-campus-darkborder p-4 select-none z-30">
      {/* Brand Header */}
      <div className="px-3 py-2 mb-4 cursor-pointer" onClick={() => onNavigate("dashboard")}>
        <Logo size="md" showTagline={true} />
      </div>

      {/* Quick Action: Upload Note CTA */}
      <div className="mb-5 px-1">
        <button
          onClick={onOpenUploadNote}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-brand hover:opacity-95 text-white rounded-xl font-semibold text-xs shadow-soft hover:shadow-glow transition-all active:scale-[0.98]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Upload Study Material</span>
        </button>
      </div>

      {/* Main Navigation List */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1 -mr-1">
        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
          Campus Navigation
        </p>
        {mainNav.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-brand-royalblue/10 dark:bg-brand-royalblue/20 text-brand-royalblue dark:text-blue-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-brand-royalblue dark:text-blue-400" : "text-slate-400"}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        {/* Admin Navigation Section */}
        {hasRole("admin", "faculty", "club_admin") && (
          <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Management
            </p>
            {adminNav.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-500" : "text-slate-400"}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* User Mini Profile Footer */}
      {currentUser && (
        <div className="pt-3 border-t border-campus-border dark:border-campus-darkborder mt-2">
          <div
            onClick={() => onNavigate("profile")}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {currentUser.branch.toUpperCase()} • Sem {currentUser.semester || "All"}
              </p>
            </div>
            <User className="w-4 h-4 text-slate-400 hover:text-brand-royalblue" />
          </div>
        </div>
      )}
    </aside>
  );
};