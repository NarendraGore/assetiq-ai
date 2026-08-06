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

export function useCategoryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const urlSearch = searchParams.get("search") ?? "";
  const urlPage = Math.max(
    Number(searchParams.get("page") ?? DEFAULT_PAGE),
    DEFAULT_PAGE
  );

  const urlPageSize = Math.max(
    Number(searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE),
    DEFAULT_PAGE_SIZE
  );


  const [search, setSearchState] = useState(urlSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearch);
  const [page, setPageState] = useState(urlPage);
  const [pageSize, setPageSizeState] = useState(urlPageSize);


  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- URL is an external system we subscribe to */
    setSearchState(urlSearch);
    setDebouncedSearch(urlSearch);
    setPageState(urlPage);
    setPageSizeState(urlPageSize);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [urlSearch, urlPage, urlPageSize]);


  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [search]);


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- a new search must always start on page one
    setPageState(DEFAULT_PAGE);
  }, [debouncedSearch]);


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