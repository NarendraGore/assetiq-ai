import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getInventorySummary } from "../api/dashboard.api";
import { dashboardKeys } from "./dashboard.queryKeys";

import type { DashboardFilter } from "../types/dashboard-filter.types";


export function useInventorySummary(filter: DashboardFilter) {
  return useQuery({
    queryKey: dashboardKeys.inventorySummary(filter),
    queryFn: () => getInventorySummary(filter),
    placeholderData: keepPreviousData,
  });
}
