export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;

  categoryId: string;
  categoryName?: string;

  supplierId: string;
  supplierName?: string;

  unitPrice: number;

  stockQuantity: number;

  minimumStock: number;

  imageUrl?: string;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface ProductListResponse {
  items: Product[];

  totalCount: number;

  page: number;

  pageSize: number;

  totalPages: number;
}

export interface CreateProductDto {
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

export interface UpdateProductDto{
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