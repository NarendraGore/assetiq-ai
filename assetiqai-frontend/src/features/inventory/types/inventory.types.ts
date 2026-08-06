/**
 * Inventory & stock-transaction types.
 *
 * These mirror the shapes returned by the `/v1/stock/*` endpoints. The list
 * endpoints share the same paging envelope used across the app
 * (`{ items, totalCount, page, pageSize, totalPages }`).
 */

/* ---------- Entities ---------- */

/**
 * A single row from `GET /v1/stock/inventory` (and `GET /v1/stock/low-stock`).
 */
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

/**
 * A single row from `GET /v1/stock/history`.
 *
 * `transactionType` is a numeric enum: 1 = Stock In, 2 = Stock Out,
 * 3 = Adjustment. See {@link ../constants/transaction}.
 */
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

/* ---------- Query params ---------- */

/**
 * `GET /v1/stock/inventory` query params. The API binds the PascalCase names
 * shown in Swagger; ASP.NET binding is case-insensitive but we send the
 * documented casing to be safe.
 */
export interface InventoryQueryParams {
  Page?: number;
  PageSize?: number;
  Search?: string;
}

/**
 * `GET /v1/stock/history` query params.
 */
export interface StockHistoryQueryParams {
  TransactionType?: number;
  FromDate?: string;
  ToDate?: string;
  Page?: number;
  PageSize?: number;
  Search?: string;
}

/* ---------- Request bodies ---------- */

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

/**
 * Stock adjustment. Per product decision, `quantity` is a signed delta applied
 * to the current stock (positive adds, negative removes).
 */
export interface StockAdjustRequest {
  productId: string;
  quantity: number;
  remarks?: string;
}

/** Generic message envelope returned by the mutation endpoints. */
export interface StockMutationResponse {
  message: string;
}

/* ---------- Pagination ---------- */

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/* ---------- Responses ---------- */

export type InventoryListResponse = PaginatedResponse<InventoryItem>;
export type StockHistoryResponse = PaginatedResponse<StockTransaction>;
