"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getCategories,
  CategoryListResponse,
} from "../api/category.api";

export function useCategories() {
  return useQuery<CategoryListResponse>({
    queryKey: ["categories"],

    queryFn: getCategories,

    staleTime: 1000 * 60 * 10,

    gcTime: 1000 * 60 * 30,

    refetchOnWindowFocus: false,
  });
}