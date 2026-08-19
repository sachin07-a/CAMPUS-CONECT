import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { useTheme } from "../../context/ThemeContext";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import {
  User,
  Mail,
  Hash,
  BookOpen,
  GraduationCap,
  Calendar,
  Settings,
  Bell,
  Sun,
  Moon,
  Sparkles,
  Award,
  CheckCircle2
} from "lucide-react";

export const StudentProfile: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const { notes, events } = useData();
  const { theme, toggleTheme } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");

  if (!currentUser) return null;

  const uploadedNotes = notes.filter(n => n.uploaderId === currentUser.id);
  const registeredEvents = events.filter(e => currentUser.registeredEventIds?.includes(e.id));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, bio, phone });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Profile Header Banner */}
      <Card className="relative overflow-hidden p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-white dark:border-slate-800 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {currentUser.name}
                </h2>
                <Badge variant="blue" size="sm">
                  {currentUser.role.toUpperCase().replace("_", " ")}
                </Badge>
              </div>

              <p className="text-xs font-semibold text-brand-royalblue dark:text-blue-400 mt-1">
                {currentUser.branchName} • Section {currentUser.section}
              </p>

              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1.5 flex-wrap">
                <span className="flex items-center gap-1 font-mono">
                  <Hash className="w-3.5 h-3.5" /> {currentUser.studentId}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> {currentUser.email}
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        {currentUser.bio && !isEditing && (
          <p className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {currentUser.bio}
          </p>
        )}

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSave} className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Bio / Headline</label>
              <textarea
                rows={2}
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="submit" size="sm" variant="primary">Save Changes</Button>
            </div>
          </form>
        )}
      </Card>

      {/* Academic Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <Card padding="sm" className="text-center">
          <p className="text-xl font-extrabold text-brand-royalblue dark:text-blue-400">
            {currentUser.cgpa || 9.14}
          </p>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Cumulative CGPA</p>
        </Card>

        <Card padding="sm" className="text-center">
          <p className="text-xl font-extrabold text-purple-600 dark:text-purple-400">
            {uploadedNotes.length}
          </p>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Uploaded Notes</p>
        </Card>

        <Card padding="sm" className="text-center">
          <p className="text-xl font-extrabold text-pink-600 dark:text-pink-400">
            {registeredEvents.length}
          </p>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Events Booked</p>
        </Card>

        <Card padding="sm" className="text-center">
          <p className="text-xl font-extrabold text-teal-600 dark:text-teal-400">
            {currentUser.joinedClubs?.length || 0}
          </p>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Clubs Joined</p>
        </Card>
      </div>

      {/* Skills & Interests Tags */}
      <Card className="space-y-4">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technical Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {currentUser.skills?.map(s => (
              <Badge key={s} variant="blue" size="md">{s}</Badge>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Personalized Campus Interests</h4>
          <div className="flex flex-wrap gap-1.5">
            {currentUser.interests?.map(i => (
              <Badge key={i} variant="purple" size="md">{i}</Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Preferences & Settings */}
      <Card className="space-y-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-4 h-4 text-slate-500" />
          <span>Platform Preferences</span>
        </h4>

        <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">Dark Mode</p>
              <p className="text-slate-400">Switch between light and high-contrast dark theme</p>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
            >
              {theme === "dark" ? "Dark Theme 🌙" : "Light Theme ☀️"}
            </button>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">Email & Push Notifications</p>
              <p className="text-slate-400">Receive exam alerts and note approvals</p>
            </div>
            <input
              type="checkbox"
              defaultChecked={true}
              className="rounded text-brand-royalblue focus:ring-brand-royalblue w-4 h-4"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};