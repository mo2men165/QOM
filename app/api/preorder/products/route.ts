import { NextResponse } from 'next/server';
import { getAllPreorderConfigs } from '@/lib/preorder-service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const configs = getAllPreorderConfigs();
    return NextResponse.json(configs);
  } catch (err) {
    console.error('[api] GET /api/preorder/products:', err);
    return NextResponse.json({ error: 'Failed to load pre-orders' }, { status: 500 });
  }
}
