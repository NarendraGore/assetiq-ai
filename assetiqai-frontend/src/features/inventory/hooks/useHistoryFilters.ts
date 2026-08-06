"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type DateRangePreset =
  | "all"
  | "today"
  | "last7Days"
  | "last30Days"
  | "thisMonth"
  | "thisYear";

export interface DateRangeOption {
  label: string;
  value: DateRangePreset;
}

export const DATE_RANGE_OPTIONS: DateRangeOption[] = [
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "last7Days" },
  { label: "Last 30 Days", value: "last30Days" },
  { label: "This Month", value: "thisMonth" },
  { label: "This Year", value: "thisYear" },
];

interface ResolvedRange {
  from?: Date;
  to?: Date;
}

/**
 * Turns a preset into a concrete `{ from, to }` window. `all` resolves to an
 * empty window so the API returns everything.
 */
function resolvePreset(preset: DateRangePreset): ResolvedRange {
  const now = new Date();

  switch (preset) {
    case "today": {
      const from = new Date(now);
      from.setHours(0, 0, 0, 0);
      return { from, to: now };
    }
    case "last7Days": {
      const from = new Date(now);
      from.setDate(from.getDate() - 7);
      return { from, to: now };
    }
    case "last30Days": {
      const from = new Date(now);
      from.setDate(from.getDate() - 30);
      return { from, to: now };
    }
    case "thisMonth": {
      const from = new Date(now.getFullYear(), now.getMonth(), 1);
      return { from, to: now };
    }
    case "thisYear": {
      const from = new Date(now.getFullYear(), 0, 1);
      return { from, to: now };
    }
    case "all":
    default:
      return {};
  }
}

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 500;

export interface HistoryFiltersState {
  search: string;
  setSearch: (value: string) => void;
  debouncedSearch: string;

  transactionType?: number;
  setTransactionType: (value?: number) => void;

  dateRangePreset: DateRangePreset;
  setDateRangePreset: (value: DateRangePreset) => void;
  fromDate?: string;
  toDate?: string;

  page: number;
  setPage: (value: number) => void;
  pageSize: number;
  setPageSize: (value: number) => void;

  hasActiveFilters: boolean;
  resetFilters: () => void;
}

/**
 * Search + transaction-type + date-range + pagination for the History tab.
 * State is local (not URL-synced) so it never collides with the Inventory
 * tab's own `search`/`page` params on the shared route.
 */
export function useHistoryFilters(): HistoryFiltersState {
  const [search, setSearchState] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [transactionType, setTransactionTypeState] = useState<
    number | undefined
  >(undefined);
  const [dateRangePreset, setDateRangePresetState] =
    useState<DateRangePreset>("all");
  const [page, setPageState] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSizeState] = useState(DEFAULT_PAGE_SIZE);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [search]);

  /* Any filter change resets to the first page. */
  useEffect(() => {
    setPageState(DEFAULT_PAGE);
  }, [debouncedSearch, transactionType, dateRangePreset]);

  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = resolvePreset(dateRangePreset);
    return {
      fromDate: from?.toISOString(),
      toDate: to?.toISOString(),
    };
  }, [dateRangePreset]);

  const setSearch = useCallback((value: string) => {
    setSearchState(value);
  }, []);

  const setTransactionType = useCallback((value?: number) => {
    setTransactionTypeState(value);
  }, []);

  const setDateRangePreset = useCallback((value: DateRangePreset) => {
    setDateRangePresetState(value);
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
    setTransactionTypeState(undefined);
    setDateRangePresetState("all");
    setPageState(DEFAULT_PAGE);
  }, []);

  const hasActiveFilters =
    debouncedSearch.trim().length > 0 ||
    transactionType !== undefined ||
    dateRangePreset !== "all";

  return useMemo(
    () => ({
      search,
      setSearch,
      debouncedSearch,
      transactionType,
      setTransactionType,
      dateRangePreset,
      setDateRangePreset,
      fromDate,
      toDate,
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
      transactionType,
      setTransactionType,
      dateRangePreset,
      setDateRangePreset,
      fromDate,
      toDate,
      page,
      setPage,
      pageSize,
      setPageSize,
      hasActiveFilters,
      resetFilters,
    ],
  );
}
