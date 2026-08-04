"use client";

import { useQuery } from "@tanstack/react-query";

import { productApi } from "../api";
import { productKeys } from "../constants";

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),

    queryFn: () => productApi.getProduct(id),

    enabled: !!id,
  });
}
