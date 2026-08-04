"use client";

import { useQuery } from "@tanstack/react-query";

import { getInventoryReport } from "../api/inventory-report.api";
import { buildReportQueryParams } from "../api/report.api";

import type { InventoryReportResponse, ReportFilters } from "../types";

interface UseInventoryReportOptions {
  filters: ReportFilters;
}

export function useInventoryReport({ filters }: UseInventoryReportOptions) {
  /**
   * Key off the exact query string that will be sent. The previous version
   * hand-listed fields — including `startDate`/`endDate`, which do not exist on
   * `ReportFilters` — so the key silently omitted the date range and cached
   * results leaked across different windows.
   */
  const queryString = buildReportQueryParams(filters).toString();

  return useQuery<InventoryReportResponse>({
    queryKey: ["reports", "inventory", queryString],

    queryFn: () =>
      getInventoryReport({
        filters,
        pageIndex: filters.page,
        pageSize: filters.pageSize,
        sortBy: filters.sortBy,
        sortDirection: filters.sortDirection,
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
