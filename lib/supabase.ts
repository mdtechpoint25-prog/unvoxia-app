import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder'));
};

// Create a mock client that returns empty results when not configured
const createMockClient = (): SupabaseClient<Database> => {
  const mockResult = {
    data: null,
    error: { message: 'Supabase not configured', code: 'NOT_CONFIGURED' }
  };
  
  // This is a simplified mock - in production you'd want more complete mocking
  return {
    from: () => ({
      select: () => ({ 
        eq: () => ({ 
          single: () => Promise.resolve(mockResult),
          order: () => Promise.resolve({ data: [], error: null }),
          limit: () => Promise.resolve({ data: [], error: null })
        }),
        order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) }),
        limit: () => Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve(mockResult)
      }),
      insert: () => ({ select: () => ({ single: () => Promise.resolve(mockResult) }) }),
      update: () => ({ eq: () => ({ select: () => ({ single: () => Promise.resolve(mockResult) }) }) }),
      delete: () => ({ eq: () => Promise.resolve({ error: null }) })
    })
  } as unknown as SupabaseClient<Database>;
};

// Public client for client-side operations (respects RLS)
export const supabase = isSupabaseConfigured()
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : createMockClient();

// Admin client for server-side operations (bypasses RLS)
// Only use this in API routes, never expose to client
export const supabaseAdmin = isSupabaseConfigured() && supabaseServiceKey
  ? createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : supabase; // Fallback to regular client if service key not available

