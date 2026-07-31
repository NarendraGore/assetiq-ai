import { useQuery } from "@tanstack/react-query";

import { getRecentTransactions } from "../api/dashboard.api";
import { dashboardKeys } from "./dashboard.queryKeys";

import type { DashboardFilter } from "../types/dashboard-filter.types";

export function useRecentTransactions(filter: DashboardFilter) {
  return useQuery({
    queryKey: dashboardKeys.recentTransactions(filter),

    queryFn: () => getRecentTransactions(),

    staleTime: 5 * 60 * 1000,

    gcTime: 10 * 60 * 1000,

    retry: 1,

    refetchOnWindowFocus: false,
  });
}