import axios from "@/lib/axios";

import type {
  CreateSupplierRequest,
  Supplier,
  SupplierListResponse,
  SupplierQueryParams,
  UpdateSupplierRequest,
} from "../types";

const BASE_URL = "/v1/suppliers";


function normalizePayload<
  T extends CreateSupplierRequest | UpdateSupplierRequest,
>(payload: T): T {
  const entries = Object.entries(payload).map(([key, value]) => [
    key,
    typeof value === "string" && value.trim() === ""
      ? undefined
      : value,
  ]);

  return Object.fromEntries(entries) as T;
}

export const supplierApi = {
  async getSuppliers(
    params: SupplierQueryParams = {}
  ): Promise<SupplierListResponse> {
    const { data } = await axios.get<SupplierListResponse>(
      BASE_URL,
      {
        params,
      }
    );

    return data;
  },

  async getSupplier(id: string): Promise<Supplier> {
    const { data } = await axios.get<Supplier>(
      `${BASE_URL}/${id}`
    );

    return data;
  },

  async createSupplier(
    payload: CreateSupplierRequest
  ): Promise<Supplier> {
    const { data } = await axios.post<Supplier>(
      BASE_URL,
      normalizePayload(payload)
    );

    return data;
  },

  async updateSupplier(
    id: string,
    payload: UpdateSupplierRequest
  ): Promise<Supplier> {
    const { data } = await axios.put<Supplier>(
      `${BASE_URL}/${id}`,
      normalizePayload(payload)
    );

    return data;
  },

  async deleteSupplier(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
