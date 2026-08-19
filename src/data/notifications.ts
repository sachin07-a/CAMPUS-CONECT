import { AppNotification } from "../types";

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif_1",
    userId: "usr_student_1",
    title: "Urgent Exam Notification",
    message: "End-Semester Examination form submission portal is open. Last date: Aug 28.",
    category: "announcement",
    read: false,
    targetTab: "announcements",
    targetId: "ann_1",
    createdAt: "2026-08-18T09:05:00Z"
  },
  {
    id: "notif_2",
    userId: "usr_student_1",
    title: "Registration Confirmed!",
    message: "You are successfully registered for HackCampus 2026: 36-Hour National Hackathon.",
    category: "event",
    read: false,
    targetTab: "events",
    targetId: "evt_1",
    createdAt: "2026-08-17T14:30:00Z"
  },
  {
    id: "notif_3",
    userId: "usr_student_1",
    title: "Verified Note Uploaded",
    message: "Dr. Arvind Shenoy published new verified notes for Data Structures Unit 3 (AVL Trees).",
    category: "note",
    read: true,
    targetTab: "notes",
    targetId: "note_1",
    createdAt: "2026-08-10T10:35:00Z"
  }
];