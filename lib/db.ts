import path from 'path';
import fs from 'fs';

const DB_DIR = process.env.DB_DIR ?? path.join(process.cwd(), '.data');
const DB_PATH = path.join(DB_DIR, 'qom.db');

// Lazy-load to keep this module server-only safe
let _db: import('better-sqlite3').Database | null = null;

export function getDb(): import('better-sqlite3').Database {
  if (_db) return _db;

  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Database = require('better-sqlite3') as typeof import('better-sqlite3');
  _db = new Database(DB_PATH);
  _db.pragma('journal_mode = WAL');
  _db.pragma('foreign_keys = ON');
  runMigrations(_db);
  return _db;
}

function runMigrations(db: import('better-sqlite3').Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS preorder_configs (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id   INTEGER NOT NULL UNIQUE,
      moq          INTEGER NOT NULL,
      current_count INTEGER NOT NULL DEFAULT 0,
      deadline     TEXT NOT NULL,
      status       TEXT NOT NULL DEFAULT 'open',
      price_cents  INTEGER NOT NULL DEFAULT 0,
      created_at   TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS orders (
      id                   TEXT PRIMARY KEY,
      mode                 TEXT NOT NULL,
      customer_name        TEXT NOT NULL,
      phone                TEXT NOT NULL,
      address              TEXT NOT NULL,
      amount_cents         INTEGER NOT NULL DEFAULT 0,
      currency             TEXT NOT NULL DEFAULT 'EGP',
      paymob_order_id      TEXT,
      paymob_transaction_id TEXT,
      status               TEXT NOT NULL DEFAULT 'pending',
      created_at           TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at           TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id                  TEXT PRIMARY KEY,
      order_id            TEXT NOT NULL REFERENCES orders(id),
      product_id          INTEGER NOT NULL,
      preorder_config_id  INTEGER REFERENCES preorder_configs(id),
      size                TEXT NOT NULL,
      color               TEXT NOT NULL,
      quantity            INTEGER NOT NULL DEFAULT 1,
      price_cents         INTEGER NOT NULL,
      created_at          TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // Seed four products with pre-order configs on first run
  const { count } = db.prepare('SELECT COUNT(*) AS count FROM preorder_configs').get() as { count: number };
  if (count === 0) {
    const insert = db.prepare(`
      INSERT INTO preorder_configs (product_id, moq, current_count, deadline, status, price_cents)
      VALUES (@productId, @moq, @currentCount, @deadline, 'open', @priceCents)
    `);
    const d = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString();
    insert.run({ productId: 1, moq: 1000, currentCount: 847, deadline: d(30), priceCents: 89_900 });
    insert.run({ productId: 3, moq: 500,  currentCount: 312, deadline: d(14), priceCents: 129_900 });
    insert.run({ productId: 4, moq: 750,  currentCount: 698, deadline: d(7),  priceCents: 189_900 });
    insert.run({ productId: 9, moq: 300,  currentCount: 45,  deadline: d(60), priceCents: 149_900 });
  }
}
