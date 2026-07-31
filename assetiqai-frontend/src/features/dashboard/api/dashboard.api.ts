import api from "@/lib/axios";

import type {
  DashboardSummary,
  InventorySummary,
  CategoryChart,
  SupplierChart,
  InventoryChart,
  StockChart,
  RecentTransaction,
  LowStockProduct,
  OutOfStockProduct,
} from "../types/dashboard.types";

/**
 * Dashboard Summary
 */
export async function getSummary(): Promise<DashboardSummary> {
  const { data } = await api.get<DashboardSummary>(
    "/Dashboard/summary"
  );

  return data;
}

/**
 * Inventory Summary
 */
export async function getInventorySummary(): Promise<InventorySummary> {
  const { data } = await api.get<InventorySummary>(
    "/Dashboard/inventory-summary"
  );

  return data;
}

/**
 * Category Distribution Chart
 */
export async function getCategoryChart(): Promise<CategoryChart[]> {
  const { data } = await api.get<CategoryChart[]>(
    "/Dashboard/category-chart"
  );

  return data;
}

/**
 * Supplier Distribution Chart
 */
export async function getSupplierChart(): Promise<SupplierChart[]> {
  const { data } = await api.get<SupplierChart[]>(
    "/Dashboard/supplier-chart"
  );

  return data;
}

/**
 * Inventory Trend Chart
 */
export async function getInventoryChart(): Promise<InventoryChart[]> {
  const { data } = await api.get<InventoryChart[]>(
    "/Dashboard/inventory-chart"
  );

  return data;
}

/**
 * Stock In vs Stock Out Chart
 */
export async function getStockChart(): Promise<StockChart[]> {
  const { data } = await api.get<StockChart[]>(
    "/Dashboard/stock-chart"
  );

  return data;
}

/**
 * Recent Transactions
 */
export async function getRecentTransactions(): Promise<
  RecentTransaction[]
> {
  const { data } = await api.get<RecentTransaction[]>(
    "/Dashboard/recent-transactions"
  );

  return data;
}

/**
 * Low Stock Products
 */
export async function getLowStock(): Promise<
  LowStockProduct[]
> {
  const { data } = await api.get<LowStockProduct[]>(
    "/Dashboard/low-stock"
  );

  return data;
}

/**
 * Out Of Stock Products
 */
export async function getOutOfStock(): Promise<
  OutOfStockProduct[]
> {
  const { data } = await api.get<OutOfStockProduct[]>(
    "/Dashboard/out-of-stock"
  );

  return data;
}

