
import { createClient } from '@supabase/supabase-js';

// Get the environment variables for Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Create a Supabase client with fallback values to prevent runtime errors
export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey,
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
