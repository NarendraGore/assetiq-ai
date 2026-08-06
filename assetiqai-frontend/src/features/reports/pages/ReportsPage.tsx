"use client";

import { ReportFilterProvider } from "../context/ReportFilterContext";

import { ReportHeader, ReportFilterBar, ReportSection } from "../components";

/**
 * The filter provider must wrap the filter bar and the sections: the bar writes
 * the active filters and each table reads them to build its query key.
 */
export default function ReportsPage() {
  return (
    <ReportFilterProvider>
      <main className="space-y-6">
        <ReportHeader />

        <ReportFilterBar />

        <ReportSection />
      </main>
    </ReportFilterProvider>
  );
}
