import axios from "@/lib/axios";

import type {
  CreateProductRequest,
  Product,
  ProductListResponse,
  ProductQueryParams,
  UpdateProductRequest,
} from "../types";

const BASE_URL = "/products";

/**
 * The API treats empty strings and nulls interchangeably for optional fields,
 * so an untouched optional input is normalised to `undefined` before it goes
 * over the wire. Numeric and boolean values are left untouched.
 */
function normalizePayload<
  T extends CreateProductRequest | UpdateProductRequest,
>(payload: T): T {
  const entries = Object.entries(payload).map(([key, value]) => [
    key,
    typeof value === "string" && value.trim() === ""
      ? undefined
      : value,
  ]);

  return Object.fromEntries(entries) as T;
}

export const productApi = {
  async getProducts(
    params: ProductQueryParams = {}
  ): Promise<ProductListResponse> {
    const { data } = await axios.get<ProductListResponse>(
      BASE_URL,
      {
        params,
      }
    );

    return data;
  },

  async getProduct(id: string): Promise<Product> {
    const { data } = await axios.get<Product>(
      `${BASE_URL}/${id}`
    );

    return data;
  },

  async createProduct(
    payload: CreateProductRequest
  ): Promise<Product> {
    const { data } = await axios.post<Product>(
      BASE_URL,
      normalizePayload(payload)
    );

    return data;
  },

  async updateProduct(
    id: string,
    payload: UpdateProductRequest
  ): Promise<Product> {
    const { data } = await axios.put<Product>(
      `${BASE_URL}/${id}`,
      normalizePayload(payload)
    );

    return data;
  },

  async deleteProduct(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
