import { createClient } from "@supabase/supabase-js";

// Retrieve environment variables (with graceful fallback for offline/development mode)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const checkDatabaseHealth = async (): Promise<{ isConnected: boolean; message: string }> => {
  if (!supabase) {
    return {
      isConnected: false,
      message: "Running in local store mode. Add VITE_SUPABASE_URL to connect live PostgreSQL."
    };
  }

  try {
    const { error } = await supabase.from("branches").select("id").limit(1);
    if (error) throw error;
    return { isConnected: true, message: "Connected to PostgreSQL database successfully." };
  } catch (err: any) {
    return { isConnected: false, message: err.message || "Failed to reach database." };
  }
};