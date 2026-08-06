import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getSummary } from "../api/dashboard.api";
import { dashboardKeys } from "./dashboard.queryKeys";

import type { DashboardFilter } from "../types/dashboard-filter.types";


export function useDashboardSummary(filter: DashboardFilter) {
  return useQuery({
    queryKey: dashboardKeys.summary(filter),
    queryFn: () => getSummary(filter),
    placeholderData: keepPreviousData,
  });
}
