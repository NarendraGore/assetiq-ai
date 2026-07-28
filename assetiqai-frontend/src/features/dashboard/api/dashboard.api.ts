import api from "@/src/lib/axios";

export const getInventorySummary = async () => {
  const res = await api.get("/api/Dashboard/inventory-summary");
  return res.data;
};

export const getRecentTransactions = async () => {
  const res = await api.get("/api/Dashboard/recent-transactions");
  return res.data;
};

export const getLowStock = async () => {
  const res = await api.get("/api/Dashboard/low-stock");
  return res.data;
};

export const getOutOfStock = async () => {
  const res = await api.get("/api/Dashboard/out-of-stock");
  return res.data;
};

export const getCategoryChart = async () => {
  const res = await api.get("/api/Dashboard/category-chart");
  return res.data;
};

export const getStockChart = async () => {
  const res = await api.get("/api/Dashboard/stock-chart");
  return res.data;
};

export const getSupplierChart = async () => {
  const res = await api.get("/api/Dashboard/supplier-chart");
  return res.data;
};

export const getInventoryChart = async () => {
  const res = await api.get("/api/Dashboard/inventory-chart");
  return res.data;
};
