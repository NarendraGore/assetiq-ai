import type {
  InventoryQueryParams,
  StockHistoryQueryParams,
} from "../types";


export const inventoryKeys = {
  all: ["inventory"] as const,

  lists: () => [...inventoryKeys.all, "list"] as const,
  list: (filters: InventoryQueryParams) =>
    [...inventoryKeys.lists(), filters] as const,

  lowStock: () => [...inventoryKeys.all, "low-stock"] as const,

  history: () => [...inventoryKeys.all, "history"] as const,
  historyList: (filters: StockHistoryQueryParams) =>
    [...inventoryKeys.history(), filters] as const,
};
