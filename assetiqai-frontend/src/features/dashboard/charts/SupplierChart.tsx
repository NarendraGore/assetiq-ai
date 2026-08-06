"use client";

import * as React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import ChartSkeleton from "./ChartSkeleton";
import EmptyState from "../components/EmptyState";

import { useDashboardFilter, useSupplierChart } from "../hooks";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
  "#db2777",
  "#4f46e5",
];

/**
 * Vertical center of the donut, in pixels from the top of the chart area. The
 * wrapper is 360px tall with a ~60px legend strip pinned to the bottom, so
 * 150px sits in the middle of the remaining donut area and lets the HTML
 * overlay label land on the exact same point.
 */
const DONUT_CY = 150;

export default function SupplierChart() {
  const { filter } = useDashboardFilter();

  const { data = [], isLoading, isError, error } = useSupplierChart(filter);

  // With many suppliers the legend becomes unreadable. Keep the top 7 slices
  // by product count and roll the rest into "Other" for clarity.
  const processedData = React.useMemo(() => {
    if (data.length <= 7) return data;

    const sorted = [...data].sort((a, b) => b.productCount - a.productCount);
    const top = sorted.slice(0, 7);
    const rest = sorted.slice(7);

    if (rest.length === 0) return top;

    const otherCount = rest.reduce((sum, item) => sum + item.productCount, 0);
    return [...top, { supplierName: "Other", productCount: otherCount }];
  }, [data]);

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load suppliers"
        description={error?.message ?? "Something went wrong."}
      />
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        title="No Supplier Data"
        description="Supplier distribution is unavailable."
      />
    );
  }

  const totalProducts = processedData.reduce(
    (sum, item) => sum + item.productCount,
    0,
  );

  const singleSupplier = processedData.length === 1;

  const sliceColor = (name: string, index: number) =>
    name === "Other" ? "#94a3b8" : COLORS[index % COLORS.length];

  return (
    <div className="relative h-[360px] w-full">
      {/*
        Center label rendered as an HTML overlay pinned to the donut's exact
        center (DONUT_CY). Percentage-based SVG <text> is relative to the whole
        viewport, which the bottom legend shifts downward — an absolute overlay
        tied to the same cy keeps the count perfectly centered in the ring.
      */}
      <div
        className="pointer-events-none absolute inset-x-0 z-10 flex flex-col items-center"
        style={{ top: DONUT_CY, transform: "translateY(-50%)" }}
      >
        <span className="text-3xl font-bold leading-none tabular-nums text-foreground">
          {totalProducts.toLocaleString("en-IN")}
        </span>
        <span className="mt-1 text-xs font-medium text-muted-foreground">
          Products
        </span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 10, right: 20, left: 20, bottom: 20 }}>
          <Pie
            data={processedData}
            dataKey="productCount"
            nameKey="supplierName"
            cx="50%"
            cy={DONUT_CY}
            innerRadius={72}
            outerRadius={110}
            paddingAngle={2}
            cornerRadius={8}
            stroke="var(--background)"
            strokeWidth={2}
            label={false}
            labelLine={false}
          >
            {processedData.map((item, index) => (
              <Cell key={index} fill={sliceColor(item.supplierName, index)} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, _name, item) => [
              `${Number(value) || 0} Products`,
              String(item?.payload?.supplierName ?? ""),
            ]}
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
            }}
            itemStyle={{
              color: "var(--foreground)",
            }}
          />

          {!singleSupplier && (
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              height={60}
              wrapperStyle={{
                paddingTop: 12,
              }}
              formatter={(value) => (
                <span
                  style={{
                    color: "var(--foreground)",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {value}
                </span>
              )}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
