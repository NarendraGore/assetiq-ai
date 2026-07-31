import api from "@/lib/axios";


export const getCategories = async () => {
  const res = await api.get("/api/categories");
  return res.data;
};

export const getCategoryById = async (id: string) => {
  const res = await api.get(`/api/categories/${id}`);
  return res.data;
};

export const createCategory = async (data: { name: string; description?: string }) => {
  const res = await api.post("/api/categories", data);
  return res.data;
};

export const updateCategory = async (id: string, data: { name: string; description?: string }) => {
  const res = await api.put(`/api/categories/${id}`, data);
  return res.data;
};

export const deleteCategory = async (id: string) => {
  const res = await api.delete(`/api/categories/${id}`);
  return res.data;
};
