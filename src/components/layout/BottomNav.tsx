import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  MessageSquare,
  User,
  Menu,
  Megaphone,
  Users,
  Briefcase,
  Bookmark,
  ShieldAlert,
  X,
  PlusCircle
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface BottomNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onOpenUploadNote: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onNavigate,
  onOpenUploadNote
}) => {
  const { hasRole } = useAuth();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainItems = [
    { id: "dashboard", label: "Home", icon: LayoutDashboard },
    { id: "notes", label: "Notes", icon: BookOpen },
    { id: "events", label: "Events", icon: CalendarDays },
    { id: "community", label: "Discuss", icon: MessageSquare },
    { id: "profile", label: "Profile", icon: User }
  ];

  const moreItems = [
    { id: "announcements", label: "Notice Board", icon: Megaphone },
    { id: "clubs", label: "Clubs & Societies", icon: Users },
    { id: "placements", label: "Placements & Jobs", icon: Briefcase },
    { id: "bookmarks", label: "Saved Resources", icon: Bookmark },
  ];

  if (hasRole("admin", "faculty", "club_admin")) {
    moreItems.push({ id: "admin", label: "Admin Panel", icon: ShieldAlert });
  }

  const handleTabClick = (tabId: string) => {
    onNavigate(tabId);
    setShowMoreMenu(false);
  };

  return (
    <>
      {/* More Slide-Up Menu for Mobile */}
      {showMoreMenu && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowMoreMenu(false)} />
          <div className="relative bg-white dark:bg-campus-darkcard border-t border-slate-200 dark:border-slate-800 rounded-t-3xl p-5 z-10 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">More Campus Features</h4>
              <button onClick={() => setShowMoreMenu(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {moreItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-brand-royalblue/10 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-brand-royalblue dark:text-blue-400 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setShowMoreMenu(false);
                onOpenUploadNote();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-brand text-white rounded-xl text-xs font-bold shadow-soft"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Upload Study Resource</span>
            </button>
          </div>
        </div>
      )}

      {/* Sticky Bottom Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-campus-darkcard/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe">
        <div className="flex items-center justify-around h-16 px-2">
          {mainItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center flex-1 py-1 gap-1 transition-all ${
                  isActive
                    ? "text-brand-royalblue dark:text-blue-400 font-bold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "scale-110" : ""}`} />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}

          {/* More Trigger */}
          <button
            onClick={() => setShowMoreMenu(true)}
            className="flex flex-col items-center justify-center flex-1 py-1 gap-1 text-slate-500 dark:text-slate-400"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px]">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};