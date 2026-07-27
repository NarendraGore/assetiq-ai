"use client";

import DashboardCard from "./DashboardCard";

import { dashboardCards } from "@/constants/dashboard";

import { DashboardSummary } from "@/types/dashboard";

interface Props {
  summary?: DashboardSummary;
}

export default function DashboardCards({
  summary,
}: Props) {
  if (!summary) return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {dashboardCards.map((card) => (
        <DashboardCard
          key={card.title}
          title={card.title}
          icon={card.icon}
          color={card.color}
          value={
            card.key === "totalInventoryValue"
              ? `₹${summary.totalInventoryValue.toLocaleString()}`
              : summary[
                  card.key as keyof DashboardSummary
                ] as number
          }
        />
      ))}
    </div>
  );
}