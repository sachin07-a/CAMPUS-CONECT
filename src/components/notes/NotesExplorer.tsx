import React, { useState } from "react";
import { Note } from "../../types";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { BRANCHES, SUBJECTS } from "../../data/academicStructure";
import { NoteCard } from "./NoteCard";
import { NoteDetailModal } from "./NoteDetailModal";
import { SearchInput } from "../common/SearchInput";
import { Button } from "../common/Button";
import { EmptyState } from "../common/EmptyState";
import { BookOpen, PlusCircle, SlidersHorizontal } from "lucide-react";

interface NotesExplorerProps {
  initialNoteId?: string;
  onOpenUpload: () => void;
}

export const NotesExplorer: React.FC<NotesExplorerProps> = ({
  initialNoteId,
  onOpenUpload
}) => {
  const { notes } = useData();
  const { currentUser } = useAuth();

  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [selectedSemester, setSelectedSemester] = useState<number | "all">("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedUnit, setSelectedUnit] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "downloads" | "rating">("newest");
  
  const [selectedNote, setSelectedNote] = useState<Note | null>(() => {
    if (initialNoteId) {
      return notes.find(n => n.id === initialNoteId) || null;
    }
    return null;
  });

  const approvedNotes = notes.filter(n => n.status === "approved");

  const filteredNotes = approvedNotes.filter(n => {
    if (selectedBranch !== "all" && n.branchId.toLowerCase() !== selectedBranch.toLowerCase()) return false;
    if (selectedSemester !== "all" && n.semester !== selectedSemester) return false;
    if (selectedSubject !== "all" && n.subjectId !== selectedSubject) return false;
    if (selectedUnit !== "all" && n.unitNumber !== selectedUnit) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchSubject = n.subjectName.toLowerCase().includes(q);
      const matchTopic = n.topic.toLowerCase().includes(q);
      const matchUploader = n.uploaderName.toLowerCase().includes(q);
      const matchTag = n.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchSubject && !matchTopic && !matchUploader && !matchTag) return false;
    }

    return true;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === "downloads") return b.downloads - a.downloads;
    if (sortBy === "rating") return b.rating - a.rating;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const availableSubjects = SUBJECTS.filter(s => {
    if (selectedBranch !== "all" && s.branchId !== selectedBranch) return false;
    if (selectedSemester !== "all" && s.semester !== selectedSemester) return false;
    return true;
  });

  const resetFilters = () => {
    setSelectedBranch("all");
    setSelectedSemester("all");
    setSelectedSubject("all");
    setSelectedUnit("all");
    setSearchQuery("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-royalblue dark:text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Academic Notes & Repository
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Browse verified syllabus resources, lecture notes, and previous year solutions across 8 semesters.
          </p>
        </div>

        <Button
          variant="gradient"
          size="sm"
          leftIcon={<PlusCircle className="w-4 h-4" />}
          onClick={onOpenUpload}
        >
          Upload Notes
        </Button>
      </div>

      {/* 5-Level Hierarchy Drill-Down Bar */}
      <div className="p-4 bg-white dark:bg-campus-darkcard border border-slate-200 dark:border-slate-800 rounded-2xl shadow-soft space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-semibold text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-brand-royalblue" />
            <span>Academic Hierarchy Filter</span>
          </div>

          {(selectedBranch !== "all" || selectedSemester !== "all" || selectedSubject !== "all" || selectedUnit !== "all" || searchQuery) && (
            <button
              onClick={resetFilters}
              className="text-xs text-brand-royalblue dark:text-blue-400 font-bold hover:underline"
            >
              Reset All Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              1. Branch
            </label>
            <select
              value={selectedBranch}
              onChange={e => {
                setSelectedBranch(e.target.value);
                setSelectedSubject("all");
              }}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Branches</option>
              {BRANCHES.map(b => (
                <option key={b.id} value={b.id}>{b.code} — {b.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              2. Semester
            </label>
            <select
              value={selectedSemester}
              onChange={e => {
                setSelectedSemester(e.target.value === "all" ? "all" : Number(e.target.value));
                setSelectedSubject("all");
              }}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Semesters (1 to 8)</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              3. Subject
            </label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Subjects</option>
              {availableSubjects.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              4. Unit
            </label>
            <select
              value={selectedUnit}
              onChange={e => setSelectedUnit(e.target.value === "all" ? "all" : Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Units (1 to 5)</option>
              {[1, 2, 3, 4, 5].map(u => (
                <option key={u} value={u}>Unit {u}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="w-full sm:w-80">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by topic, keyword, or author..."
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="newest">Newest Uploaded</option>
              <option value="downloads">Most Downloaded</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>Showing {sortedNotes.length} verified study materials</span>
        {currentUser?.branch && (
          <span className="text-brand-royalblue dark:text-blue-400 font-semibold">
            Personalized for {currentUser.branch.toUpperCase()} Sem {currentUser.semester}
          </span>
        )}
      </div>

      {sortedNotes.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="w-10 h-10" />}
          title="No notes found for this filter"
          description="Be the first student or faculty to upload comprehensive notes for this subject unit."
          actionText="Upload Notes"
          onAction={onOpenUpload}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onSelect={setSelectedNote}
            />
          ))}
        </div>
      )}

      <NoteDetailModal
        note={selectedNote}
        isOpen={Boolean(selectedNote)}
        onClose={() => setSelectedNote(null)}
      />
    </div>
  );
};