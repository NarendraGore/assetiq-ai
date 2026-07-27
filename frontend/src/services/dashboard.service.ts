import api from "./api";

const dashboardService = {
  getSummary: async () => {
    const { data } = await api.get("/Dashboard/summary");
    return data;
  },

  getInventoryChart: async () => {
    const { data } = await api.get("/Dashboard/inventory-chart");
    return data;
  },

  getStockChart: async () => {
    const { data } = await api.get("/Dashboard/stock-chart");
    return data;
  },

  getCategoryChart: async () => {
    const { data } = await api.get("/Dashboard/category-chart");
    return data;
  },

  getSupplierChart: async () => {
    const { data } = await api.get("/Dashboard/supplier-chart");
    return data;
  },

  getRecentTransactions: async () => {
    const { data } = await api.get("/Dashboard/recent-transactions");
    return data;
  },

  getLowStock: async () => {
    const { data } = await api.get("/Dashboard/low-stock");
    return data;
  },
};

export default dashboardService;