

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

export interface InventorySummary {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalInventoryValue: number;
}



export interface CategoryChart {
  categoryName: string;
  productCount: number;
}



export interface SupplierChart {
  supplierName: string;
  productCount: number;
}



export interface InventoryChart {
  productName: string;
  inventoryValue: number;
}



export interface StockChart {
  month: string;
  stockIn: number;
  stockOut: number;
}


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