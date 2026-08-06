import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getSupplierChart } from "../api/dashboard.api";
import { dashboardKeys } from "./dashboard.queryKeys";

import type { DashboardFilter } from "../types/dashboard-filter.types";

/**
 * Caching options come from the shared QueryClient defaults. `keepPreviousData`
 * keeps the previous period on screen while the next one loads, so switching
 * tabs no longer blanks the whole dashboard to skeletons.
 */
export function useSupplierChart(filter: DashboardFilter) {
  return useQuery({
    queryKey: dashboardKeys.supplierChart(filter),
    queryFn: () => getSupplierChart(filter),
    placeholderData: keepPreviousData,
  });
}
