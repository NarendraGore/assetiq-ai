import type {
  InventoryReport,
  ReportFilters,
  ReportResponse,
  SortDirection,
} from "../types";

import {
  buildReportQueryParams,
  getReport,
  reportEndpoints,
} from "./report.api";

interface InventoryReportParams {
  filters: ReportFilters;
  pageIndex: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: SortDirection;
}

export async function getInventoryReport({
  filters,
  pageIndex,
  pageSize,
  sortBy,
  sortDirection,
}: InventoryReportParams): Promise<
  ReportResponse<InventoryReport>
> {
  const params = buildReportQueryParams(
    filters,
    pageIndex,
    pageSize,
    sortBy,
    sortDirection,
  );

  return getReport<InventoryReport>(
    reportEndpoints.inventory,
    params,
  );
}