import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getOutOfStock } from "../api/dashboard.api";
import { dashboardKeys } from "./dashboard.queryKeys";

import type { DashboardFilter } from "../types/dashboard-filter.types";


export function useOutOfStock(filter: DashboardFilter) {
  return useQuery({
    queryKey: dashboardKeys.outOfStock(filter),
    queryFn: () => getOutOfStock(filter),
    placeholderData: keepPreviousData,
  });
}
