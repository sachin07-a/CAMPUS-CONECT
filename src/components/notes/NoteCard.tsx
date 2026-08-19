import React from "react";
import { Note } from "../../types";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { BookOpen, Download, Star, Bookmark, CheckCircle2 } from "lucide-react";

interface NoteCardProps {
  note: Note;
  onSelect: (note: Note) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onSelect }) => {
  const { currentUser } = useAuth();
  const { toggleBookmarkNote, downloadNote } = useData();

  const isBookmarked = currentUser?.bookmarkedNoteIds?.includes(note.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmarkNote(note.id);
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadNote(note.id);
    const blob = new Blob([`CampusConnect: ${note.title}\nSubject: ${note.subjectName}\nUnit ${note.unitNumber}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${note.subjectName}_Unit${note.unitNumber}_Notes.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card
      hoverEffect={true}
      className="cursor-pointer flex flex-col justify-between h-full group"
      onClick={() => onSelect(note)}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-extrabold text-brand-royalblue dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
              {note.subjectName}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Unit {note.unitNumber}
            </span>
            {note.isVerified && (
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-1.5 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </span>
            )}
          </div>

          <button
            onClick={handleBookmarkClick}
            className={`p-1.5 rounded-lg transition-colors ${
              isBookmarked
                ? "text-brand-royalblue bg-blue-50 dark:bg-blue-950"
                : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-brand-royalblue" : ""}`} />
          </button>
        </div>

        <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-royalblue dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1.5">
          {note.title}
        </h4>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
          {note.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 min-w-0">
            {note.uploaderAvatar ? (
              <img
                src={note.uploaderAvatar}
                alt={note.uploaderName}
                className="w-5 h-5 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                {note.uploaderName[0]}
              </div>
            )}
            <span className="text-[11px] truncate font-medium">{note.uploaderName}</span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-500">
              <Star className="w-3 h-3 fill-amber-500" />
              {note.rating > 0 ? note.rating : "New"}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Download className="w-3 h-3" />
              {note.downloads}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed border-slate-100 dark:border-slate-800/60 text-[10px] text-slate-400">
          <span className="uppercase font-bold tracking-wider text-slate-500">
            {note.fileType} • {note.fileSize}
          </span>
          <button
            onClick={handleDownloadClick}
            className="flex items-center gap-1 text-brand-royalblue dark:text-blue-400 font-bold hover:underline"
          >
            <Download className="w-3 h-3" />
            Download
          </button>
        </div>
      </div>
    </Card>
  );
};