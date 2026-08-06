import axios from "@/lib/axios";

import type {
  CreateProductRequest,
  Product,
  ProductListResponse,
  ProductQueryParams,
  UpdateProductRequest,
} from "../types";

const BASE_URL = "/products";


interface RawRelation {
  id?: string | null;
  name?: string | null;
  companyName?: string | null;
}

type RawProduct = Partial<Product> & {
  category?: RawRelation | null;
  supplier?: RawRelation | null;
  categoryId?: string | null;
  categoryName?: string | null;
  supplierId?: string | null;
  supplierName?: string | null;
};

function normalizeProduct(raw: RawProduct): Product {
  const categoryId = raw.categoryId ?? raw.category?.id ?? "";
  const categoryName =
    raw.categoryName ?? raw.category?.name ?? null;

  const supplierId = raw.supplierId ?? raw.supplier?.id ?? "";
  const supplierName =
    raw.supplierName ??
    raw.supplier?.companyName ??
    raw.supplier?.name ??
    null;

  return {
    id: raw.id ?? "",
    name: raw.name ?? "",
    sku: raw.sku ?? "",
    description: raw.description ?? null,
    categoryId,
    categoryName,
    supplierId,
    supplierName,
    unitPrice: raw.unitPrice ?? 0,
    stockQuantity: raw.stockQuantity ?? 0,
    minimumStock: raw.minimumStock ?? 0,
    imageUrl: raw.imageUrl ?? null,
    isActive: raw.isActive ?? true,
    createdAt: raw.createdAt ?? "",
    updatedAt: raw.updatedAt ?? "",
  };
}


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
    const { data } = await axios.get<RawProduct>(
      `${BASE_URL}/${id}`
    );

    return normalizeProduct(data);
  },

  async createProduct(
    payload: CreateProductRequest
  ): Promise<Product> {
    const { data } = await axios.post<RawProduct>(
      BASE_URL,
      normalizePayload(payload)
    );

    return normalizeProduct(data);
  },

  async updateProduct(
    id: string,
    payload: UpdateProductRequest
  ): Promise<Product> {
    const { data } = await axios.put<RawProduct>(
      `${BASE_URL}/${id}`,
      normalizePayload(payload)
    );

    return normalizeProduct(data);
  },

  async deleteProduct(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
