"use client";

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

import { useCategoryChart, useDashboardFilter } from "../hooks";

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

export default function CategoryChart() {
  const { filter } = useDashboardFilter();

  const { data = [], isLoading, isError, error } = useCategoryChart(filter);

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load categories"
        description={error?.message ?? "Something went wrong."}
      />
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        title="No Category Data"
        description="Category distribution is unavailable."
      />
    );
  }

  const totalProducts = data.reduce((sum, item) => sum + item.productCount, 0);

  const singleCategory = data.length === 1;

  return (
    <div className="h-[360px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <Pie
            data={data}
            dataKey="productCount"
            nameKey="categoryName"
            cx="50%"
            cy="44%"
            innerRadius={72}
            outerRadius={110}
            paddingAngle={2}
            cornerRadius={8}
            stroke="var(--background)"
            strokeWidth={2}
            label={false}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          {/* Center Value */}
          <text
            x="50%"
            y="42%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fill: "var(--foreground)",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {totalProducts}
          </text>

          {/* Center Label */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fill: "var(--muted-foreground)",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Products
          </text>

          <Tooltip
            formatter={(value, _name, item) => [
              `${Number(value) || 0} Products`,
              String(item?.payload?.categoryName ?? ""),
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

          {!singleCategory && (
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{
                paddingTop: 18,
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
