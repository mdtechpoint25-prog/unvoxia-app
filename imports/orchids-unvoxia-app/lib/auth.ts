import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface AuthResult {
  user: {
    id: string;
    email?: string;
    user_metadata?: Record<string, unknown>;
  };
  supabase: SupabaseClient<Database>;
}

/**
 * Helper to get authenticated user from Authorization header
 * Returns null if not authenticated
 */
export async function getAuthUser(request: Request): Promise<AuthResult | null> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return null;
  }

  return { user, supabase };
}

/**
 * Helper to require authentication - throws error if not authenticated
 */
export async function requireAuth(request: Request): Promise<AuthResult> {
  const auth = await getAuthUser(request);
  if (!auth) {
    throw new Error('Unauthorized');
  }
  return auth;
}
