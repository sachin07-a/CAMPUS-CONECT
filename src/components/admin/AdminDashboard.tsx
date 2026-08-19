import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { BRANCHES, SUBJECTS } from "../../data/academicStructure";
import { INITIAL_USERS } from "../../data/users";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { Tabs } from "../common/Tabs";
import { EmptyState } from "../common/EmptyState";
import {
  ShieldAlert,
  Users,
  BookOpen,
  FileCheck,
  Download,
  Megaphone,
  Calendar,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Layers,
  History,
  TrendingUp,
  BarChart2,
  FileText
} from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const {
    notes,
    announcements,
    events,
    clubs,
    communityPosts,
    auditLogs,
    approveNote,
    rejectNote,
    dismissReport,
    removeReportedPost
  } = useData();

  const [activeTab, setActiveTab] = useState<string>("moderation");

  const pendingNotes = notes.filter(n => n.status === "pending");
  const approvedNotes = notes.filter(n => n.status === "approved");
  const flaggedPosts = communityPosts.filter(p => p.isFlagged);
  const totalDownloads = notes.reduce((sum, n) => sum + n.downloads, 0);

  const tabs = [
    { id: "moderation", label: "Notes Moderation", badge: pendingNotes.length, icon: <FileCheck className="w-3.5 h-3.5" /> },
    { id: "analytics", label: "Analytics & Trends", icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: "users", label: "User Directory", icon: <Users className="w-3.5 h-3.5" /> },
    { id: "structure", label: "Academic Structure", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "reports", label: "Flagged Content", badge: flaggedPosts.length, icon: <AlertTriangle className="w-3.5 h-3.5" /> },
    { id: "audit", label: "System Audit Logs", icon: <History className="w-3.5 h-3.5" /> }
  ];

  const handleApprove = (id: string) => {
    approveNote(id);
  };

  const handleReject = (id: string) => {
    const reason = prompt("Enter feedback / revision reason for the student:", "Incomplete unit coverage or illegible pages.");
    if (reason) {
      rejectNote(id, reason);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-brand-royalblue dark:text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              University Admin Control Center
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Moderation queue, syllabus repository management, platform metrics, and user governance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="teal" size="md">Admin Authenticated</Badge>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <Card padding="sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Students</p>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">3,420</p>
        </Card>

        <Card padding="sm">
          <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Pending Approvals</p>
          <p className="text-xl font-extrabold text-amber-500 mt-1">{pendingNotes.length}</p>
        </Card>

        <Card padding="sm">
          <p className="text-[10px] font-bold text-brand-royalblue dark:text-blue-400 uppercase tracking-wider">Verified Notes</p>
          <p className="text-xl font-extrabold text-brand-royalblue dark:text-blue-400 mt-1">{approvedNotes.length}</p>
        </Card>

        <Card padding="sm">
          <p className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">Total Downloads</p>
          <p className="text-xl font-extrabold text-teal-600 mt-1">{totalDownloads.toLocaleString()}</p>
        </Card>

        <Card padding="sm">
          <p className="text-[10px] font-bold text-pink-500 uppercase tracking-wider">Events Live</p>
          <p className="text-xl font-extrabold text-pink-500 mt-1">{events.length}</p>
        </Card>

        <Card padding="sm">
          <p className="text-[10px] font-bold text-purple-500 uppercase tracking-wider">Active Clubs</p>
          <p className="text-xl font-extrabold text-purple-500 mt-1">{clubs.length}</p>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pill"
      />

      {/* Tab 1: Moderation Queue */}
      {activeTab === "moderation" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Pending Student Uploads ({pendingNotes.length})
            </h3>
            <span className="text-xs text-slate-400">Review file contents before publishing to public repository</span>
          </div>

          {pendingNotes.length === 0 ? (
            <EmptyState
              icon={<CheckCircle2 className="w-10 h-10 text-teal-500" />}
              title="Moderation queue is all caught up!"
              description="No pending student study materials awaiting review."
            />
          ) : (
            <div className="space-y-3">
              {pendingNotes.map(n => (
                <Card key={n.id} className="border-amber-200 dark:border-amber-900/60 bg-amber-50/10 dark:bg-amber-950/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="gold" size="sm">PENDING REVIEW</Badge>
                        <span className="text-xs font-bold text-brand-royalblue dark:text-blue-400">
                          {n.branchName} • Sem {n.semester} • {n.subjectName} (Unit {n.unitNumber})
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {n.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{n.description}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                        <span>Submitted by: <strong>{n.uploaderName}</strong> ({n.uploaderRole})</span>
                        <span>•</span>
                        <span className="uppercase">{n.fileType} • {n.fileSize}</span>
                        <span>•</span>
                        <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="success"
                        size="sm"
                        leftIcon={<CheckCircle2 className="w-4 h-4" />}
                        onClick={() => handleApprove(n.id)}
                      >
                        Approve & Publish
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                        leftIcon={<XCircle className="w-4 h-4" />}
                        onClick={() => handleReject(n.id)}
                      >
                        Request Changes
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Analytics & Trends */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-royalblue" />
              <span>Daily Active Students (Last 7 Days)</span>
            </h4>
            <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
              {[
                { day: "Mon", count: 2420 },
                { day: "Tue", count: 2890 },
                { day: "Wed", count: 3120 },
                { day: "Thu", count: 3450 },
                { day: "Fri", count: 3310 },
                { day: "Sat", count: 2100 },
                { day: "Sun", count: 1840 }
              ].map(d => {
                const heightPercent = Math.round((d.count / 3500) * 100);
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] font-mono text-slate-400">{d.count}</span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-brand rounded-t-lg transition-all hover:opacity-85"
                    />
                    <span className="text-[11px] font-bold text-slate-500">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-purple-500" />
              <span>Repository Downloads by Branch</span>
            </h4>
            <div className="space-y-2.5 pt-2">
              {[
                { name: "Computer Science & Eng (CSE)", count: "1,840 DLs", pct: 85, color: "bg-blue-500" },
                { name: "Artificial Intelligence (AI/ML)", count: "1,120 DLs", pct: 60, color: "bg-purple-500" },
                { name: "Information Science (ISE)", count: "890 DLs", pct: 45, color: "bg-teal-500" },
                { name: "Electronics & Comm (ECE)", count: "650 DLs", pct: 35, color: "bg-amber-500" },
              ].map(b => (
                <div key={b.name} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
                    <span>{b.name}</span>
                    <span>{b.count}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div style={{ width: `${b.pct}%` }} className={`h-full ${b.color} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Tab 3: User Directory */}
      {activeTab === "users" && (
        <Card className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">User</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Branch & Sem</th>
                <th className="py-3 px-3">Student/Faculty ID</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {Object.values(INITIAL_USERS).map(u => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 flex items-center gap-2">
                    <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                      <p className="text-[10px] text-slate-400">{u.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={u.role === "admin" ? "gold" : u.role === "faculty" ? "purple" : "blue"} size="sm">
                      {u.role.toUpperCase().replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 font-medium">
                    {u.branch.toUpperCase()} • Sem {u.semester || "All"}
                  </td>
                  <td className="py-3 px-3 font-mono">{u.studentId}</td>
                  <td className="py-3 px-3 text-teal-600 font-bold">Active</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* Tab 4: Academic Structure */}
      {activeTab === "structure" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRANCHES.map(b => (
              <Card key={b.id} padding="sm" className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-brand-royalblue dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                    {b.code}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">8 Semesters</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{b.name}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{b.description}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Flagged Content */}
      {activeTab === "reports" && (
        <div className="space-y-3">
          {flaggedPosts.length === 0 ? (
            <EmptyState
              icon={<CheckCircle2 className="w-10 h-10 text-teal-500" />}
              title="No flagged content"
              description="Community feed is clean and compliant with campus community guidelines."
            />
          ) : (
            flaggedPosts.map(p => (
              <Card key={p.id} className="border-red-200 dark:border-red-900/60 bg-red-50/10">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <Badge variant="red" size="sm">FLAGGED CONTENT</Badge>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{p.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">{p.content}</p>
                    <p className="text-xs text-red-500 font-semibold pt-1">Reason: {p.flagReason}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm" onClick={() => dismissReport(p.id)}>
                      Dismiss
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => removeReportedPost(p.id)}>
                      Remove Post
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Tab 6: Audit Logs */}
      {activeTab === "audit" && (
        <Card className="divide-y divide-slate-100 dark:divide-slate-800">
          <div className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Real-Time System Event Stream
          </div>
          {auditLogs.length === 0 ? (
            <p className="p-6 text-center text-xs text-slate-400">
              Audit log will record live actions performed during this active session.
            </p>
          ) : (
            auditLogs.map(l => (
              <div key={l.id} className="p-3 text-xs flex items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{l.action}</span>
                  <span className="text-slate-500 ml-2">[{l.target}]</span>
                  <p className="text-[11px] text-slate-400">{l.details} • By {l.performedBy}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(l.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
        </Card>
      )}
    </div>
  );
};