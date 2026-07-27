export interface InventoryItem {
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

export interface InventoryResponse {
  items: InventoryItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface StockHistoryItem {
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

export interface StockHistoryResponse {
  items: StockHistoryItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface StockInDto {
  productId: string;
  quantity: number;
  remarks: string;
}

export interface StockOutDto {
  productId: string;
  quantity: number;
  remarks: string;
}

export interface StockAdjustDto {
  productId: string;
  newQuantity: number;
  remarks: string;
}

export interface StockMessageResponse {
  message: string;
}