import React, { useState } from "react";
import { Note } from "../../types";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { AIStudyService, NoteSummary } from "../../services/aiStudyService";
import { NoteQuizModal } from "../ai/NoteQuizModal";
import {
  Download,
  Star,
  Bookmark,
  Share2,
  Flag,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  FileText,
  Sparkles,
  Trophy,
  CheckCircle2,
  HelpCircle
} from "lucide-react";

interface NoteDetailModalProps {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NoteDetailModal: React.FC<NoteDetailModalProps> = ({
  note,
  isOpen,
  onClose
}) => {
  const { currentUser } = useAuth();
  const { toggleBookmarkNote, downloadNote, rateNote } = useData();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [userSelectedRating, setUserSelectedRating] = useState<number>(0);
  const [isRated, setIsRated] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // AI Summary State
  const [aiSummary, setAiSummary] = useState<NoteSummary | null>(null);
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);
  const [showAiSummary, setShowAiSummary] = useState<boolean>(false);

  // AI Quiz Modal State
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);

  if (!note || !isOpen) return null;

  const isBookmarked = currentUser?.bookmarkedNoteIds?.includes(note.id);
  const totalPages = note.pagesCount || 24;

  const handleDownload = () => {
    downloadNote(note.id);
    const blob = new Blob([`CampusConnect Study Material: ${note.title}\nSubject: ${note.subjectName}\nUnit: ${note.unitNumber} - ${note.topic}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${note.subjectName.replace(/\s+/g, "_")}_Unit${note.unitNumber}_Notes.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRating = (stars: number) => {
    setUserSelectedRating(stars);
    rateNote(note.id, stars);
    setIsRated(true);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleGenerateSummary = async () => {
    if (aiSummary) {
      setShowAiSummary(!showAiSummary);
      return;
    }
    setIsSummarizing(true);
    const result = await AIStudyService.summarizeNote(note.title, note.subjectName, note.unitNumber, note.topic);
    setAiSummary(result);
    setIsSummarizing(false);
    setShowAiSummary(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <div className="space-y-5">
          {/* Note Metadata Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="blue" size="md">
                  {note.branchName} • Sem {note.semester}
                </Badge>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  {note.subjectName} (Unit {note.unitNumber})
                </span>
                {note.isVerified && (
                  <Badge variant="teal" size="sm">Verified Syllabus Resource</Badge>
                )}
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {note.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {note.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-brand-royalblue text-brand-royalblue" : ""}`} />}
                onClick={() => toggleBookmarkNote(note.id)}
              >
                {isBookmarked ? "Saved" : "Save"}
              </Button>

              <Button
                variant="gradient"
                size="sm"
                leftIcon={<Download className="w-4 h-4" />}
                onClick={handleDownload}
              >
                Download ({note.fileSize})
              </Button>
            </div>
          </div>

          {/* AI Companion Quick Tools Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-gradient-to-r from-brand-royalblue/10 via-purple-500/10 to-brand-electric/10 border border-brand-royalblue/20">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Sparkles className="w-4 h-4 text-brand-royalblue dark:text-blue-400" />
              <span>CampusAI Study Copilot</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                isLoading={isSummarizing}
                leftIcon={<Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />}
                onClick={handleGenerateSummary}
                className="text-xs font-bold"
              >
                {showAiSummary ? "Hide AI Summary" : "3-Min AI Summary"}
              </Button>

              <Button
                variant="primary"
                size="sm"
                leftIcon={<Trophy className="w-3.5 h-3.5 text-brand-gold" />}
                onClick={() => setIsQuizOpen(true)}
                className="text-xs font-bold shadow-soft"
              >
                Practice Exam Quiz
              </Button>
            </div>
          </div>

          {/* AI Summary Card (Collapsible) */}
          {showAiSummary && aiSummary && (
            <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs space-y-3 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-purple-900 dark:text-purple-200">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>3-Minute Syllabus Executive Summary</span>
                </div>
                <Badge variant="purple" size="sm">AI Generated</Badge>
              </div>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {aiSummary.executiveSummary}
              </p>

              <div className="space-y-1.5 pt-1">
                <p className="font-bold text-purple-900 dark:text-purple-300">Key Takeaways:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                  {aiSummary.keyTakeaways.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900 space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">Exam Tips & Formulae:</p>
                {aiSummary.formulaeAndComplexity.map((f, idx) => (
                  <p key={idx} className="text-[11px] text-slate-600 dark:text-slate-400">
                    <strong className="text-brand-royalblue dark:text-blue-400">{f.concept}:</strong> {f.details}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Document Reader Canvas */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-900 text-white overflow-hidden shadow-inner">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/90 border-b border-slate-700 text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-electric" />
                <span className="font-semibold text-slate-200">
                  {note.topic} — Document Viewer
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="p-1 rounded hover:bg-slate-700 disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-300 font-mono">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="p-1 rounded hover:bg-slate-700 disabled:opacity-30"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1">
                <button
                  onClick={() => setZoomLevel(prev => Math.max(75, prev - 15))}
                  className="p-1 rounded hover:bg-slate-700"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-300 font-mono w-10 text-center">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel(prev => Math.min(150, prev + 15))}
                  className="p-1 rounded hover:bg-slate-700"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-10 min-h-[320px] max-h-[380px] overflow-y-auto bg-slate-950/60 leading-relaxed text-slate-200">
              <div
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
                className="transition-transform duration-150 max-w-xl mx-auto bg-white text-slate-900 p-6 sm:p-8 rounded-xl shadow-lg font-sans"
              >
                <div className="border-b pb-3 mb-4 flex justify-between items-center text-xs text-slate-400">
                  <span>CAMPUSCONNECT ACADEMIC REPOSITORY</span>
                  <span>{note.subjectName.toUpperCase()}</span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2">
                  Unit {note.unitNumber}: {note.topic}
                </h3>

                <p className="text-xs text-slate-600 mb-3">
                  Author: {note.uploaderName} • Dept. of {note.branchName}
                </p>

                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 text-xs text-slate-700 mb-4 space-y-2">
                  <p className="font-bold text-slate-900">Key Syllabus Learning Outcomes:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>Theoretical proofs and asymptotic bounds.</li>
                    <li>Algorithm invariants, step-by-step trace diagrams, and pseudocode.</li>
                    <li>Past 5-year university exam solved numericals.</li>
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t text-[10px] text-slate-400 flex justify-between">
                  <span>Page {currentPage} of {totalPages}</span>
                  <span>Verified Academic Material</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">How helpful was this resource?</p>
              <p className="text-[11px] text-slate-500">
                {note.ratingCount} students rated this note • Average: {note.rating} / 5.0 ⭐
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRating(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= (userSelectedRating || note.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                </button>
              ))}
              {isRated && <span className="text-[11px] font-bold text-teal-600 ml-2">Thanks!</span>}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <button onClick={handleShare} className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white">
                <Share2 className="w-3.5 h-3.5" />
                {isCopied ? "Link Copied!" : "Share"}
              </button>
              <span>•</span>
              <button onClick={() => alert("Report submitted to moderation queue.")} className="flex items-center gap-1 text-red-500 hover:underline">
                <Flag className="w-3.5 h-3.5" />
                Report
              </button>
            </div>

            <Button variant="secondary" size="sm" onClick={onClose}>
              Close Preview
            </Button>
          </div>
        </div>
      </Modal>

      {/* Embedded Practice Quiz Modal */}
      <NoteQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        subjectName={note.subjectName}
        unitNumber={note.unitNumber}
        topic={note.topic}
      />
    </>
  );
};