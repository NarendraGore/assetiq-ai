import type {
  InventoryQueryParams,
  StockHistoryQueryParams,
} from "../types";

/**
 * React Query key factory for the inventory feature. Mirrors the pattern used
 * by `productKeys` so cache invalidation after a stock mutation is a single
 * `invalidateQueries({ queryKey: inventoryKeys.all })`.
 */
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
