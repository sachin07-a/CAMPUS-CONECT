import { CampusEvent } from "../types";

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: "evt_1",
    title: "HackCampus 2026: 36-Hour National Hackathon",
    description: "Join 500+ top collegiate developers, builders, and designers for 36 hours of intense innovation, mentorship from FAANG engineers, and ₹2,50,000 in prizes.",
    clubId: "club_acm",
    clubName: "ACM Student Chapter",
    clubLogo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80",
    category: "hackathon",
    date: "2026-08-29",
    time: "9:00 AM (Aug 29) – 6:00 PM (Aug 30)",
    venue: "Dr. APJ Abdul Kalam Auditorium & Main CSE Labs",
    posterUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
    registrationDeadline: "2026-08-26",
    maxParticipants: 350,
    registeredUserIds: ["usr_student_1"],
    speakers: [
      { name: "Vikram Rathore", role: "Staff Engineer", company: "Google AI", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
      { name: "Pooja Hegde", role: "VP of Engineering", company: "Postman", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" }
    ],
    schedule: [
      { time: "09:00 AM", activity: "Check-in, Swag Distribution & Team Formation" },
      { time: "10:30 AM", activity: "Opening Ceremony & Problem Statement Reveal" },
      { time: "12:00 PM", activity: "Hacking Begins & Lunch Buffet" },
      { time: "08:00 PM", activity: "Mentorship Round 1 with Industry Experts" },
      { time: "12:00 AM", activity: "Midnight Pizza & Esports Mini-Games" },
      { time: "09:00 AM (Day 2)", activity: "Code Freeze & Pitch Presentations" }
    ],
    faqs: [
      { question: "Is team participation allowed?", answer: "Yes, teams of 2 to 4 members are required. Solo applicants will be paired during team formation." },
      { question: "Are meals and stay covered?", answer: "Yes, all meals, energy drinks, snacks, and resting zones are completely free for confirmed teams." }
    ],
    isOnline: false,
    fee: "Free",
    prizes: "₹2,50,000 Total Cash Pool + Cloud Credits",
    tags: ["Hackathon", "AI/ML", "Web3", "Cash Prizes"],
    featured: true
  },
  {
    id: "evt_2",
    title: "Deep Dive into Transformers & LLMs: From Attention to LoRA Fine-Tuning",
    description: "Hands-on engineering workshop exploring Multi-Head Attention mechanisms, Positional Encodings, and parameter-efficient fine-tuning (PEFT/LoRA) using PyTorch and HuggingFace.",
    clubId: "club_gdsc",
    clubName: "Google Developer Student Club",
    clubLogo: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&auto=format&fit=crop&q=80",
    category: "workshop",
    date: "2026-08-25",
    time: "2:00 PM - 5:30 PM",
    venue: "Seminar Hall 2, Dept. of ISE",
    posterUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    registrationDeadline: "2026-08-24",
    maxParticipants: 120,
    registeredUserIds: [],
    speakers: [
      { name: "Dr. Arvind Shenoy", role: "Associate Professor", company: "Dept of CSE", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" }
    ],
    schedule: [
      { time: "02:00 PM", activity: "Attention Is All You Need Paper Deconstruction" },
      { time: "03:15 PM", activity: "Live Coding: Mini-GPT from Scratch in PyTorch" },
      { time: "04:30 PM", activity: "Fine-Tuning Llama-3 with QLoRA on Google Colab" }
    ],
    faqs: [
      { question: "What are the prerequisites?", answer: "Basic familiarity with Python and matrix multiplication." }
    ],
    isOnline: false,
    fee: "Free",
    tags: ["AI/ML", "PyTorch", "LLM", "Workshop"],
    featured: true
  },
  {
    id: "evt_3",
    title: "Autonomous ROS2 & Gazebo Simulation Masterclass",
    description: "Step-by-step masterclass on writing ROS2 C++ nodes, configuring LiDAR sensor plugins, SLAM mapping, and path planning in 3D Gazebo simulator.",
    clubId: "club_robotics",
    clubName: "Robotics & Automation Society",
    clubLogo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&auto=format&fit=crop&q=80",
    category: "workshop",
    date: "2026-09-02",
    time: "10:00 AM - 1:00 PM",
    venue: "Mechatronics Robotics Lab (Ground Floor)",
    posterUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
    registrationDeadline: "2026-09-01",
    maxParticipants: 60,
    registeredUserIds: ["usr_club_admin_1"],
    speakers: [
      { name: "Varun Shetty", role: "RAS Lead", company: "Robotics Society" }
    ],
    schedule: [
      { time: "10:00 AM", activity: "ROS2 Architecture & Publisher/Subscriber Nodes" },
      { time: "11:30 AM", activity: "Simulating Differential Drive Robot in Gazebo" }
    ],
    faqs: [],
    isOnline: false,
    fee: "Free",
    tags: ["Robotics", "ROS2", "Simulation"],
    featured: false
  }
];