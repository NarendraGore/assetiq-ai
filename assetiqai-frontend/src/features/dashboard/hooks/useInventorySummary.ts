import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getInventorySummary } from "../api/dashboard.api";
import { dashboardKeys } from "./dashboard.queryKeys";

import type { DashboardFilter } from "../types/dashboard-filter.types";

/**
 * Caching options come from the shared QueryClient defaults. `keepPreviousData`
 * keeps the previous period on screen while the next one loads, so switching
 * tabs no longer blanks the whole dashboard to skeletons.
 */
export function useInventorySummary(filter: DashboardFilter) {
  return useQuery({
    queryKey: dashboardKeys.inventorySummary(filter),
    queryFn: () => getInventorySummary(filter),
    placeholderData: keepPreviousData,
  });
}
