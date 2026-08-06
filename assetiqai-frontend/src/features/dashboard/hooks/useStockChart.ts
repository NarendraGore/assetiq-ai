import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getStockChart } from "../api/dashboard.api";
import { dashboardKeys } from "./dashboard.queryKeys";

import type { DashboardFilter } from "../types/dashboard-filter.types";


export function useStockChart(filter: DashboardFilter) {
  return useQuery({
    queryKey: dashboardKeys.stockChart(filter),
    queryFn: () => getStockChart(filter),
    placeholderData: keepPreviousData,
  });
}
