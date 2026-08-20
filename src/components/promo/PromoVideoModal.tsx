import React, { useState, useEffect, useRef } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { Logo } from "../common/Logo";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  CalendarDays,
  Users,
  ShieldCheck,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Maximize2,
  Zap,
  MessageSquare
} from "lucide-react";

interface PromoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Scene {
  id: number;
  durationMs: number;
  title: string;
  tagline: string;
  voiceover: string;
  caption: string;
}

const SCENES: Scene[] = [
  {
    id: 1,
    durationMs: 6500,
    title: "Tired of Chaos?",
    tagline: "Lost notes in 50 WhatsApp groups? Missed college circulars?",
    voiceover: "Tired of digging through fifty chaotic WhatsApp groups just to find one semester note before your exams?",
    caption: "❌ Important study notes and circulars getting lost in chat spam..."
  },
  {
    id: 2,
    durationMs: 7000,
    title: "Meet CampusConnect",
    tagline: "Your Campus. Your Community. Your Knowledge.",
    voiceover: "Meet CampusConnect. The all-in-one digital operating platform built for modern university students, faculty, and clubs.",
    caption: "🚀 The modern university operating system — organized, verified, and fast."
  },
  {
    id: 3,
    durationMs: 7500,
    title: "5-Level Engineering Notes & AI Copilot",
    tagline: "Branch → Semester → Subject → Unit with in-app PDF Reader",
    voiceover: "Access a five-level engineering notes library. Read syllabus materials inside the app and generate instant 3-minute AI summaries and practice exam quizzes!",
    caption: "📚 5-Level Notes hierarchy + 🤖 3-Minute AI Summarizer & Exam Quizzes."
  },
  {
    id: 4,
    durationMs: 7000,
    title: "Hackathons, Clubs & Live Community Polls",
    tagline: "1-Click free event registration tickets & verified Q&A",
    voiceover: "Register for hackathons in one click, follow student chapters, and vote on real-time campus polls.",
    caption: "🎟️ Instant Hackathon Entry Passes & 💬 Moderated Peer Community."
  },
  {
    id: 5,
    durationMs: 6500,
    title: "Deploy CampusConnect Today",
    tagline: "Open-source, lightning fast, with Dark Mode & Admin Controls.",
    voiceover: "Stop searching. Start connecting. Launch CampusConnect for your campus today!",
    caption: "✨ Live now on GitHub! Ready for collegiate excellence."
  }
];

export const PromoVideoModal: React.FC<PromoVideoModalProps> = ({ isOpen, onClose }) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const sceneStartTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<number | null>(null);

  const currentScene = SCENES[currentSceneIdx];

  // Voiceover synthesis
  const speakVoiceover = (text: string) => {
    if (isMuted || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!isOpen) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    setCurrentSceneIdx(0);
    setProgressPercent(0);
    sceneStartTimeRef.current = Date.now();
    speakVoiceover(SCENES[0].voiceover);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = 50; // update progress every 50ms
    const totalSceneTime = currentScene.durationMs;

    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - sceneStartTimeRef.current;
      const currentPct = Math.min(100, (elapsed / totalSceneTime) * 100);
      setProgressPercent(currentPct);

      if (elapsed >= totalSceneTime) {
        if (currentSceneIdx < SCENES.length - 1) {
          const nextIdx = currentSceneIdx + 1;
          setCurrentSceneIdx(nextIdx);
          setProgressPercent(0);
          sceneStartTimeRef.current = Date.now();
          speakVoiceover(SCENES[nextIdx].voiceover);
        } else {
          // Video finished, pause at end
          setIsPlaying(false);
          setProgressPercent(100);
        }
      }
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying, currentSceneIdx]);

  if (!isOpen) return null;

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      setIsPlaying(true);
      sceneStartTimeRef.current = Date.now() - (progressPercent / 100) * currentScene.durationMs;
      speakVoiceover(currentScene.voiceover);
    }
  };

  const restartVideo = () => {
    setCurrentSceneIdx(0);
    setProgressPercent(0);
    setIsPlaying(true);
    sceneStartTimeRef.current = Date.now();
    speakVoiceover(SCENES[0].voiceover);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (nextMuted) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      speakVoiceover(currentScene.voiceover);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="space-y-3 -m-2">
        {/* Video Player Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-pink-500 text-white animate-pulse">
              <Play className="w-3.5 h-3.5 fill-white" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              CampusConnect Official Product Trailer
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="purple" size="sm">
              HD 60FPS • Scene {currentSceneIdx + 1}/{SCENES.length}
            </Badge>
          </div>
        </div>

        {/* Video Screen / Canvas Viewport */}
        <div className="relative aspect-video w-full rounded-2xl bg-slate-950 text-white overflow-hidden shadow-2xl flex flex-col justify-between p-6 select-none border-2 border-slate-800">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-royalblue/20 via-purple-900/30 to-slate-950 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-royalblue/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-purple/15 rounded-full blur-3xl pointer-events-none" />

          {/* Scene 1: The Problem */}
          {currentScene.id === 1 && (
            <div className="relative z-10 my-auto text-center space-y-4 animate-in zoom-in-95 duration-300">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">
                ❌ THE COLLEGE STRUGGLE
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white max-w-lg mx-auto leading-tight">
                Notes lost in 50 chaotic WhatsApp groups?
              </h2>
              <div className="flex justify-center gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-red-900/40 text-xs text-red-300 flex items-center gap-2">
                  <span>Chat Spam</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-red-900/40 text-xs text-red-300 flex items-center gap-2">
                  <span>Expired PDF Links</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-red-900/40 text-xs text-red-300 flex items-center gap-2">
                  <span>Missed Exam Notices</span>
                </div>
              </div>
            </div>
          )}

          {/* Scene 2: The Solution */}
          {currentScene.id === 2 && (
            <div className="relative z-10 my-auto text-center space-y-4 animate-in zoom-in-95 duration-300">
              <Logo size="lg" className="justify-center text-white" />
              <h2 className="text-2xl sm:text-4xl font-black max-w-xl mx-auto leading-tight">
                Your Campus. Your Community. <br />
                <span className="bg-gradient-brand bg-clip-text text-transparent">Your Knowledge.</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                The all-in-one digital operating platform uniting students, faculty, clubs, and placement cells.
              </p>
            </div>
          )}

          {/* Scene 3: Notes & AI */}
          {currentScene.id === 3 && (
            <div className="relative z-10 my-auto space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <Badge variant="blue" size="sm">5-LEVEL NOTES SYSTEM</Badge>
                <span className="text-[11px] text-brand-electric font-mono">CSE → Sem 3 → Data Structures → Unit 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-blue-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-brand-electric font-bold text-xs">
                    <BookOpen className="w-4 h-4" /> In-App PDF Document Reader
                  </div>
                  <p className="text-xs font-bold text-white">AVL Trees & Balanced Search Invariants</p>
                  <p className="text-[10px] text-slate-400">Dr. Arvind Shenoy • Verified Material • 1,420 DLs</p>
                </div>

                <div className="p-4 rounded-xl bg-purple-950/60 border border-purple-500/40 space-y-2">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                    <Sparkles className="w-4 h-4 animate-spin" /> CampusAI Study Copilot
                  </div>
                  <p className="text-xs font-bold text-purple-200">✨ 3-Min Summary & 🎯 5-Question Exam Quiz</p>
                  <p className="text-[10px] text-purple-300">Instant formulas, complexities & practice checks</p>
                </div>
              </div>
            </div>
          )}

          {/* Scene 4: Hackathons, Clubs, Polls */}
          {currentScene.id === 4 && (
            <div className="relative z-10 my-auto space-y-3 animate-in fade-in duration-300">
              <Badge variant="pink" size="sm">CAMPUS LIFE & OPPORTUNITIES</Badge>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-pink-500/30 text-xs space-y-1">
                  <p className="font-bold text-pink-400 flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" /> HackCampus 2026
                  </p>
                  <p className="text-[11px] text-slate-300">1-Click Free Registration</p>
                  <span className="text-[10px] text-teal-400 font-mono">PASS #EVT-8924</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-brand-royalblue/30 text-xs space-y-1">
                  <p className="font-bold text-blue-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> Student Societies
                  </p>
                  <p className="text-[11px] text-slate-300">ACM, GDSC, Robotics Club</p>
                  <span className="text-[10px] text-slate-400">Join & Follow</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-teal-500/30 text-xs space-y-1">
                  <p className="font-bold text-teal-400 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" /> Live Campus Polls
                  </p>
                  <p className="text-[11px] text-slate-300">Real-time vote tallies</p>
                  <span className="text-[10px] text-teal-300 font-mono">C++: 58% • Python: 32%</span>
                </div>
              </div>
            </div>
          )}

          {/* Scene 5: Call to Action */}
          {currentScene.id === 5 && (
            <div className="relative z-10 my-auto text-center space-y-3 animate-in zoom-in-95 duration-300">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold border border-teal-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> PRODUCTION READY
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                Upgrade Your Campus Experience
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
                Built with React, TypeScript, Tailwind, and PostgreSQL.
              </p>
              <div className="pt-2">
                <Button variant="gradient" size="md" rightIcon={<ArrowRight className="w-4 h-4" />} onClick={onClose}>
                  Explore Live Demo
                </Button>
              </div>
            </div>
          )}

          {/* Subtitles & Captions Bar */}
          <div className="relative z-10 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-center text-xs font-semibold text-yellow-300 border border-white/10 shadow-lg">
            {currentScene.caption}
          </div>
        </div>

        {/* Video Player Controls Bar */}
        <div className="space-y-2 p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
          {/* Progress Timeline Scrubber */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                style={{
                  width: `${((currentSceneIdx + progressPercent / 100) / SCENES.length) * 100}%`
                }}
                className="h-full bg-gradient-brand transition-all duration-75"
              />
            </div>
            <span className="text-[10px] font-mono text-slate-500 shrink-0">
              00:{String(currentSceneIdx * 7).padStart(2, "0")} / 00:35
            </span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                leftIcon={isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                onClick={togglePlayPause}
              >
                {isPlaying ? "Pause" : "Play"}
              </Button>

              <button
                onClick={restartVideo}
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Restart Video"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title={isMuted ? "Unmute Voiceover" : "Mute Voiceover"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-500" /> : <Volume2 className="w-3.5 h-3.5 text-teal-600" />}
              </button>

              <span className="text-[11px] text-slate-400 hidden sm:inline">
                {isMuted ? "Audio Muted" : "Voiceover Active 🎙️"}
              </span>
            </div>

            {/* Scene Selectors */}
            <div className="flex items-center gap-1">
              {SCENES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentSceneIdx(idx);
                    setProgressPercent(0);
                    sceneStartTimeRef.current = Date.now();
                    speakVoiceover(s.voiceover);
                  }}
                  className={`w-5 h-5 rounded-full text-[10px] font-bold transition-all ${
                    currentSceneIdx === idx
                      ? "bg-brand-royalblue text-white scale-110 shadow-xs"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-500 hover:bg-slate-300"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};