import RecentTransactionsTable from "./RecentTransactionsTable";
import LowStockTable from "./LowStockTable";

export default function DashboardTables() {
  return (
    <div className="space-y-6">
      <RecentTransactionsTable />

      <LowStockTable />
    </div>
  );
}