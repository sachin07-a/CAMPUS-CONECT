import React from "react";
import { Announcement } from "../../types";
import { Card } from "../common/Card";
import { Badge, BadgeVariant } from "../common/Badge";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { Bookmark, Download, Pin, CheckCircle2, Clock, Calendar } from "lucide-react";

interface AnnouncementCardProps {
  announcement: Announcement;
  onSelect?: (ann: Announcement) => void;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement,
  onSelect
}) => {
  const { currentUser } = useAuth();
  const { toggleBookmarkAnnouncement, markAnnouncementAsRead } = useData();

  const isBookmarked = currentUser?.bookmarkedAnnouncementIds?.includes(announcement.id);
  const isRead = currentUser ? announcement.readBy.includes(currentUser.id) : false;

  const categoryBadgeVariants: Record<string, BadgeVariant> = {
    university: "blue",
    department: "blue",
    examination: "gold",
    placement: "teal",
    scholarship: "purple",
    holiday: "pink",
    academic: "blue",
    emergency: "red",
    general: "slate"
  };

  const handleCardClick = () => {
    if (currentUser) {
      markAnnouncementAsRead(announcement.id);
    }
    onSelect?.(announcement);
  };

  return (
    <Card
      hoverEffect={true}
      className={`cursor-pointer transition-all ${
        announcement.priority === "urgent"
          ? "border-l-4 border-l-red-500 bg-red-50/20 dark:bg-red-950/10"
          : announcement.priority === "high"
          ? "border-l-4 border-l-amber-500"
          : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={categoryBadgeVariants[announcement.category] || "slate"} size="sm">
            {announcement.category.toUpperCase()}
          </Badge>

          {announcement.priority === "urgent" && (
            <Badge variant="red" size="sm" dot={true}>URGENT</Badge>
          )}

          {announcement.priority === "high" && (
            <Badge variant="gold" size="sm">HIGH PRIORITY</Badge>
          )}

          {announcement.isPinned && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-brand-royalblue bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full">
              <Pin className="w-3 h-3 rotate-45" /> Pinned
            </span>
          )}
        </div>

        <button
          onClick={e => {
            e.stopPropagation();
            toggleBookmarkAnnouncement(announcement.id);
          }}
          className={`p-1.5 rounded-lg transition-colors ${
            isBookmarked
              ? "text-brand-royalblue bg-blue-50 dark:bg-blue-950"
              : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-brand-royalblue" : ""}`} />
        </button>
      </div>

      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
        {announcement.title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
        {announcement.content}
      </p>

      {announcement.attachmentName && (
        <div className="flex items-center justify-between p-2.5 mb-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1 rounded bg-white dark:bg-slate-700 text-brand-royalblue">📎</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
              {announcement.attachmentName}
            </span>
            <span className="text-[10px] text-slate-400">({announcement.attachmentSize})</span>
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              alert(`Downloading attachment: ${announcement.attachmentName}`);
            }}
            className="flex items-center gap-1 text-brand-royalblue dark:text-blue-400 font-bold hover:underline shrink-0 ml-2"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          {announcement.authorAvatar ? (
            <img
              src={announcement.authorAvatar}
              alt={announcement.authorName}
              className="w-5 h-5 rounded-full object-cover"
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-[10px]">
              {announcement.authorName[0]}
            </div>
          )}
          <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
            {announcement.authorName}
          </span>
          <span>•</span>
          <span>{announcement.authorRole}</span>
        </div>

        <div className="flex items-center gap-2 mt-1 sm:mt-0">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(announcement.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          {isRead && (
            <span className="flex items-center gap-0.5 text-teal-600 font-semibold">
              <CheckCircle2 className="w-3 h-3" /> Read
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};