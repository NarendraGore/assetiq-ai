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

  return useQuery<StockReportResponse>({
    queryKey: [
      "reports",
      "stock",
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
      getStockReport({
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