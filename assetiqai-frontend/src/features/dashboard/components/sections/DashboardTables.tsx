// "use client";

// import { ReceiptText, AlertTriangle, PackageX } from "lucide-react";

// import SectionCard from "../SectionCard";
// import EmptyState from "../EmptyState";

// export default function DashboardTables() {
//   const sections = [
//     {
//       title: "Recent Transactions",
//       description: "Latest inventory stock movements",
//       emptyTitle: "No Transactions Yet",
//       emptyDescription:
//         "Recent inventory transactions will appear here once stock activities are recorded.",
//       icon: ReceiptText,
//     },
//     {
//       title: "Low Stock Products",
//       description: "Products below their minimum stock level",
//       emptyTitle: "No Low Stock Products",
//       emptyDescription:
//         "Products that fall below the minimum stock threshold will appear here.",
//       icon: AlertTriangle,
//     },
//     {
//       title: "Out Of Stock Products",
//       description: "Products requiring immediate replenishment",
//       emptyTitle: "No Out Of Stock Products",
//       emptyDescription: "Products with zero available stock will appear here.",
//       icon: PackageX,
//     },
//   ];

//   return (
//     <section aria-label="Dashboard Tables" className="flex flex-col gap-6">
//       {sections.map((section) => (
//         <SectionCard
//           key={section.title}
//           title={section.title}
//           description={section.description}
//         >
//           <div className="min-h-[260px]">
//             <EmptyState
//               icon={section.icon}
//               title={section.emptyTitle}
//               description={section.emptyDescription}
//             />
//           </div>
//         </SectionCard>
//       ))}
//     </section>
//   );
// }

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
