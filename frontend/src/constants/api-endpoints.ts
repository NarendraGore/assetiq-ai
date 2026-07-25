export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REFRESH_TOKEN: "/auth/refresh-token",
    LOGOUT: "/auth/logout",
  },

  DASHBOARD: {
    SUMMARY: "/dashboard/summary",
    RECENT_TRANSACTIONS: "/dashboard/recent-transactions",
    LOW_STOCK: "/dashboard/low-stock",
    OUT_OF_STOCK: "/dashboard/out-of-stock",
    CATEGORY_CHART: "/dashboard/category-chart",
    SUPPLIER_CHART: "/dashboard/supplier-chart",
    INVENTORY_CHART: "/dashboard/inventory-chart",
    STOCK_CHART: "/dashboard/stock-chart",
  },

  CATEGORY: {
    BASE: "/categories",
  },

  SUPPLIER: {
    BASE: "/suppliers",
  },

  PRODUCT: {
    BASE: "/products",
    UPLOAD_IMAGE: "/files/upload",
  },

  INVENTORY: {
    STOCK_IN: "/stock/in",
    STOCK_OUT: "/stock/out",
    ADJUSTMENT: "/stock/adjustment",
    HISTORY: "/stock/history",
  },

  REPORTS: {
    INVENTORY: "/reports/inventory",
    STOCK: "/reports/stock",
    DASHBOARD: "/reports/dashboard",
  },
} as const;