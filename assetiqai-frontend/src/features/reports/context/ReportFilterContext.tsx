"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { DateRangePreset, ReportFilters } from "../types";
import { resolveDateRangePreset } from "../types";
import { createDefaultReportFilters } from "../constants/report.constants";

export interface ReportFilterContextValue {
  filter: ReportFilters;

  updateFilter: <K extends keyof ReportFilters>(
    key: K,
    value: ReportFilters[K],
  ) => void;

  /** Apply a named window and keep the matching button highlighted. */
  setDateRangePreset: (preset: DateRangePreset) => void;

  resetFilters: () => void;
}

export const ReportFilterContext =
  createContext<ReportFilterContextValue | null>(null);

interface Props {
  children: ReactNode;
}

export function ReportFilterProvider({ children }: Props) {
  const [filter, setFilter] = useState<ReportFilters>(
    createDefaultReportFilters,
  );

  const updateFilter = useCallback(
    <K extends keyof ReportFilters>(key: K, value: ReportFilters[K]) => {
      setFilter((prev) => ({
        ...prev,
        [key]: value,
        // Any filter change invalidates the current page — otherwise the user
        // can land on page 7 of a 2-page result and see an empty table.
        ...(key === "page" ? null : { page: 1 }),
      }));
    },
    [],
  );

  const setDateRangePreset = useCallback((preset: DateRangePreset) => {
    setFilter((prev) => ({
      ...prev,
      dateRange: resolveDateRangePreset(preset),
      dateRangePreset: preset,
      page: 1,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilter(createDefaultReportFilters());
  }, []);

  // No `applyFilters`: every filter is part of the query key, so React Query
  // refetches the moment state changes. An explicit apply step would only be
  // needed if the filters were staged separately from the key.
  const value = useMemo(
    () => ({ filter, updateFilter, setDateRangePreset, resetFilters }),
    [filter, updateFilter, setDateRangePreset, resetFilters],
  );

  return (
    <ReportFilterContext.Provider value={value}>
      {children}
    </ReportFilterContext.Provider>
  );
}

