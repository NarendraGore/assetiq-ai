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

