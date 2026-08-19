import React, { useState } from "react";
import { CampusEvent, EventCategory } from "../../types";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { EventCard } from "./EventCard";
import { EventDetailModal } from "./EventDetailModal";
import { CreateEventModal } from "./CreateEventModal";
import { SearchInput } from "../common/SearchInput";
import { Tabs } from "../common/Tabs";
import { EmptyState } from "../common/EmptyState";
import { Button } from "../common/Button";
import { CalendarDays, PlusCircle, Sparkles, CheckCircle2 } from "lucide-react";

interface EventsExplorerProps {
  initialEventId?: string;
}

export const EventsExplorer: React.FC<EventsExplorerProps> = ({ initialEventId }) => {
  const { events } = useData();
  const { currentUser, hasRole } = useAuth();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(() => {
    if (initialEventId) {
      return events.find(e => e.id === initialEventId) || null;
    }
    return null;
  });

  const categories = [
    { id: "all", label: "All Events" },
    { id: "my_events", label: "My Registered", badge: currentUser?.registeredEventIds?.length || 0 },
    { id: "hackathon", label: "Hackathons" },
    { id: "workshop", label: "Workshops" },
    { id: "seminar", label: "Seminars" }
  ];

  const filteredEvents = events.filter(evt => {
    if (activeCategory === "my_events") {
      return currentUser?.registeredEventIds?.includes(evt.id);
    }
    if (activeCategory !== "all" && evt.category !== activeCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = evt.title.toLowerCase().includes(q);
      const matchDesc = evt.description.toLowerCase().includes(q);
      const matchVenue = evt.venue.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchVenue) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-pink-500" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Campus Events & Hackathons
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Discover hackathons, technical bootcamps, workshops, and guest lectures with 1-click registration.
          </p>
        </div>

        {hasRole("admin", "club_admin") && (
          <Button
            variant="gradient"
            size="sm"
            leftIcon={<PlusCircle className="w-4 h-4" />}
            onClick={() => setIsCreateOpen(true)}
          >
            Create Event
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search events by title or venue..."
          />
        </div>

        <Tabs
          tabs={categories}
          activeTab={activeCategory}
          onChange={setActiveCategory}
          variant="pill"
        />
      </div>

      {filteredEvents.length === 0 ? (
        <EmptyState
          icon={<CalendarDays className="w-10 h-10" />}
          title={activeCategory === "my_events" ? "No registered events yet" : "No events found"}
          description={
            activeCategory === "my_events"
              ? "Browse upcoming hackathons and workshops and click 'Register' to see your tickets here."
              : "Check back soon for new campus activities and hackathons."
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map(evt => (
            <EventCard
              key={evt.id}
              event={evt}
              onSelect={setSelectedEvent}
            />
          ))}
        </div>
      )}

      <EventDetailModal
        event={selectedEvent}
        isOpen={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
      />

      <CreateEventModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
};