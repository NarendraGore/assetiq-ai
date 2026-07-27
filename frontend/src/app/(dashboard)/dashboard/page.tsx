"use client";

import { useState } from "react";

import {
  DashboardHeader,
  DashboardFilters,
  DashboardCards,
  DashboardCharts,
  DashboardTables,
} from "@/components/dashboard";

export default function DashboardPage() {
  const [range, setRange] =
    useState("today");

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <DashboardHeader />

        <DashboardFilters
          value={range}
          onChange={setRange}
        />

      </div>

      <DashboardCards />

      <DashboardCharts />

      <DashboardTables />

    </div>
  );
}