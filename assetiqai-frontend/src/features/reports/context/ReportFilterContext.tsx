"use client";

import {
  createContext,
  useCallback,
  useContext,
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

  applyFilters: () => void;

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

  const applyFilters = useCallback(() => {
    // React Query refetches from the changed query key; nothing to do here.
  }, []);

  const value = useMemo(
    () => ({
      filter,
      updateFilter,
      setDateRangePreset,
      applyFilters,
      resetFilters,
    }),
    [filter, updateFilter, setDateRangePreset, applyFilters, resetFilters],
  );

  return (
    <ReportFilterContext.Provider value={value}>
      {children}
    </ReportFilterContext.Provider>
  );
}

export function useReportFilterContext() {
  const context = useContext(ReportFilterContext);

  if (!context) {
    throw new Error(
      "useReportFilterContext must be used inside ReportFilterProvider",
    );
  }

  return context;
}
