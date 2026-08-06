

export interface DateRange {
  from?: Date;
  to?: Date;
}


export type DateRangePreset =
  | "today"
  | "last7Days"
  | "last30Days"
  | "thisMonth"
  | "thisYear"
  | "allTime";


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

    case "allTime":


      return {};
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


export type ReportTab = "inventory" | "stock";

export interface ReportResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface BaseReportEntity {
  id: string;

  createdAt: string;

  updatedAt?: string;
}