"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Decimal } from "decimal.js";
import {
  SwipeableTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useMarkets } from "@/hooks/useMarkets";
import { Market } from "@/types/api";

export default function MarketsPage() {
  const router = useRouter();
  const BASE_MARKETS = ["IRT", "USDT"] as const;
  type Tab = (typeof BASE_MARKETS)[number];
  const [activeTab, setActiveTab] = useState<Tab>("IRT");

  const { data: markets, isLoading, isError } = useMarkets();

  const handleMarketSelect = (market: Market) => {
    router.push(`/orders/${market.id}`);
  };

  const handleSwipeLeft = () => {
    switch (activeTab) {
      case "IRT":
        setActiveTab("USDT");
        break;
      default:
        break;
    }
  };

  const handleSwipeRight = () => {
    switch (activeTab) {
      case "USDT":
        setActiveTab("IRT");
        break;
      default:
        break;
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching markets</div>;
  if (!markets) return <div>No markets available.</div>;

  return (
    <div className="p-4">
      <SwipeableTabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as Tab)}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      >
        <TabsList className="bg-secondary">
          {BASE_MARKETS.map((baseMarket) => (
            <TabsTrigger
              value={baseMarket}
              key={baseMarket}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {baseMarket} Markets
            </TabsTrigger>
          ))}
        </TabsList>

        {BASE_MARKETS.map((baseMarket) => (
          <TabsContent
            value={baseMarket}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            key={baseMarket}
          >
            {markets
              .filter((market) => market.currency2.code === baseMarket)
              .map((market) => (
                <Card
                  key={market.id}
                  className="cursor-pointer bg-background hover:bg-accent transition-colors"
                  onClick={() => handleMarketSelect(market)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-bold text-primary">
                      {market.currency1.title}
                    </h3>
                    <p className="text-secondary-foreground">
                      Last Price: {new Decimal(market.price).toFixed(2)}
                    </p>
                    <p className="text-secondary-foreground">
                      24h Volume: {new Decimal(market.volume_24h).toFixed(2)}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </SwipeableTabs>
    </div>
  );
}
