import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserRole } from "../types";
import { INITIAL_USERS } from "../data/users";
import { BRANCHES } from "../data/academicStructure";

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  activeRole: UserRole;
  isOnboarded: boolean;
  switchPersona: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => boolean;
  register: (data: {
    name: string;
    email: string;
    studentId: string;
    branch: string;
    semester: number;
    section: string;
    role: UserRole;
  }) => boolean;
  logout: () => void;
  completeOnboarding: (data: {
    branch: string;
    semester: number;
    section: string;
    interests: string[];
  }) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  hasRole: (...roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem("campusconnect_current_user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
    return INITIAL_USERS.student;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("campusconnect_auth_token") !== "logged_out";
  });

  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    return localStorage.getItem("campusconnect_onboarded") !== "false";
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("campusconnect_current_user", JSON.stringify(currentUser));
      localStorage.setItem("campusconnect_auth_token", "authenticated_session");
    } else {
      localStorage.removeItem("campusconnect_current_user");
      localStorage.setItem("campusconnect_auth_token", "logged_out");
    }
  }, [currentUser]);

  const switchPersona = (role: UserRole) => {
    const persona = INITIAL_USERS[role] || INITIAL_USERS.student;
    setCurrentUser(persona);
    setIsAuthenticated(true);
  };

  const login = (email: string, targetRole: UserRole = "student") => {
    // Find matching user or fallback to persona
    const foundUser = Object.values(INITIAL_USERS).find(u => u.email.toLowerCase() === email.toLowerCase());
    const userToSet = foundUser || INITIAL_USERS[targetRole] || INITIAL_USERS.student;
    setCurrentUser(userToSet);
    setIsAuthenticated(true);
    return true;
  };

  const register = (data: {
    name: string;
    email: string;
    studentId: string;
    branch: string;
    semester: number;
    section: string;
    role: UserRole;
  }) => {
    const branchInfo = BRANCHES.find(b => b.id === data.branch.toLowerCase()) || BRANCHES[0];
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: data.name,
      email: data.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}`,
      role: data.role,
      branch: data.branch,
      branchName: branchInfo.name,
      semester: data.semester,
      section: data.section,
      studentId: data.studentId,
      department: branchInfo.department,
      interests: ["Coding", "AI/ML", "Hackathons"],
      skills: ["Problem Solving"],
      joinedClubs: ["club_acm"],
      followedClubs: ["club_acm", "club_gdsc"],
      bookmarkedNoteIds: [],
      bookmarkedAnnouncementIds: [],
      bookmarkedEventIds: [],
      bookmarkedPlacementIds: [],
      bookmarkedPostIds: [],
      registeredEventIds: [],
      notificationsEnabled: true
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setIsOnboarded(false);
    localStorage.setItem("campusconnect_onboarded", "false");
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.setItem("campusconnect_auth_token", "logged_out");
  };

  const completeOnboarding = (data: {
    branch: string;
    semester: number;
    section: string;
    interests: string[];
  }) => {
    if (!currentUser) return;
    const branchInfo = BRANCHES.find(b => b.id === data.branch.toLowerCase()) || BRANCHES[0];
    const updated = {
      ...currentUser,
      branch: data.branch,
      branchName: branchInfo.name,
      semester: data.semester,
      section: data.section,
      interests: data.interests
    };
    setCurrentUser(updated);
    setIsOnboarded(true);
    localStorage.setItem("campusconnect_onboarded", "true");
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    setCurrentUser(prev => (prev ? { ...prev, ...updates } : null));
  };

  const hasRole = (...roles: UserRole[]): boolean => {
    if (!currentUser) return false;
    return roles.includes(currentUser.role);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        activeRole: currentUser?.role || "student",
        isOnboarded,
        switchPersona,
        login,
        register,
        logout,
        completeOnboarding,
        updateProfile,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};