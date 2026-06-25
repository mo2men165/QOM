export type PreorderStatus = 'open' | 'funded' | 'expired';
export type OrderMode = 'box' | 'preorder';
export type OrderStatus = 'pending' | 'confirmed' | 'cancelled' | 'refunded';

// Matches DB column names from better-sqlite3
export interface PreorderConfig {
  id: number;
  product_id: number;
  moq: number;
  current_count: number;
  deadline: string; // ISO8601
  status: PreorderStatus;
  price_cents: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  mode: OrderMode;
  customer_name: string;
  phone: string;
  address: string;
  amount_cents: number;
  currency: string;
  paymob_order_id: string | null;
  paymob_transaction_id: string | null;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: number;
  preorder_config_id: number | null;
  size: string;
  color: string;
  quantity: number;
  price_cents: number;
  created_at: string;
}

export interface SSEMoqEvent {
  type: 'moq_update';
  productId: number;
  currentCount: number;
  moq: number;
  status: PreorderStatus;
}
