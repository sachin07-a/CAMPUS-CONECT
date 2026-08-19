import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { NoteCard } from "../notes/NoteCard";
import { NoteDetailModal } from "../notes/NoteDetailModal";
import { AnnouncementCard } from "../announcements/AnnouncementCard";
import { EventCard } from "../events/EventCard";
import { PlacementCard } from "../placements/PlacementCard";
import { Tabs } from "../common/Tabs";
import { EmptyState } from "../common/EmptyState";
import { Bookmark, BookOpen, Megaphone, CalendarDays, Briefcase } from "lucide-react";
import { Note } from "../../types";

export const BookmarksView: React.FC = () => {
  const { currentUser } = useAuth();
  const { notes, announcements, events, placements } = useData();

  const [activeTab, setActiveTab] = useState<string>("notes");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const savedNotes = notes.filter(n => currentUser?.bookmarkedNoteIds?.includes(n.id));
  const savedAnnouncements = announcements.filter(a => currentUser?.bookmarkedAnnouncementIds?.includes(a.id));
  const savedEvents = events.filter(e => currentUser?.bookmarkedEventIds?.includes(e.id));
  const savedPlacements = placements.filter(p => currentUser?.bookmarkedPlacementIds?.includes(p.id));

  const tabs = [
    { id: "notes", label: "Notes", badge: savedNotes.length, icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "announcements", label: "Notices", badge: savedAnnouncements.length, icon: <Megaphone className="w-3.5 h-3.5" /> },
    { id: "events", label: "Events", badge: savedEvents.length, icon: <CalendarDays className="w-3.5 h-3.5" /> },
    { id: "placements", label: "Placements", badge: savedPlacements.length, icon: <Briefcase className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-brand-royalblue dark:text-blue-400 fill-brand-royalblue" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Saved & Bookmarked Resources
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Quickly access your saved study materials, important circulars, upcoming events, and job openings.
        </p>
      </div>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pill"
      />

      {/* Notes Tab */}
      {activeTab === "notes" && (
        savedNotes.length === 0 ? (
          <EmptyState
            icon={<BookOpen className="w-10 h-10" />}
            title="No saved notes yet"
            description="Bookmark useful syllabus notes and study guides to find them here."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedNotes.map(n => (
              <NoteCard key={n.id} note={n} onSelect={setSelectedNote} />
            ))}
          </div>
        )
      )}

      {/* Announcements Tab */}
      {activeTab === "announcements" && (
        savedAnnouncements.length === 0 ? (
          <EmptyState
            icon={<Megaphone className="w-10 h-10" />}
            title="No saved announcements"
            description="Save important university notices, exam deadlines, and circulars."
          />
        ) : (
          <div className="space-y-3">
            {savedAnnouncements.map(a => (
              <AnnouncementCard key={a.id} announcement={a} />
            ))}
          </div>
        )
      )}

      {/* Events Tab */}
      {activeTab === "events" && (
        savedEvents.length === 0 ? (
          <EmptyState
            icon={<CalendarDays className="w-10 h-10" />}
            title="No saved events"
            description="Bookmark hackathons and workshops to track dates and deadlines."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedEvents.map(e => (
              <EventCard key={e.id} event={e} onSelect={() => {}} />
            ))}
          </div>
        )
      )}

      {/* Placements Tab */}
      {activeTab === "placements" && (
        savedPlacements.length === 0 ? (
          <EmptyState
            icon={<Briefcase className="w-10 h-10" />}
            title="No saved placements"
            description="Bookmark internship and full-time hiring drives for quick application."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedPlacements.map(p => (
              <PlacementCard key={p.id} placement={p} />
            ))}
          </div>
        )
      )}

      <NoteDetailModal
        note={selectedNote}
        isOpen={Boolean(selectedNote)}
        onClose={() => setSelectedNote(null)}
      />
    </div>
  );
};