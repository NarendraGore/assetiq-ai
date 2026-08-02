"use client";

import { useQuery } from "@tanstack/react-query";

import { getInventoryReport } from "../api/inventory-report.api";

import type {
  InventoryReportResponse,
  ReportFilters,
} from "../types";

interface UseInventoryReportOptions {
  filters: ReportFilters;
}

export function useInventoryReport({
  filters,
}: UseInventoryReportOptions) {
  const {
    page,
    pageSize,
    search,
    categoryId,
    supplierId,
    transactionType,
    startDate,
    endDate,
    sortBy,
    sortOrder,
  } = filters;

  return useQuery<InventoryReportResponse>({
    queryKey: [
      "reports",
      "inventory",
      page,
      pageSize,
      search,
      categoryId,
      supplierId,
      transactionType,
      startDate,
      endDate,
      sortBy,
      sortOrder,
    ],

    queryFn: () =>
      getInventoryReport({
        filters,
        pageIndex: page,
        pageSize,
        sortBy,
        sortDirection: sortOrder,
      }),

    placeholderData: (previousData) => previousData,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 1,

    refetchOnMount: false,

    refetchOnWindowFocus: false,

    refetchOnReconnect: true,
  });
}