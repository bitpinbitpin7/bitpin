export interface Currency {
  id: number;
  title: string;
  title_fa: string;
  code: string;
  image: string;
  decimal: number;
  decimal_amount: number;
}

export interface PriceInfo {
  created_at: number;
  price: string;
  change: number;
  min: string;
  max: string;
  time: string | null;
  mean: string | null;
  value: string | null;
  amount: string | null;
}

export interface Market {
  id: number;
  currency1: Currency;
  currency2: Currency;
  price: string;
  title: string;
  code: string;
  volume_24h: string;
  internal_price_info: PriceInfo;
  price_info: PriceInfo;
  [key: string]: any;
}

export interface Order {
  amount: string;
  remain: string;
  price: string;
  value: string;
}

export interface OrderResponse {
  orders: Order[];
  volume: string;
}

export interface Trade {
  time: number;
  price: string;
  value: string;
  match_amount: string;
  type: "buy" | "sell";
  match_id: string;
}
