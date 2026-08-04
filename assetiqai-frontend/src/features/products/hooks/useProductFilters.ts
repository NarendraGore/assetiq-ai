"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 500;
const PRICE_DEBOUNCE_MS = 500;

const ALL = "all";

/**
 * Reads/writes an optional numeric query param. Empty string, `null` and
 * non-numeric values all resolve to `undefined` so the API simply omits the
 * bound.
 */
function parseNumber(value: string | null): number | undefined {
  if (value === null || value.trim() === "") return undefined;

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : undefined;
}

export interface ProductFiltersState {
  /* Search */
  search: string;
  setSearch: (value: string) => void;
  debouncedSearch: string;

  /* Category / Supplier */
  categoryId?: string;
  setCategoryId: (value?: string) => void;

  supplierId?: string;
  setSupplierId: (value?: string) => void;

  /* Price (raw input strings kept for controlled inputs) */
  minPriceInput: string;
  maxPriceInput: string;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  minPrice?: number;
  maxPrice?: number;

  /* Pagination */
  page: number;
  setPage: (value: number) => void;
  pageSize: number;
  setPageSize: (value: number) => void;

  /* Misc */
  hasActiveFilters: boolean;
  resetFilters: () => void;
}

export function useProductFilters(): ProductFiltersState {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /* ---------- Initial values from URL ---------- */

  const urlSearch = searchParams.get("search") ?? "";
  const urlCategory = searchParams.get("categoryId") ?? undefined;
  const urlSupplier = searchParams.get("supplierId") ?? undefined;
  const urlMinPrice = searchParams.get("minPrice") ?? "";
  const urlMaxPrice = searchParams.get("maxPrice") ?? "";

  const urlPage = Math.max(
    Number(searchParams.get("page") ?? DEFAULT_PAGE),
    DEFAULT_PAGE
  );

  const urlPageSize = Math.max(
    Number(searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE),
    DEFAULT_PAGE_SIZE
  );

  /* ---------- Local state ---------- */

  const [search, setSearchState] = useState(urlSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearch);

  const [categoryId, setCategoryIdState] = useState<string | undefined>(
    urlCategory
  );
  const [supplierId, setSupplierIdState] = useState<string | undefined>(
    urlSupplier
  );

  const [minPriceInput, setMinPriceInput] = useState(urlMinPrice);
  const [maxPriceInput, setMaxPriceInput] = useState(urlMaxPrice);

  const [minPrice, setMinPriceValue] = useState<number | undefined>(
    parseNumber(urlMinPrice)
  );
  const [maxPrice, setMaxPriceValue] = useState<number | undefined>(
    parseNumber(urlMaxPrice)
  );

  const [page, setPageState] = useState(urlPage);
  const [pageSize, setPageSizeState] = useState(urlPageSize);

  /* ---------- Debounce search ---------- */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [search]);

  /* ---------- Debounce price ---------- */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMinPriceValue(parseNumber(minPriceInput));
    }, PRICE_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [minPriceInput]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMaxPriceValue(parseNumber(maxPriceInput));
    }, PRICE_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [maxPriceInput]);

  /* ---------- Reset to page 1 when any filter changes ---------- */

  useEffect(() => {
    setPageState(DEFAULT_PAGE);
  }, [debouncedSearch, categoryId, supplierId, minPrice, maxPrice]);

  /* ---------- Sync to URL ---------- */

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) params.set("search", debouncedSearch);
    if (categoryId) params.set("categoryId", categoryId);
    if (supplierId) params.set("supplierId", supplierId);
    if (minPrice !== undefined) params.set("minPrice", String(minPrice));
    if (maxPrice !== undefined) params.set("maxPrice", String(maxPrice));
    if (page !== DEFAULT_PAGE) params.set("page", String(page));
    if (pageSize !== DEFAULT_PAGE_SIZE) {
      params.set("pageSize", String(pageSize));
    }

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (nextQuery === currentQuery) return;

    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false,
    });
  }, [
    debouncedSearch,
    categoryId,
    supplierId,
    minPrice,
    maxPrice,
    page,
    pageSize,
    pathname,
    router,
    searchParams,
  ]);

  /* ---------- Setters ---------- */

  const setSearch = useCallback((value: string) => {
    setSearchState(value);
  }, []);

  const setCategoryId = useCallback((value?: string) => {
    setCategoryIdState(value === ALL ? undefined : value);
  }, []);

  const setSupplierId = useCallback((value?: string) => {
    setSupplierIdState(value === ALL ? undefined : value);
  }, []);

  const setMinPrice = useCallback((value: string) => {
    setMinPriceInput(value);
  }, []);

  const setMaxPrice = useCallback((value: string) => {
    setMaxPriceInput(value);
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
    setCategoryIdState(undefined);
    setSupplierIdState(undefined);
    setMinPriceInput("");
    setMaxPriceInput("");
    setMinPriceValue(undefined);
    setMaxPriceValue(undefined);
    setPageState(DEFAULT_PAGE);
  }, []);

  const hasActiveFilters =
    debouncedSearch.trim().length > 0 ||
    categoryId !== undefined ||
    supplierId !== undefined ||
    minPrice !== undefined ||
    maxPrice !== undefined;

  return useMemo(
    () => ({
      search,
      setSearch,
      debouncedSearch,

      categoryId,
      setCategoryId,

      supplierId,
      setSupplierId,

      minPriceInput,
      maxPriceInput,
      setMinPrice,
      setMaxPrice,
      minPrice,
      maxPrice,

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
      categoryId,
      setCategoryId,
      supplierId,
      setSupplierId,
      minPriceInput,
      maxPriceInput,
      setMinPrice,
      setMaxPrice,
      minPrice,
      maxPrice,
      page,
      setPage,
      pageSize,
      setPageSize,
      hasActiveFilters,
      resetFilters,
    ]
  );
}
