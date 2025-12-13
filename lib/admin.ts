import { cookies } from 'next/headers';
import { queryOne } from '@/lib/turso';

// Admin emails - users with these emails have admin access
export const ADMIN_EMAILS = [
  'admin@nomaworld.co.ke',
  'info@nomaworld.co.ke',
  'support@nomaworld.co.ke'
];

export interface AdminUser {
  userId: string;
  email: string;
  username: string;
  role: string;
}

export async function getAdminFromSession(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return null;
    
    const decoded = JSON.parse(Buffer.from(session, 'base64').toString());
    if (decoded.exp < Date.now()) return null;
    
    // Get user details
    const user = await queryOne<{ id: string; email: string; username: string; role: string }>(
      'SELECT id, email, username, role FROM users WHERE id = ?',
      [decoded.userId]
    );
    
    if (!user) return null;
    
    // Check admin access (by role or email)
    const isAdmin = user.role === 'admin' || ADMIN_EMAILS.includes(user.email);
    if (!isAdmin) return null;
    
    return {
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role || 'admin'
    };
  } catch {
    return null;
  }
}

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
