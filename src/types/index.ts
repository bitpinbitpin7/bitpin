import { Decimal } from "decimal.js";
import { Order, Trade } from "./api";

export interface OrdersState {
  buy: Order[];
  sell: Order[];
  trades: Trade[];
}

export interface OrderStats {
  totalRemain: Decimal;
  avgPrice: Decimal;
  totalValue: Decimal;
}
