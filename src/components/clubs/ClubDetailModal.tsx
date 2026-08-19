import React from "react";
import { Club } from "../../types";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { Users, Calendar, Check, Globe, Github, Linkedin, Instagram, Mail } from "lucide-react";

interface ClubDetailModalProps {
  club: Club | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToEvents?: () => void;
}

export const ClubDetailModal: React.FC<ClubDetailModalProps> = ({
  club,
  isOpen,
  onClose,
  onNavigateToEvents
}) => {
  const { currentUser } = useAuth();
  const { toggleJoinClub, toggleFollowClub } = useData();

  if (!club || !isOpen) return null;

  const isMember = currentUser?.joinedClubs?.includes(club.id);
  const isFollower = currentUser?.followedClubs?.includes(club.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="space-y-4">
        {/* Cover & Logo */}
        <div className="relative h-36 sm:h-44 -mx-6 -mt-6 bg-slate-200 overflow-hidden">
          <img
            src={club.coverImage}
            alt={club.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <div className="absolute bottom-4 left-6 flex items-end gap-3 text-white">
            <img
              src={club.logo}
              alt={club.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-lg bg-white"
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold">{club.name}</h2>
              <p className="text-xs text-slate-200 opacity-90">{club.tag} • Established {club.establishedYear}</p>
            </div>
          </div>
        </div>

        {/* Join/Follow Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span><strong>{club.memberIds.length}</strong> Registered Members</span>
            <span><strong>{club.followerIds.length}</strong> Followers</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={isMember ? "secondary" : "gradient"}
              size="sm"
              leftIcon={isMember ? <Check className="w-4 h-4 text-teal-600" /> : undefined}
              onClick={() => toggleJoinClub(club.id)}
            >
              {isMember ? "Member" : "Join Club"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleFollowClub(club.id)}
            >
              {isFollower ? "Following" : "Follow"}
            </Button>
          </div>
        </div>

        {/* About Club */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">About Society</h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {club.description}
          </p>
        </div>

        {/* Coordinators & Faculty Leads */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
            <p className="font-bold text-slate-400 text-[10px] uppercase mb-1">Faculty Coordinator</p>
            <p className="font-bold text-slate-900 dark:text-white">{club.facultyCoordinator.name}</p>
            <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
              <Mail className="w-3 h-3" /> {club.facultyCoordinator.email}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
            <p className="font-bold text-slate-400 text-[10px] uppercase mb-1">Student Coordinators</p>
            <div className="space-y-1">
              {club.studentCoordinators.map(sc => (
                <div key={sc.name} className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{sc.name}</span>
                  <span className="text-slate-400">{sc.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3 pt-2 text-slate-500 text-xs">
          {club.socialLinks.website && (
            <a href={club.socialLinks.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-brand-royalblue">
              <Globe className="w-3.5 h-3.5" /> Website
            </a>
          )}
          {club.socialLinks.github && (
            <a href={club.socialLinks.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-brand-royalblue">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
          )}
          {club.socialLinks.instagram && (
            <a href={club.socialLinks.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-pink-500">
              <Instagram className="w-3.5 h-3.5" /> Instagram
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
};