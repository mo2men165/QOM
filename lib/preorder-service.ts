import { getDb } from './db';
import { broadcastMoqUpdate } from './sse-emitter';
import { refundTransaction } from './paymob';
import type { PreorderConfig, Order } from './types';

export function getPreorderConfig(productId: number): PreorderConfig | null {
  return getDb()
    .prepare('SELECT * FROM preorder_configs WHERE product_id = ?')
    .get(productId) as PreorderConfig | null;
}

export function getAllPreorderConfigs(): PreorderConfig[] {
  return getDb()
    .prepare('SELECT * FROM preorder_configs ORDER BY deadline ASC')
    .all() as PreorderConfig[];
}

export function incrementCount(configId: number): void {
  const db = getDb();

  db.prepare(`
    UPDATE preorder_configs
    SET current_count = current_count + 1, updated_at = datetime('now')
    WHERE id = ?
  `).run(configId);

  const config = db
    .prepare('SELECT * FROM preorder_configs WHERE id = ?')
    .get(configId) as PreorderConfig;

  broadcastMoqUpdate({
    type: 'moq_update',
    productId: config.product_id,
    currentCount: config.current_count,
    moq: config.moq,
    status: config.status,
  });

  // Auto-fund when MOQ is hit
  if (config.status === 'open' && config.current_count >= config.moq) {
    fundBatch(configId);
  }
}

export function fundBatch(configId: number): void {
  const db = getDb();

  db.prepare(`
    UPDATE preorder_configs SET status = 'funded', updated_at = datetime('now') WHERE id = ?
  `).run(configId);

  // Confirm every pending preorder that references this config
  const orderIds = db
    .prepare(`SELECT DISTINCT order_id FROM order_items WHERE preorder_config_id = ?`)
    .all(configId) as { order_id: string }[];

  const confirm = db.prepare(`
    UPDATE orders SET status = 'confirmed', updated_at = datetime('now')
    WHERE id = ? AND mode = 'preorder' AND status = 'pending'
  `);
  for (const { order_id } of orderIds) confirm.run(order_id);

  const config = db
    .prepare('SELECT * FROM preorder_configs WHERE id = ?')
    .get(configId) as PreorderConfig;

  broadcastMoqUpdate({
    type: 'moq_update',
    productId: config.product_id,
    currentCount: config.current_count,
    moq: config.moq,
    status: 'funded',
  });
}

export async function expireBatch(configId: number): Promise<void> {
  const db = getDb();

  db.prepare(`
    UPDATE preorder_configs SET status = 'expired', updated_at = datetime('now') WHERE id = ?
  `).run(configId);

  const orders = db
    .prepare(`
      SELECT DISTINCT o.id, o.paymob_transaction_id, o.amount_cents
      FROM orders o
      JOIN order_items oi ON oi.order_id = o.id
      WHERE oi.preorder_config_id = ? AND o.mode = 'preorder' AND o.status = 'pending'
    `)
    .all(configId) as Pick<Order, 'id' | 'paymob_transaction_id' | 'amount_cents'>[];

  for (const order of orders) {
    if (order.paymob_transaction_id) {
      try {
        await refundTransaction(order.paymob_transaction_id, order.amount_cents);
        db.prepare(`UPDATE orders SET status = 'refunded', updated_at = datetime('now') WHERE id = ?`)
          .run(order.id);
      } catch (err) {
        console.error(`[preorder] Refund failed for order ${order.id}:`, err);
        db.prepare(`UPDATE orders SET status = 'cancelled', updated_at = datetime('now') WHERE id = ?`)
          .run(order.id);
      }
    } else {
      db.prepare(`UPDATE orders SET status = 'cancelled', updated_at = datetime('now') WHERE id = ?`)
        .run(order.id);
    }
  }

  const config = db
    .prepare('SELECT * FROM preorder_configs WHERE id = ?')
    .get(configId) as PreorderConfig;

  broadcastMoqUpdate({
    type: 'moq_update',
    productId: config.product_id,
    currentCount: config.current_count,
    moq: config.moq,
    status: 'expired',
  });
}

export async function processExpiredPreorders(): Promise<void> {
  const expired = getDb()
    .prepare(`SELECT id FROM preorder_configs WHERE status = 'open' AND deadline < datetime('now')`)
    .all() as { id: number }[];

  for (const { id } of expired) {
    await expireBatch(id);
  }
}
