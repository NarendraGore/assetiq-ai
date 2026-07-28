import api from "@/src/lib/axios";

export const getProducts = async () => {
  const res = await api.get("/api/products");
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await api.get(`/api/products/${id}`);
  return res.data;
};

export const createProduct = async (data: any) => {
  const res = await api.post("/api/products", data);
  return res.data;
};

export const updateProduct = async (id: string, data: any) => {
  const res = await api.put(`/api/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await api.delete(`/api/products/${id}`);
  return res.data;
};
