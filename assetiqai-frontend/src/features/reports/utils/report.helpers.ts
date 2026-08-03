import type {
  ReportFilters,
  SortOrder,
} from "../types";

export function normalizeFilters(
  filters: ReportFilters,
): ReportFilters {
  return {
    ...filters,

    search: filters.search.trim(),

    page: Math.max(1, filters.page),

    pageSize: Math.max(1, filters.pageSize),
  };
}

export function buildReportQuery(
  filters: ReportFilters,
): URLSearchParams {
  const params = new URLSearchParams();

  const normalized = normalizeFilters(filters);

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
    params.set(
      "transactionType",
      String(normalized.transactionType),
    );
  }

  if (normalized.fromDate) {
    params.set("fromDate", normalized.fromDate);
  }

  if (normalized.toDate) {
    params.set("toDate", normalized.toDate);
  }

  params.set("page", String(normalized.page));
  params.set("pageSize", String(normalized.pageSize));

  if (normalized.sortBy) {
    params.set("sortBy", normalized.sortBy);
  }

  params.set(
    "sortOrder",
    normalized.sortOrder,
  );

  return params;
}

export function serializeFilters(
  filters: ReportFilters,
): string {
  return buildReportQuery(filters).toString();
}

export function formatExportFilename(
  reportName: string,
  extension: "csv" | "xlsx",
): string {
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-");

  return `${reportName}-${timestamp}.${extension}`;
}

export function clearFilters(): ReportFilters {
  return {
    search: "",

    categoryId: undefined,

    supplierId: undefined,

    transactionType: undefined,

    fromDate: undefined,

    toDate: undefined,

    page: 1,

    pageSize: 10,

    sortBy: undefined,

    sortOrder: "desc" satisfies SortOrder,
  };
}