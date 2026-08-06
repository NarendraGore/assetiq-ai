




export interface InventoryItem {
  productId: string;
  productName: string;
  sku: string;
  categoryName: string | null;
  companyName: string | null;
  currentStock: number;
  minimumStock: number;
  unitPrice: number;
  stockValue: number;
  isLowStock: boolean;
}


export interface StockTransaction {
  transactionId: string;
  productId: string;
  productName: string;
  transactionType: number;
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  remarks: string | null;
  createdAt: string;
  createdBy: string;
}




export interface InventoryQueryParams {
  Page?: number;
  PageSize?: number;
  Search?: string;
}


export interface StockHistoryQueryParams {
  TransactionType?: number;
  FromDate?: string;
  ToDate?: string;
  Page?: number;
  PageSize?: number;
  Search?: string;
}



export interface StockInRequest {
  productId: string;
  quantity: number;
  remarks?: string;
}

export interface StockOutRequest {
  productId: string;
  quantity: number;
  remarks?: string;
}


export interface StockAdjustRequest {
  productId: string;
  quantity: number;
  remarks?: string;
}


export interface StockMutationResponse {
  message: string;
}



export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}



export type InventoryListResponse = PaginatedResponse<InventoryItem>;
export type StockHistoryResponse = PaginatedResponse<StockTransaction>;
