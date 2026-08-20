import React, { useState, useRef } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { BRANCHES, SUBJECTS } from "../../data/academicStructure";
import { NoteFileType } from "../../types";
import { StorageService } from "../../services/storageService";
import { UploadCloud, FileText, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, FolderOpen } from "lucide-react";

interface NoteUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NoteUploadModal: React.FC<NoteUploadModalProps> = ({
  isOpen,
  onClose
}) => {
  const { currentUser } = useAuth();
  const { addNote } = useData();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<number>(1);
  const [selectedFileObj, setSelectedFileObj] = useState<File | null>(null);
  const [file, setFile] = useState<{ name: string; size: string; type: NoteFileType; url?: string } | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [branch, setBranch] = useState(currentUser?.branch || "cse");
  const [semester, setSemester] = useState(currentUser?.semester || 3);
  const [subjectId, setSubjectId] = useState("cs301");
  const [unitNumber, setUnitNumber] = useState(1);
  const [topic, setTopic] = useState("");
  const [tagsInput, setTagsInput] = useState("Notes, Syllabus, Exam Prep");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const availableSubjects = SUBJECTS.filter(
    s => s.branchId.toLowerCase() === branch.toLowerCase() && s.semester === Number(semester)
  );

  const currentSubject = availableSubjects.find(s => s.id === subjectId) || availableSubjects[0] || SUBJECTS[0];

  const processFile = (rawFile: File) => {
    setSelectedFileObj(rawFile);
    const ext = rawFile.name.split(".").pop()?.toLowerCase() || "pdf";
    const validTypes: Record<string, NoteFileType> = {
      pdf: "pdf",
      ppt: "pptx",
      pptx: "pptx",
      doc: "docx",
      docx: "docx",
      zip: "zip"
    };

    const sizeInMB = rawFile.size / (1024 * 1024);
    const formattedSize = sizeInMB >= 1 ? `${sizeInMB.toFixed(1)} MB` : `${Math.round(rawFile.size / 1024)} KB`;
    const objectUrl = URL.createObjectURL(rawFile);

    setFile({
      name: rawFile.name,
      size: formattedSize,
      type: validTypes[ext] || "pdf",
      url: objectUrl
    });

    if (!title) {
      const cleanTitle = rawFile.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
      setTitle(cleanTitle);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);
    const branchObj = BRANCHES.find(b => b.id === branch) || BRANCHES[0];

    let uploadedUrl = file?.url || "#";

    // If a real file is attached, try upload through storage service
    if (selectedFileObj) {
      try {
        const uploadResult = await StorageService.uploadNoteFile(selectedFileObj);
        uploadedUrl = uploadResult.url;
      } catch (err) {
        console.warn("Using local object url fallback:", err);
      }
    }

    addNote({
      title: title || `${currentSubject?.name || "Subject"} Unit ${unitNumber} Notes`,
      description: description || `Comprehensive handwritten and structured notes covering unit ${unitNumber} topics.`,
      branchId: branch,
      branchName: branchObj.name,
      semester: Number(semester),
      subjectId: currentSubject?.id || "cs301",
      subjectName: currentSubject?.name || "Core Subject",
      unitNumber: Number(unitNumber),
      topic: topic || `Unit ${unitNumber} Syllabus Coverage`,
      tags: tags.length > 0 ? tags : ["Notes", "Syllabus"],
      fileUrl: uploadedUrl,
      fileType: file?.type || "pdf",
      fileSize: file?.size || "3.5 MB",
      uploaderId: currentUser?.id || "usr_student_1",
      uploaderName: currentUser?.name || "Student",
      uploaderRole: currentUser?.role || "student",
      uploaderAvatar: currentUser?.avatar,
      status: currentUser?.role === "faculty" || currentUser?.role === "admin" ? "approved" : "pending"
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setStep(1);
    setIsSubmitted(false);
    setSelectedFileObj(null);
    setFile(null);
    setTitle("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <div className="p-1">
        {/* Hidden File Input connected to user's device */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.ppt,.pptx,.doc,.docx,.zip"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Upload Study Resource
            </h3>
            <p className="text-xs text-slate-500">
              Share lecture notes, question banks, or slides from your device
            </p>
          </div>
          <span className="text-xs font-bold text-brand-royalblue bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-full">
            Step {step} of 3
          </span>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {currentUser?.role === "faculty" || currentUser?.role === "admin"
                ? "Resource Successfully Published!"
                : "Resource Submitted for Moderation!"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              {currentUser?.role === "faculty" || currentUser?.role === "admin"
                ? "Your notes are now live in the verified academic repository for all students."
                : "Your submission has been queued in the Admin Moderation Queue for verification."}
            </p>
            <div className="pt-4">
              <Button variant="primary" onClick={handleClose}>
                Done & Return to Notes
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in">
                {/* Drag and Drop & Native File Browser Card */}
                <div
                  onDragOver={e => e.preventDefault()}
                  onDrop={handleFileDrop}
                  onClick={handleBrowseClick}
                  className="border-2 border-dashed border-brand-royalblue/40 hover:border-brand-royalblue rounded-2xl p-8 text-center bg-blue-50/20 dark:bg-slate-800/40 hover:bg-blue-50/40 dark:hover:bg-slate-800/60 transition-all cursor-pointer group"
                >
                  <div className="p-3.5 rounded-2xl bg-brand-royalblue/10 text-brand-royalblue dark:text-blue-400 w-14 h-14 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    Click to browse files from your computer, or drag & drop here
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports PDF, PPTX, DOCX, ZIP (Up to 50MB)
                  </p>

                  <div className="pt-4 flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      leftIcon={<FolderOpen className="w-4 h-4" />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBrowseClick();
                      }}
                    >
                      Choose File from Device
                    </Button>
                  </div>
                </div>

                {/* Selected File Details */}
                {file ? (
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs animate-in fade-in">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className="w-5 h-5 text-teal-600 shrink-0" />
                      <div className="truncate">
                        <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{file.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase">{file.type} • {file.size}</p>
                      </div>
                    </div>
                    <span className="text-teal-600 font-bold shrink-0 ml-2">✓ Selected</span>
                  </div>
                ) : (
                  <p className="text-center text-xs text-slate-400">
                    No file selected yet. Click the box above to choose a document from your computer.
                  </p>
                )}

                <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    variant="primary"
                    disabled={!file}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    onClick={() => setStep(2)}
                  >
                    Continue to Details
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3.5 animate-in fade-in">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Resource Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Complete AVL Trees & BST Handwritten Notes"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Branch</label>
                    <select
                      value={branch}
                      onChange={e => setBranch(e.target.value)}
                      className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                    >
                      {BRANCHES.map(b => (
                        <option key={b.id} value={b.id}>{b.code}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Semester</label>
                    <select
                      value={semester}
                      onChange={e => setSemester(Number(e.target.value))}
                      className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                        <option key={s} value={s}>Sem {s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                    <select
                      value={subjectId}
                      onChange={e => setSubjectId(e.target.value)}
                      className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                    >
                      {availableSubjects.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                      ))}
                      {availableSubjects.length === 0 && (
                        <option value="cs301">Data Structures & Algorithms</option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Unit Number</label>
                    <select
                      value={unitNumber}
                      onChange={e => setUnitNumber(Number(e.target.value))}
                      className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                    >
                      {[1, 2, 3, 4, 5].map(u => (
                        <option key={u} value={u}>Unit {u}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Specific Topic</label>
                    <input
                      type="text"
                      value={topic}
                      onChange={e => setTopic(e.target.value)}
                      placeholder="e.g. AVL Rotations & Balancing"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={e => setTagsInput(e.target.value)}
                    placeholder="e.g. AVL Trees, Rotations, Solved Numericals"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Button variant="ghost" size="sm" onClick={() => setStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                    Back
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => setStep(3)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Preview & Submit
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-brand-royalblue bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                      {currentSubject?.name || "Subject"} (Unit {unitNumber})
                    </span>
                    <span className="text-[10px] font-bold uppercase text-slate-500">
                      {file?.type} • {file?.size}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {title || "Untitled Resource"}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Topic: {topic || `Unit ${unitNumber} Comprehensive Coverage`}
                  </p>
                  <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-400">
                    <span>Selected File: <strong>{file?.name}</strong></span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Button variant="ghost" size="sm" onClick={() => setStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                    Edit Details
                  </Button>
                  <Button
                    variant="gradient"
                    size="md"
                    isLoading={isSubmitting}
                    leftIcon={<Sparkles className="w-4 h-4" />}
                    onClick={handleSubmit}
                  >
                    Submit Material
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};