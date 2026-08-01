"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { ReportFilters } from "../types";

export interface ReportFilterContextValue {
  filter: ReportFilters;

  updateFilter: <K extends keyof ReportFilters>(
    key: K,
    value: ReportFilters[K],
  ) => void;

  applyFilters: () => void;

  resetFilters: () => void;
}

export const defaultFilters: ReportFilters = {
  search: "",

  categoryId: undefined,

  supplierId: undefined,

  transactionType: undefined,

  dateRange: {
    from: undefined,
    to: undefined,
  },

  page: 1,

  pageSize: 10,

  sortBy: undefined,

  sortOrder: "desc",
};

export const ReportFilterContext =
  createContext<ReportFilterContextValue | null>(null);

interface Props {
  children: ReactNode;
}

export function ReportFilterProvider({ children }: Props) {
  const [filter, setFilter] = useState<ReportFilters>(defaultFilters);

  const updateFilter = <K extends keyof ReportFilters>(
    key: K,
    value: ReportFilters[K],
  ) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilter(defaultFilters);
  };

  const applyFilters = () => {
    // React Query will refetch automatically
  };

  const value = useMemo(
    () => ({
      filter,
      updateFilter,
      applyFilters,
      resetFilters,
    }),
    [filter],
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
