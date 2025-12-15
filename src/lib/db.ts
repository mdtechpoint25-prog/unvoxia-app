const DB_URL = process.env.SUPABASE_DB_URL!;

export async function queryDatabase(query: string, params?: any[]) {
  const { Client } = await import('pg');
  const client = new Client({ connectionString: DB_URL });
  
  try {
    await client.connect();
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    await client.end();
  }
}
