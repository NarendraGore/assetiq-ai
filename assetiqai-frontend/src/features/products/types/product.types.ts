/**
 * Full product entity as returned by the detail / create / update endpoints.
 */
export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string | null;
  categoryId: string;
  categoryName: string | null;
  supplierId: string;
  supplierName: string | null;
  unitPrice: number;
  stockQuantity: number;
  minimumStock: number;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Slim product shape returned by the list endpoint (`GET /products`).
 *
 * The list intentionally omits the heavier detail fields (description,
 * category/supplier ids, timestamps, etc.), so the table types against this
 * lighter row rather than the full {@link Product}.
 */
export interface ProductListItem {
  id: string;
  name: string;
  sku: string;
  categoryName: string | null;
  supplierName: string | null;
  unitPrice: number;
  stockQuantity: number;
  isActive: boolean;
}

/* ---------- Requests ---------- */

export interface CreateProductRequest {
  name: string;
  sku: string;
  description?: string;
  categoryId: string;
  supplierId: string;
  unitPrice: number;
  stockQuantity: number;
  minimumStock: number;
  imageUrl?: string;
  isActive: boolean;
}

export interface UpdateProductRequest {
  name: string;
  sku: string;
  description?: string;
  categoryId: string;
  supplierId: string;
  unitPrice: number;
  stockQuantity: number;
  minimumStock: number;
  imageUrl?: string;
  isActive: boolean;
}

/* ---------- Query ---------- */

export interface ProductQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  CategoryId?: string;
  SupplierId?: string;
  MinPrice?: number;
  MaxPrice?: number;
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

export type ProductListResponse = PaginatedResponse<ProductListItem>;
