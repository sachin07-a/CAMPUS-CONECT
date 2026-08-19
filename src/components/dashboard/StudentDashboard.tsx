import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import {
  BookOpen,
  Megaphone,
  CalendarDays,
  Users,
  MessageSquare,
  Briefcase,
  UploadCloud,
  ArrowRight,
  Sparkles,
  Download,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
  TrendingUp,
  AlertCircle
} from "lucide-react";

interface StudentDashboardProps {
  onNavigate: (tab: string, id?: string) => void;
  onOpenUploadNote: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onNavigate,
  onOpenUploadNote
}) => {
  const { currentUser } = useAuth();
  const { notes, announcements, events, communityPosts, placements } = useData();

  // Get current hour greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Important announcements (pinned or urgent/high priority)
  const priorityAnnouncements = announcements
    .filter(a => a.isPinned || a.priority === "urgent" || a.priority === "high")
    .slice(0, 2);

  // Personalized Notes (matching branch and semester)
  const studentBranch = currentUser?.branch?.toLowerCase() || "cse";
  const studentSemester = currentUser?.semester || 3;

  const relevantNotes = notes
    .filter(n => n.status === "approved" && n.branchId.toLowerCase() === studentBranch && n.semester === studentSemester)
    .slice(0, 4);

  // If no branch match, fallback to top approved notes
  const displayNotes = relevantNotes.length > 0
    ? relevantNotes
    : notes.filter(n => n.status === "approved").slice(0, 4);

  // Upcoming events
  const upcomingEvents = events.slice(0, 3);

  // Recent discussions & solved questions
  const activeDiscussions = communityPosts.slice(0, 3);

  // Featured Placement
  const featuredPlacement = placements[0];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Personalized Top Greeting Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 sm:p-8 text-white shadow-glow">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Academic Term 2026-27 • {currentUser?.branchName || "Computer Science"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {getGreeting()}, {currentUser?.name?.split(" ")[0] || "Student"} 👋
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-2 font-medium leading-relaxed">
            Here&apos;s what&apos;s happening on your campus today. You have{" "}
            <span className="text-brand-gold font-bold">{priorityAnnouncements.length} important notices</span> and{" "}
            <span className="text-white font-bold">{upcomingEvents.length} upcoming events</span>.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<BookOpen className="w-4 h-4 text-brand-royalblue" />}
              onClick={() => onNavigate("notes")}
              className="bg-white text-slate-900 hover:bg-blue-50 font-bold border-0 shadow-md"
            >
              Browse Sem {studentSemester} Notes
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<UploadCloud className="w-4 h-4 text-white" />}
              onClick={onOpenUploadNote}
              className="border-white/40 text-white hover:bg-white/10"
            >
              Upload Material
            </Button>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-12 top-6 opacity-20 hidden md:block pointer-events-none">
          <svg className="w-48 h-48" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="6" strokeDasharray="10 10" />
            <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="4" />
          </svg>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { id: "notes", label: "Notes Hub", count: `${notes.filter(n => n.status === "approved").length}+ Files`, icon: BookOpen, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40" },
          { id: "announcements", label: "Notice Board", count: `${announcements.length} Notices`, icon: Megaphone, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40" },
          { id: "events", label: "Hackathons", count: `${events.length} Live`, icon: CalendarDays, color: "text-pink-500 bg-pink-50 dark:bg-pink-950/40" },
          { id: "clubs", label: "Clubs", count: "8 Societies", icon: Users, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/40" },
          { id: "community", label: "Community", count: "Q&A & Polls", icon: MessageSquare, color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40" },
          { id: "placements", label: "Placements", count: "Top Hiring", icon: Briefcase, color: "text-teal-500 bg-teal-50 dark:bg-teal-950/40" },
        ].map(item => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex items-center gap-3 p-3.5 bg-white dark:bg-campus-darkcard border border-slate-200 dark:border-slate-800 rounded-2xl cursor-pointer hover:border-brand-royalblue dark:hover:border-brand-royal hover:shadow-card hover:-translate-y-0.5 transition-all group"
            >
              <div className={`p-2.5 rounded-xl ${item.color} shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate group-hover:text-brand-royalblue dark:group-hover:text-blue-400">
                  {item.label}
                </h4>
                <p className="text-[10px] text-slate-400 font-medium truncate">{item.count}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Priority Notice Board Highlight */}
      {priorityAnnouncements.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4" />
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Urgent Campus Notices
              </h3>
            </div>
            <button
              onClick={() => onNavigate("announcements")}
              className="text-xs font-bold text-brand-royalblue dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View Notice Board</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {priorityAnnouncements.map(ann => (
              <Card
                key={ann.id}
                hoverEffect={true}
                className="cursor-pointer border-l-4 border-l-amber-500 relative"
                onClick={() => onNavigate("announcements", ann.id)}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={ann.priority === "urgent" ? "red" : "gold"} size="sm">
                      {ann.category.toUpperCase()}
                    </Badge>
                    <span className="text-[11px] text-slate-400">
                      {new Date(ann.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  {ann.isPinned && (
                    <span className="text-[10px] font-bold text-brand-royalblue bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full">
                      PINNED
                    </span>
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">
                  {ann.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                  {ann.content}
                </p>

                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                  <span className="truncate">{ann.authorName}</span>
                  <span className="font-semibold text-brand-royalblue dark:text-blue-400">Read Details →</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Two Column Grid: Personalized Notes & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Personalized Academic Notes (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-royalblue dark:text-blue-400" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Semester {studentSemester} Academic Notes
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Handwritten notes & verified materials for your current syllabus
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => onNavigate("notes")}
            >
              Explore All
            </Button>
          </div>

          <div className="space-y-3">
            {displayNotes.map(note => (
              <Card
                key={note.id}
                hoverEffect={true}
                padding="sm"
                className="cursor-pointer"
                onClick={() => onNavigate("notes", note.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-brand-royalblue dark:text-blue-400 shrink-0 mt-0.5">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold text-brand-royalblue dark:text-blue-400">
                          {note.subjectName}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="text-[11px] text-slate-500 font-medium">Unit {note.unitNumber}</span>
                        {note.isVerified && (
                          <Badge variant="teal" size="sm">Verified</Badge>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">
                        {note.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                        <span>By {note.uploaderName}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {note.downloads}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-amber-500 font-semibold">
                          <Star className="w-3 h-3 fill-amber-500" />
                          {note.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Badge variant="slate" size="sm" className="uppercase shrink-0">
                    {note.fileType}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Upcoming Events & Hackathons (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-pink-500" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Upcoming Events & Hackathons
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => onNavigate("events")}
            >
              All Events
            </Button>
          </div>

          <div className="space-y-3">
            {upcomingEvents.map(evt => (
              <Card
                key={evt.id}
                hoverEffect={true}
                padding="sm"
                className="cursor-pointer overflow-hidden"
                onClick={() => onNavigate("events", evt.id)}
              >
                <div className="flex gap-3">
                  <img
                    src={evt.posterUrl}
                    alt={evt.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-100 dark:border-slate-800"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <Badge variant="pink" size="sm">{evt.category.toUpperCase()}</Badge>
                      <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded-full">
                        {evt.fee}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">
                      {evt.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {evt.date} • {evt.time.split("–")[0]}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      {evt.venue}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Featured Placement Card */}
          {featuredPlacement && (
            <Card
              hoverEffect={true}
              className="mt-4 bg-gradient-to-br from-teal-900/10 via-white to-white dark:from-teal-950/30 dark:via-campus-darkcard dark:to-campus-darkcard border-teal-200/60 dark:border-teal-900/40 cursor-pointer"
              onClick={() => onNavigate("placements", featuredPlacement.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <Badge variant="teal" size="sm">Top Opportunity</Badge>
                <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400">{featuredPlacement.stipend}</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {featuredPlacement.company} — {featuredPlacement.role}
              </h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                Eligible: {featuredPlacement.eligibleBranches.join(", ")} • Min CGPA: {featuredPlacement.minCgpa}
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Community Activity Spotlight */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-purple-500" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Trending Academic Discussions & Polls
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={() => onNavigate("community")}
          >
            Community Hub
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {activeDiscussions.map(post => (
            <Card
              key={post.id}
              hoverEffect={true}
              className="cursor-pointer flex flex-col justify-between"
              onClick={() => onNavigate("community", post.id)}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <Badge variant={post.type === "question" ? "blue" : post.type === "poll" ? "purple" : "slate"} size="sm">
                    {post.type.toUpperCase()}
                  </Badge>
                  {post.isSolved && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Solved
                    </span>
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {post.content}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                <span className="font-medium text-slate-600 dark:text-slate-300">
                  {post.authorName} ({post.authorBranch})
                </span>
                <span className="flex items-center gap-2">
                  <span>▲ {post.upvotes}</span>
                  <span>💬 {post.comments.length}</span>
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};