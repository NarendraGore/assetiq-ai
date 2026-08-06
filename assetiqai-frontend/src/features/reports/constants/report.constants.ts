import type { DateRangePreset, ReportFilters } from "../types";
import { resolveDateRangePreset } from "../types";


export const DEFAULT_DATE_RANGE_PRESET: DateRangePreset = "last30Days";


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
