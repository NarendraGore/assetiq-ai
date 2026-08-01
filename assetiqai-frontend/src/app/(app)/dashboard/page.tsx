"use client";

import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import FilterTabs from "@/features/dashboard/components/filters/FilterTabs";

import DashboardSummary from "@/features/dashboard/components/sections/DashboardSummary";
import DashboardCharts from "@/features/dashboard/components/sections/DashboardCharts";
import DashboardTables from "@/features/dashboard/components/sections/DashboardTables";

import { DashboardFilterProvider } from "@/features/dashboard/context/DashboardFilterContext";

export default function DashboardPage() {
  return (
    <DashboardFilterProvider>
      <div className="space-y-6">
        <DashboardHeader
          title="Dashboard"
          description="Monitor your inventory and business overview."
        />

        <FilterTabs />

        <DashboardSummary />

        <DashboardCharts />

        <DashboardTables />
      </div>
    </DashboardFilterProvider>
  );
}
