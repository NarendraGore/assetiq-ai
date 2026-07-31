import { useQuery } from "@tanstack/react-query";

import { getCategoryChart } from "../api/dashboard.api";
import { dashboardKeys } from "./dashboard.queryKeys";

import type { DashboardFilter } from "../types/dashboard-filter.types";

export function useCategoryChart(filter: DashboardFilter) {
  return useQuery({
    queryKey: dashboardKeys.categoryChart(filter),

    queryFn: () => getCategoryChart(),

    staleTime: 5 * 60 * 1000,

    gcTime: 10 * 60 * 1000,

    retry: 1,

    refetchOnWindowFocus: false,
  });
}