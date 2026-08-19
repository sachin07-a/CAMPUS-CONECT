import React from "react";
import { CampusEvent } from "../../types";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { Calendar, Clock, MapPin, Users, CheckCircle2, Bookmark } from "lucide-react";

interface EventCardProps {
  event: CampusEvent;
  onSelect: (event: CampusEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect }) => {
  const { currentUser } = useAuth();
  const { registerForEvent, toggleBookmarkEvent } = useData();

  const isRegistered = currentUser?.registeredEventIds?.includes(event.id);
  const isBookmarked = currentUser?.bookmarkedEventIds?.includes(event.id);
  const spotsLeft = event.maxParticipants - event.registeredUserIds.length;

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    registerForEvent(event.id);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmarkEvent(event.id);
  };

  return (
    <Card
      hoverEffect={true}
      padding="none"
      className="cursor-pointer overflow-hidden flex flex-col justify-between group"
      onClick={() => onSelect(event)}
    >
      <div>
        {/* Poster Image */}
        <div className="relative h-40 w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <img
            src={event.posterUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute top-3 left-3">
            <Badge variant="pink" size="sm">
              {event.category.toUpperCase()}
            </Badge>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-white bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">
              {event.fee}
            </span>
            <button
              onClick={handleBookmarkClick}
              className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-white" : ""}`} />
            </button>
          </div>

          <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs font-semibold flex items-center justify-between">
            <span className="truncate">{event.clubName}</span>
            <span className="text-[11px] opacity-85">{spotsLeft > 0 ? `${spotsLeft} spots left` : "Full"}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-royalblue dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-2">
            {event.title}
          </h4>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
            {event.description}
          </p>

          <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-brand-royalblue shrink-0" />
              <span>{event.date}</span>
              <span>•</span>
              <span className="text-[11px]">{event.time.split("–")[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="truncate text-[11px]">{event.venue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="p-4 pt-0">
        <Button
          variant={isRegistered ? "success" : "primary"}
          size="sm"
          className="w-full font-bold"
          leftIcon={isRegistered ? <CheckCircle2 className="w-4 h-4" /> : undefined}
          onClick={handleRegisterClick}
        >
          {isRegistered ? "Registered (View Ticket)" : "Register Now"}
        </Button>
      </div>
    </Card>
  );
};