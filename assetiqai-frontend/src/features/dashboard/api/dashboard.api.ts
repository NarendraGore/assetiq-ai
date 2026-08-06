import api from "@/lib/axios";

import type { DashboardFilter } from "../types/dashboard-filter.types";

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


const periodParams = (filter: DashboardFilter) => ({
  params: { period: filter },
});

export async function getSummary(
  filter: DashboardFilter,
): Promise<DashboardSummary> {
  const { data } = await api.get<DashboardSummary>(
    "/Dashboard/summary",
    periodParams(filter),
  );

  return data;
}

export async function getInventorySummary(
  filter: DashboardFilter,
): Promise<InventorySummary> {
  const { data } = await api.get<InventorySummary>(
    "/Dashboard/inventory-summary",
    periodParams(filter),
  );

  return data;
}

export async function getCategoryChart(
  filter: DashboardFilter,
): Promise<CategoryChart[]> {
  const { data } = await api.get<CategoryChart[]>(
    "/Dashboard/category-chart",
    periodParams(filter),
  );

  return data;
}

export async function getSupplierChart(
  filter: DashboardFilter,
): Promise<SupplierChart[]> {
  const { data } = await api.get<SupplierChart[]>(
    "/Dashboard/supplier-chart",
    periodParams(filter),
  );

  return data;
}

export async function getInventoryChart(
  filter: DashboardFilter,
): Promise<InventoryChart[]> {
  const { data } = await api.get<InventoryChart[]>(
    "/Dashboard/inventory-chart",
    periodParams(filter),
  );

  return data;
}

export async function getStockChart(
  filter: DashboardFilter,
): Promise<StockChart[]> {
  const { data } = await api.get<StockChart[]>(
    "/Dashboard/stock-chart",
    periodParams(filter),
  );

  return data;
}

export async function getRecentTransactions(
  filter: DashboardFilter,
): Promise<RecentTransaction[]> {
  const { data } = await api.get<RecentTransaction[]>(
    "/Dashboard/recent-transactions",
    periodParams(filter),
  );

  return data;
}

export async function getLowStock(
  filter: DashboardFilter,
): Promise<LowStockProduct[]> {
  const { data } = await api.get<LowStockProduct[]>(
    "/Dashboard/low-stock",
    periodParams(filter),
  );

  return data;
}

export async function getOutOfStock(
  filter: DashboardFilter,
): Promise<OutOfStockProduct[]> {
  const { data } = await api.get<OutOfStockProduct[]>(
    "/Dashboard/out-of-stock",
    periodParams(filter),
  );

  return data;
}
