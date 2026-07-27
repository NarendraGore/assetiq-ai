import {
  useInventoryChart,
  useStockChart,
  useCategoryChart,
  useSupplierChart,
} from "@/hooks/useDashboard";

import InventoryTrendChart from "./InventoryTrendChart";
import StockMovementChart from "./StockMovementChart";
import CategoryPieChart from "./CategoryPieChart";
import SupplierPieChart from "./SupplierPieChart";

export default function DashboardCharts() {
  const inventory = useInventoryChart();

  const stock = useStockChart();

  const category = useCategoryChart();

  const supplier = useSupplierChart();

  return (
    <div className="space-y-6">
      <InventoryTrendChart
        data={inventory.data ?? []}
      />

      <StockMovementChart
        data={stock.data ?? []}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryPieChart
          data={category.data ?? []}
        />

        <SupplierPieChart
          data={supplier.data ?? []}
        />
      </div>
    </div>
  );
}