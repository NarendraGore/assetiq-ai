import api from "./api";

export const inventoryService = {
  getInventory: (params?: unknown) =>
    api.get("/stock/inventory", { params }),

  getHistory: (params?: unknown) =>
    api.get("/stock/history", { params }),

  stockIn: (data: unknown) =>
    api.post("/stock/in", data),

  stockOut: (data: unknown) =>
    api.post("/stock/out", data),

  adjustStock: (data: unknown) =>
    api.post("/stock/adjustment", data),
};