import React, { useState } from "react";
import { Placement } from "../../types";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { PlacementCard } from "./PlacementCard";
import { SearchInput } from "../common/SearchInput";
import { Tabs } from "../common/Tabs";
import { EmptyState } from "../common/EmptyState";
import { Button } from "../common/Button";
import { Briefcase, PlusCircle, CheckCircle2 } from "lucide-react";

export const PlacementsFeed: React.FC = () => {
  const { placements } = useData();
  const { hasRole } = useAuth();

  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const tabs = [
    { id: "all", label: "All Openings" },
    { id: "internship", label: "Internships" },
    { id: "full_time", label: "Full-Time Roles" },
    { id: "on_campus", label: "On-Campus Drives" }
  ];

  const filteredPlacements = placements.filter(p => {
    if (activeTab === "internship" && p.type !== "internship") return false;
    if (activeTab === "full_time" && p.type !== "full_time") return false;
    if (activeTab === "on_campus" && p.workMode !== "on_campus") return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchCompany = p.company.toLowerCase().includes(q);
      const matchRole = p.role.toLowerCase().includes(q);
      const matchSkills = p.skills.some(s => s.toLowerCase().includes(q));
      if (!matchCompany && !matchRole && !matchSkills) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Placements & Summer Internships
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Official recruitment drives, technical internships, and campus hiring verified by the Placement Cell.
          </p>
        </div>

        {hasRole("admin") && (
          <Button
            variant="gradient"
            size="sm"
            leftIcon={<PlusCircle className="w-4 h-4" />}
            onClick={() => alert("Company job posting form")}
          >
            Post Job Opening
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search company, role, or skill..."
          />
        </div>

        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="pill"
        />
      </div>

      {filteredPlacements.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="w-10 h-10" />}
          title="No career opportunities found"
          description="Check back regularly as new hiring drives are scheduled by the placement cell."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlacements.map(plc => (
            <PlacementCard key={plc.id} placement={plc} />
          ))}
        </div>
      )}
    </div>
  );
};