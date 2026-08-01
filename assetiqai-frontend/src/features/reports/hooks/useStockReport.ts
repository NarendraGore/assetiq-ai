"use client";

import { useQuery } from "@tanstack/react-query";

import { getStockReport } from "../api/stock-report.api";

import type {
  ReportFilters,
  StockReportResponse,
} from "../types";

interface UseStockReportOptions {
  filters: ReportFilters;
}

export function useStockReport({
  filters,
}: UseStockReportOptions) {
  return useQuery<StockReportResponse>({
    queryKey: ["reports", "stock", filters],

    queryFn: () =>
      getStockReport({
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