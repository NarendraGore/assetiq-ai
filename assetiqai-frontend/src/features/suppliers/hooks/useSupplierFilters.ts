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

export function useSupplierFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Read values from URL
   */
  const urlSearch = searchParams.get("search") ?? "";
  const urlPage = Math.max(
    Number(searchParams.get("page") ?? DEFAULT_PAGE),
    DEFAULT_PAGE
  );

  const urlPageSize = Math.max(
    Number(searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE),
    DEFAULT_PAGE_SIZE
  );

  /**
   * Local state
   */
  const [search, setSearchState] = useState(urlSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearch);
  const [page, setPageState] = useState(urlPage);
  const [pageSize, setPageSizeState] = useState(urlPageSize);

  /**
   * Keep state synced with browser navigation
   *
   * The URL/searchParams are an external system (next/navigation). Mirroring
   * them into local input state so the user can keep typing mid-session is an
   * intentional subscribe-and-copy pattern, not a derived-value computation.
   */
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- URL is an external system we subscribe to */
    setSearchState(urlSearch);
    setDebouncedSearch(urlSearch);
    setPageState(urlPage);
    setPageSizeState(urlPageSize);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [urlSearch, urlPage, urlPageSize]);

  /**
   * Debounce search
   */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [search]);

  /**
   * Reset page whenever the debounced search changes.
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- a new search must always start on page one
    setPageState(DEFAULT_PAGE);
  }, [debouncedSearch]);

  /**
   * Stable URL synchronization
   */
  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    }

    if (page !== DEFAULT_PAGE) {
      params.set("page", String(page));
    }

    if (pageSize !== DEFAULT_PAGE_SIZE) {
      params.set("pageSize", String(pageSize));
    }

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (nextQuery === currentQuery) {
      return;
    }

    router.replace(
      nextQuery ? `${pathname}?${nextQuery}` : pathname,
      {
        scroll: false,
      }
    );
  }, [
    debouncedSearch,
    page,
    pageSize,
    pathname,
    router,
    searchParams,
  ]);

  /**
   * Public setters
   */
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

  return useMemo(
    () => ({
      search,
      setSearch,

      debouncedSearch,

      page,
      setPage,

      pageSize,
      setPageSize,
    }),
    [
      search,
      debouncedSearch,
      page,
      pageSize,
      setSearch,
      setPage,
      setPageSize,
    ]
  );
}
