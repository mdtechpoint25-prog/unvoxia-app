import { createClient } from '@libsql/client';

const tursoClient = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export async function syncToTurso(table: string, data: any[]) {
  try {
    for (const row of data) {
      const columns = Object.keys(row).join(', ');
      const placeholders = Object.keys(row).map((_, i) => `?${i + 1}`).join(', ');
      const values = Object.values(row);
      
      await tursoClient.execute({
        sql: `INSERT OR REPLACE INTO ${table} (${columns}) VALUES (${placeholders})`,
        args: values,
      });
    }
    console.log(`✅ Synced ${data.length} rows to Turso table: ${table}`);
  } catch (error) {
    console.error(`❌ Error syncing to Turso table ${table}:`, error);
    throw error;
  }
}

export async function initTursoSchema() {
  try {
    await tursoClient.execute(`
      CREATE TABLE IF NOT EXISTS packages (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        price INTEGER NOT NULL,
        description TEXT,
        features TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await tursoClient.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await tursoClient.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        total_amount INTEGER NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    await tursoClient.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id TEXT PRIMARY KEY,
        order_id TEXT NOT NULL,
        package_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price INTEGER NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (package_id) REFERENCES packages(id)
      )
    `);

    await tursoClient.execute(`
      CREATE TABLE IF NOT EXISTS basket_items (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        package_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (package_id) REFERENCES packages(id)
      )
    `);

    await tursoClient.execute(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        assessment_type TEXT NOT NULL,
        data TEXT,
        completed BOOLEAN DEFAULT FALSE,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    console.log('✅ Turso backup database schema initialized');
  } catch (error) {
    console.error('❌ Error initializing Turso schema:', error);
    throw error;
  }
}

export { tursoClient };
