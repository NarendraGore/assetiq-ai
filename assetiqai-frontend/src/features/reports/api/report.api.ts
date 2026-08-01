import api from "@/lib/axios";

import type {
  ReportFilters,
  ReportResponse,
} from "../types";

export const reportEndpoints = {
  inventory: "/reports/inventory",
  stock: "/reports/stock",
} as const;

/**
 * Builds URLSearchParams from report filters.
 */
export function buildReportQueryParams(
  filters: ReportFilters,
  pageIndex = 1,
  pageSize = 10,
  sortBy?: string,
  sortDirection?: "asc" | "desc",
): URLSearchParams {
  const params = new URLSearchParams();

  params.set(
  "page",
  String(filters.page ?? pageIndex),
);

params.set(
  "pageSize",
  String(filters.pageSize ?? pageSize),
);

  if (filters.search.trim()) {
    params.set("search", filters.search);
  }

  if (filters.categoryId) {
    params.set("categoryId", filters.categoryId);
  }

  if (filters.supplierId) {
    params.set("supplierId", filters.supplierId);
  }

  if (filters.transactionType !== undefined) {
    params.set(
      "transactionType",
      filters.transactionType.toString(),
    );
  }

  if (filters.dateRange.from) {
    params.set(
      "fromDate",
      filters.dateRange.from.toISOString(),
    );
  }

  if (filters.dateRange.to) {
    params.set(
      "toDate",
      filters.dateRange.to.toISOString(),
    );
  }

  if (sortBy) {
    params.set("sortBy", sortBy);
  }

  if (sortDirection) {
    params.set("sortDirection", sortDirection);
  }

  return params;
}

export async function getReport<T>(
  endpoint: string,
  params: URLSearchParams,
): Promise<ReportResponse<T>> {
  try {
    const { data } = await api.get<ReportResponse<T>>(
      `${endpoint}?${params.toString()}`,
    );
    
    return data;
  } catch (error) {
    throw error;
  }
}