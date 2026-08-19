export type UserRole = "student" | "faculty" | "club_admin" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  branch: string; // e.g. "CSE"
  branchName: string; // e.g. "Computer Science Engineering"
  semester: number; // 1 to 8
  section: string; // e.g. "A"
  studentId: string; // e.g. "1MS22CS042"
  department: string;
  interests: string[];
  skills: string[];
  joinedClubs: string[]; // Club IDs
  followedClubs: string[]; // Club IDs
  bookmarkedNoteIds: string[];
  bookmarkedAnnouncementIds: string[];
  bookmarkedEventIds: string[];
  bookmarkedPlacementIds: string[];
  bookmarkedPostIds: string[];
  registeredEventIds: string[];
  cgpa?: number;
  phone?: string;
  bio?: string;
  notificationsEnabled?: boolean;
}

export interface AcademicBranch {
  id: string;
  code: string;
  name: string;
  department: string;
  icon: string;
  description: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  branchId: string;
  semester: number;
  unitsCount: number;
  description: string;
  icon?: string;
}

export interface Unit {
  id: string;
  subjectId: string;
  unitNumber: number;
  title: string;
  topics: string[];
}

export type NoteFileType = "pdf" | "pptx" | "docx" | "zip";
export type NoteStatus = "approved" | "pending" | "rejected" | "needs_review";

export interface Note {
  id: string;
  title: string;
  description: string;
  branchId: string;
  branchName: string;
  semester: number;
  subjectId: string;
  subjectName: string;
  unitNumber: number;
  topic: string;
  tags: string[];
  fileUrl: string;
  fileType: NoteFileType;
  fileSize: string;
  uploaderId: string;
  uploaderName: string;
  uploaderRole: UserRole;
  uploaderAvatar?: string;
  downloads: number;
  rating: number;
  ratingCount: number;
  userRatings: Record<string, number>;
  status: NoteStatus;
  moderationNote?: string;
  createdAt: string;
  isVerified?: boolean;
  pagesCount?: number;
}

export type AnnouncementCategory =
  | "university"
  | "department"
  | "examination"
  | "placement"
  | "scholarship"
  | "holiday"
  | "academic"
  | "emergency"
  | "general";

export type AnnouncementPriority = "urgent" | "high" | "normal";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: AnnouncementCategory;
  priority: AnnouncementPriority;
  targetAudience: "all" | "branch" | "semester";
  targetBranch?: string;
  targetSemester?: number;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  attachmentName?: string;
  attachmentSize?: string;
  attachmentUrl?: string;
  createdAt: string;
  expiryDate?: string;
  readBy: string[]; // User IDs
  isPinned?: boolean;
}

export type ClubCategory =
  | "technical"
  | "coding"
  | "aiml"
  | "robotics"
  | "cultural"
  | "literary"
  | "sports"
  | "entrepreneurship"
  | "photography"
  | "music"
  | "social_service";

export interface Club {
  id: string;
  name: string;
  tag: string;
  description: string;
  category: ClubCategory;
  logo: string;
  coverImage: string;
  facultyCoordinator: { name: string; email: string; department: string };
  studentCoordinators: { name: string; role: string; avatar: string }[];
  memberIds: string[];
  followerIds: string[];
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  upcomingEventsCount: number;
  gallery: string[];
  announcements?: string[];
  establishedYear: number;
}

export type EventCategory =
  | "workshop"
  | "hackathon"
  | "seminar"
  | "cultural"
  | "competition"
  | "orientation";

export interface EventSpeaker {
  name: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface EventScheduleItem {
  time: string;
  activity: string;
}

export interface EventFAQ {
  question: string;
  answer: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  clubId: string;
  clubName: string;
  clubLogo?: string;
  category: EventCategory;
  date: string; // ISO date string e.g. 2026-08-25
  time: string; // e.g. "10:00 AM - 4:00 PM"
  venue: string;
  posterUrl: string;
  registrationDeadline: string;
  maxParticipants: number;
  registeredUserIds: string[];
  speakers: EventSpeaker[];
  schedule: EventScheduleItem[];
  faqs: EventFAQ[];
  isOnline: boolean;
  meetingLink?: string;
  fee: string; // "Free" or "₹150"
  prizes?: string;
  tags: string[];
  featured?: boolean;
}

export type CommunityPostType = "question" | "discussion" | "poll";
export type CommunityChannel = "general" | "branch" | "semester" | "subject";

export interface CommunityComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorBranch: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  upvotes: number;
  upvotedUserIds: string[];
  isSolution?: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  votedUserIds: string[];
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorBranch: string;
  authorAvatar: string;
  type: CommunityPostType;
  channel: CommunityChannel;
  branchId?: string;
  semester?: number;
  subjectId?: string;
  subjectName?: string;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  upvotedUserIds: string[];
  comments: CommunityComment[];
  pollOptions?: PollOption[];
  isSolved?: boolean;
  solvedCommentId?: string;
  isFlagged?: boolean;
  flagReason?: string;
  createdAt: string;
}

export type PlacementType = "internship" | "full_time";
export type PlacementMode = "on_campus" | "off_campus" | "remote";

export interface Placement {
  id: string;
  company: string;
  logo: string;
  role: string;
  type: PlacementType;
  workMode: PlacementMode;
  location: string;
  stipend: string;
  minCgpa: number;
  eligibleBranches: string[];
  skills: string[];
  deadline: string;
  applyUrl: string;
  applicantsCount: number;
  bookmarkedUserIds: string[];
  description: string;
  requirements: string[];
  postedDate: string;
  isVerified: boolean;
}

export type NotificationCategory =
  | "announcement"
  | "note"
  | "event"
  | "placement"
  | "community"
  | "moderation";

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  category: NotificationCategory;
  read: boolean;
  targetTab?: string;
  targetId?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  target: string;
  timestamp: string;
  details: string;
}
