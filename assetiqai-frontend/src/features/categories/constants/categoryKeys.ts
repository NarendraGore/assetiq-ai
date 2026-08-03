import type { CategoryQueryParams } from "../types";

export const categoryKeys = {
  /**
   * Root key for the Categories feature.
   */
  all: ["categories"] as const,

  /**
   * All category list queries.
   */
  lists: () => [...categoryKeys.all, "list"] as const,

  /**
   * Category list with filters.
   */
  list: (filters: CategoryQueryParams) =>
    [...categoryKeys.lists(), filters] as const,

  /**
   * All category detail queries.
   */
  details: () => [...categoryKeys.all, "detail"] as const,

  /**
   * Single category detail.
   */
  detail: (id: string) =>
    [...categoryKeys.details(), id] as const,
};