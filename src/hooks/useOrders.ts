import { fetchBuyOrders, fetchSellOrders, fetchTrades } from "@/api/orders";
import { OrdersState } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useOrders = (marketId: string) => {
  return useQuery<OrdersState, Error>({
    queryKey: ["orders", marketId],
    queryFn: async () => {
      const [buy, sell, trades] = await Promise.all([
        fetchBuyOrders(marketId),
        fetchSellOrders(marketId),
        fetchTrades(marketId),
      ]);

      return {
        buy: buy.orders.slice(0, 10),
        sell: sell.orders.slice(0, 10),
        trades: trades.slice(0, 10),
      };
    },
    enabled: !!marketId,
    refetchInterval: 30000,
  });
};
