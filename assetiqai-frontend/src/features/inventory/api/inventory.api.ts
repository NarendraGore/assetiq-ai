import axios from "@/lib/axios";

import type {
  InventoryItem,
  InventoryListResponse,
  InventoryQueryParams,
  StockAdjustRequest,
  StockHistoryQueryParams,
  StockHistoryResponse,
  StockInRequest,
  StockMutationResponse,
  StockOutRequest,
} from "../types";


const BASE_URL = "/v1/stock";

export const inventoryApi = {
  async getInventory(
    params: InventoryQueryParams = {},
  ): Promise<InventoryListResponse> {
    const { data } = await axios.get<InventoryListResponse>(
      `${BASE_URL}/inventory`,
      { params },
    );

    return data;
  },

  async getLowStock(): Promise<InventoryItem[]> {
    const { data } = await axios.get<InventoryItem[]>(`${BASE_URL}/low-stock`);

    return data;
  },

  async getStockHistory(
    params: StockHistoryQueryParams = {},
  ): Promise<StockHistoryResponse> {
    const { data } = await axios.get<StockHistoryResponse>(
      `${BASE_URL}/history`,
      { params },
    );

    return data;
  },

  async stockIn(payload: StockInRequest): Promise<StockMutationResponse> {
    const { data } = await axios.post<StockMutationResponse>(
      `${BASE_URL}/in`,
      payload,
    );

    return data;
  },

  async stockOut(payload: StockOutRequest): Promise<StockMutationResponse> {
    const { data } = await axios.post<StockMutationResponse>(
      `${BASE_URL}/out`,
      payload,
    );

    return data;
  },

  async adjustStock(
    payload: StockAdjustRequest,
  ): Promise<StockMutationResponse> {
    const { data } = await axios.post<StockMutationResponse>(
      `${BASE_URL}/adjust`,
      payload,
    );

    return data;
  },
};
