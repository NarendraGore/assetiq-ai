export interface Supplier {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface SupplierListResponse {
  items: Supplier[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateSupplierDto {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
}

export interface UpdateSupplierDto {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
}