import api from "@/lib/axios";

import type {
  Pagination,
  ReportFilters,
  ReportResponse,
  SortDirection,
} from "../types";
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

/**
 * Shapes the reports endpoints have actually been observed to return.
 *
 * The rest of this feature is written against the canonical
 * `{ data, pagination }` contract, but the API mirrors the paging envelope used
 * by `/products`, `/categories` and `/suppliers` — `{ items, totalCount, page,
 * pageSize, totalPages }` — and the un-paged endpoints return a bare array.
 * Reading `response.pagination.totalRecords` therefore threw a TypeError before
 * anything could render. Normalising here keeps that mismatch at the API
 * boundary instead of leaking into every component.
 */
type RawReportResponse<T> =
  | T[]
  | {
      data?: T[];
      items?: T[];
      pagination?: Partial<Pagination> & { totalCount?: number };
      totalRecords?: number;
      totalCount?: number;
      page?: number;
      pageNumber?: number;
      pageSize?: number;
      totalPages?: number;
    }
  | null
  | undefined;

export function normalizeReportResponse<T>(
  raw: RawReportResponse<T>,
  fallbackPage = 1,
  fallbackPageSize = 10,
): ReportResponse<T> {
  if (!raw) {
    return {
      data: [],
      pagination: {
        page: fallbackPage,
        pageSize: fallbackPageSize,
        totalRecords: 0,
        totalPages: 0,
      },
    };
  }

  if (Array.isArray(raw)) {
    return {
      data: raw,
      pagination: {
        page: 1,
        pageSize: raw.length || fallbackPageSize,
        totalRecords: raw.length,
        totalPages: raw.length ? 1 : 0,
      },
    };
  }

  const rows = raw.data ?? raw.items ?? [];

  const page =
    raw.pagination?.page ?? raw.page ?? raw.pageNumber ?? fallbackPage;

  const pageSize =
    raw.pagination?.pageSize ?? raw.pageSize ?? fallbackPageSize;

  const totalRecords =
    raw.pagination?.totalRecords ??
    raw.pagination?.totalCount ??
    raw.totalRecords ??
    raw.totalCount ??
    rows.length;

  const totalPages =
    raw.pagination?.totalPages ??
    raw.totalPages ??
    (pageSize > 0 ? Math.ceil(totalRecords / pageSize) : 0);

  return {
    data: rows,
    pagination: { page, pageSize, totalRecords, totalPages },
  };
}

export async function getReport<T>(
  endpoint: string,
  params: URLSearchParams,
): Promise<ReportResponse<T>> {
  const { data } = await api.get<RawReportResponse<T>>(
    `${endpoint}?${params.toString()}`,
  );

  const requestedPage = Number(params.get("page"));
  const requestedPageSize = Number(params.get("pageSize"));

  return normalizeReportResponse<T>(
    data,
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1,
    Number.isFinite(requestedPageSize) && requestedPageSize > 0
      ? requestedPageSize
      : 10,
  );
}
