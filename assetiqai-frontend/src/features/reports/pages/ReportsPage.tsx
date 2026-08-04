"use client";

import { ReportFilterProvider } from "../context/ReportFilterContext";

import { ReportHeader, ReportFilterBar, ReportSection } from "../components";

/**
 * The filter provider must wrap the header, the filter bar and the sections:
 * `ReportHeader` reads the active filters to build its export payload, and each
 * table reads them to build its query key.
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
