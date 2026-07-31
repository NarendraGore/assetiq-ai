/**
 * ==========================================
 * Dashboard Summary
 * ==========================================
 */

export interface DashboardSummary {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  totalInventoryValue: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalCategories: number;
  totalSuppliers: number;
}
/**
 * ==========================================
 * Inventory Summary
 * ==========================================
 */
export interface InventorySummary {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalInventoryValue: number;
}

/**
 * ==========================================
 * Category Chart
 * ==========================================
 */

export interface CategoryChart {
  categoryName: string;
  productCount: number;
}

/**
 * ==========================================
 * Supplier Chart
 * ==========================================
 */

export interface SupplierChart {
  supplierName: string;
  productCount: number;
}

/**
 * ==========================================
 * Inventory Trend Chart
 * ==========================================
 */

export interface InventoryChart {
  productName: string;
  inventoryValue: number;
}

/**
 * ==========================================
 * Stock In / Stock Out Chart
 * ==========================================
 */

export interface StockChart {
  month: string;
  stockIn: number;
  stockOut: number;
}
/**
 * ==========================================
 * Recent Transactions
 * ==========================================
 */

export interface RecentTransaction {
  transactionId: string;
  productId: string;
  productName: string;
  transactionType: number;
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  remarks: string;
  createdAt: string;
  createdBy: string;
}
/**
 * ==========================================
 * Low Stock Product
 * ==========================================
 */

export interface LowStockProduct {
   productId: string;
  productName: string;
  sku: string;
  categoryName: string;
  companyName: string;
  currentStock: number;
  minimumStock: number;
  unitPrice: number;
  stockValue: number;
  isLowStock: boolean;
}

/**
 * ==========================================
 * Out Of Stock Product
 * ==========================================
 */

export interface OutOfStockProduct {
   productId: string;
  productName: string;
  sku: string;
  categoryName: string;
  companyName: string;
  currentStock: number;
  minimumStock: number;
  unitPrice: number;
  stockValue: number;
  isLowStock: boolean;
}