import React, { useState } from "react";
import { Announcement, AnnouncementCategory } from "../../types";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { AnnouncementCard } from "./AnnouncementCard";
import { CreateAnnouncementModal } from "./CreateAnnouncementModal";
import { SearchInput } from "../common/SearchInput";
import { Button } from "../common/Button";
import { Tabs } from "../common/Tabs";
import { EmptyState } from "../common/EmptyState";
import { Megaphone, PlusCircle, BellRing, Filter } from "lucide-react";

export const AnnouncementsFeed: React.FC = () => {
  const { announcements } = useData();
  const { hasRole } = useAuth();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const categories = [
    { id: "all", label: "All Notices" },
    { id: "examination", label: "Exams" },
    { id: "department", label: "Department" },
    { id: "placement", label: "Placements" },
    { id: "scholarship", label: "Scholarships" },
    { id: "academic", label: "Academic" },
    { id: "holiday", label: "Holidays" },
    { id: "general", label: "General" }
  ];

  const filteredAnnouncements = announcements.filter(ann => {
    if (activeCategory !== "all" && ann.category !== activeCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = ann.title.toLowerCase().includes(q);
      const matchContent = ann.content.toLowerCase().includes(q);
      const matchAuthor = ann.authorName.toLowerCase().includes(q);
      if (!matchTitle && !matchContent && !matchAuthor) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Official Notice Board
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time verified announcements, circulars, and notifications from university administration.
          </p>
        </div>

        {hasRole("admin", "faculty") && (
          <Button
            variant="gradient"
            size="sm"
            leftIcon={<PlusCircle className="w-4 h-4" />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Post Notice
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search circulars and notices..."
          />
        </div>

        <Tabs
          tabs={categories}
          activeTab={activeCategory}
          onChange={setActiveCategory}
          variant="pill"
        />
      </div>

      {filteredAnnouncements.length === 0 ? (
        <EmptyState
          icon={<BellRing className="w-10 h-10" />}
          title="No notices found"
          description="There are currently no active announcements matching this filter."
        />
      ) : (
        <div className="space-y-4">
          {filteredAnnouncements.map(ann => (
            <AnnouncementCard key={ann.id} announcement={ann} />
          ))}
        </div>
      )}

      <CreateAnnouncementModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};