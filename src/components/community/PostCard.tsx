import React, { useState } from "react";
import { CommunityPost } from "../../types";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import {
  ThumbsUp,
  MessageSquare,
  CheckCircle2,
  Flag,
  Share2,
  Send,
  Sparkles,
  BarChart3
} from "lucide-react";

interface PostCardProps {
  post: CommunityPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { currentUser, hasRole } = useAuth();
  const {
    upvotePost,
    addComment,
    upvoteComment,
    markSolution,
    votePoll,
    reportPost
  } = useData();

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const hasUpvoted = currentUser ? post.upvotedUserIds.includes(currentUser.id) : false;
  const totalPollVotes = post.pollOptions?.reduce((sum, opt) => sum + opt.votes, 0) || 0;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText("");
    setShowComments(true);
  };

  const handleReport = () => {
    const reason = prompt("Please provide a reason for flagging this post:");
    if (reason) {
      reportPost(post.id, reason);
      alert("Post has been flagged for administrator review.");
    }
  };

  return (
    <Card className="space-y-3.5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={post.authorAvatar}
            alt={post.authorName}
            className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {post.authorName}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {post.authorRole}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              {post.authorBranch} • {new Date(post.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Badge
            variant={post.type === "question" ? "blue" : post.type === "poll" ? "purple" : "slate"}
            size="sm"
          >
            {post.type.toUpperCase()}
          </Badge>

          {post.isSolved && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Solved
            </span>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div>
        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1.5">
          {post.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {post.content}
        </p>

        {/* Interactive Poll Rendering */}
        {post.type === "poll" && post.pollOptions && (
          <div className="mt-3.5 space-y-2">
            {post.pollOptions.map(opt => {
              const hasVotedThis = currentUser ? opt.votedUserIds.includes(currentUser.id) : false;
              const percent = totalPollVotes > 0 ? Math.round((opt.votes / totalPollVotes) * 100) : 0;
              return (
                <div
                  key={opt.id}
                  onClick={() => votePoll(post.id, opt.id)}
                  className={`relative p-3 rounded-xl border cursor-pointer transition-all overflow-hidden ${
                    hasVotedThis
                      ? "border-brand-royalblue bg-brand-royalblue/10 font-bold text-brand-royalblue dark:text-blue-300"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <div
                    style={{ width: `${percent}%` }}
                    className="absolute inset-y-0 left-0 bg-brand-royalblue/15 pointer-events-none transition-all duration-300"
                  />
                  <div className="relative flex items-center justify-between text-xs z-10">
                    <span className="truncate">{opt.text}</span>
                    <span className="font-mono font-bold shrink-0 ml-2">{percent}% ({opt.votes})</span>
                  </div>
                </div>
              );
            })}
            <p className="text-[10px] text-slate-400 text-right">{totalPollVotes} total campus votes</p>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {post.tags.map(t => (
            <span key={t} className="text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-medium">
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <button
            onClick={() => upvotePost(post.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-colors ${
              hasUpvoted
                ? "bg-brand-royalblue text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted ? "fill-white" : ""}`} />
            <span>{post.upvotes}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-brand-royalblue" />
            <span>{post.comments.length} Answers</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReport}
            className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
            title="Report post"
          >
            <Flag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expandable Comments Section */}
      {showComments && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Write an academic answer or explanation..."
              className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
            />
            <Button type="submit" size="sm" variant="primary">
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>

          <div className="space-y-2.5">
            {post.comments.map(comm => (
              <div
                key={comm.id}
                className={`p-3 rounded-xl text-xs space-y-1.5 ${
                  comm.isSolution
                    ? "bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800"
                    : "bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{comm.authorName}</span>
                    <span className="text-[10px] text-slate-400">({comm.authorRole})</span>
                    {comm.isSolution && (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-teal-600">
                        <CheckCircle2 className="w-3 h-3" /> Verified Solution
                      </span>
                    )}
                  </div>

                  {(hasRole("faculty", "admin") || currentUser?.id === post.authorId) && (
                    <button
                      onClick={() => markSolution(post.id, comm.id)}
                      className="text-[10px] text-brand-royalblue hover:underline font-bold"
                    >
                      {comm.isSolution ? "Unmark Solution" : "Mark as Solution"}
                    </button>
                  )}
                </div>

                <p className="text-slate-700 dark:text-slate-300">{comm.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};