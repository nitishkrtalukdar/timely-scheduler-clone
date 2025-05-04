
import { createClient } from '@supabase/supabase-js';

// Get the environment variables for Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Create a Supabase client with dummy values when real ones are not available
// This prevents runtime errors but will return empty results
export const supabase = createClient(
  supabaseUrl || "https://placeholder-url.supabase.co",
  supabaseAnonKey || "placeholder-key",
  {
    auth: {
      persistSession: true
    }
  }
);

// Function to check if the Supabase connection is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl) && Boolean(supabaseAnonKey);
};
