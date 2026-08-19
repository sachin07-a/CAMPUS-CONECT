import React from "react";
import { CampusEvent } from "../../types";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { Calendar, Clock, MapPin, Users, CheckCircle2, Bookmark, Share2, Ticket } from "lucide-react";

interface EventDetailModalProps {
  event: CampusEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  isOpen,
  onClose
}) => {
  const { currentUser } = useAuth();
  const { registerForEvent, cancelEventRegistration, toggleBookmarkEvent } = useData();

  if (!event || !isOpen) return null;

  const isRegistered = currentUser?.registeredEventIds?.includes(event.id);
  const isBookmarked = currentUser?.bookmarkedEventIds?.includes(event.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="space-y-4">
        {/* Large Banner Poster */}
        <div className="relative h-44 sm:h-52 -mx-6 -mt-6 bg-slate-200 overflow-hidden">
          <img
            src={event.posterUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <Badge variant="pink" size="sm" className="mb-2">
              {event.category.toUpperCase()}
            </Badge>
            <h2 className="text-lg sm:text-2xl font-extrabold leading-tight">{event.title}</h2>
            <p className="text-xs text-slate-200 mt-1">Organized by {event.clubName}</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-500">
            <span className="font-bold text-slate-900 dark:text-white">Fee: {event.fee}</span>
            <span className="mx-2">•</span>
            <span>Registration Deadline: {event.registrationDeadline}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-brand-royalblue" : ""}`} />}
              onClick={() => toggleBookmarkEvent(event.id)}
            >
              {isBookmarked ? "Saved" : "Save"}
            </Button>

            {isRegistered ? (
              <Button
                variant="secondary"
                size="sm"
                className="text-red-600 dark:text-red-400"
                onClick={() => cancelEventRegistration(event.id)}
              >
                Cancel Registration
              </Button>
            ) : (
              <Button
                variant="gradient"
                size="sm"
                leftIcon={<Ticket className="w-4 h-4" />}
                onClick={() => registerForEvent(event.id)}
              >
                Confirm Free Registration
              </Button>
            )}
          </div>
        </div>

        {/* Registered Confirmation Banner */}
        {isRegistered && (
          <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-between text-xs text-teal-800 dark:text-teal-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="font-bold">You are registered for this event!</p>
                <p className="text-[11px] opacity-80">Check-in at venue using your student ID: {currentUser?.studentId}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-teal-200/50 dark:bg-teal-800 px-2 py-1 rounded font-bold">
              PASS #{event.id.toUpperCase()}
            </span>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-brand-royalblue shrink-0" />
            <div>
              <p className="text-slate-400 text-[10px]">Date & Time</p>
              <p className="font-bold text-slate-800 dark:text-white">{event.date} ({event.time})</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-red-500 shrink-0" />
            <div>
              <p className="text-slate-400 text-[10px]">Venue</p>
              <p className="font-bold text-slate-800 dark:text-white truncate">{event.venue}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">About Event</h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Schedule */}
        {event.schedule.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Event Schedule</h4>
            <div className="space-y-1.5 border-l-2 border-slate-200 dark:border-slate-800 ml-2 pl-3">
              {event.schedule.map((item, idx) => (
                <div key={idx} className="text-xs">
                  <span className="font-bold text-brand-royalblue dark:text-blue-400 mr-2">{item.time}</span>
                  <span className="text-slate-700 dark:text-slate-300">{item.activity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Speakers */}
        {event.speakers.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Speakers & Mentors</h4>
            <div className="flex flex-wrap gap-2.5">
              {event.speakers.map((s, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 text-xs">
                  {s.avatar && <img src={s.avatar} alt={s.name} className="w-6 h-6 rounded-full object-cover" />}
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">{s.name}</p>
                    <p className="text-[10px] text-slate-400">{s.role} • {s.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};