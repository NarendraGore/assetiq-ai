import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getCategoryChart } from "../api/dashboard.api";
import { dashboardKeys } from "./dashboard.queryKeys";

import type { DashboardFilter } from "../types/dashboard-filter.types";


export function useCategoryChart(filter: DashboardFilter) {
  return useQuery({
    queryKey: dashboardKeys.categoryChart(filter),
    queryFn: () => getCategoryChart(filter),
    placeholderData: keepPreviousData,
  });
}
