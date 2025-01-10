import { fetchMarkets } from "@/api/markets";
import { Market } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const useMarkets = () => {
  return useQuery<Market[]>({
    queryKey: ["markets"],
    queryFn: fetchMarkets,
    refetchInterval: 3000,
  });
};
