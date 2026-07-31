export const DASHBOARD_FILTERS = [
  "today",
  "week",
  "month",
  "year",
] as const;

export type DashboardFilter =
  (typeof DASHBOARD_FILTERS)[number];

export interface DashboardFilterContextType {
  filter: DashboardFilter;
  setFilter: (filter: DashboardFilter) => void;
}