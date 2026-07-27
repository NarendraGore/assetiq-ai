import { debug } from "console";
import api from "./api";

import {
  InventoryResponse,
  StockHistoryResponse,
  InventoryItem,
  StockInDto,
  StockOutDto,
  StockAdjustDto,
  StockMessageResponse,
} from "@/types/stock";

const stockService = {
  getInventory: async (
    page = 1,
    pageSize = 10,
    search = ""
  ) => {
    const response =
      await api.get<InventoryResponse>(
        "/v1/stock/inventory",
        {
          params: {
            Page: page,
            PageSize: pageSize,
            Search: search,
          },
        }
      );

    return response.data;
  },

  getHistory: async (
    page = 1,
    pageSize = 10,
    search = "",
    transactionType?: number,
    fromDate?: string,
    toDate?: string
  ) => {
    const response =
      await api.get<StockHistoryResponse>(
        "/v1/stock/history",
        {
          params: {
            Page: page,
            PageSize: pageSize,
            Search: search,
            TransactionType:
              transactionType,
            FromDate: fromDate,
            ToDate: toDate,
          },
        }
      );

    return response.data;
  },

  getLowStock: async () => {
    const response =
      await api.get<InventoryItem[]>(
        "/v1/stock/low-stock"
      );

    return response.data;
  },

  stockIn: async (
    data: StockInDto
  ) => {
    
    const response =
      await api.post<StockMessageResponse>(
        "/v1/stock/in",
        data
      );

    return response.data;
  },

  stockOut: async (
    data: StockOutDto
  ) => {
    const response =
      await api.post<StockMessageResponse>(
        "/v1/stock/out",
        data
      );

    return response.data;
  },

  adjustStock: async (
    data: StockAdjustDto
  ) => {
    const response =
      await api.post<StockMessageResponse>(
        "/v1/stock/adjust",
        data
      );

    return response.data;
  },
};

export default stockService;