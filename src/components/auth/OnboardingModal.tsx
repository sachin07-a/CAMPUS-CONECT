import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Logo } from "../common/Logo";
import { useAuth } from "../../context/AuthContext";
import { BRANCHES } from "../../data/academicStructure";
import { Check, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INTERESTS_OPTIONS = [
  "Coding",
  "AI/ML",
  "Robotics",
  "Entrepreneurship",
  "Cultural",
  "Sports",
  "Photography",
  "Music",
  "Literary",
  "Hackathons",
  "Research",
  "Placement preparation"
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, completeOnboarding } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [selectedBranch, setSelectedBranch] = useState<string>(currentUser?.branch || "cse");
  const [selectedSemester, setSelectedSemester] = useState<number>(currentUser?.semester || 3);
  const [selectedSection, setSelectedSection] = useState<string>(currentUser?.section || "B");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(currentUser?.interests || ["Coding", "AI/ML"]);

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleFinish = () => {
    completeOnboarding({
      branch: selectedBranch,
      semester: selectedSemester,
      section: selectedSection,
      interests: selectedInterests
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} size="lg">
      <div className="p-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <Logo size="md" />
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
            <span>Step {step} of 4</span>
          </div>
        </div>

        {/* Step 1: Branch */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                What is your engineering branch?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                We will prioritize syllabus notes, faculty updates, and department notices tailored to your curriculum.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {BRANCHES.map(b => {
                const isSelected = selectedBranch === b.id;
                return (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBranch(b.id)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-brand-royalblue bg-brand-royalblue/5 dark:bg-brand-royalblue/10 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-brand-royalblue dark:text-blue-400">
                        {b.code}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-brand-royalblue" />}
                    </div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1">
                      {b.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Semester */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Which semester are you in?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                This enables one-click filtering for current semester core subjects and exams.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => {
                const isSelected = selectedSemester === sem;
                return (
                  <button
                    key={sem}
                    type="button"
                    onClick={() => setSelectedSemester(sem)}
                    className={`py-5 rounded-2xl border-2 text-center transition-all ${
                      isSelected
                        ? "border-brand-royalblue bg-brand-royalblue text-white shadow-glow"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    <p className="text-xl font-extrabold">{sem}</p>
                    <p className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Semester</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Section */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Which section are you enrolled in?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                For lab batches, assignment deadlines, and section-specific announcements.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {["A", "B", "C", "D"].map(sec => {
                const isSelected = selectedSection === sec;
                return (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setSelectedSection(sec)}
                    className={`py-5 rounded-2xl border-2 text-center transition-all ${
                      isSelected
                        ? "border-brand-royalblue bg-brand-royalblue text-white shadow-glow"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    <p className="text-2xl font-black">{sec}</p>
                    <p className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Section</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Interests */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Which areas are you interested in?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select topic tags to customize your recommended hackathons, workshops, clubs, and peer discussions.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {INTERESTS_OPTIONS.map(interest => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                      isSelected
                        ? "border-brand-royalblue bg-brand-royalblue/10 text-brand-royalblue dark:text-blue-300 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {isSelected ? `✓ ${interest}` : `+ ${interest}`}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
          {step > 1 ? (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          ) : <div />}

          {step < 4 ? (
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setStep(step + 1)}
            >
              Next Step
            </Button>
          ) : (
            <Button
              variant="gradient"
              size="md"
              leftIcon={<Sparkles className="w-4 h-4" />}
              onClick={handleFinish}
            >
              Finish & Enter CampusConnect
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};