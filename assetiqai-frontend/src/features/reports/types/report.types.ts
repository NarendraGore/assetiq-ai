export interface DateRange {
  fromDate?: Date;
  toDate?: Date;
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