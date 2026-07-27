export const QUERY_KEYS = {
  AUTH: ["auth"],

  CATEGORIES: ["categories"],

  SUPPLIERS: ["suppliers"],

  PRODUCTS: ["products"],

  INVENTORY: ["inventory"],

  STOCK_HISTORY: ["stock-history"],

  DASHBOARD_SUMMARY: ["dashboard-summary"],

  RECENT_TRANSACTIONS: ["recent-transactions"],

  LOW_STOCK: ["low-stock"],

  OUT_OF_STOCK: ["out-of-stock"],

  REPORTS: ["reports"],

  categories: ["categories"] ,

  category: (id: string) => ["category", id] ,

   suppliers: ["suppliers"],
  supplier: (id: string) => ["supplier", id],

} as const;

