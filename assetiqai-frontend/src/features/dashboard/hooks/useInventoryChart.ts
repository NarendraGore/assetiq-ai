import { useQuery } from "@tanstack/react-query";

import { getInventoryChart } from "../api/dashboard.api";
import { dashboardKeys } from "./dashboard.queryKeys";

import type { DashboardFilter } from "../types/dashboard-filter.types";

export function useInventoryChart(filter: DashboardFilter) {
  return useQuery({
    queryKey: dashboardKeys.inventoryChart(filter),

    queryFn: () => getInventoryChart(),

    staleTime: 5 * 60 * 1000,

    gcTime: 10 * 60 * 1000,

    retry: 1,

    refetchOnWindowFocus: false,
  });
}