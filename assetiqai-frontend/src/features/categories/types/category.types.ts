export interface Category {
  id: string;
  name: string;
  description: string | null;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}



export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface UpdateCategoryRequest {
  name: string;
  description?: string;
}



export interface CategoryQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
}



export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}



export type CategoryListResponse = PaginatedResponse<Category>;