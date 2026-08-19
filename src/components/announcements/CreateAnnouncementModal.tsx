import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { BRANCHES } from "../../data/academicStructure";
import { AnnouncementCategory, AnnouncementPriority } from "../../types";
import { Megaphone, Paperclip, Send } from "lucide-react";

interface CreateAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateAnnouncementModal: React.FC<CreateAnnouncementModalProps> = ({
  isOpen,
  onClose
}) => {
  const { currentUser } = useAuth();
  const { addAnnouncement } = useData();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<AnnouncementCategory>("academic");
  const [priority, setPriority] = useState<AnnouncementPriority>("normal");
  const [targetAudience, setTargetAudience] = useState<"all" | "branch" | "semester">("all");
  const [targetBranch, setTargetBranch] = useState("cse");
  const [targetSemester, setTargetSemester] = useState(3);
  const [isPinned, setIsPinned] = useState(false);
  const [attachmentName, setAttachmentName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addAnnouncement({
      title,
      content,
      category,
      priority,
      targetAudience,
      targetBranch: targetAudience === "branch" ? targetBranch : undefined,
      targetSemester: targetAudience === "semester" ? targetSemester : undefined,
      authorName: currentUser?.name || "University Administration",
      authorRole: currentUser?.role === "faculty" ? "Faculty Coordinator" : "University Admin",
      authorAvatar: currentUser?.avatar,
      attachmentName: attachmentName ? attachmentName : undefined,
      attachmentSize: attachmentName ? "1.8 MB" : undefined,
      isPinned
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Publish Notice to Campus</h3>
            <p className="text-xs text-slate-500">Broadcast official notification to students and faculty</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Notice Headline *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Mid-Semester Lab Assessment Schedule Announced"
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
            >
              <option value="examination">Examination</option>
              <option value="department">Department</option>
              <option value="placement">Placement & Career</option>
              <option value="scholarship">Scholarship & Aid</option>
              <option value="academic">Academic Syllabus</option>
              <option value="holiday">Holiday / Schedule</option>
              <option value="emergency">Emergency Alert</option>
              <option value="general">General Campus</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Priority Level
            </label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
            >
              <option value="normal">Normal Priority</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent / Action Required</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Audience
            </label>
            <select
              value={targetAudience}
              onChange={e => setTargetAudience(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
            >
              <option value="all">Entire University</option>
              <option value="branch">Specific Branch</option>
              <option value="semester">Specific Semester</option>
            </select>
          </div>

          {targetAudience === "branch" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Select Branch
              </label>
              <select
                value={targetBranch}
                onChange={e => setTargetBranch(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              >
                {BRANCHES.map(b => (
                  <option key={b.id} value={b.id}>{b.code}</option>
                ))}
              </select>
            </div>
          )}

          {targetAudience === "semester" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Select Semester
              </label>
              <select
                value={targetSemester}
                onChange={e => setTargetSemester(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Notice Full Body *
          </label>
          <textarea
            required
            rows={4}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Type comprehensive notice details, deadlines, links, and guidelines here..."
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
          <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={e => setIsPinned(e.target.checked)}
              className="rounded text-brand-royalblue focus:ring-brand-royalblue"
            />
            <span>Pin this announcement to top of feed</span>
          </label>

          <button
            type="button"
            onClick={() => setAttachmentName(attachmentName ? "" : "Official_Circular_2026.pdf")}
            className="flex items-center gap-1 text-brand-royalblue dark:text-blue-400 font-bold hover:underline"
          >
            <Paperclip className="w-3.5 h-3.5" />
            {attachmentName ? "Remove Attachment" : "Attach PDF"}
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="gradient" size="md" type="submit" leftIcon={<Send className="w-4 h-4" />}>
            Broadcast Notice
          </Button>
        </div>
      </form>
    </Modal>
  );
};