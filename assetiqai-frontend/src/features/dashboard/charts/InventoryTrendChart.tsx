"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import EmptyState from "../components/EmptyState";
import ChartSkeleton from "./ChartSkeleton";

import { useDashboardFilter, useInventoryChart } from "../hooks";

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#1d4ed8"];

export default function InventoryTrendChart() {
  const { filter } = useDashboardFilter();

  const { data = [], isLoading, isError, error } = useInventoryChart(filter);

  // With many products the bars become unreadable slivers. Show only the ten
  // highest-value products so the chart stays legible. The backend already
  // orders by inventory value descending, but we sort defensively and slice
  // here so this holds regardless of response order.
  const topData = [...data]
    .sort((a, b) => (b.inventoryValue ?? 0) - (a.inventoryValue ?? 0))
    .slice(0, 10);

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load inventory chart"
        description={error?.message ?? "Something went wrong."}
      />
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        title="No Inventory Data"
        description="Inventory value will appear once products are available."
      />
    );
  }

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={topData}
          margin={{
            top: 16,
            right: 20,
            left: 0,
            bottom: 8,
          }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            className="stroke-border"
          />

          <XAxis
            dataKey="productName"
            tickLine={false}
            axisLine={false}
            className="fill-muted-foreground"
          />

          <YAxis
            tickFormatter={(value) => `₹${value}`}
            tickLine={false}
            axisLine={false}
            className="fill-muted-foreground"
          />

          <Tooltip
            cursor={{ fill: "rgba(59,130,246,.08)" }}
            formatter={(value) => [
              `₹${(Number(value) || 0).toLocaleString("en-IN")}`,
              "Inventory Value",
            ]}
            labelFormatter={(label) => `Product: ${label}`}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--border)",
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            labelStyle={{
              color: "var(--foreground)",
              fontWeight: 600,
              marginBottom: 4,
            }}
            itemStyle={{
              color: "var(--foreground)",
            }}
          />

          <Bar dataKey="inventoryValue" radius={[10, 10, 0, 0]} maxBarSize={70}>
            {topData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
