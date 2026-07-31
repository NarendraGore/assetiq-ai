"use client";

import { useDashboardFilterContext } from "../context/DashboardFilterContext";
export function useDashboardFilter() {
  return useDashboardFilterContext();
}