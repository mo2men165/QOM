import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { incrementCount } from '@/lib/preorder-service';
import { verifyWebhookHmac } from '@/lib/paymob';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      hmac: string;
      obj: Record<string, unknown> & {
        success: boolean;
        id: number;
        order: { merchant_order_id: string; id: number };
      };
    };

    const { hmac, obj } = body;

    if (!verifyWebhookHmac(obj, hmac)) {
      return NextResponse.json({ error: 'Invalid HMAC signature' }, { status: 401 });
    }

    const merchantOrderId = obj.order?.merchant_order_id;
    if (!merchantOrderId) return NextResponse.json({ ok: true });

    const db = getDb();
    const dbOrder = db
      .prepare('SELECT id, mode, status FROM orders WHERE id = ?')
      .get(merchantOrderId) as { id: string; mode: string; status: string } | null;

    if (!dbOrder) return NextResponse.json({ ok: true });

    if (obj.success && dbOrder.mode === 'preorder') {
      // Record the Paymob transaction ID so we can refund later if needed
      db.prepare(`
        UPDATE orders
        SET paymob_transaction_id = ?, updated_at = datetime('now')
        WHERE id = ?
      `).run(String(obj.id), merchantOrderId);

      // Increment MOQ counter → may trigger fundBatch automatically
      const item = db
        .prepare('SELECT preorder_config_id FROM order_items WHERE order_id = ?')
        .get(merchantOrderId) as { preorder_config_id: number } | null;

      if (item?.preorder_config_id) {
        incrementCount(item.preorder_config_id);
      }
    } else if (!obj.success) {
      db.prepare(`
        UPDATE orders SET status = 'cancelled', updated_at = datetime('now') WHERE id = ?
      `).run(merchantOrderId);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[webhook] Paymob error:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
