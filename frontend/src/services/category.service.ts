import api from "./api";

export const categoryService = {
  getAll: (params?: unknown) =>
    api.get("/categories", { params }),

  getById: (id: string) =>
    api.get(`/categories/${id}`),

  create: (data: unknown) =>
    api.post("/categories", data),

  update: (id: string, data: unknown) =>
    api.put(`/categories/${id}`, data),

  delete: (id: string) =>
    api.delete(`/categories/${id}`),
};