"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  SwipeableTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Decimal } from "decimal.js";
import { calculateOrderStats } from "@/lib/orderCalculation";
import { useOrders } from "@/hooks/useOrders";

type Tab = "orders" | "buy" | "sell";

export default function OrdersPage() {
  const router = useRouter();
  const { marketId } = useParams<{ marketId: string }>();
  const [percentageInput, setPercentageInput] = useState<string>("");
  const [activeTab, setActiveTab] = useState<Tab>("orders");

  const { data: orders, error, isLoading } = useOrders(marketId);

  const buyStats =
    percentageInput && activeTab === "buy" && orders
      ? calculateOrderStats(orders.buy, percentageInput)
      : null;
  const sellStats =
    percentageInput && activeTab === "sell" && orders
      ? calculateOrderStats(orders.sell, percentageInput)
      : null;

  const handleSwipeLeft = () => {
    switch (activeTab) {
      case "orders":
        setActiveTab("buy");
        break;
      case "buy":
        setActiveTab("sell");
        break;
      default:
        break;
    }
  };

  const handleSwipeRight = () => {
    switch (activeTab) {
      case "sell":
        setActiveTab("buy");
        break;
      case "buy":
        setActiveTab("orders");
        break;
      default:
        break;
    }
  };

  if (!marketId || isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!orders) return <div>No orders found.</div>;

  return (
    <div className="p-4">
      <button
        onClick={() => router.push("/")}
        className="mb-4 px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors"
      >
        ← Back to Markets
      </button>

      <div className="mb-4">
        <Input
          type="number"
          placeholder="Enter percentage (1-100)"
          value={percentageInput}
          onChange={(e) => setPercentageInput(e.target.value)}
          min="1"
          max="100"
          className="max-w-xs bg-background text-foreground"
        />
      </div>

      <SwipeableTabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as Tab)}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      >
        <TabsList className="bg-secondary">
          <TabsTrigger
            value="orders"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            All Orders
          </TabsTrigger>
          <TabsTrigger
            value="buy"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Buy Orders
          </TabsTrigger>
          <TabsTrigger
            value="sell"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Sell Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-secondary">
                  <th className="p-2 border border-border">Time</th>
                  <th className="p-2 border border-border">Price</th>
                  <th className="p-2 border border-border">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.trades.map((trade, index) => (
                  <tr
                    key={index}
                    className="hover:bg-accent/50 transition-colors"
                  >
                    <td className="p-2 border border-border">
                      {new Date(trade.time * 1000).toLocaleTimeString()}
                    </td>
                    <td className="p-2 border border-border">
                      {new Decimal(trade.price).toFixed(2)}
                    </td>
                    <td className="p-2 border border-border">
                      {new Decimal(trade.match_amount).toFixed(8)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="buy">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-secondary">
                  <th className="p-2 border border-border">Price</th>
                  <th className="p-2 border border-border">Remaining</th>
                  <th className="p-2 border border-border">Value</th>
                </tr>
              </thead>
              <tbody>
                {orders.buy.map((order, index) => (
                  <tr
                    key={index}
                    className="hover:bg-accent/50 transition-colors"
                  >
                    <td className="p-2 border border-border">
                      {new Decimal(order.price).toFixed(2)}
                    </td>
                    <td className="p-2 border border-border">
                      {new Decimal(order.remain).toFixed(8)}
                    </td>
                    <td className="p-2 border border-border">
                      {new Decimal(order.value).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              {buyStats && (
                <tfoot>
                  <tr className="font-bold bg-secondary">
                    <td className="p-2 border border-border">
                      Average: {buyStats.avgPrice.toFixed(2)}
                    </td>
                    <td className="p-2 border border-border">
                      Total: {buyStats.totalRemain.toFixed(8)}
                    </td>
                    <td className="p-2 border border-border">
                      Total: {buyStats.totalValue.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </TabsContent>

        <TabsContent value="sell">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-secondary">
                  <th className="p-2 border border-border">Price</th>
                  <th className="p-2 border border-border">Remaining</th>
                  <th className="p-2 border border-border">Value</th>
                </tr>
              </thead>
              <tbody>
                {orders.sell.map((order, index) => (
                  <tr
                    key={index}
                    className="hover:bg-accent/50 transition-colors"
                  >
                    <td className="p-2 border border-border">
                      {new Decimal(order.price).toFixed(2)}
                    </td>
                    <td className="p-2 border border-border">
                      {new Decimal(order.remain).toFixed(8)}
                    </td>
                    <td className="p-2 border border-border">
                      {new Decimal(order.value).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              {sellStats && (
                <tfoot>
                  <tr className="font-bold bg-secondary">
                    <td className="p-2 border border-border">
                      Average: {sellStats.avgPrice.toFixed(2)}
                    </td>
                    <td className="p-2 border border-border">
                      Total: {sellStats.totalRemain.toFixed(8)}
                    </td>
                    <td className="p-2 border border-border">
                      Total: {sellStats.totalValue.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </TabsContent>
      </SwipeableTabs>
    </div>
  );
}
