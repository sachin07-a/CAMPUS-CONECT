import React, { useState } from "react";
import { Club, ClubCategory } from "../../types";
import { useData } from "../../context/DataContext";
import { ClubCard } from "./ClubCard";
import { ClubDetailModal } from "./ClubDetailModal";
import { SearchInput } from "../common/SearchInput";
import { Tabs } from "../common/Tabs";
import { EmptyState } from "../common/EmptyState";
import { Users, PlusCircle } from "lucide-react";
import { Button } from "../common/Button";

interface ClubsExplorerProps {
  onNavigateToEvents?: () => void;
}

export const ClubsExplorer: React.FC<ClubsExplorerProps> = ({ onNavigateToEvents }) => {
  const { clubs } = useData();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  const categories = [
    { id: "all", label: "All Clubs" },
    { id: "coding", label: "Coding & Tech" },
    { id: "technical", label: "Mobile & Cloud" },
    { id: "robotics", label: "Robotics" },
    { id: "entrepreneurship", label: "E-Cell & Startups" }
  ];

  const filteredClubs = clubs.filter(c => {
    if (activeCategory !== "all" && c.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = c.name.toLowerCase().includes(q);
      const matchDesc = c.description.toLowerCase().includes(q);
      const matchTag = c.tag.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchTag) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Campus Clubs & Student Societies
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Join technical chapters, innovation cells, robotics teams, and cultural groups.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => alert("Club registration proposal submitted to Student Welfare office.")}
        >
          Propose New Club
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search clubs by name or interest..."
          />
        </div>

        <Tabs
          tabs={categories}
          activeTab={activeCategory}
          onChange={setActiveCategory}
          variant="pill"
        />
      </div>

      {filteredClubs.length === 0 ? (
        <EmptyState
          icon={<Users className="w-10 h-10" />}
          title="No clubs found"
          description="Try clearing your search query or exploring another category."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClubs.map(club => (
            <ClubCard
              key={club.id}
              club={club}
              onSelect={setSelectedClub}
            />
          ))}
        </div>
      )}

      <ClubDetailModal
        club={selectedClub}
        isOpen={Boolean(selectedClub)}
        onClose={() => setSelectedClub(null)}
        onNavigateToEvents={onNavigateToEvents}
      />
    </div>
  );
};