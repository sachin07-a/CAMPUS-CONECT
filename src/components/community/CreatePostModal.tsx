import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { CommunityPostType, CommunityChannel } from "../../types";
import { MessageSquare, Plus, Trash2, Send } from "lucide-react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { addPost } = useData();

  const [type, setType] = useState<CommunityPostType>("question");
  const [channel, setChannel] = useState<CommunityChannel>("branch");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("Algorithms, Doubt");
  const [pollOptions, setPollOptions] = useState<string[]>([
    "C++ (STL)",
    "Java",
    "Python 3",
    "Go / Rust"
  ]);

  if (!isOpen) return null;

  const handleAddPollOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, `Option ${pollOptions.length + 1}`]);
    }
  };

  const handleUpdateOption = (index: number, val: string) => {
    const updated = [...pollOptions];
    updated[index] = val;
    setPollOptions(updated);
  };

  const handleRemoveOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);

    addPost({
      authorId: currentUser?.id || "usr_student_1",
      authorName: currentUser?.name || "Student",
      authorRole: currentUser?.role || "student",
      authorBranch: currentUser?.branch?.toUpperCase() || "CSE",
      authorAvatar: currentUser?.avatar || "",
      type,
      channel,
      branchId: currentUser?.branch || "cse",
      semester: currentUser?.semester || 3,
      title,
      content,
      tags: tags.length > 0 ? tags : ["Discussion"],
      pollOptions:
        type === "poll"
          ? pollOptions.map((opt, idx) => ({
              id: `opt_${idx + 1}`,
              text: opt,
              votes: 0,
              votedUserIds: []
            }))
          : undefined
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Start Campus Discussion</h3>
            <p className="text-xs text-slate-500">Ask academic doubts, start peer discussions, or conduct a campus poll</p>
          </div>
        </div>

        {/* Post Type Selector */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "question", label: "Academic Question" },
            { id: "discussion", label: "Discussion" },
            { id: "poll", label: "Interactive Poll" }
          ].map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id as any)}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                type === t.id
                  ? "bg-brand-royalblue text-white border-brand-royalblue shadow-xs"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Question or Topic Headline *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. How do we prove AVL tree height is logarithmic?"
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Details & Context *
          </label>
          <textarea
            required
            rows={3}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Provide context, problem statement, or discussion prompts..."
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
          />
        </div>

        {/* Poll Options Builder */}
        {type === "poll" && (
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Poll Options</label>
            {pollOptions.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={opt}
                  onChange={e => handleUpdateOption(idx, e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                />
                {pollOptions.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(idx)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
            {pollOptions.length < 5 && (
              <button
                type="button"
                onClick={handleAddPollOption}
                className="text-xs text-brand-royalblue font-bold hover:underline inline-flex items-center gap-1 mt-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Option
              </button>
            )}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={e => setTagsInput(e.target.value)}
            placeholder="e.g. Data-Structures, Trees, C++"
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="gradient" size="md" type="submit" leftIcon={<Send className="w-4 h-4" />}>
            Post to Campus
          </Button>
        </div>
      </form>
    </Modal>
  );
};