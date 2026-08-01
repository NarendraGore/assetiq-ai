import type {
  InventoryReport,
  ReportFilters,
  ReportResponse,
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
  sortDirection?: "asc" | "desc";
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