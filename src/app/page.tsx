"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Decimal } from "decimal.js";
import { Market } from "./types/api";

export default function MarketsPage() {
  const router = useRouter();
  const [markets, setMarkets] = useState<Market[]>([]);

  useEffect(() => {
    fetchMarkets();
    const interval = setInterval(fetchMarkets, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchMarkets = async () => {
    try {
      const response = await fetch("https://api.bitpin.org/v1/mkt/markets/");
      const data = await response.json();
      setMarkets(data.results);
    } catch (error) {
      console.error("Error fetching markets:", error);
    }
  };

  const handleMarketSelect = (market: Market) => {
    router.push(`/orders/${market.id}`);
  };

  if (!markets.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Tabs defaultValue="IRT">
        <TabsList>
          <TabsTrigger value="IRT">Toman Markets</TabsTrigger>
          <TabsTrigger value="USDT">USDT Markets</TabsTrigger>
        </TabsList>

        <TabsContent
          value="IRT"
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {markets
            .filter((market) => market.currency2.code === "IRT")
            .map((market) => (
              <Card
                key={market.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleMarketSelect(market)}
              >
                <CardContent className="p-4">
                  <h3 className="font-bold">{market.currency1.title}</h3>
                  <p>Last Price: {new Decimal(market.price).toFixed(2)}</p>
                  <p>24h Volume: {new Decimal(market.volume_24h).toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent
          value="USDT"
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {markets
            .filter((market) => market.currency2.code === "USDT")
            .map((market) => (
              <Card
                key={market.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleMarketSelect(market)}
              >
                <CardContent className="p-4">
                  <h3 className="font-bold">{market.currency1.title}</h3>
                  <p>Last Price: {new Decimal(market.price).toFixed(2)}</p>
                  <p>24h Volume: {new Decimal(market.volume_24h).toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
