import LowStockTable from "../../tables/LowStockTable";
import OutOfStockTable from "../../tables/OutOfStockTable";
import RecentTransactionsTable from "../../tables/RecentTransactionsTable";
import SectionCard from "../SectionCard";

export default function DashboardTables() {
  return (
    <section className="space-y-6">
      <SectionCard
        title="Recent Transactions"
        description="Latest inventory stock movements"
      >
        <RecentTransactionsTable />
      </SectionCard>

      <SectionCard
        title="Low Stock Products"
        description="Products below minimum stock level"
      >
        <LowStockTable />
      </SectionCard>

      <SectionCard
        title="Out Of Stock Products"
        description="Products requiring immediate replenishment"
      >
        <OutOfStockTable />
      </SectionCard>
    </section>
  );
}
