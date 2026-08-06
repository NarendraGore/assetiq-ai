"use client";

import { useMemo } from "react";
import {
  AlertTriangle,
  Boxes,
  PackageCheck,
  PackageX,
  Wallet,
  XCircle,
} from "lucide-react";

import SummaryCard from "../cards/SummaryCard";
import DashboardSkeleton from "../skeleton/DashboardSkeleton";
import EmptyState from "../EmptyState";

import { DataTableError } from "@/components/tables";
import { formatCurrency } from "@/lib/utils/formatCurrency";

import { useDashboardSummary } from "../../hooks/useDashboardSummary";
import { useDashboardFilter } from "../../hooks/useDashboardFilter";

export default function DashboardSummary() {
  const { filter } = useDashboardFilter();

  /**
   * All six cards come from this one endpoint. Sourcing half of them from
   * `inventory-summary` doubled the request count for values the summary
   * already returns, and meant either call failing blanked the whole row.
   */
  const {
    data: summary,
    isPending,
    isError,
    error,
    refetch,
  } = useDashboardSummary(filter);

  const cards = useMemo(() => {
    if (!summary) return [];

    return [
      {
        title: "Total Products",
        value: summary.totalProducts,
        subtitle: "Inventory Overview",
        icon: Boxes,
        color: "bg-blue-600",
      },
      {
        title: "Active Products",
        value: summary.activeProducts,
        subtitle: "Currently Available",
        icon: PackageCheck,
        color: "bg-emerald-600",
      },
      {
        title: "Inactive Products",
        value: summary.inactiveProducts,
        subtitle: "Currently Disabled",
        icon: XCircle,
        color: "bg-slate-600",
      },
      {
        title: "Inventory Value",
        value: formatCurrency(summary.totalInventoryValue),
        subtitle: "Current Stock Value",
        icon: Wallet,
        color: "bg-violet-600",
      },
      {
        title: "Low Stock",
        value: summary.lowStockProducts,
        subtitle: "Requires Attention",
        icon: AlertTriangle,
        color: "bg-amber-500",
      },
      {
        title: "Out Of Stock",
        value: summary.outOfStockProducts,
        subtitle: "Unavailable Products",
        icon: PackageX,
        color: "bg-red-600",
      },
    ];
  }, [summary]);

  /**
   * `isPending` rather than `isLoading`: with `keepPreviousData` the previous
   * period stays on screen while the next one loads, so the skeleton only
   * shows on the very first fetch instead of on every tab switch.
   */
  if (isPending) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <DataTableError
        message={
          (error as Error)?.message || "Failed to load dashboard summary."
        }
        onRetry={() => void refetch()}
      />
    );
  }

  if (!summary || cards.length === 0) {
    return (
      <EmptyState
        title="No Dashboard Data"
        description="Dashboard summary is currently unavailable."
      />
    );
  }

  return (
    <section
      aria-label="Dashboard Summary"
      className="
        grid
        grid-cols-1
        gap-5
        sm:grid-cols-2
        lg:grid-cols-3
        2xl:grid-cols-6
      "
    >
      {cards.map((card) => (
        <SummaryCard
          key={card.title}
          title={card.title}
          value={card.value}
          subtitle={card.subtitle}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </section>
  );
}
