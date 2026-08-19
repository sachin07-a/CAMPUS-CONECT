import React, { useState, useEffect } from "react";
import { Search, BookOpen, Megaphone, Calendar, Users, MessageSquare, Briefcase, X, ArrowRight } from "lucide-react";
import { useData } from "../../context/DataContext";
import { Badge } from "../common/Badge";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, id?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { notes, announcements, events, clubs, communityPosts, placements } = useData();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        isOpen ? onClose() : {};
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredNotes = notes.filter(n =>
    n.status === "approved" &&
    (n.title.toLowerCase().includes(q) ||
     n.subjectName.toLowerCase().includes(q) ||
     n.topic.toLowerCase().includes(q) ||
     n.tags.some(t => t.toLowerCase().includes(q)))
  ).slice(0, 4);

  const filteredAnnouncements = announcements.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.content.toLowerCase().includes(q) ||
    a.category.toLowerCase().includes(q)
  ).slice(0, 3);

  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(q) ||
    e.category.toLowerCase().includes(q) ||
    e.venue.toLowerCase().includes(q)
  ).slice(0, 3);

  const filteredClubs = clubs.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q) ||
    c.tag.toLowerCase().includes(q)
  ).slice(0, 3);

  const filteredPosts = communityPosts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.content.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  ).slice(0, 3);

  const filteredPlacements = placements.filter(p =>
    p.company.toLowerCase().includes(q) ||
    p.role.toLowerCase().includes(q) ||
    p.skills.some(s => s.toLowerCase().includes(q))
  ).slice(0, 3);

  const totalResults =
    filteredNotes.length +
    filteredAnnouncements.length +
    filteredEvents.length +
    filteredClubs.length +
    filteredPosts.length +
    filteredPlacements.length;

  const handleItemClick = (tab: string, id?: string) => {
    onNavigate(tab, id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-campus-darkcard border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-brand-royalblue dark:text-blue-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search notes, subjects, events, clubs, internships (e.g. DBMS, Hackathon)..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar text-xs">
          <span className="text-slate-400 font-medium mr-1">Filter:</span>
          {["all", "notes", "announcements", "events", "clubs", "community", "placements"].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-brand-royalblue text-white"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5 divide-y divide-slate-100 dark:divide-slate-800/80">
          {totalResults === 0 && query && (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for &ldquo;AVL Trees&rdquo;, &ldquo;DBMS&rdquo;, or &ldquo;Hackathon&rdquo;</p>
            </div>
          )}

          {!query && (
            <div className="py-6 px-2 space-y-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Suggested Searches</p>
              <div className="flex flex-wrap gap-2">
                {["Data Structures Unit 3", "DBMS Normalization", "HackCampus 2026", "ACM Club", "Google Internship", "Exam Hall Ticket"].map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-brand-royalblue/10 hover:text-brand-royalblue dark:hover:text-blue-400 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes Section */}
          {(selectedCategory === "all" || selectedCategory === "notes") && filteredNotes.length > 0 && (
            <div className="pt-3 first:pt-0">
              <div className="flex items-center gap-2 mb-2 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-brand-royalblue" />
                <span>Academic Notes ({filteredNotes.length})</span>
              </div>
              <div className="space-y-1">
                {filteredNotes.map(n => (
                  <div
                    key={n.id}
                    onClick={() => handleItemClick("notes", n.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer group transition-colors"
                  >
                    <div>
                      <h5 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-brand-royalblue dark:group-hover:text-blue-400">
                        {n.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {n.subjectName} • Unit {n.unitNumber} • {n.downloads} downloads
                      </p>
                    </div>
                    <Badge variant="blue" size="sm">{n.fileType.toUpperCase()}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Announcements Section */}
          {(selectedCategory === "all" || selectedCategory === "announcements") && filteredAnnouncements.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-2 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Megaphone className="w-3.5 h-3.5 text-amber-500" />
                <span>Notice Board ({filteredAnnouncements.length})</span>
              </div>
              <div className="space-y-1">
                {filteredAnnouncements.map(a => (
                  <div
                    key={a.id}
                    onClick={() => handleItemClick("announcements", a.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer group transition-colors"
                  >
                    <div>
                      <h5 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-brand-royalblue dark:group-hover:text-blue-400">
                        {a.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {a.authorName} • Priority: {a.priority}
                      </p>
                    </div>
                    <Badge variant={a.priority === "urgent" ? "red" : "gold"} size="sm">{a.category}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Section */}
          {(selectedCategory === "all" || selectedCategory === "events") && filteredEvents.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-2 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-pink-500" />
                <span>Events & Hackathons ({filteredEvents.length})</span>
              </div>
              <div className="space-y-1">
                {filteredEvents.map(e => (
                  <div
                    key={e.id}
                    onClick={() => handleItemClick("events", e.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer group transition-colors"
                  >
                    <div>
                      <h5 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-brand-royalblue dark:group-hover:text-blue-400">
                        {e.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {e.date} • {e.venue}
                      </p>
                    </div>
                    <Badge variant="pink" size="sm">{e.category}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Placements Section */}
          {(selectedCategory === "all" || selectedCategory === "placements") && filteredPlacements.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-2 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5 text-teal-500" />
                <span>Placements & Internships ({filteredPlacements.length})</span>
              </div>
              <div className="space-y-1">
                {filteredPlacements.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleItemClick("placements", p.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer group transition-colors"
                  >
                    <div>
                      <h5 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-brand-royalblue dark:group-hover:text-blue-400">
                        {p.company} — {p.role}
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {p.stipend} • Deadline: {p.deadline}
                      </p>
                    </div>
                    <Badge variant="teal" size="sm">{p.type}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
          <span>Navigate with mouse or arrow keys</span>
          <span className="flex items-center gap-1 font-semibold text-brand-royalblue dark:text-blue-400">
            Press ESC to close
          </span>
        </div>
      </div>
    </div>
  );
};