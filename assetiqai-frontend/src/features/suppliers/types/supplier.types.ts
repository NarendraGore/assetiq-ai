export interface Supplier {
  id: string;
  companyName: string;
  contactPerson: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}



export interface CreateSupplierRequest {
  companyName: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface UpdateSupplierRequest {
  companyName: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
}



export interface SupplierQueryParams {
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



export type SupplierListResponse = PaginatedResponse<Supplier>;
