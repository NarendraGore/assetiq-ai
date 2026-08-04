import type { DateRange, DateRangePreset, Sorting } from "./report.types";

export interface ReportFilters extends Sorting {
  search: string;

  categoryId?: string;

  supplierId?: string;

  transactionType?: number;

  dateRange: DateRange;

  /**
   * Which shortcut produced `dateRange`, if any. Purely presentational — the
   * API only ever sees the resolved `dateRange`. Kept so the active preset
   * button stays highlighted across re-renders.
   */
  dateRangePreset?: DateRangePreset;

  page: number;

  pageSize: number;
}