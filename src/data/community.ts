import { CommunityPost } from "../types";

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "post_1",
    authorId: "usr_student_1",
    authorName: "Sachin Verma",
    authorRole: "student",
    authorBranch: "CSE",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    type: "question",
    channel: "subject",
    branchId: "cse",
    semester: 3,
    subjectId: "cs301",
    subjectName: "Data Structures & Algorithms",
    title: "How to intuitively determine whether Double Rotation (LR or RL) is needed in AVL Tree?",
    content: "When balancing an AVL tree after insertion, I often get confused between Single Left/Right and Double (LR/RL) rotations. Is there an easy heuristic to instantly see which node needs to be rotated first?",
    tags: ["AVL-Trees", "Data-Structures", "Algorithms", "Doubt"],
    upvotes: 24,
    upvotedUserIds: ["usr_student_1", "usr_club_admin_1"],
    comments: [
      {
        id: "comm_1",
        postId: "post_1",
        authorId: "usr_faculty_1",
        authorName: "Dr. Arvind Shenoy",
        authorRole: "faculty",
        authorBranch: "CSE",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        content: "Great question Sachin! Look at the path of 2 edges from the unbalanced node (Z) towards the inserted node. If the direction changes (e.g. Left child then Right child), it forms a 'zigzag' shape — this is an LR case. You first rotate Left around the child (Y) to make it straight, and then rotate Right around the parent (Z). Straight paths (LL or RR) only need 1 single rotation!",
        createdAt: "2026-08-16T12:00:00Z",
        upvotes: 18,
        upvotedUserIds: ["usr_student_1"],
        isSolution: true
      },
      {
        id: "comm_2",
        postId: "post_1",
        authorId: "usr_club_admin_1",
        authorName: "Ananya Rao",
        authorRole: "club_admin",
        authorBranch: "CSE",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        content: "Check Note #1 uploaded by Dr. Shenoy in the Notes section — Page 7 has a great diagram summarizing this exact rule!",
        createdAt: "2026-08-16T13:30:00Z",
        upvotes: 6,
        upvotedUserIds: []
      }
    ],
    isSolved: true,
    solvedCommentId: "comm_1",
    createdAt: "2026-08-16T10:15:00Z"
  },
  {
    id: "post_2",
    authorId: "usr_club_admin_1",
    authorName: "Ananya Rao",
    authorRole: "club_admin",
    authorBranch: "CSE",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    type: "poll",
    channel: "branch",
    branchId: "cse",
    semester: 3,
    title: "Campus Poll: Which programming language are you primarily using for DSA & Competitive Coding?",
    content: "We are organizing specialized mock interview and live contest batches for the upcoming placement season. Vote for your primary language:",
    tags: ["Poll", "Placements", "C++", "Java", "Python"],
    upvotes: 42,
    upvotedUserIds: ["usr_student_1"],
    pollOptions: [
      { id: "opt_1", text: "C++ (STL & Fast I/O)", votes: 78, votedUserIds: ["usr_student_1"] },
      { id: "opt_2", text: "Java (Collections Framework)", votes: 34, votedUserIds: [] },
      { id: "opt_3", text: "Python 3", votes: 22, votedUserIds: [] },
      { id: "opt_4", text: "Rust / Go / Other", votes: 6, votedUserIds: [] }
    ],
    comments: [],
    createdAt: "2026-08-17T15:00:00Z"
  },
  {
    id: "post_3",
    authorId: "usr_student_1",
    authorName: "Sachin Verma",
    authorRole: "student",
    authorBranch: "CSE",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    type: "discussion",
    channel: "general",
    title: "Tips for preparing for Technical Internships in 3rd & 5th Semester?",
    content: "With company shortlists starting next month, how are seniors balancing core subjects (OS, DBMS, Networks) alongside daily LeetCode and development portfolio projects?",
    tags: ["Career", "Internships", "StudyTips", "DSA"],
    upvotes: 31,
    upvotedUserIds: [],
    comments: [
      {
        id: "comm_3",
        postId: "post_3",
        authorId: "usr_club_admin_1",
        authorName: "Ananya Rao",
        authorRole: "club_admin",
        authorBranch: "CSE",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        content: "Focus 70% on DSA (Trees, DP, Graphs) and 30% on OS/DBMS basics (Transactions, Paging, Deadlocks). Don't ignore OOPs concepts like Polymorphism and Design Patterns!",
        createdAt: "2026-08-18T10:00:00Z",
        upvotes: 12,
        upvotedUserIds: ["usr_student_1"]
      }
    ],
    createdAt: "2026-08-18T08:30:00Z"
  }
];