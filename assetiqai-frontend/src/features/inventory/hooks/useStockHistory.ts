"use client";

import { useQuery } from "@tanstack/react-query";

import { inventoryApi } from "../api";
import { inventoryKeys } from "../constants";
import type { StockHistoryQueryParams } from "../types";

/**
 * Paginated, filterable stock-transaction history.
 */
export function useStockHistory(params: StockHistoryQueryParams = {}) {
  const {
    Page = 1,
    PageSize = 10,
    Search = "",
    TransactionType,
    FromDate,
    ToDate,
  } = params;

  const queryParams: StockHistoryQueryParams = {
    Page,
    PageSize,
    Search,
    TransactionType,
    FromDate,
    ToDate,
  };

  return useQuery({
    queryKey: inventoryKeys.historyList(queryParams),
    queryFn: () => inventoryApi.getStockHistory(queryParams),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 2,
  });
}
