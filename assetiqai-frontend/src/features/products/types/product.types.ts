
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



export interface ProductQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  CategoryId?: string;
  SupplierId?: string;
  MinPrice?: number;
  MaxPrice?: number;
}



export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}



export type ProductListResponse = PaginatedResponse<ProductListItem>;
