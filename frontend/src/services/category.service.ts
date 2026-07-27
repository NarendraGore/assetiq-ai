import api from "./api";

import {
  Category,
  CategoryListResponse,
  CategoryQueryParams,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/types/category";

const BASE_URL = "/categories";

const categoryService = {
  getCategories: async (
    params: CategoryQueryParams
  ): Promise<CategoryListResponse> => {
    const { data } = await api.get(BASE_URL, {
      params: {
        Page: params.page,
        PageSize: params.pageSize,
        Search: params.search,
      },
    });

    console.log(data)
    return data;
  },

  getCategory: async (
    id: string
  ): Promise<Category> => {
    const { data } = await api.get(
      `${BASE_URL}/${id}`
    );

    return data;
  },

  createCategory: async (
    payload: CreateCategoryDto
  ): Promise<Category> => {
    const { data } = await api.post(
      BASE_URL,
      payload
    );

    return data;
  },

  updateCategory: async (
    id: string,
    payload: UpdateCategoryDto
  ): Promise<Category> => {
    const { data } = await api.put(
      `${BASE_URL}/${id}`,
      payload
    );

    return data;
  },

  deleteCategory: async (
    id: string
  ): Promise<void> => {
    await api.delete(`${BASE_URL}/${id}`);
  },
};

export default categoryService;