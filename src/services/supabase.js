// ===================================
// Supabase Client Configuration
// ===================================
// Initializes the Supabase client with env variables.
// Includes validation so the app doesn't crash if keys are missing.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Warn in console if env vars are missing (common setup issue)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '[Supabase] Missing environment variables!\n' +
    'Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.\n' +
    'The app will run with mock/fallback data until Supabase is configured.'
  )
}

// Create the client — uses placeholder values if env vars are missing to prevent crash
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Flag other modules can check to see if Supabase is properly configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)