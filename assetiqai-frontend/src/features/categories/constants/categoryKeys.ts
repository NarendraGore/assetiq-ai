import type { CategoryQueryParams } from "../types";

export const categoryKeys = {

  all: ["categories"] as const,


  lists: () => [...categoryKeys.all, "list"] as const,


  list: (filters: CategoryQueryParams) =>
    [...categoryKeys.lists(), filters] as const,


  details: () => [...categoryKeys.all, "detail"] as const,


  detail: (id: string) =>
    [...categoryKeys.details(), id] as const,
};