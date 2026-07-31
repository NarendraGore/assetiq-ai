"use client";

import {
  Boxes,
  PackageCheck,
  PackageX,
  Wallet,
  AlertTriangle,
  Ban,
} from "lucide-react";

import SummaryCard from "./SummaryCard";

import DashboardSkeleton from "../skeleton/DashboardSkeleton";
import EmptyState from "../EmptyState";
import { DataTableError } from "@/components/tables";

import { useDashboardSummary } from "../../hooks";

export default function SummaryCards() {
  const { data, isLoading, isError, refetch } = useDashboardSummary();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <DataTableError
        message="Failed to load dashboard summary."
        onRetry={() => refetch()}
      />
    );
  }

  if (!data) {
    return (
      <EmptyState
        title="No Dashboard Data"
        description="No summary is available."
      />
    );
  }

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <SummaryCard
        title="Total Products"
        value={data.totalProducts}
        icon={Boxes}
      />

      <SummaryCard
        title="Active Products"
        value={data.activeProducts}
        icon={PackageCheck}
        color="success"
      />

      <SummaryCard
        title="Inactive Products"
        value={data.inactiveProducts}
        icon={PackageX}
        color="danger"
      />

      <SummaryCard
        title="Inventory Value"
        value={`₹${data.totalInventoryValue.toLocaleString()}`}
        icon={Wallet}
      />

      <SummaryCard
        title="Low Stock"
        value={data.lowStockProducts}
        icon={AlertTriangle}
        color="warning"
      />

      <SummaryCard
        title="Out Of Stock"
        value={data.outOfStockProducts}
        icon={Ban}
        color="danger"
      />
    </section>
  );
}
