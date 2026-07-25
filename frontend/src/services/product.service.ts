import api from "./api";

export const productService = {
  getAll: (params?: unknown) =>
    api.get("/products", { params }),

  getById: (id: string) =>
    api.get(`/products/${id}`),

  create: (data: unknown) =>
    api.post("/products", data),

  update: (id: string, data: unknown) =>
    api.put(`/products/${id}`, data),

  delete: (id: string) =>
    api.delete(`/products/${id}`),

  uploadImage: (formData: FormData) =>
    api.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};