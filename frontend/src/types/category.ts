export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface CategoryListResponse {
  items: Category[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateCategoryDto {
  name: string;
  description: string;
}

export interface UpdateCategoryDto {
  name: string;
  description: string;
}

export interface CategoryQueryParams {
  page: number;
  pageSize: number;
  search?: string;
}