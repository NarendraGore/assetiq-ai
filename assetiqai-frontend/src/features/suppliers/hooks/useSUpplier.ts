"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getSuppliers,
  SupplierListResponse,
} from "../api/supplier.api";

export function useSuppliers() {
  return useQuery<SupplierListResponse>({
    queryKey: ["suppliers"],

    queryFn: getSuppliers,

    staleTime: 1000 * 60 * 10,

    gcTime: 1000 * 60 * 30,

    refetchOnWindowFocus: false,
  });
}