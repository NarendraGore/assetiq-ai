import type { ReportFilters } from "../types";

export const DEFAULT_REPORT_FILTERS: ReportFilters = {
  search: "",
  categoryId: undefined,
  supplierId: undefined,
  transactionType: undefined,

  dateRange: "last30Days",

  page: 1,
  pageSize: 10,

  sortBy: undefined,
  sortOrder: "desc",
};