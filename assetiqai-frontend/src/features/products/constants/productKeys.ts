import type { ProductQueryParams } from "../types";

export const productKeys = {
  all: ["products"] as const,

  lists: () => [...productKeys.all, "list"] as const,

  list: (filters: ProductQueryParams) =>
    [...productKeys.lists(), filters] as const,

  details: () => [...productKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...productKeys.details(), id] as const,
};
