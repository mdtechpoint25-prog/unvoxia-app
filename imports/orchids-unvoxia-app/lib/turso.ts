import { createClient, Client } from '@libsql/client';

// Turso Database Configuration
const tursoUrl = process.env.TURSO_DATABASE_URL || '';
const tursoToken = process.env.TURSO_AUTH_TOKEN || '';

// Lazy initialization of database client
let _db: Client | null = null;

export function getDb(): Client {
  if (!_db) {
    if (!tursoUrl) {
      // Return a mock client that throws helpful errors
      throw new Error('Database not configured. Please set TURSO_DATABASE_URL environment variable.');
    }
    _db = createClient({
      url: tursoUrl,
      authToken: tursoToken,
    });
  }
  return _db;
}

// Export db as a getter to lazy-load
export const db = {
  execute: async (query: { sql: string; args?: any[] }) => {
    return getDb().execute(query);
  }
};

// Check if database is configured
export function isDatabaseConfigured(): boolean {
  return !!tursoUrl;
}

// Helper function for queries
export async function query<T = any>(sql: string, args: any[] = []): Promise<T[]> {
  if (!isDatabaseConfigured()) {
    console.warn('Database not configured, returning empty results');
    return [];
  }
  try {
    const result = await getDb().execute({ sql, args });
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
  if (!isDatabaseConfigured()) {
    throw new Error('Database not configured. Please set TURSO_DATABASE_URL environment variable.');
  }
  try {
    const result = await getDb().execute({ sql, args });
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
