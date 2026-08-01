import api from "@/lib/axios";

export interface CategoryDto {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryListResponse {
  items: CategoryDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function getCategories(): Promise<CategoryListResponse> {
  const { data } =
    await api.get<CategoryListResponse>("/v1/categories");
  return data;
}