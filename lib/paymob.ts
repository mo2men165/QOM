import { createHmac } from 'crypto';

const PAYMOB_BASE = 'https://accept.paymob.com/api';

function env(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
}

async function authenticate(): Promise<string> {
  const res = await fetch(`${PAYMOB_BASE}/auth/tokens`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: env('PAYMOB_API_KEY') }),
  });
  if (!res.ok) throw new Error(`Paymob auth failed: ${res.status}`);
  const data = await res.json() as { token: string };
  return data.token;
}

export interface CreateSessionResult {
  paymentUrl: string;
  paymobOrderId: string;
}

export async function createPaymentSession(opts: {
  amountCents: number;
  merchantOrderId: string;
  customerName: string;
  phone: string;
  currency?: string;
}): Promise<CreateSessionResult> {
  const token = await authenticate();
  const currency = opts.currency ?? 'EGP';
  const integrationId = Number(env('PAYMOB_INTEGRATION_ID'));
  const iframeId = env('PAYMOB_IFRAME_ID');

  // Create Paymob order
  const orderRes = await fetch(`${PAYMOB_BASE}/ecommerce/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      amount_cents: opts.amountCents,
      currency,
      merchant_order_id: opts.merchantOrderId,
      items: [],
    }),
  });
  if (!orderRes.ok) throw new Error(`Paymob order failed: ${orderRes.status}`);
  const orderData = await orderRes.json() as { id: number };

  const [firstName, ...rest] = opts.customerName.split(' ');
  const lastName = rest.join(' ') || 'NA';

  // Create payment key
  const keyRes = await fetch(`${PAYMOB_BASE}/acceptance/payment_keys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      auth_token: token,
      amount_cents: opts.amountCents,
      expiration: 3600,
      order_id: orderData.id,
      billing_data: {
        first_name: firstName,
        last_name: lastName,
        phone_number: opts.phone,
        email: 'na@qom.eg',
        apartment: 'NA', floor: 'NA', street: 'NA',
        building: 'NA', shipping_method: 'NA',
        postal_code: 'NA', city: 'NA', country: 'EG', state: 'NA',
      },
      currency,
      integration_id: integrationId,
    }),
  });
  if (!keyRes.ok) throw new Error(`Paymob payment key failed: ${keyRes.status}`);
  const keyData = await keyRes.json() as { token: string };

  return {
    paymentUrl: `https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${keyData.token}`,
    paymobOrderId: String(orderData.id),
  };
}

export async function refundTransaction(transactionId: string, amountCents: number): Promise<void> {
  const token = await authenticate();
  const res = await fetch(`${PAYMOB_BASE}/acceptance/void_refund/refund`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ auth_token: token, transaction_id: transactionId, amount_cents: amountCents }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Paymob refund failed ${res.status}: ${body}`);
  }
}

// Paymob HMAC-SHA512 over a specific ordered set of transaction fields
export function verifyWebhookHmac(obj: Record<string, unknown>, receivedHmac: string): boolean {
  const secret = process.env.PAYMOB_HMAC_SECRET;
  if (!secret) return true; // skip verification if not configured

  const fields = [
    'amount_cents', 'created_at', 'currency', 'error_occured',
    'has_parent_transaction', 'id', 'integration_id', 'is_3d_secure',
    'is_auth', 'is_capture', 'is_refunded', 'is_standalone_payment',
    'is_voided', 'order', 'owner', 'pending',
    'source_data.pan', 'source_data.sub_type', 'source_data.type', 'success',
  ];

  const msg = fields.map((f) => {
    if (f.startsWith('source_data.')) {
      const sub = f.split('.')[1];
      return String((obj.source_data as Record<string, unknown>)?.[sub] ?? '');
    }
    if (f === 'order') return String((obj.order as Record<string, unknown>)?.id ?? '');
    return String(obj[f] ?? '');
  }).join('');

  const computed = createHmac('sha512', secret).update(msg).digest('hex');
  return computed === receivedHmac;
}
