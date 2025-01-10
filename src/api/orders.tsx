import { API_BASE_URL, API_VERSIONS } from "@/configs/api";
import { OrderResponse, Trade } from "@/types/api";

export const fetchBuyOrders = async (
  marketId: string
): Promise<OrderResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/${API_VERSIONS.v2}/mth/actives/${marketId}/?type=buy`
  );
  const data = await response.json();
  return data;
};

export const fetchSellOrders = async (
  marketId: string
): Promise<OrderResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/${API_VERSIONS.v2}/mth/actives/${marketId}/?type=sell`
  );
  const data = await response.json();
  return data;
};

export const fetchTrades = async (marketId: string): Promise<Trade[]> => {
  const response = await fetch(
    `${API_BASE_URL}/${API_VERSIONS.v1}/mth/matches/${marketId}/`
  );
  const data = await response.json();
  return data;
};
