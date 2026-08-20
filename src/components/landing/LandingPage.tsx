import React, { useState } from "react";
import { Logo } from "../common/Logo";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { PromoVideoModal } from "../promo/PromoVideoModal";
import {
  BookOpen,
  Megaphone,
  CalendarDays,
  Users,
  MessageSquare,
  Briefcase,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Download,
  Star,
  ChevronDown,
  Layers,
  Zap,
  Globe,
  Play
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onExploreDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onExploreDemo
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isPromoOpen, setIsPromoOpen] = useState<boolean>(false);

  const faqs = [
    {
      q: "What makes CampusConnect different from standard college portals?",
      a: "CampusConnect combines the organized note structure of Notion, the academic syllabus mapping of Google Classroom, and the vibrancy of a student community. Everything from handwritten semester notes to hackathon registrations and placement alerts is unified in one fast platform."
    },
    {
      q: "How does the Engineering Notes hierarchy work?",
      a: "Notes are indexed across 5 distinct layers: Department → Branch (CSE, AI/ML, ECE, ISE, MECH, CIVIL) → Semester (1 to 8) → Subject → Unit → Topic. Students can find exact unit notes in under 3 seconds without searching random WhatsApp chats."
    },
    {
      q: "Is there role-based access for Faculty and Club Admins?",
      a: "Yes! Faculty can publish verified syllabus materials and department circulars, Club Admins manage event registrations and posters, and University Admins oversee moderation queues and platform analytics."
    }
  ];

  return (
    <div className="min-h-screen bg-campus-bg dark:bg-campus-darkbg text-campus-text dark:text-campus-darktext">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 dark:bg-campus-darkcard/90 backdrop-blur-md border-b border-campus-border dark:border-campus-darkborder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo size="md" showTagline={true} />

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-brand-royalblue dark:hover:text-blue-400 transition-colors">Features</a>
            <a href="#notes" className="hover:text-brand-royalblue dark:hover:text-blue-400 transition-colors">Notes System</a>
            <a href="#why" className="hover:text-brand-royalblue dark:hover:text-blue-400 transition-colors">Why CampusConnect</a>
            <a href="#faq" className="hover:text-brand-royalblue dark:hover:text-blue-400 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Play className="w-3.5 h-3.5 fill-current text-pink-500" />}
              onClick={() => setIsPromoOpen(true)}
              className="hidden sm:inline-flex"
            >
              Watch Trailer
            </Button>
            <Button variant="ghost" size="sm" onClick={onGetStarted}>
              Sign In
            </Button>
            <Button variant="gradient" size="sm" onClick={onGetStarted}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-royalblue/10 dark:bg-brand-royalblue/20 border border-brand-royalblue/20 text-brand-royalblue dark:text-blue-300 text-xs font-bold tracking-wide uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Modern Digital University Operating System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Your Campus. <br />
            <span className="bg-gradient-brand bg-clip-text text-transparent">Connected.</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Notes, announcements, events, clubs, peer community, and placement opportunities — all organized in one student-first platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="gradient"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={onGetStarted}
              className="w-full sm:w-auto font-bold"
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Play className="w-4 h-4 text-pink-500 fill-pink-500" />}
              onClick={() => setIsPromoOpen(true)}
              className="w-full sm:w-auto font-bold"
            >
              Watch Video Trailer
            </Button>
          </div>

          {/* Interactive Live Mockup Showcase */}
          <div className="pt-10 max-w-5xl mx-auto">
            <div className="relative rounded-3xl border-4 border-white dark:border-slate-800 bg-white dark:bg-campus-darkcard shadow-2xl overflow-hidden p-4 sm:p-6 text-left">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-teal-400" />
                  <span className="text-xs font-bold text-slate-400 ml-2">campusconnect.app/dashboard</span>
                </div>
                <Badge variant="teal" size="sm">LIVE PREVIEW</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 space-y-2">
                  <div className="flex items-center gap-2 text-brand-royalblue font-bold text-xs">
                    <BookOpen className="w-4 h-4" /> Academic Notes
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Data Structures — Unit 3 AVL Trees</h4>
                  <p className="text-[11px] text-slate-500">Dr. Arvind Shenoy • 1,420 downloads</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40 space-y-2">
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-xs">
                    <Megaphone className="w-4 h-4" /> Official Notice
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">End-Semester Exam Form Deadline</h4>
                  <p className="text-[11px] text-slate-500">Dean of Academics • Aug 28 Submission</p>
                </div>

                <div className="p-4 rounded-2xl bg-pink-50/70 dark:bg-pink-950/40 border border-pink-100 dark:border-pink-900/40 space-y-2">
                  <div className="flex items-center gap-2 text-pink-600 font-bold text-xs">
                    <CalendarDays className="w-4 h-4" /> Hackathon 2026
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">HackCampus 36-Hr National Hack</h4>
                  <p className="text-[11px] text-slate-500">ACM Chapter • ₹2.5L Cash Pool</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why CampusConnect Section */}
      <section id="why" className="py-16 bg-white dark:bg-campus-darkcard border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Stop searching through random WhatsApp groups
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Find the right verified study resource, circular, or workshop for your semester in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-royalblue/10 text-brand-royalblue flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Structured Syllabus Hierarchy</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Branch → Semester → Subject → Unit → Topic. Never wonder which unit notes match your internal exam syllabus.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Verified Academic Materials</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Faculty verified notes, peer ratings, in-app PDF document previews, and moderation queues prevent spam.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Hyper-Personalized Feeds</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Log in as CSE Sem 3 and see CSE Sem 3 notes, notices, and relevant tech hackathons without manual filtering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="p-4 rounded-2xl bg-white dark:bg-campus-darkcard border border-slate-200 dark:border-slate-800 cursor-pointer"
              >
                <div className="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                </div>
                {openFaq === idx && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <Logo size="lg" showTagline={true} className="justify-center text-white" />
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            &ldquo;Your Campus. Your Community. Your Knowledge.&rdquo; — The Next-Gen Digital University Platform.
          </p>
          <div className="pt-4 flex justify-center gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">University Partner Inquiries</a>
          </div>
        </div>
      </footer>

      {/* Promotional Video Ad Player Modal */}
      <PromoVideoModal
        isOpen={isPromoOpen}
        onClose={() => setIsPromoOpen(false)}
      />
    </div>
  );
};