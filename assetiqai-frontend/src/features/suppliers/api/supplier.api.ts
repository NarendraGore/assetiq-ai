import api from "@/lib/axios";

export const getSuppliers = async () => {
  const res = await api.get("/api/v1/suppliers");
  return res.data;
};

export const getSupplierById = async (id: string) => {
  const res = await api.get(`/api/v1/suppliers/${id}`);
  return res.data;
};

export const createSupplier = async (data: {
  companyName: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
}) => {
  const res = await api.post("/api/v1/suppliers", data);
  return res.data;
};

export const updateSupplier = async (id: string, data: any) => {
  const res = await api.put(`/api/v1/suppliers/${id}`, data);
  return res.data;
};

export const deleteSupplier = async (id: string) => {
  const res = await api.delete(`/api/v1/suppliers/${id}`);
  return res.data;
};
