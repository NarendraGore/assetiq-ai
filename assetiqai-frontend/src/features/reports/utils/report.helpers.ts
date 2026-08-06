import type { ReportFilters } from "../types";


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
