import api from "./api";

export const dashboardService = {
  getSummary: () =>
    api.get("/dashboard/summary"),

  getRecentTransactions: () =>
    api.get("/dashboard/recent-transactions"),

  getLowStock: () =>
    api.get("/dashboard/low-stock"),

  getOutOfStock: () =>
    api.get("/dashboard/out-of-stock"),

  getCategoryChart: () =>
    api.get("/dashboard/category-chart"),

  getSupplierChart: () =>
    api.get("/dashboard/supplier-chart"),

  getInventoryChart: () =>
    api.get("/dashboard/inventory-chart"),

  getStockChart: () =>
    api.get("/dashboard/stock-chart"),
};