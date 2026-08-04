export interface Category {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

/* ---------- Requests ---------- */

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface UpdateCategoryRequest {
  name: string;
  description?: string;
}

/* ---------- Query ---------- */

export interface CategoryQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
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

export type CategoryListResponse = PaginatedResponse<Category>;