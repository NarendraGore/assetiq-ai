import api from "@/src/lib/axios";

export const getInventory = async () => {
  const res = await api.get("/api/v1/stock/inventory");
  return res.data;
};

export const getStockHistory = async () => {
  const res = await api.get("/api/v1/stock/history");
  return res.data;
};

export const stockIn = async (data: { productId: string; quantity: number; remarks?: string }) => {
  const res = await api.post("/api/v1/stock/in", data);
  return res.data;
};

export const stockOut = async (data: { productId: string; quantity: number; remarks?: string }) => {
  const res = await api.post("/api/v1/stock/out", data);
  return res.data;
};

export const adjustStock = async (data: { productId: string; newQuantity: number; remarks?: string }) => {
  const res = await api.post("/api/v1/stock/adjust", data);
  return res.data;
};
