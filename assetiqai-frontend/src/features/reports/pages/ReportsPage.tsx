"use client";

import { useState } from "react";

import { ReportFilterProvider } from "../context/ReportFilterContext";

import { ReportHeader, ReportFilterBar, ReportSection } from "../components";

import type { ReportTab } from "../types";


export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportTab>("inventory");

  return (
    <ReportFilterProvider>
      <main className="space-y-6">
        <ReportHeader />

        <ReportFilterBar activeTab={activeTab} />

        <ReportSection activeTab={activeTab} onTabChange={setActiveTab} />
      </main>
    </ReportFilterProvider>
  );
}
