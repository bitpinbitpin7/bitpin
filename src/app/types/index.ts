import { Decimal } from "decimal.js";

export interface OrderStats {
  totalRemain: Decimal;
  avgPrice: Decimal;
  totalValue: Decimal;
}
