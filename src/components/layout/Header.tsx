import React, { useState } from "react";
import { Search, Bell, Sun, Moon, Sparkles, User, LogOut, ShieldCheck, ChevronDown, Check } from "lucide-react";
import { Logo } from "../common/Logo";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useData } from "../../context/DataContext";
import { UserRole } from "../../types";

interface HeaderProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigate,
  onOpenSearch,
  onOpenNotifications
}) => {
  const { currentUser, switchPersona, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications } = useData();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(
    n => !n.read && (n.userId === "all" || n.userId === currentUser?.id || (n.userId === "usr_admin_1" && currentUser?.role === "admin"))
  ).length;

  const rolesList: { role: UserRole; label: string; desc: string; color: string }[] = [
    { role: "student", label: "Student (Sachin)", desc: "CSE Sem 3 • Notes, Events & Community", color: "bg-blue-500" },
    { role: "faculty", label: "Faculty (Dr. Shenoy)", desc: "CSE Dept • Publish study materials", color: "bg-purple-500" },
    { role: "club_admin", label: "Club Admin (Ananya)", desc: "ACM President • Manage events & hackathons", color: "bg-pink-500" },
    { role: "admin", label: "University Admin (Dean)", desc: "Full control • Moderation & analytics", color: "bg-amber-500" }
  ];

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/90 dark:bg-campus-darkcard/90 backdrop-blur-md border-b border-campus-border dark:border-campus-darkborder transition-colors duration-200">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left: Mobile Logo & Desktop Page Title */}
        <div className="flex items-center gap-3">
          <div className="lg:hidden cursor-pointer" onClick={() => onNavigate("dashboard")}>
            <Logo size="sm" variant="icon" />
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-800 dark:text-white capitalize">
              {activeTab === "dashboard" ? "Dashboard" : activeTab.replace("-", " ")}
            </h1>
            {currentUser && (
              <span className="text-xs text-slate-400 font-medium">
                • {currentUser.branchName}
              </span>
            )}
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md mx-2">
          <div
            onClick={onOpenSearch}
            className="flex items-center justify-between px-3.5 py-1.5 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/70 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700/80 rounded-xl cursor-pointer transition-all shadow-xs"
          >
            <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
              <Search className="w-3.5 h-3.5 text-brand-royalblue dark:text-blue-400" />
              <span className="hidden sm:inline">Search notes, notices, events, clubs...</span>
              <span className="sm:hidden">Search...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Persona Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowPersonaMenu(!showPersonaMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-brand-royalblue/10 dark:bg-brand-royalblue/20 hover:bg-brand-royalblue/15 text-brand-royalblue dark:text-blue-300 text-xs font-semibold border border-brand-royalblue/20 transition-all"
              title="Switch role for testing"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-royalblue dark:text-blue-400" />
              <span className="capitalize hidden md:inline">{currentUser?.role.replace("_", " ")}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {showPersonaMenu && (
              <div
                className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95"
                onMouseLeave={() => setShowPersonaMenu(false)}
              >
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Test Role Persona</p>
                  <p className="text-xs text-slate-500 mt-0.5">Switch user role instantly to evaluate permissions</p>
                </div>
                {rolesList.map(r => (
                  <button
                    key={r.role}
                    onClick={() => {
                      switchPersona(r.role);
                      setShowPersonaMenu(false);
                    }}
                    className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-colors ${
                      currentUser?.role === r.role
                        ? "bg-brand-royalblue/10 text-brand-royalblue dark:text-blue-300"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${r.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{r.label}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{r.desc}</p>
                    </div>
                    {currentUser?.role === r.role && <Check className="w-4 h-4 shrink-0 text-brand-royalblue" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Open notifications"
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar / Menu */}
          {currentUser && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-brand-royalblue/30 transition-all"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
                />
              </button>

              {showUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95"
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <div className="p-3 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide bg-brand-royalblue/10 text-brand-royalblue dark:text-blue-300">
                      {currentUser.role.replace("_", " ")}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onNavigate("profile");
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>My Student Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate("bookmarks");
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Saved Resources</span>
                  </button>

                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};