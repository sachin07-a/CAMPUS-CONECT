import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Note,
  Announcement,
  Club,
  CampusEvent,
  CommunityPost,
  Placement,
  AppNotification,
  AuditLog,
  NoteStatus
} from "../types";
import {
  INITIAL_NOTES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_CLUBS,
  INITIAL_EVENTS,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_PLACEMENTS,
  INITIAL_NOTIFICATIONS
} from "../data/initialData";
import { useAuth } from "./AuthContext";

interface DataContextType {
  notes: Note[];
  announcements: Announcement[];
  clubs: Club[];
  events: CampusEvent[];
  communityPosts: CommunityPost[];
  placements: Placement[];
  notifications: AppNotification[];
  auditLogs: AuditLog[];
  
  // Note actions
  addNote: (note: Omit<Note, "id" | "downloads" | "rating" | "ratingCount" | "userRatings" | "createdAt">) => void;
  approveNote: (id: string) => void;
  rejectNote: (id: string, reason: string) => void;
  deleteNote: (id: string) => void;
  downloadNote: (id: string) => void;
  rateNote: (id: string, stars: number) => void;
  toggleBookmarkNote: (id: string) => void;

  // Announcement actions
  addAnnouncement: (announcement: Omit<Announcement, "id" | "createdAt" | "readBy">) => void;
  deleteAnnouncement: (id: string) => void;
  markAnnouncementAsRead: (id: string) => void;
  toggleBookmarkAnnouncement: (id: string) => void;

  // Club actions
  toggleJoinClub: (id: string) => void;
  toggleFollowClub: (id: string) => void;
  addClub: (club: Omit<Club, "id" | "memberIds" | "followerIds" | "upcomingEventsCount">) => void;

  // Event actions
  registerForEvent: (id: string) => boolean;
  cancelEventRegistration: (id: string) => void;
  addEvent: (event: Omit<CampusEvent, "id" | "registeredUserIds">) => void;
  toggleBookmarkEvent: (id: string) => void;

  // Community actions
  addPost: (post: Omit<CommunityPost, "id" | "upvotes" | "upvotedUserIds" | "comments" | "createdAt">) => void;
  upvotePost: (id: string) => void;
  addComment: (postId: string, content: string) => void;
  upvoteComment: (postId: string, commentId: string) => void;
  markSolution: (postId: string, commentId: string) => void;
  votePoll: (postId: string, optionId: string) => void;
  reportPost: (postId: string, reason: string) => void;
  dismissReport: (postId: string) => void;
  removeReportedPost: (postId: string) => void;

  // Placement actions
  toggleBookmarkPlacement: (id: string) => void;
  applyForPlacement: (id: string) => boolean;
  addPlacement: (placement: Omit<Placement, "id" | "applicantsCount" | "bookmarkedUserIds" | "postedDate">) => void;

  // Notification actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (notif: Omit<AppNotification, "id" | "createdAt" | "read">) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, updateProfile } = useAuth();

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("campusconnect_notes");
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem("campusconnect_announcements");
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [clubs, setClubs] = useState<Club[]>(() => {
    const saved = localStorage.getItem("campusconnect_clubs");
    return saved ? JSON.parse(saved) : INITIAL_CLUBS;
  });

  const [events, setEvents] = useState<CampusEvent[]>(() => {
    const saved = localStorage.getItem("campusconnect_events");
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem("campusconnect_community");
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_POSTS;
  });

  const [placements, setPlacements] = useState<Placement[]>(() => {
    const saved = localStorage.getItem("campusconnect_placements");
    return saved ? JSON.parse(saved) : INITIAL_PLACEMENTS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem("campusconnect_notifications");
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("campusconnect_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("campusconnect_announcements", JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem("campusconnect_clubs", JSON.stringify(clubs));
  }, [clubs]);

  useEffect(() => {
    localStorage.setItem("campusconnect_events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("campusconnect_community", JSON.stringify(communityPosts));
  }, [communityPosts]);

  useEffect(() => {
    localStorage.setItem("campusconnect_placements", JSON.stringify(placements));
  }, [placements]);

  useEffect(() => {
    localStorage.setItem("campusconnect_notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Helper for audit logs
  const logAction = (action: string, target: string, details: string) => {
    const newLog: AuditLog = {
      id: `log_${Date.now()}`,
      action,
      performedBy: currentUser?.name || "System",
      target,
      timestamp: new Date().toISOString(),
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Helper for notifications
  const addNotification = (notif: Omit<AppNotification, "id" | "createdAt" | "read">) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Note Actions
  const addNote = (noteData: Omit<Note, "id" | "downloads" | "rating" | "ratingCount" | "userRatings" | "createdAt">) => {
    const isAutoApproved = noteData.uploaderRole === "faculty" || noteData.uploaderRole === "admin";
    const newNote: Note = {
      ...noteData,
      id: `note_${Date.now()}`,
      downloads: 0,
      rating: 0,
      ratingCount: 0,
      userRatings: {},
      status: isAutoApproved ? "approved" : "pending",
      isVerified: isAutoApproved,
      createdAt: new Date().toISOString()
    };
    setNotes(prev => [newNote, ...prev]);
    logAction("Upload Note", newNote.title, `Uploaded by ${newNote.uploaderName} (${newNote.status})`);
    
    if (!isAutoApproved) {
      addNotification({
        userId: "usr_admin_1",
        title: "New Note Pending Moderation",
        message: `${newNote.uploaderName} submitted notes for ${newNote.subjectName} (Unit ${newNote.unitNumber}).`,
        category: "moderation",
        targetTab: "admin",
        targetId: newNote.id
      });
    }
  };

  const approveNote = (id: string) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, status: "approved", isVerified: true, moderationNote: undefined } : n))
    );
    const targetNote = notes.find(n => n.id === id);
    if (targetNote) {
      logAction("Approve Note", targetNote.title, "Approved by Admin");
      addNotification({
        userId: targetNote.uploaderId,
        title: "Note Approved!",
        message: `Your uploaded study notes "${targetNote.title}" have been approved and published to the campus repository.`,
        category: "note",
        targetTab: "notes",
        targetId: targetNote.id
      });
    }
  };

  const rejectNote = (id: string, reason: string) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, status: "rejected", moderationNote: reason } : n))
    );
    const targetNote = notes.find(n => n.id === id);
    if (targetNote) {
      logAction("Reject Note", targetNote.title, `Rejected: ${reason}`);
      addNotification({
        userId: targetNote.uploaderId,
        title: "Note Upload Needs Revisions",
        message: `Your resource submission was reviewed: ${reason}`,
        category: "note",
        targetTab: "notes",
        targetId: targetNote.id
      });
    }
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    logAction("Delete Note", id, "Resource deleted");
  };

  const downloadNote = (id: string) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, downloads: n.downloads + 1 } : n))
    );
  };

  const rateNote = (id: string, stars: number) => {
    if (!currentUser) return;
    setNotes(prev =>
      prev.map(n => {
        if (n.id !== id) return n;
        const currentRatings = { ...n.userRatings, [currentUser.id]: stars };
        const ratingValues = Object.values(currentRatings);
        const avg = ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length;
        return {
          ...n,
          userRatings: currentRatings,
          rating: Number(avg.toFixed(1)),
          ratingCount: ratingValues.length
        };
      })
    );
  };

  const toggleBookmarkNote = (id: string) => {
    if (!currentUser) return;
    const currentBookmarks = currentUser.bookmarkedNoteIds || [];
    const isBookmarked = currentBookmarks.includes(id);
    const updated = isBookmarked
      ? currentBookmarks.filter(bId => bId !== id)
      : [...currentBookmarks, id];
    updateProfile({ bookmarkedNoteIds: updated });
  };

  // Announcement Actions
  const addAnnouncement = (annData: Omit<Announcement, "id" | "createdAt" | "readBy">) => {
    const newAnn: Announcement = {
      ...annData,
      id: `ann_${Date.now()}`,
      createdAt: new Date().toISOString(),
      readBy: []
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    logAction("Publish Announcement", newAnn.title, `Category: ${newAnn.category}, Priority: ${newAnn.priority}`);
    
    // Broadcast notification to all active students
    addNotification({
      userId: "all",
      title: `Notice: ${newAnn.title}`,
      message: newAnn.content.substring(0, 100) + "...",
      category: "announcement",
      targetTab: "announcements",
      targetId: newAnn.id
    });
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    logAction("Delete Announcement", id, "Announcement removed");
  };

  const markAnnouncementAsRead = (id: string) => {
    if (!currentUser) return;
    setAnnouncements(prev =>
      prev.map(a => {
        if (a.id === id && !a.readBy.includes(currentUser.id)) {
          return { ...a, readBy: [...a.readBy, currentUser.id] };
        }
        return a;
      })
    );
  };

  const toggleBookmarkAnnouncement = (id: string) => {
    if (!currentUser) return;
    const current = currentUser.bookmarkedAnnouncementIds || [];
    const updated = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
    updateProfile({ bookmarkedAnnouncementIds: updated });
  };

  // Club Actions
  const toggleJoinClub = (id: string) => {
    if (!currentUser) return;
    const joined = currentUser.joinedClubs || [];
    const isMember = joined.includes(id);
    const updatedJoined = isMember ? joined.filter(c => c !== id) : [...joined, id];
    
    updateProfile({ joinedClubs: updatedJoined });

    setClubs(prev =>
      prev.map(club => {
        if (club.id === id) {
          const members = club.memberIds || [];
          return {
            ...club,
            memberIds: isMember ? members.filter(m => m !== currentUser.id) : [...members, currentUser.id]
          };
        }
        return club;
      })
    );
  };

  const toggleFollowClub = (id: string) => {
    if (!currentUser) return;
    const followed = currentUser.followedClubs || [];
    const isFollower = followed.includes(id);
    const updatedFollowed = isFollower ? followed.filter(c => c !== id) : [...followed, id];
    
    updateProfile({ followedClubs: updatedFollowed });

    setClubs(prev =>
      prev.map(club => {
        if (club.id === id) {
          const followers = club.followerIds || [];
          return {
            ...club,
            followerIds: isFollower ? followers.filter(f => f !== currentUser.id) : [...followers, currentUser.id]
          };
        }
        return club;
      })
    );
  };

  const addClub = (clubData: Omit<Club, "id" | "memberIds" | "followerIds" | "upcomingEventsCount">) => {
    const newClub: Club = {
      ...clubData,
      id: `club_${Date.now()}`,
      memberIds: [currentUser?.id || "usr_student_1"],
      followerIds: [currentUser?.id || "usr_student_1"],
      upcomingEventsCount: 0
    };
    setClubs(prev => [...prev, newClub]);
    logAction("Create Club", newClub.name, "New club registered");
  };

  // Event Actions
  const registerForEvent = (id: string): boolean => {
    if (!currentUser) return false;
    const currentRegistered = currentUser.registeredEventIds || [];
    if (currentRegistered.includes(id)) return false;

    const targetEvent = events.find(e => e.id === id);
    if (!targetEvent) return false;

    updateProfile({ registeredEventIds: [...currentRegistered, id] });

    setEvents(prev =>
      prev.map(e => (e.id === id ? { ...e, registeredUserIds: [...e.registeredUserIds, currentUser.id] } : e))
    );

    addNotification({
      userId: currentUser.id,
      title: "Event Registration Confirmed! 🎟️",
      message: `You are booked for "${targetEvent.title}". Check schedule in My Events.`,
      category: "event",
      targetTab: "events",
      targetId: id
    });

    logAction("Event Registration", targetEvent.title, `Registered: ${currentUser.name}`);
    return true;
  };

  const cancelEventRegistration = (id: string) => {
    if (!currentUser) return;
    const currentRegistered = currentUser.registeredEventIds || [];
    updateProfile({ registeredEventIds: currentRegistered.filter(eId => eId !== id) });
    setEvents(prev =>
      prev.map(e => (e.id === id ? { ...e, registeredUserIds: e.registeredUserIds.filter(uId => uId !== currentUser.id) } : e))
    );
  };

  const addEvent = (eventData: Omit<CampusEvent, "id" | "registeredUserIds">) => {
    const newEvent: CampusEvent = {
      ...eventData,
      id: `evt_${Date.now()}`,
      registeredUserIds: []
    };
    setEvents(prev => [newEvent, ...prev]);
    logAction("Create Event", newEvent.title, `Date: ${newEvent.date}`);
  };

  const toggleBookmarkEvent = (id: string) => {
    if (!currentUser) return;
    const current = currentUser.bookmarkedEventIds || [];
    const updated = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
    updateProfile({ bookmarkedEventIds: updated });
  };

  // Community Actions
  const addPost = (postData: Omit<CommunityPost, "id" | "upvotes" | "upvotedUserIds" | "comments" | "createdAt">) => {
    const newPost: CommunityPost = {
      ...postData,
      id: `post_${Date.now()}`,
      upvotes: 1,
      upvotedUserIds: [currentUser?.id || "usr_student_1"],
      comments: [],
      createdAt: new Date().toISOString()
    };
    setCommunityPosts(prev => [newPost, ...prev]);
    logAction("Create Community Post", newPost.title, `Channel: ${newPost.channel}`);
  };

  const upvotePost = (id: string) => {
    if (!currentUser) return;
    setCommunityPosts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const hasUpvoted = p.upvotedUserIds.includes(currentUser.id);
        const upvotedUserIds = hasUpvoted
          ? p.upvotedUserIds.filter(uId => uId !== currentUser.id)
          : [...p.upvotedUserIds, currentUser.id];
        return {
          ...p,
          upvotes: upvotedUserIds.length,
          upvotedUserIds
        };
      })
    );
  };

  const addComment = (postId: string, content: string) => {
    if (!currentUser) return;
    const newComment = {
      id: `comm_${Date.now()}`,
      postId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorBranch: currentUser.branch.toUpperCase(),
      authorAvatar: currentUser.avatar,
      content,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      upvotedUserIds: []
    };

    setCommunityPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return { ...p, comments: [...p.comments, newComment] };
        }
        return p;
      })
    );
  };

  const upvoteComment = (postId: string, commentId: string) => {
    if (!currentUser) return;
    setCommunityPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const updatedComments = p.comments.map(c => {
          if (c.id !== commentId) return c;
          const hasUpvoted = c.upvotedUserIds.includes(currentUser.id);
          const upvotedUserIds = hasUpvoted
            ? c.upvotedUserIds.filter(uId => uId !== currentUser.id)
            : [...c.upvotedUserIds, currentUser.id];
          return {
            ...c,
            upvotes: upvotedUserIds.length,
            upvotedUserIds
          };
        });
        return { ...p, comments: updatedComments };
      })
    );
  };

  const markSolution = (postId: string, commentId: string) => {
    setCommunityPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const isCurrentlySolved = p.solvedCommentId === commentId;
        const updatedComments = p.comments.map(c => ({
          ...c,
          isSolution: isCurrentlySolved ? false : c.id === commentId
        }));
        return {
          ...p,
          isSolved: !isCurrentlySolved,
          solvedCommentId: isCurrentlySolved ? undefined : commentId,
          comments: updatedComments
        };
      })
    );
  };

  const votePoll = (postId: string, optionId: string) => {
    if (!currentUser) return;
    setCommunityPosts(prev =>
      prev.map(p => {
        if (p.id !== postId || !p.pollOptions) return p;
        const updatedOptions = p.pollOptions.map(opt => {
          const hasVoted = opt.votedUserIds.includes(currentUser.id);
          const isSelected = opt.id === optionId;
          let newVotedUsers = opt.votedUserIds.filter(u => u !== currentUser.id);
          if (isSelected && !hasVoted) {
            newVotedUsers.push(currentUser.id);
          }
          return {
            ...opt,
            votedUserIds: newVotedUsers,
            votes: newVotedUsers.length
          };
        });
        return { ...p, pollOptions: updatedOptions };
      })
    );
  };

  const reportPost = (postId: string, reason: string) => {
    setCommunityPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, isFlagged: true, flagReason: reason } : p))
    );
    addNotification({
      userId: "usr_admin_1",
      title: "Content Flagged for Moderation",
      message: `A community post was reported: "${reason}"`,
      category: "moderation",
      targetTab: "admin"
    });
  };

  const dismissReport = (postId: string) => {
    setCommunityPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, isFlagged: false, flagReason: undefined } : p))
    );
  };

  const removeReportedPost = (postId: string) => {
    setCommunityPosts(prev => prev.filter(p => p.id !== postId));
    logAction("Moderate Community", postId, "Reported post removed by admin");
  };

  // Placement Actions
  const toggleBookmarkPlacement = (id: string) => {
    if (!currentUser) return;
    const current = currentUser.bookmarkedPlacementIds || [];
    const updated = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
    updateProfile({ bookmarkedPlacementIds: updated });
  };

  const applyForPlacement = (id: string): boolean => {
    setPlacements(prev =>
      prev.map(p => (p.id === id ? { ...p, applicantsCount: p.applicantsCount + 1 } : p))
    );
    return true;
  };

  const addPlacement = (plcData: Omit<Placement, "id" | "applicantsCount" | "bookmarkedUserIds" | "postedDate">) => {
    const newPlacement: Placement = {
      ...plcData,
      id: `plc_${Date.now()}`,
      applicantsCount: 0,
      bookmarkedUserIds: [],
      postedDate: new Date().toISOString().split("T")[0]
    };
    setPlacements(prev => [newPlacement, ...prev]);
    logAction("Add Placement Listing", newPlacement.company, `${newPlacement.role}`);
  };

  // Notification Actions
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <DataContext.Provider
      value={{
        notes,
        announcements,
        clubs,
        events,
        communityPosts,
        placements,
        notifications,
        auditLogs,
        addNote,
        approveNote,
        rejectNote,
        deleteNote,
        downloadNote,
        rateNote,
        toggleBookmarkNote,
        addAnnouncement,
        deleteAnnouncement,
        markAnnouncementAsRead,
        toggleBookmarkAnnouncement,
        toggleJoinClub,
        toggleFollowClub,
        addClub,
        registerForEvent,
        cancelEventRegistration,
        addEvent,
        toggleBookmarkEvent,
        addPost,
        upvotePost,
        addComment,
        upvoteComment,
        markSolution,
        votePoll,
        reportPost,
        dismissReport,
        removeReportedPost,
        toggleBookmarkPlacement,
        applyForPlacement,
        addPlacement,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};