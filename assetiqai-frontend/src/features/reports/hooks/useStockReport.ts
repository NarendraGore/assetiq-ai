"use client";

import { useQuery } from "@tanstack/react-query";

import { getStockReport } from "../api/stock-report.api";
import { buildReportQueryParams } from "../api/report.api";

import type { ReportFilters, StockReportResponse } from "../types";

interface UseStockReportOptions {
  filters: ReportFilters;
}

export function useStockReport({ filters }: UseStockReportOptions) {
  /**
   * Key off the exact query string that will be sent — see the note in
   * `useInventoryReport` for why the hand-listed key was wrong.
   */
  const queryString = buildReportQueryParams(filters).toString();

  return useQuery<StockReportResponse>({
    queryKey: ["reports", "stock", queryString],

    queryFn: () =>
      getStockReport({
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
