import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { getDb } from '@/lib/db';
import { getPreorderConfig } from '@/lib/preorder-service';
import { createPaymentSession } from '@/lib/paymob';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      productId: number;
      size: string;
      color: string;
      quantity?: number;
      customerName: string;
      phone: string;
      address: string;
    };

    const { productId, size, color, customerName, phone, address } = body;
    const quantity = body.quantity ?? 1;

    if (!productId || !size || !color || !customerName || !phone || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const config = getPreorderConfig(productId);
    if (!config) {
      return NextResponse.json({ error: 'Product not available for pre-order' }, { status: 404 });
    }
    if (config.status !== 'open') {
      return NextResponse.json({ error: `Pre-order is ${config.status}` }, { status: 409 });
    }

    const db = getDb();
    const orderId = randomUUID();
    const itemId = randomUUID();
    const amountCents = config.price_cents * quantity;

    // Create order (status: pending — confirmed after Paymob webhook)
    db.prepare(`
      INSERT INTO orders (id, mode, customer_name, phone, address, amount_cents, status)
      VALUES (?, 'preorder', ?, ?, ?, ?, 'pending')
    `).run(orderId, customerName, phone, address, amountCents);

    db.prepare(`
      INSERT INTO order_items (id, order_id, product_id, preorder_config_id, size, color, quantity, price_cents)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(itemId, orderId, productId, config.id, size, color, quantity, config.price_cents);

    // Create Paymob payment session
    const { paymentUrl, paymobOrderId } = await createPaymentSession({
      amountCents,
      merchantOrderId: orderId,
      customerName,
      phone,
    });

    db.prepare(`UPDATE orders SET paymob_order_id = ?, updated_at = datetime('now') WHERE id = ?`)
      .run(paymobOrderId, orderId);

    return NextResponse.json({ orderId, paymentUrl });
  } catch (err) {
    console.error('[api] POST /api/preorder/commit:', err);
    return NextResponse.json({ error: 'Failed to create pre-order' }, { status: 500 });
  }
}
