import api from "@/lib/axios";

import type { ReportFilters, ReportResponse, SortDirection } from "../types";
import { normalizeFilters } from "../utils/report.helpers";

export const reportEndpoints = {
  inventory: "/reports/inventory",
  stock: "/reports/stock",
} as const;

/**
 * Builds the query string for a report request.
 *
 * `filters` is authoritative; the trailing arguments are only fallbacks for
 * callers that page/sort outside the filter object.
 */
export function buildReportQueryParams(
  filters: ReportFilters,
  pageIndex = 1,
  pageSize = 10,
  sortBy?: string,
  sortDirection?: SortDirection,
): URLSearchParams {
  const params = new URLSearchParams();

  const normalized = normalizeFilters(filters);

  params.set("page", String(normalized.page ?? pageIndex));
  params.set("pageSize", String(normalized.pageSize ?? pageSize));

  if (normalized.search) {
    params.set("search", normalized.search);
  }

  if (normalized.categoryId) {
    params.set("categoryId", normalized.categoryId);
  }

  if (normalized.supplierId) {
    params.set("supplierId", normalized.supplierId);
  }

  if (normalized.transactionType !== undefined) {
    params.set("transactionType", String(normalized.transactionType));
  }

  if (normalized.dateRange.from) {
    params.set("fromDate", normalized.dateRange.from.toISOString());
  }

  if (normalized.dateRange.to) {
    params.set("toDate", normalized.dateRange.to.toISOString());
  }

  const effectiveSortBy = sortBy ?? normalized.sortBy;

  if (effectiveSortBy) {
    params.set("sortBy", effectiveSortBy);
  }

  const effectiveSortDirection = sortDirection ?? normalized.sortDirection;

  if (effectiveSortDirection) {
    params.set("sortDirection", effectiveSortDirection);
  }

  return params;
}

export async function getReport<T>(
  endpoint: string,
  params: URLSearchParams,
): Promise<ReportResponse<T>> {
  const { data } = await api.get<ReportResponse<T>>(
    `${endpoint}?${params.toString()}`,
  );

  return data;
}
