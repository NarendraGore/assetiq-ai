"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 500;

export interface InventoryFiltersState {
  search: string;
  setSearch: (value: string) => void;
  debouncedSearch: string;

  page: number;
  setPage: (value: number) => void;
  pageSize: number;
  setPageSize: (value: number) => void;

  hasActiveFilters: boolean;
  resetFilters: () => void;
}

/**
 * Search + pagination state for the inventory list, synced to the URL so a
 * filtered view can be shared/reloaded. Follows the same shape as
 * `useProductFilters` but scoped to the inventory tab's own query params.
 */
export function useInventoryFilters(): InventoryFiltersState {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") ?? "";
  const urlPage = Math.max(
    Number(searchParams.get("page") ?? DEFAULT_PAGE),
    DEFAULT_PAGE,
  );
  const urlPageSize = Math.max(
    Number(searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE),
    DEFAULT_PAGE_SIZE,
  );

  const [search, setSearchState] = useState(urlSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearch);
  const [page, setPageState] = useState(urlPage);
  const [pageSize, setPageSizeState] = useState(urlPageSize);

  /* Debounce the free-text search. */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [search]);

  /* Any new search resets to the first page. */
  useEffect(() => {
    setPageState(DEFAULT_PAGE);
  }, [debouncedSearch]);

  /* Reflect state in the URL (scoped to inventory-only params). */
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) params.set("search", debouncedSearch);
    else params.delete("search");

    if (page !== DEFAULT_PAGE) params.set("page", String(page));
    else params.delete("page");

    if (pageSize !== DEFAULT_PAGE_SIZE) params.set("pageSize", String(pageSize));
    else params.delete("pageSize");

    const nextQuery = params.toString();
    if (nextQuery === searchParams.toString()) return;

    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false,
    });
  }, [debouncedSearch, page, pageSize, pathname, router, searchParams]);

  const setSearch = useCallback((value: string) => {
    setSearchState(value);
  }, []);

  const setPage = useCallback((value: number) => {
    setPageState(Math.max(value, DEFAULT_PAGE));
  }, []);

  const setPageSize = useCallback((value: number) => {
    setPageSizeState(value);
    setPageState(DEFAULT_PAGE);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchState("");
    setDebouncedSearch("");
    setPageState(DEFAULT_PAGE);
  }, []);

  const hasActiveFilters = debouncedSearch.trim().length > 0;

  return useMemo(
    () => ({
      search,
      setSearch,
      debouncedSearch,
      page,
      setPage,
      pageSize,
      setPageSize,
      hasActiveFilters,
      resetFilters,
    }),
    [
      search,
      setSearch,
      debouncedSearch,
      page,
      setPage,
      pageSize,
      setPageSize,
      hasActiveFilters,
      resetFilters,
    ],
  );
}
