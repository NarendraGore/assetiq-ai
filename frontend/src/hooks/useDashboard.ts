import { useQuery } from "@tanstack/react-query";
import dashboardService from "@/services/dashboard.service";

export const useDashboardSummary = () =>
  useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: dashboardService.getSummary,
  });

export const useInventoryChart = () =>
  useQuery({
    queryKey: ["inventory-chart"],
    queryFn: dashboardService.getInventoryChart,
  });

export const useStockChart = () =>
  useQuery({
    queryKey: ["stock-chart"],
    queryFn: dashboardService.getStockChart,
  });

export const useCategoryChart = () =>
  useQuery({
    queryKey: ["category-chart"],
    queryFn: dashboardService.getCategoryChart,
  });

export const useSupplierChart = () =>
  useQuery({
    queryKey: ["supplier-chart"],
    queryFn: dashboardService.getSupplierChart,
  });

export const useRecentTransactions = () =>
  useQuery({
    queryKey: ["recent-transactions"],
    queryFn: dashboardService.getRecentTransactions,
  });

export const useLowStock = () =>
  useQuery({
    queryKey: ["low-stock"],
    queryFn: dashboardService.getLowStock,
  });