import api from "./api";

import {
  Product,
  ProductListResponse,
  CreateProductDto,
  UpdateProductDto,
} from "@/types/product";

const productService = {
  getProducts: async (
    page = 1,
    pageSize = 10,
    search = "",
    categoryId = "",
    supplierId = "",
    minPrice?: number,
    maxPrice?: number
  ) => {
    const response =
      await api.get<ProductListResponse>(
        "/products",
        {
          params: {
            Page: page,
            PageSize: pageSize,
            Search: search?.trim() || undefined,
            CategoryId:
              categoryId && categoryId !== "all"
                ? categoryId
                : undefined,
            SupplierId:
              supplierId && supplierId !== "all"
                ? supplierId
                : undefined,
            MinPrice:
              typeof minPrice === "number" &&
              !Number.isNaN(minPrice)
                ? minPrice
                : undefined,
            MaxPrice:
              typeof maxPrice === "number" &&
              !Number.isNaN(maxPrice)
                ? maxPrice
                : undefined,
          },
        }
      );

    return response.data;
  },

  getProduct: async (id: string) => {
    const response =
      await api.get<Product>(
        `/products/${id}`
      );

    return response.data;
  },

  createProduct: async (
    data: CreateProductDto
  ) => {
    const response =
      await api.post<Product>(
        "/products",
        data
      );

    return response.data;
  },

  updateProduct: async (
    id: string,
    data: UpdateProductDto
  ) => {
    const response =
      await api.put<Product>(
        `/products/${id}`,
        data
      );

    return response.data;
  },

  deleteProduct: async (
    id: string
  ) => {
    await api.delete(`/products/${id}`);
  },

  getLowStockProducts: async () => {
    const response =
      await api.get<Product[]>(
        "/products/low-stock"
      );

    return response.data;
  },
};

export default productService;