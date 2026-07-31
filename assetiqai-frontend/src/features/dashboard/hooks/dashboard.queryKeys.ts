import type { DashboardFilter } from "../types/dashboard-filter.types";

export const dashboardKeys = {
  all: ["dashboard"] as const,

  summary: (filter: DashboardFilter) =>
    [...dashboardKeys.all, "summary", filter] as const,

  inventorySummary: (filter: DashboardFilter) =>
    [...dashboardKeys.all, "inventory-summary", filter] as const,

  inventoryChart: (filter: DashboardFilter) =>
    [...dashboardKeys.all, "inventory-chart", filter] as const,

  stockChart: (filter: DashboardFilter) =>
    [...dashboardKeys.all, "stock-chart", filter] as const,

  categoryChart: (filter: DashboardFilter) =>
    [...dashboardKeys.all, "category-chart", filter] as const,

  supplierChart: (filter: DashboardFilter) =>
    [...dashboardKeys.all, "supplier-chart", filter] as const,

  recentTransactions: (filter: DashboardFilter) =>
    [...dashboardKeys.all, "recent-transactions", filter] as const,

  lowStock: (filter: DashboardFilter) =>
    [...dashboardKeys.all, "low-stock", filter] as const,

  outOfStock: (filter: DashboardFilter) =>
    [...dashboardKeys.all, "out-of-stock", filter] as const,
};