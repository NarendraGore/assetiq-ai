import axios from "@/lib/axios";

import type {
  Category,
  CategoryListResponse,
  CategoryQueryParams,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../types";

const BASE_URL = "/v1/categories";

export const categoryApi = {
  async getCategories(
    params: CategoryQueryParams = {}
  ): Promise<CategoryListResponse> {
    const { data } = await axios.get<CategoryListResponse>(
      BASE_URL,
      {
        params,
      }
    );

    return data;
  },

  async getCategory(id: string): Promise<Category> {
    const { data } = await axios.get<Category>(
      `${BASE_URL}/${id}`
    );

    return data;
  },

  async createCategory(
    payload: CreateCategoryRequest
  ): Promise<Category> {
    const { data } = await axios.post<Category>(
      BASE_URL,
      payload
    );

    return data;
  },

  async updateCategory(
    id: string,
    payload: UpdateCategoryRequest
  ): Promise<Category> {
    const { data } = await axios.put<Category>(
      `${BASE_URL}/${id}`,
      payload
    );

    return data;
  },

  async deleteCategory(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};