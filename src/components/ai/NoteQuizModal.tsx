import React, { useState, useEffect } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { AIStudyService, QuizQuestion } from "../../services/aiStudyService";
import { Sparkles, CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight } from "lucide-react";

interface NoteQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectName: string;
  unitNumber: number;
  topic: string;
}

export const NoteQuizModal: React.FC<NoteQuizModalProps> = ({
  isOpen,
  onClose,
  subjectName,
  unitNumber,
  topic
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setIsCompleted(false);
      setCurrentIndex(0);
      setSelectedAnswers({});
      AIStudyService.generateQuiz(subjectName, unitNumber, topic).then(data => {
        setQuestions(data);
        setIsLoading(false);
      });
    }
  }, [isOpen, subjectName, unitNumber, topic]);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];
  const userSelected = selectedAnswers[currentIndex];
  const hasAnswered = userSelected !== undefined;

  const handleSelectOption = (optIndex: number) => {
    if (hasAnswered) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optIndex }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  // Calculate score
  const score = questions.reduce((total, q, idx) => {
    return selectedAnswers[idx] === q.correctIndex ? total + 1 : total;
  }, 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-brand text-white shadow-soft">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                CampusAI Knowledge Check
              </h3>
              <p className="text-[11px] text-slate-500">
                {subjectName} • Unit {unitNumber}: {topic}
              </p>
            </div>
          </div>

          {!isCompleted && !isLoading && (
            <Badge variant="blue" size="sm">
              Question {currentIndex + 1} of {questions.length}
            </Badge>
          )}
        </div>

        {isLoading ? (
          <div className="py-12 text-center space-y-3">
            <div className="animate-spin w-8 h-8 border-4 border-brand-royalblue border-t-transparent rounded-full mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Generating practice questions from syllabus...</p>
          </div>
        ) : isCompleted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center mx-auto shadow-md">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Quiz Completed!
            </h3>

            <p className="text-2xl font-black bg-gradient-brand bg-clip-text text-transparent">
              {score} / {questions.length} Correct ({Math.round((score / questions.length) * 100)}%)
            </p>

            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {score >= 4
                ? "Excellent mastery of this unit! You're ready for term examinations."
                : "Good effort! Review the detailed answer explanations to strengthen your understanding."}
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<RotateCcw className="w-4 h-4" />}
                onClick={() => {
                  setIsCompleted(false);
                  setCurrentIndex(0);
                  setSelectedAnswers({});
                }}
              >
                Retry Quiz
              </Button>
              <Button variant="primary" size="sm" onClick={onClose}>
                Done & Close
              </Button>
            </div>
          </div>
        ) : (
          currentQ && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentIndex + 1}. {currentQ.question}
              </h4>

              <div className="space-y-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isChosen = userSelected === optIdx;
                  const isCorrect = optIdx === currentQ.correctIndex;

                  let optStyles =
                    "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 text-slate-800 dark:text-slate-200";

                  if (hasAnswered) {
                    if (isCorrect) {
                      optStyles = "border-teal-500 bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-200 font-bold";
                    } else if (isChosen && !isCorrect) {
                      optStyles = "border-red-500 bg-red-50 dark:bg-red-950/60 text-red-800 dark:text-red-200 font-bold";
                    }
                  }

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${optStyles}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />}
                      {hasAnswered && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                    </div>
                  );
                })}
              </div>

              {hasAnswered && (
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 space-y-1">
                  <p className="font-bold">Explanation:</p>
                  <p className="text-[11px] leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">
                  {hasAnswered ? "Click Continue to proceed" : "Select an option to verify"}
                </span>

                <Button
                  variant="primary"
                  size="sm"
                  disabled={!hasAnswered}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={handleNext}
                >
                  {currentIndex < questions.length - 1 ? "Next Question" : "View Final Score"}
                </Button>
              </div>
            </div>
          )
        )}
      </div>
    </Modal>
  );
};