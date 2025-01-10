import { OrderStats } from "@/app/types";
import { Order } from "@/app/types/api";
import { Decimal } from "decimal.js";

export const calculateOrderStats = (
  orderList: Order[],
  percentage: string
): OrderStats => {
  if (!orderList.length)
    return {
      totalRemain: new Decimal(0),
      avgPrice: new Decimal(0),
      totalValue: new Decimal(0),
    };

  const decimal = new Decimal(percentage).dividedBy(100);
  const totalRemain = orderList.reduce(
    (sum, order) => sum.plus(new Decimal(order.remain)),
    new Decimal(0)
  );
  const targetRemain = totalRemain.times(decimal);

  let currentSum = new Decimal(0);
  let totalValue = new Decimal(0);
  let weightedPrice = new Decimal(0);

  for (const order of orderList) {
    const remain = new Decimal(order.remain);
    const price = new Decimal(order.price);

    if (currentSum.plus(remain).lte(targetRemain)) {
      currentSum = currentSum.plus(remain);
      const value = remain.times(price);
      totalValue = totalValue.plus(value);
      weightedPrice = weightedPrice.plus(price.times(remain));
    } else {
      const remaining = targetRemain.minus(currentSum);
      currentSum = currentSum.plus(remaining);
      const value = remaining.times(price);
      totalValue = totalValue.plus(value);
      weightedPrice = weightedPrice.plus(price.times(remaining));
      break;
    }
  }

  const avgPrice = weightedPrice.dividedBy(currentSum);

  return {
    totalRemain: currentSum,
    avgPrice,
    totalValue,
  };
};
