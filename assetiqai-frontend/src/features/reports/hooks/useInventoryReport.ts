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
  return useQuery<InventoryReportResponse>({
    queryKey: ["reports", "inventory", filters],

    queryFn: () =>
      getInventoryReport({
        filters,
        pageIndex: filters.page,
        pageSize: filters.pageSize,
        sortBy: filters.sortBy,
        sortDirection: filters.sortOrder,
      }),

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 1,

    refetchOnWindowFocus: false,

    refetchOnReconnect: true,
  });
}