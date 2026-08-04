"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import ChartSkeleton from "./ChartSkeleton";
import EmptyState from "../components/EmptyState";
import { useDashboardFilter, useStockChart } from "../hooks";

export default function StockChart() {
  const { filter } = useDashboardFilter();

  const { data = [], isLoading, isError, error } = useStockChart(filter);

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load stock chart"
        description={error?.message ?? "Something went wrong"}
      />
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        title="No Stock Data"
        description="No stock movement available."
      />
    );
  }

  return (
    <div className="h-[340px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            className="stroke-border"
          />

          <XAxis dataKey="month" tick={{ fontSize: 12 }} />

          <YAxis tick={{ fontSize: 12 }} />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="stockIn"
            name="Stock In"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />

          <Bar
            dataKey="stockOut"
            name="Stock Out"
            fill="#ef4444"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
