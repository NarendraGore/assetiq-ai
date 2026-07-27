import { useQuery } from "@tanstack/react-query";

import stockService from "@/services/stock.service";

import { QUERY_KEYS } from "@/constants/query-keys";

interface UseStockHistoryParams {
  page: number;
  pageSize: number;
  search: string;
  transactionType?: number;
  fromDate?: string;
  toDate?: string;
}

export function useStockHistory({
  page,
  pageSize,
  search,
  transactionType,
  fromDate,
  toDate,
}: UseStockHistoryParams) {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.stockHistory,
      page,
      pageSize,
      search,
      transactionType,
      fromDate,
      toDate,
    ],

    queryFn: () =>
      stockService.getHistory(
        page,
        pageSize,
        search,
        transactionType,
        fromDate,
        toDate
      ),
  });
}