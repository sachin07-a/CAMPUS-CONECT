import React from "react";
import { Placement } from "../../types";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { Briefcase, MapPin, Calendar, Bookmark, ExternalLink, CheckCircle2 } from "lucide-react";

interface PlacementCardProps {
  placement: Placement;
}

export const PlacementCard: React.FC<PlacementCardProps> = ({ placement }) => {
  const { currentUser } = useAuth();
  const { toggleBookmarkPlacement, applyForPlacement } = useData();

  const isBookmarked = currentUser?.bookmarkedPlacementIds?.includes(placement.id);

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    applyForPlacement(placement.id);
    alert(`Application registered for ${placement.company} - ${placement.role}!`);
  };

  return (
    <Card hoverEffect={true} className="flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-black text-sm text-slate-800 dark:text-white shrink-0 shadow-xs">
              {placement.company[0]}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-royalblue dark:group-hover:text-blue-400 transition-colors">
                  {placement.company}
                </h4>
                {placement.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />}
              </div>
              <p className="text-xs font-semibold text-brand-royalblue dark:text-blue-400">
                {placement.role}
              </p>
            </div>
          </div>

          <button
            onClick={() => toggleBookmarkPlacement(placement.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              isBookmarked
                ? "text-brand-royalblue bg-blue-50 dark:bg-blue-950"
                : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-brand-royalblue" : ""}`} />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge variant="teal" size="sm">
            {placement.type === "internship" ? "INTERNSHIP" : "FULL-TIME"}
          </Badge>
          <Badge variant="blue" size="sm">
            {placement.workMode.toUpperCase().replace("_", " ")}
          </Badge>
          <span className="text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-md">
            {placement.stipend}
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
          {placement.description}
        </p>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] space-y-1 mb-3">
          <div className="flex items-center justify-between text-slate-500">
            <span>Eligible Branches:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{placement.eligibleBranches.join(", ")}</span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>Min CGPA:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{placement.minCgpa} / 10.0</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {placement.skills.map(s => (
            <span key={s} className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded font-medium">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <div className="text-[11px] text-slate-400 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>Deadline: {placement.deadline}</span>
        </div>

        <Button
          variant="primary"
          size="sm"
          rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
          onClick={handleApply}
        >
          Apply Now
        </Button>
      </div>
    </Card>
  );
};