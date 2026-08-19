import { Placement } from "../types";

export const INITIAL_PLACEMENTS: Placement[] = [
  {
    id: "plc_1",
    company: "Google",
    logo: "https://www.google.com/favicon.ico",
    role: "Software Engineering Intern (Summer 2027)",
    type: "internship",
    workMode: "on_campus",
    location: "Bangalore / Hyderabad, India",
    stipend: "₹1,25,000 / month + Housing",
    minCgpa: 8.0,
    eligibleBranches: ["CSE", "AI & ML", "ISE", "ECE"],
    skills: ["Data Structures", "Algorithms", "C++", "Java", "Python", "Problem Solving"],
    deadline: "2026-08-31",
    applyUrl: "https://careers.google.com/students",
    applicantsCount: 142,
    bookmarkedUserIds: ["usr_student_1"],
    description: "Join Google's core engineering teams working on Search, Cloud infrastructure, Android, and Gemini AI systems during a 10-12 week summer internship.",
    requirements: [
      "Enrolled in 2nd or 3rd year of B.Tech/B.E in CS/IT/ECE.",
      "Strong proficiency in one programming language (C++, Java, or Python).",
      "Solid foundation in asymptotic time complexity, graph algorithms, and dynamic programming."
    ],
    postedDate: "2026-08-15",
    isVerified: true
  },
  {
    id: "plc_2",
    company: "Microsoft",
    logo: "https://images.unsplash.com/photo-1642132652809-8c29ec4e3d74?w=100&auto=format&fit=crop&q=80",
    role: "Software Development Engineer - 1",
    type: "full_time",
    workMode: "on_campus",
    location: "Hyderabad / Noida / Bangalore",
    stipend: "₹51.0 LPA (CTC Base + RSUs)",
    minCgpa: 7.5,
    eligibleBranches: ["CSE", "AI & ML", "ISE", "ECE", "EEE"],
    skills: ["C#", "C++", "Azure", "Distributed Systems", "SQL"],
    deadline: "2026-09-10",
    applyUrl: "https://careers.microsoft.com",
    applicantsCount: 210,
    bookmarkedUserIds: [],
    description: "Full-time campus hiring for graduating 2027 batches across Microsoft Azure, Office 365, Developer Division, and Microsoft Research.",
    requirements: [
      "B.Tech / Dual Degree 2027 batch.",
      "Hands-on experience with cloud architecture or systems programming.",
      "Strong analytical and collaborative communication skills."
    ],
    postedDate: "2026-08-14",
    isVerified: true
  },
  {
    id: "plc_3",
    company: "Razorpay",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
    role: "Frontend Engineering Intern",
    type: "internship",
    workMode: "remote",
    location: "Remote / Bangalore HQ",
    stipend: "₹65,000 / month",
    minCgpa: 7.0,
    eligibleBranches: ["CSE", "AI & ML", "ISE", "ECE", "MECH", "CIVIL"],
    skills: ["React", "TypeScript", "Tailwind CSS", "Web Vitals", "State Management"],
    deadline: "2026-09-05",
    applyUrl: "https://razorpay.com/jobs",
    applicantsCount: 95,
    bookmarkedUserIds: ["usr_student_1"],
    description: "Build ultra-reliable payment checkout experiences and merchant dashboards handling millions of daily transactions with sub-second latency.",
    requirements: [
      "Strong command of modern React, TypeScript, and browser internals.",
      "Experience with responsive design and accessibility (WCAG 2.1).",
      "Demonstrated personal projects or open source contributions."
    ],
    postedDate: "2026-08-16",
    isVerified: true
  }
];