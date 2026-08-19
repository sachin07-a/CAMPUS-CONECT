import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { EventCategory } from "../../types";
import { CalendarDays, Send } from "lucide-react";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { addEvent } = useData();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<EventCategory>("workshop");
  const [date, setDate] = useState("2026-09-12");
  const [time, setTime] = useState("10:00 AM - 4:00 PM");
  const [venue, setVenue] = useState("APJ Abdul Kalam Auditorium");
  const [maxParticipants, setMaxParticipants] = useState(150);
  const [fee, setFee] = useState("Free");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    addEvent({
      title,
      description,
      clubId: "club_acm",
      clubName: currentUser?.name ? `${currentUser.name}'s Society` : "ACM Chapter",
      category,
      date,
      time,
      venue,
      posterUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
      registrationDeadline: date,
      maxParticipants: Number(maxParticipants),
      speakers: [{ name: "Industry Expert", role: "Staff Architect", company: "Tech Leader" }],
      schedule: [{ time: "10:00 AM", activity: "Keynote & Hands-on Workshop" }],
      faqs: [],
      isOnline: false,
      fee,
      tags: ["Workshop", "Hands-on"]
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-500">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create Campus Event</h3>
            <p className="text-xs text-slate-500">Organize a hackathon, seminar, or workshop</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Event Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. NextGen Web3 & AI Hackathon"
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
            >
              <option value="hackathon">Hackathon</option>
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar / Guest Lecture</option>
              <option value="competition">Competition</option>
              <option value="cultural">Cultural</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Fee</label>
            <input
              type="text"
              value={fee}
              onChange={e => setFee(e.target.value)}
              placeholder="Free or ₹100"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Time</label>
            <input
              type="text"
              value={time}
              onChange={e => setTime(e.target.value)}
              placeholder="10:00 AM - 4:00 PM"
              className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Max Seats</label>
            <input
              type="number"
              value={maxParticipants}
              onChange={e => setMaxParticipants(Number(e.target.value))}
              className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Venue *</label>
          <input
            type="text"
            required
            value={venue}
            onChange={e => setVenue(e.target.value)}
            placeholder="Seminar Hall / Main Lab"
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description *</label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Event objectives, agenda, and guidelines..."
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="gradient" size="md" type="submit" leftIcon={<Send className="w-4 h-4" />}>
            Publish Event
          </Button>
        </div>
      </form>
    </Modal>
  );
};