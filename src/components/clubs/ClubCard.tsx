import React from "react";
import { Club } from "../../types";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { Users, UserPlus, Check, Calendar, ExternalLink } from "lucide-react";

interface ClubCardProps {
  club: Club;
  onSelect: (club: Club) => void;
}

export const ClubCard: React.FC<ClubCardProps> = ({ club, onSelect }) => {
  const { currentUser } = useAuth();
  const { toggleJoinClub, toggleFollowClub } = useData();

  const isMember = currentUser?.joinedClubs?.includes(club.id);
  const isFollower = currentUser?.followedClubs?.includes(club.id);

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleJoinClub(club.id);
  };

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFollowClub(club.id);
  };

  return (
    <Card
      hoverEffect={true}
      padding="none"
      className="cursor-pointer overflow-hidden flex flex-col justify-between group"
      onClick={() => onSelect(club)}
    >
      <div>
        {/* Cover Image */}
        <div className="relative h-28 w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <img
            src={club.coverImage}
            alt={club.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <Badge variant="blue" size="sm" className="absolute top-2.5 right-2.5 bg-white/90 text-slate-900 shadow-sm">
            {club.tag}
          </Badge>
        </div>

        {/* Club Info */}
        <div className="p-4 pt-3">
          <div className="flex items-center gap-3 mb-2 -mt-7 relative z-10">
            <img
              src={club.logo}
              alt={club.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-md bg-white"
            />
            <div className="min-w-0 pt-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-royalblue dark:group-hover:text-blue-400 transition-colors truncate">
                {club.name}
              </h4>
              <p className="text-[11px] text-slate-400 font-medium">Est. {club.establishedYear}</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
            {club.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-brand-royalblue" />
              <strong>{club.memberIds.length}</strong> members
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-pink-500" />
              <strong>{club.upcomingEventsCount}</strong> events
            </span>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="p-4 pt-0 flex items-center gap-2">
        <Button
          variant={isMember ? "secondary" : "primary"}
          size="sm"
          className="flex-1"
          leftIcon={isMember ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <UserPlus className="w-3.5 h-3.5" />}
          onClick={handleJoin}
        >
          {isMember ? "Joined" : "Join Club"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleFollow}
        >
          {isFollower ? "Following" : "Follow"}
        </Button>
      </div>
    </Card>
  );
};