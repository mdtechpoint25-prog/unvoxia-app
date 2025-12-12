import { createClient } from '@libsql/client';

// Turso Database Configuration
const tursoUrl = process.env.TURSO_DATABASE_URL || '';
const tursoToken = process.env.TURSO_AUTH_TOKEN || '';

// Create Turso client
export const db = createClient({
  url: tursoUrl,
  authToken: tursoToken,
});

// Helper function for queries
export async function query<T = any>(sql: string, args: any[] = []): Promise<T[]> {
  try {
    const result = await db.execute({ sql, args });
    return result.rows as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Helper function for single row queries
export async function queryOne<T = any>(sql: string, args: any[] = []): Promise<T | null> {
  const rows = await query<T>(sql, args);
  return rows.length > 0 ? rows[0] : null;
}

// Helper function for insert/update/delete
export async function execute(sql: string, args: any[] = []): Promise<{ rowsAffected: number; lastInsertRowid: bigint | undefined }> {
  try {
    const result = await db.execute({ sql, args });
    return {
      rowsAffected: result.rowsAffected,
      lastInsertRowid: result.lastInsertRowid
    };
  } catch (error) {
    console.error('Database execute error:', error);
    throw error;
  }
}

// Helper to generate UUID
export function generateId(): string {
  return crypto.randomUUID();
}
