import { API_BASE_URL, API_VERSIONS } from "@/configs/api";
import { Market } from "@/types/api";

export const fetchMarkets = async (): Promise<Market[]> => {
  const response = await fetch(
    `${API_BASE_URL}/${API_VERSIONS.v1}/mkt/markets/`
  );
  const data = await response.json();
  return data.results;
};
