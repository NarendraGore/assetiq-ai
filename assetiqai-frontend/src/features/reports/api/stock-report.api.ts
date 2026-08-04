import type {
  ReportFilters,
  ReportResponse,
  SortDirection,
  StockReport,
} from "../types";

import {
  buildReportQueryParams,
  getReport,
  reportEndpoints,
} from "./report.api";

interface StockReportParams {
  filters: ReportFilters;
  pageIndex: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: SortDirection;
}

export async function getStockReport({
  filters,
  pageIndex,
  pageSize,
  sortBy,
  sortDirection,
}: StockReportParams): Promise<ReportResponse<StockReport>> {
  const params = buildReportQueryParams(
    filters,
    pageIndex,
    pageSize,
    sortBy,
    sortDirection,
  );

  return getReport<StockReport>(
    reportEndpoints.stock,
    params,
  );
}