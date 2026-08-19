import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Logo } from "../common/Logo";
import { useAuth } from "../../context/AuthContext";
import { BRANCHES } from "../../data/academicStructure";
import { UserRole } from "../../types";
import { Mail, Lock, User, Hash, CheckCircle2, AlertCircle } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "login"
}) => {
  const [mode, setMode] = useState<"login" | "register" | "forgot">(initialMode);
  const { login, register } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState("sachin.v@rvce.edu.in");
  const [loginPassword, setLoginPassword] = useState("password123");
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regStudentId, setRegStudentId] = useState("");
  const [regBranch, setRegBranch] = useState("cse");
  const [regSemester, setRegSemester] = useState(3);
  const [regSection, setRegSection] = useState("A");
  const [regRole, setRegRole] = useState<UserRole>("student");
  
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!loginEmail) {
      setError("Please enter your university email address.");
      return;
    }
    const success = login(loginEmail, selectedRole);
    if (success) {
      onClose();
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!regName || !regEmail || !regStudentId) {
      setError("Please fill in all mandatory registration fields.");
      return;
    }
    if (!regEmail.includes("@")) {
      setError("Please enter a valid university email domain.");
      return;
    }
    const success = register({
      name: regName,
      email: regEmail,
      studentId: regStudentId,
      branch: regBranch,
      semester: Number(regSemester),
      section: regSection,
      role: regRole
    });
    if (success) {
      onClose();
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("Password reset link has been dispatched to your university email.");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <Logo size="lg" showTagline={false} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {mode === "login" && "Welcome to CampusConnect"}
          {mode === "register" && "Create Student/Faculty Account"}
          {mode === "forgot" && "Reset Password"}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {mode === "login" && "Sign in with your university credentials to continue."}
          {mode === "register" && "Join your campus digital knowledge and community portal."}
          {mode === "forgot" && "Enter your email to receive recovery instructions."}
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs border border-red-200 dark:border-red-800">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 text-xs border border-teal-200 dark:border-teal-800">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Login Form */}
      {mode === "login" && (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              University Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="name@rvce.edu.in"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-royalblue/30"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-[11px] font-semibold text-brand-royalblue hover:underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-royalblue/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Sign In Role
            </label>
            <div className="grid grid-cols-4 gap-1.5 text-xs">
              {(["student", "faculty", "club_admin", "admin"] as UserRole[]).map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold capitalize transition-all border ${
                    selectedRole === r
                      ? "bg-brand-royalblue text-white border-brand-royalblue shadow-xs"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {r.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" variant="gradient" className="w-full mt-2" size="md">
            Sign In to CampusConnect
          </Button>

          <div className="pt-3 text-center text-xs text-slate-500">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("register")}
              className="font-bold text-brand-royalblue hover:underline"
            >
              Register now
            </button>
          </div>
        </form>
      )}

      {/* Register Form */}
      {mode === "register" && (
        <form onSubmit={handleRegister} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={regName}
                onChange={e => setRegName(e.target.value)}
                placeholder="Sachin Verma"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                University Email
              </label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                placeholder="sachin@rvce.edu.in"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Student / Faculty ID
              </label>
              <input
                type="text"
                required
                value={regStudentId}
                onChange={e => setRegStudentId(e.target.value)}
                placeholder="1RV22CS142"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Branch</label>
              <select
                value={regBranch}
                onChange={e => setRegBranch(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              >
                {BRANCHES.map(b => (
                  <option key={b.id} value={b.id}>{b.code}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Semester</label>
              <select
                value={regSemester}
                onChange={e => setRegSemester(Number(e.target.value))}
                className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                  <option key={s} value={s}>Sem {s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Section</label>
              <input
                type="text"
                value={regSection}
                onChange={e => setRegSection(e.target.value)}
                placeholder="A"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <Button type="submit" variant="gradient" className="w-full mt-3" size="md">
            Complete Registration
          </Button>

          <div className="pt-2 text-center text-xs text-slate-500">
            Already registered?{" "}
            <button
              type="button"
              onClick={() => setMode("login")}
              className="font-bold text-brand-royalblue hover:underline"
            >
              Sign in
            </button>
          </div>
        </form>
      )}

      {/* Forgot Password */}
      {mode === "forgot" && (
        <form onSubmit={handleForgot} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Registered University Email
            </label>
            <input
              type="email"
              required
              placeholder="name@rvce.edu.in"
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white"
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Send Reset Link
          </Button>
          <div className="text-center text-xs">
            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-slate-500 hover:text-brand-royalblue"
            >
              Back to login
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};