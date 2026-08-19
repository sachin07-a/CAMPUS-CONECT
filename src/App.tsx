import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { BottomNav } from "./components/layout/BottomNav";
import { GlobalSearchModal } from "./components/layout/GlobalSearchModal";
import { NotificationDrawer } from "./components/layout/NotificationDrawer";
import { AuthModal } from "./components/auth/AuthModal";
import { OnboardingModal } from "./components/auth/OnboardingModal";
import { NoteUploadModal } from "./components/notes/NoteUploadModal";
import { CampusAIAssistant } from "./components/ai/CampusAIAssistant";

// Views
import { LandingPage } from "./components/landing/LandingPage";
import { StudentDashboard } from "./components/dashboard/StudentDashboard";
import { NotesExplorer } from "./components/notes/NotesExplorer";
import { AnnouncementsFeed } from "./components/announcements/AnnouncementsFeed";
import { EventsExplorer } from "./components/events/EventsExplorer";
import { ClubsExplorer } from "./components/clubs/ClubsExplorer";
import { CommunityFeed } from "./components/community/CommunityFeed";
import { PlacementsFeed } from "./components/placements/PlacementsFeed";
import { BookmarksView } from "./components/bookmarks/BookmarksView";
import { StudentProfile } from "./components/profile/StudentProfile";
import { AdminDashboard } from "./components/admin/AdminDashboard";

export default function App() {
  const { isAuthenticated, isOnboarded, currentUser, hasRole } = useAuth();

  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [targetEntityId, setTargetEntityId] = useState<string | undefined>(undefined);

  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState<boolean>(false);
  const [isUploadNoteOpen, setIsUploadNoteOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const handleNavigate = (tab: string, id?: string) => {
    setActiveTab(tab);
    setTargetEntityId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If visitor is unauthenticated, render public landing page
  if (!isAuthenticated) {
    return (
      <>
        <LandingPage
          onGetStarted={() => setIsAuthModalOpen(true)}
          onExploreDemo={() => {
            setIsAuthModalOpen(true);
          }}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-campus-bg dark:bg-campus-darkbg text-campus-text dark:text-campus-darktext flex flex-col lg:flex-row transition-colors duration-200">
      {/* Desktop Persistent Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenUploadNote={() => setIsUploadNoteOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        {/* Global Navigation Header */}
        <Header
          activeTab={activeTab}
          onNavigate={handleNavigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotifDrawerOpen(true)}
        />

        {/* View Router */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-5 sm:pt-6">
          {activeTab === "dashboard" && (
            <StudentDashboard
              onNavigate={handleNavigate}
              onOpenUploadNote={() => setIsUploadNoteOpen(true)}
            />
          )}

          {activeTab === "notes" && (
            <NotesExplorer
              initialNoteId={targetEntityId}
              onOpenUpload={() => setIsUploadNoteOpen(true)}
            />
          )}

          {activeTab === "announcements" && (
            <AnnouncementsFeed />
          )}

          {activeTab === "events" && (
            <EventsExplorer initialEventId={targetEntityId} />
          )}

          {activeTab === "clubs" && (
            <ClubsExplorer onNavigateToEvents={() => handleNavigate("events")} />
          )}

          {activeTab === "community" && (
            <CommunityFeed />
          )}

          {activeTab === "placements" && (
            <PlacementsFeed />
          )}

          {activeTab === "bookmarks" && (
            <BookmarksView />
          )}

          {activeTab === "profile" && (
            <StudentProfile />
          )}

          {activeTab === "admin" && (
            <AdminDashboard />
          )}
        </main>
      </div>

      {/* Mobile Native App Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenUploadNote={() => setIsUploadNoteOpen(true)}
      />

      {/* Floating CampusAI Study Assistant */}
      <CampusAIAssistant />

      {/* Global Search Modal (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Real-Time Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotifDrawerOpen}
        onClose={() => setIsNotifDrawerOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* 4-Step Note Upload Wizard */}
      <NoteUploadModal
        isOpen={isUploadNoteOpen}
        onClose={() => setIsUploadNoteOpen(false)}
      />

      {/* First-Time Onboarding Flow */}
      <OnboardingModal
        isOpen={!isOnboarded}
        onClose={() => {}}
      />
    </div>
  );
}