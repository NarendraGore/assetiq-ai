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

import { useInventoryChart } from "../hooks";

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#1d4ed8"];

export default function InventoryTrendChart() {
  const { data = [], isLoading, isError, error } = useInventoryChart();

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
          data={data}
          margin={{
            top: 16,
            right: 20,
            left: 0,
            bottom: 8,
          }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            className="stroke-slate-200 dark:stroke-slate-700"
          />

          <XAxis
            dataKey="productName"
            tickLine={false}
            axisLine={false}
            className="fill-slate-500 dark:fill-slate-400"
          />

          <YAxis
            tickFormatter={(value) => `₹${value}`}
            tickLine={false}
            axisLine={false}
            className="fill-slate-500 dark:fill-slate-400"
          />

          <Tooltip
            cursor={{ fill: "rgba(59,130,246,.08)" }}
            formatter={(value: number) => [
              `₹${value.toLocaleString("en-IN")}`,
              "Inventory Value",
            ]}
            labelFormatter={(label) => `Product : ${label}`}
          />

          <Bar dataKey="inventoryValue" radius={[10, 10, 0, 0]} maxBarSize={70}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
