/**
 * Check if Supabase is properly configured
 * Returns true if configured, false otherwise
 */
export function isSupabaseConfigured(): boolean {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return !!(supabaseUrl && supabaseAnonKey && 
    supabaseUrl !== 'your_project_url' && 
    supabaseAnonKey !== 'your_anon_key')
}

/**
 * Get configuration status message
 */
export function getConfigStatus(): { configured: boolean; message: string } {
  if (isSupabaseConfigured()) {
    return {
      configured: true,
      message: 'Supabase is configured'
    }
  }

  return {
    configured: false,
    message: 'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file'
  }
}

