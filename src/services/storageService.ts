import { supabase, isSupabaseConfigured } from "./supabaseClient";

export interface FileUploadResult {
  url: string;
  size: string;
  type: "pdf" | "pptx" | "docx" | "zip";
  name: string;
}

export const StorageService = {
  /**
   * Uploads a document to cloud storage (Supabase Storage bucket / local blob fallback)
   */
  async uploadNoteFile(file: File, bucket = "academic-notes"): Promise<FileUploadResult> {
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "pdf";
    const validTypes: Record<string, "pdf" | "pptx" | "docx" | "zip"> = {
      pdf: "pdf",
      ppt: "pptx",
      pptx: "pptx",
      doc: "docx",
      docx: "docx",
      zip: "zip"
    };

    const type = validTypes[fileExtension] || "pdf";

    if (isSupabaseConfigured && supabase) {
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      const { data, error } = await supabase.storage.from(bucket).upload(fileName, file, {
        cacheControl: "3600",
        upsert: false
      });

      if (error) {
        console.warn("Cloud storage upload error, falling back to local URL:", error.message);
      } else {
        const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
        return {
          url: publicUrlData.publicUrl,
          size: `${fileSizeMB} MB`,
          type,
          name: file.name
        };
      }
    }

    // Local object URL fallback
    const localBlobUrl = URL.createObjectURL(file);
    return {
      url: localBlobUrl,
      size: `${fileSizeMB} MB`,
      type,
      name: file.name
    };
  },

  /**
   * Generates a downloadable dummy text/pdf file for testing
   */
  downloadMockNote(title: string, subject: string, unit: number, topic: string) {
    const text = `CAMPUSCONNECT STUDY REPOSITORY\n==============================\nTitle: ${title}\nSubject: ${subject} (Unit ${unit})\nTopic: ${topic}\nDownloaded: ${new Date().toLocaleString()}\n\nKey Concepts:\n- Concept 1: Theoretical foundation and asymptotic analysis.\n- Concept 2: Algorithm invariants and implementation.\n- Concept 3: Solved previous semester numericals.`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${subject.replace(/\s+/g, "_")}_Unit${unit}_Notes.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};