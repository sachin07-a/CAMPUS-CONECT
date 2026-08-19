import React, { useState } from "react";
import { AIStudyService } from "../../services/aiStudyService";
import { Sparkles, MessageSquare, X, Send, Bot, BookOpen, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "../common/Button";

export const CampusAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([
    {
      role: "ai",
      text: "👋 Hi! I am CampusAI, your 24/7 academic companion. Ask me anything about Data Structures, DBMS normalization, OS process synchronization, or exam revision!"
    }
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userQ = query;
    setQuery("");
    setMessages(prev => [...prev, { role: "user", text: userQ }]);
    setIsLoading(true);

    const answer = await AIStudyService.solveDoubt(userQ);
    setMessages(prev => [...prev, { role: "ai", text: answer }]);
    setIsLoading(false);
  };

  const handleQuickPrompt = (prompt: string) => {
    setQuery(prompt);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-20 lg:bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-brand hover:opacity-95 text-white font-bold text-xs shadow-glow hover:scale-105 transition-all select-none"
        >
          <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
          <span className="hidden sm:inline">Ask CampusAI</span>
        </button>
      </div>

      {/* Floating Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 lg:bottom-20 right-4 sm:right-6 z-50 w-full max-w-sm sm:max-w-md bg-white dark:bg-campus-darkcard border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-brand text-white">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold">CampusAI Study Helper</h4>
                <p className="text-[10px] text-blue-100">RVCE Syllabus & Exam Knowledge Engine</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "ai" && (
                  <div className="w-6 h-6 rounded-full bg-gradient-brand flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] whitespace-pre-line leading-relaxed ${
                    m.role === "user"
                      ? "bg-brand-royalblue text-white rounded-br-none"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200/60 dark:border-slate-700"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-brand-royalblue" />
                <span>CampusAI is thinking...</span>
              </div>
            )}
          </div>

          {/* Quick Syllabus Prompts */}
          <div className="p-2 px-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
            {[
              "Explain AVL Tree Rotations",
              "What is BCNF in DBMS?",
              "Banker's Algorithm steps"
            ].map(p => (
              <button
                key={p}
                onClick={() => handleQuickPrompt(p)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-royalblue text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-campus-darkcard border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ask an academic question..."
              className="flex-1 px-3.5 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-royalblue/30"
            />
            <Button type="submit" size="sm" variant="gradient" disabled={isLoading}>
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};