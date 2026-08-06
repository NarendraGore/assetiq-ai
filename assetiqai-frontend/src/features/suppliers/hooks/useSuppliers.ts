"use client";

import { useQuery } from "@tanstack/react-query";

import { supplierApi } from "../api";
import { supplierKeys } from "../constants";
import type { SupplierQueryParams } from "../types";

export function useSuppliers(
  params: SupplierQueryParams = {}
) {
  const {
    page = 1,
    pageSize = 10,
    search = "",
  } = params;

  return useQuery({
    queryKey: supplierKeys.list({
      page,
      pageSize,
      search,
    }),

    queryFn: () =>
      supplierApi.getSuppliers({
        page,
        pageSize,
        search,
      }),

    placeholderData: (previousData) => previousData,

    staleTime: 1000 * 60 * 5,
  });
}
