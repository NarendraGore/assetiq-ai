"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  DASHBOARD_FILTERS,
  type DashboardFilter,
} from "../types/dashboard-filter.types";

interface DashboardFilterContextType {
  filter: DashboardFilter;
  setFilter: React.Dispatch<React.SetStateAction<DashboardFilter>>;
}

const DashboardFilterContext = createContext<DashboardFilterContextType | null>(
  null,
);

const STORAGE_KEY = "dashboard-filter";

const isDashboardFilter = (value: unknown): value is DashboardFilter =>
  DASHBOARD_FILTERS.includes(value as DashboardFilter);

/**
 * Read the saved filter during the initial render. Restoring it in an effect
 * instead would start every query on "today" and immediately re-run all nine
 * dashboard endpoints with the stored period — a guaranteed double fetch.
 */
const readStoredFilter = (): DashboardFilter => {
  if (typeof window === "undefined") return "today";

  const saved = localStorage.getItem(STORAGE_KEY);

  return isDashboardFilter(saved) ? saved : "today";
};

export function DashboardFilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<DashboardFilter>(readStoredFilter);

  // Persist filter
  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem(STORAGE_KEY, filter);
  }, [filter]);

  const value = useMemo(
    () => ({
      filter,
      setFilter,
    }),
    [filter],
  );

  return (
    <DashboardFilterContext.Provider value={value}>
      {children}
    </DashboardFilterContext.Provider>
  );
}

export function useDashboardFilterContext() {
  const context = useContext(DashboardFilterContext);

  if (!context) {
    throw new Error(
      "useDashboardFilterContext must be used within DashboardFilterProvider",
    );
  }

  return context;
}
