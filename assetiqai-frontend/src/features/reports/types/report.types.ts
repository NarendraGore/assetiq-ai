/**
 * Canonical report primitives.
 *
 * Before this file was unified there were three competing shapes for a date
 * range (`{fromDate,toDate}`, `{from,to}` and the bare string `"last30Days"`)
 * and two names for the sort direction (`sortDirection` vs `sortOrder`). The
 * names below are the ones the API layer actually serialises, so every other
 * module conforms to them.
 */

export interface DateRange {
  from?: Date;
  to?: Date;
}

/** Named windows the UI offers as one-click shortcuts. */
export type DateRangePreset =
  | "today"
  | "last7Days"
  | "last30Days"
  | "thisMonth"
  | "thisYear";

/**
 * Resolves a preset into concrete boundaries. Kept next to the type so the
 * preset list and the maths can never drift apart.
 */
export function resolveDateRangePreset(preset: DateRangePreset): DateRange {
  const to = new Date();
  const from = new Date(to);

  switch (preset) {
    case "today":
      from.setHours(0, 0, 0, 0);
      break;

    case "last7Days":
      from.setDate(from.getDate() - 7);
      break;

    case "last30Days":
      from.setDate(from.getDate() - 30);
      break;

    case "thisMonth":
      from.setDate(1);
      from.setHours(0, 0, 0, 0);
      break;

    case "thisYear":
      from.setMonth(0, 1);
      from.setHours(0, 0, 0, 0);
      break;
  }

  return { from, to };
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export type SortDirection = "asc" | "desc";

export interface Sorting {
  sortBy?: string;
  sortDirection?: SortDirection;
}

export type ExportType = "csv" | "excel";

export interface ReportResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface BaseReportEntity {
  id: string;

  createdAt: string;

  updatedAt?: string;
}