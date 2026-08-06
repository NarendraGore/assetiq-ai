"use client";

import { useState } from "react";

import { ReportFilterProvider } from "../context/ReportFilterContext";

import { ReportHeader, ReportFilterBar, ReportSection } from "../components";

import type { ReportTab } from "../types";

/**
 * The filter provider must wrap the filter bar and the sections: the bar writes
 * the active filters and each table reads them to build its query key.
 *
 * The active tab is owned here (not inside ReportSection) so the filter bar can
 * show tab-specific controls — the Transaction Type filter only affects the
 * Stock report, so it is hidden on the Inventory tab.
 */
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
