import React, { useState } from "react";
import { CommunityPost } from "../../types";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { PostCard } from "./PostCard";
import { CreatePostModal } from "./CreatePostModal";
import { SearchInput } from "../common/SearchInput";
import { Tabs } from "../common/Tabs";
import { Button } from "../common/Button";
import { EmptyState } from "../common/EmptyState";
import { MessageSquare, PlusCircle, HelpCircle, BarChart3, CheckCircle2 } from "lucide-react";

export const CommunityFeed: React.FC = () => {
  const { communityPosts } = useData();
  const { currentUser } = useAuth();

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  const filters = [
    { id: "all", label: "All Posts" },
    { id: "question", label: "Q&A Doubts", icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { id: "poll", label: "Campus Polls", icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: "solved", label: "Solved Only", icon: <CheckCircle2 className="w-3.5 h-3.5" /> }
  ];

  const filteredPosts = communityPosts.filter(p => {
    if (p.isFlagged) return false;
    if (activeFilter === "question" && p.type !== "question") return false;
    if (activeFilter === "poll" && p.type !== "poll") return false;
    if (activeFilter === "solved" && !p.isSolved) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchContent = p.content.toLowerCase().includes(q);
      const matchAuthor = p.authorName.toLowerCase().includes(q);
      const matchTag = p.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchContent && !matchAuthor && !matchTag) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-500" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Campus Academic Community
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Moderated student discussions, subject doubts, solutions, and interactive polls.
          </p>
        </div>

        <Button
          variant="gradient"
          size="sm"
          leftIcon={<PlusCircle className="w-4 h-4" />}
          onClick={() => setIsCreateOpen(true)}
        >
          Ask Question / Discuss
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search questions, topics, polls..."
          />
        </div>

        <Tabs
          tabs={filters}
          activeTab={activeFilter}
          onChange={setActiveFilter}
          variant="pill"
        />
      </div>

      {filteredPosts.length === 0 ? (
        <EmptyState
          icon={<MessageSquare className="w-10 h-10" />}
          title="No discussions found"
          description="Be the first student to post an academic question or start a topic discussion."
          actionText="Start Discussion"
          onAction={() => setIsCreateOpen(true)}
        />
      ) : (
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
};