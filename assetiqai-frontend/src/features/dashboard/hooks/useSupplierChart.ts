import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getSupplierChart } from "../api/dashboard.api";
import { dashboardKeys } from "./dashboard.queryKeys";

import type { DashboardFilter } from "../types/dashboard-filter.types";


export function useSupplierChart(filter: DashboardFilter) {
  return useQuery({
    queryKey: dashboardKeys.supplierChart(filter),
    queryFn: () => getSupplierChart(filter),
    placeholderData: keepPreviousData,
  });
}
