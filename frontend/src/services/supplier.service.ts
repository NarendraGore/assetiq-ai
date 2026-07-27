import api from "./api";

import {
  Supplier,
  SupplierListResponse,
  CreateSupplierDto,
  UpdateSupplierDto,
} from "@/types/supplier";

const supplierService = {
  getSuppliers: async (
    page = 1,
    pageSize = 10,
    search = ""
  ) => {
    const response =
      await api.get<SupplierListResponse>(
        "/v1/suppliers",
        {
          params: {
            Page: page,
            PageSize: pageSize,
            Search: search,
          },
        }
      );
      console.log(response.data)
    return response.data;
  },

  getSupplier: async (
    id: string
  ) => {
    const response =
      await api.get<Supplier>(
        `/v1/suppliers/${id}`
      );
console.log(response.data)
    return response.data;
  },

  createSupplier: async (
    data: CreateSupplierDto
  ) => {
    
    const response =
      await api.post<Supplier>(
        "/v1/suppliers",
        data
      );
      
    return response.data;
  },

  updateSupplier: async (
    id: string,
    data: UpdateSupplierDto
  ) => {
    const response =
      await api.put<Supplier>(
        `/v1/suppliers/${id}`,
        data
      );

    return response.data;
  },

  deleteSupplier: async (
    id: string
  ) => {
    await api.delete(
      `/v1/suppliers/${id}`
    );
  },
};

export default supplierService;