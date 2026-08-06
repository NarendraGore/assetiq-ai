"use client";

import SectionCard from "../SectionCard";

import {
  InventoryTrendChart,
  StockChart,
  CategoryChart,
  SupplierChart,
} from "../../charts";

export default function DashboardCharts() {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <SectionCard
        title="Top Products by Inventory Value"
        description="Top 10 products by inventory value"
      >
        <InventoryTrendChart />
      </SectionCard>

      <SectionCard
        title="Stock In vs Stock Out"
        description="Monthly stock movement"
      >
        <StockChart />
      </SectionCard>

      <SectionCard
        title="Category Distribution"
        description="Products grouped by category"
      >
        <CategoryChart />
      </SectionCard>

      <SectionCard
        title="Supplier Distribution"
        description="Products grouped by supplier"
      >
        <SupplierChart />
      </SectionCard>
    </section>
  );
}
