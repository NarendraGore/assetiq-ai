import type { ReportFilters } from "../types";

/**
 * Clamp and trim user-entered filter values before they reach the API.
 *
 * `buildReportQueryParams` in `../api/report.api.ts` is the only query-string
 * builder. This file used to carry a second, divergent copy (`buildReportQuery`
 * / `serializeFilters` / `clearFilters`) that referenced fields which never
 * existed on `ReportFilters` — `fromDate`, `toDate`, `sortOrder` — so it could
 * not have compiled. It has been removed rather than repaired.
 */
export function normalizeFilters(filters: ReportFilters): ReportFilters {
  return {
    ...filters,

    search: filters.search.trim(),

    page: Math.max(1, Math.trunc(filters.page)),

    pageSize: Math.min(200, Math.max(1, Math.trunc(filters.pageSize))),
  };
}

export function formatExportFilename(
  reportName: string,
  extension: "csv" | "xlsx",
): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

  return `${reportName}-${timestamp}.${extension}`;
}
