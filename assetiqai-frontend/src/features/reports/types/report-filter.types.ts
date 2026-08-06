import type { DateRange, DateRangePreset, Sorting } from "./report.types";

export interface ReportFilters extends Sorting {
  search: string;

  categoryId?: string;

  supplierId?: string;

  transactionType?: number;

  dateRange: DateRange;


  dateRangePreset?: DateRangePreset;

  page: number;

  pageSize: number;
}