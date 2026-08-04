import type { DateRangePreset, ReportFilters } from "../types";
import { resolveDateRangePreset } from "../types";

/** The window a report opens on before the user touches anything. */
export const DEFAULT_DATE_RANGE_PRESET: DateRangePreset = "last30Days";

/**
 * Single source of truth for filter defaults. `ReportFilterContext` used to
 * keep a second, subtly different copy of this object; both now read from here
 * so "reset" and "initial load" can never diverge.
 */
export function createDefaultReportFilters(): ReportFilters {
  return {
    search: "",
    categoryId: undefined,
    supplierId: undefined,
    transactionType: undefined,

    dateRange: resolveDateRangePreset(DEFAULT_DATE_RANGE_PRESET),
    dateRangePreset: DEFAULT_DATE_RANGE_PRESET,

    page: 1,
    pageSize: 10,

    sortBy: undefined,
    sortDirection: "desc",
  };
}

export const DEFAULT_REPORT_FILTERS: ReportFilters =
  createDefaultReportFilters();
