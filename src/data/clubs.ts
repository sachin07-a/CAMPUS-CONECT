import { Club } from "../types";

export const INITIAL_CLUBS: Club[] = [
  {
    id: "club_acm",
    name: "ACM Student Chapter",
    tag: "Technical & Computing",
    description: "The premier computer science society fostering competitive programming, systems research, and high-impact hackathons on campus.",
    category: "coding",
    logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    facultyCoordinator: { name: "Dr. Arvind Shenoy", email: "arvind.shenoy@rvce.edu.in", department: "CSE" },
    studentCoordinators: [
      { name: "Ananya Rao", role: "President", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
      { name: "Sachin Verma", role: "Technical Lead", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" }
    ],
    memberIds: ["usr_student_1", "usr_club_admin_1"],
    followerIds: ["usr_student_1", "usr_club_admin_1", "usr_faculty_1"],
    socialLinks: { github: "https://github.com/acm-campus", linkedin: "https://linkedin.com/company/acm-campus", instagram: "https://instagram.com/acm_campus" },
    upcomingEventsCount: 2,
    gallery: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&auto=format&fit=crop&q=80"
    ],
    establishedYear: 2014
  },
  {
    id: "club_gdsc",
    name: "Google Developer Student Club (GDSC)",
    tag: "Mobile, Web & Cloud",
    description: "Empowering university developers to bridge the gap between theory and practice through Google Cloud, Android, TensorFlow, and Flutter.",
    category: "technical",
    logo: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    facultyCoordinator: { name: "Prof. Geetha V", email: "geetha.v@rvce.edu.in", department: "ISE" },
    studentCoordinators: [
      { name: "Rohan Nair", role: "Lead Organizer", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80" }
    ],
    memberIds: ["usr_student_1"],
    followerIds: ["usr_student_1"],
    socialLinks: { website: "https://gdsc.community.dev", linkedin: "https://linkedin.com" },
    upcomingEventsCount: 1,
    gallery: [
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=500&auto=format&fit=crop&q=80"
    ],
    establishedYear: 2019
  },
  {
    id: "club_robotics",
    name: "Robotics & Automation Society (RAS)",
    tag: "Hardware & Autonomous Systems",
    description: "Designing autonomous combat robots, quadcopters, ROS2 navigation stacks, and competitive mechatronic rovers.",
    category: "robotics",
    logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    facultyCoordinator: { name: "Dr. K. S. Murthy", email: "ks.murthy@rvce.edu.in", department: "ECE" },
    studentCoordinators: [
      { name: "Varun Shetty", role: "Captain", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80" }
    ],
    memberIds: [],
    followerIds: ["usr_student_1"],
    socialLinks: { instagram: "https://instagram.com/robotics_rvce" },
    upcomingEventsCount: 1,
    gallery: [],
    establishedYear: 2016
  },
  {
    id: "club_ecell",
    name: "Entrepreneurship & Innovation Cell (E-Cell)",
    tag: "Startups & Venture Capital",
    description: "Incubating student-led ventures, hosting Angel Investor pitch days, and building the next generation of founders.",
    category: "entrepreneurship",
    logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80",
    facultyCoordinator: { name: "Dr. P. N. Prasad", email: "prasad.pn@rvce.edu.in", department: "Management" },
    studentCoordinators: [
      { name: "Kritika S", role: "Convenor", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" }
    ],
    memberIds: [],
    followerIds: ["usr_student_1"],
    socialLinks: { linkedin: "https://linkedin.com" },
    upcomingEventsCount: 1,
    gallery: [],
    establishedYear: 2015
  },
  {
    id: "club_codecraft",
    name: "CodeCraft CP & Algorithms Hub",
    tag: "Competitive Programming & DSA",
    description: "Weekly Codeforces & LeetCode rounds, ACM-ICPC regional preparation, and advanced graph algorithms training.",
    category: "coding",
    logo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    facultyCoordinator: { name: "Dr. Arvind Shenoy", email: "arvind.shenoy@rvce.edu.in", department: "CSE" },
    studentCoordinators: [
      { name: "Sachin Verma", role: "CP Lead", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" }
    ],
    memberIds: ["usr_student_1"],
    followerIds: ["usr_student_1"],
    socialLinks: { github: "https://github.com" },
    upcomingEventsCount: 1,
    gallery: [],
    establishedYear: 2021
  }
];