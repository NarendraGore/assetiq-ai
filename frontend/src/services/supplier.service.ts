import api from "./api";

export const supplierService = {
  getAll: (params?: unknown) =>
    api.get("/suppliers", { params }),

  getById: (id: string) =>
    api.get(`/suppliers/${id}`),

  create: (data: unknown) =>
    api.post("/suppliers", data),

  update: (id: string, data: unknown) =>
    api.put(`/suppliers/${id}`, data),

  delete: (id: string) =>
    api.delete(`/suppliers/${id}`),
};