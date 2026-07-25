import api from "./api";

export const reportService = {
  getInventoryReport: (params?: unknown) =>
    api.get("/reports/inventory", { params }),

  getStockReport: (params?: unknown) =>
    api.get("/reports/stock", { params }),

  getDashboardReport: () =>
    api.get("/reports/dashboard"),
};