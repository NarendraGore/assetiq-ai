import api from "@/lib/axios";

export interface SupplierDto {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierListResponse {
  items: SupplierDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function getSuppliers(): Promise<SupplierListResponse> {
  const { data } =
    await api.get<SupplierListResponse>("/v1/suppliers");

  return data;
}