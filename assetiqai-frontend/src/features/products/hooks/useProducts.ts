"use client";

import { useQuery } from "@tanstack/react-query";

import { productApi } from "../api";
import { productKeys } from "../constants";
import type { ProductQueryParams } from "../types";

export function useProducts(
  params: ProductQueryParams = {}
) {
  const {
    page = 1,
    pageSize = 10,
    search = "",
    CategoryId,
    SupplierId,
    MinPrice,
    MaxPrice,
  } = params;

  const queryParams: ProductQueryParams = {
    page,
    pageSize,
    search,
    CategoryId,
    SupplierId,
    MinPrice,
    MaxPrice,
  };

  return useQuery({
    queryKey: productKeys.list(queryParams),

    queryFn: () => productApi.getProducts(queryParams),

    placeholderData: (previousData) => previousData,

    staleTime: 1000 * 60 * 5,
  });
}
