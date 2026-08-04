"use client";

import { useQuery } from "@tanstack/react-query";

import { categoryApi } from "../api";
import { categoryKeys } from "../constants";
import type { CategoryQueryParams } from "../types";

export function useCategories(
  params: CategoryQueryParams = {}
) {
  const {
    page = 1,
    pageSize = 10,
    search = "",
  } = params;

  return useQuery({
    queryKey: categoryKeys.list({
      page,
      pageSize,
      search,
    }),

    queryFn: () =>
      categoryApi.getCategories({
        page,
        pageSize,
        search,
      }),

    placeholderData: (previousData) => previousData,

    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}