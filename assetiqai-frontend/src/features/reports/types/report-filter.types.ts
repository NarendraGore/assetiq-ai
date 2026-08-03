import type { DateRange, Sorting } from "./report.types";

export interface ReportFilters extends Sorting {
  search: string;

  categoryId?: string;

  supplierId?: string;

  transactionType?: number;

  dateRange: DateRange;

  page: number;

  pageSize: number;
}