/**
 * Supabase Client Configuration
 * If environment variables are provided, connects to Supabase.
 * Otherwise operates gracefully in offline/local storage mode.
 */

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
  );
};

export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};
