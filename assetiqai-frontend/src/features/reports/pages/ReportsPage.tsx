// "use client";

// import ReportLayout from "../components/ReportLayout";
// import ReportHeader from "../components/ReportHeader";
// import ReportSection from "../components/ReportSection";
// import ReportFilterBar from "../components/filters/ReportFilterBar";

// import { ReportFilterProvider } from "../context/ReportFilterContext";

// import EmptyState from "@/features/dashboard/components/EmptyState";

// import {
//   BarChart3,
//   Boxes,
//   Download,
//   PackageSearch,
//   Warehouse,
// } from "lucide-react";

// export default function ReportsPage() {
//   return (
//     <ReportFilterProvider>
//       <ReportLayout>
//         <div className="space-y-6">
//           {/* Header */}
//           <ReportHeader />

//           {/* Filters */}
//           <ReportFilterBar />

//           {/* Inventory Report */}
//           <ReportSection
//             title="Inventory Report"
//             description="Analyze inventory levels, quantities, suppliers, and stock value."
//           >
//             <EmptyState
//               icon={Boxes}
//               title="Inventory report unavailable"
//               description="Inventory report data will appear here once the backend integration is completed."
//             />
//           </ReportSection>

//           {/* Stock Report */}
//           <ReportSection
//             title="Stock Report"
//             description="Track stock movements, adjustments, and inventory transactions."
//           >
//             <EmptyState
//               icon={Warehouse}
//               title="Stock report unavailable"
//               description="Stock report data will appear here once the backend integration is completed."
//             />
//           </ReportSection>

//           {/* Analytics */}
//           <ReportSection
//             title="Analytics"
//             description="Visual insights and trends for inventory performance."
//           >
//             <EmptyState
//               icon={BarChart3}
//               title="Analytics coming soon"
//               description="Charts and analytical insights will be available after report integration."
//             />
//           </ReportSection>

//           {/* Export */}
//           <ReportSection
//             title="Export Reports"
//             description="Generate CSV and Excel reports for offline analysis."
//           >
//             <EmptyState
//               icon={Download}
//               title="No export generated"
//               description="Use the filters above and export reports once the backend export service is available."
//             />
//           </ReportSection>

//           {/* Summary */}
//           <ReportSection
//             title="Summary"
//             description="Quick overview of inventory reporting."
//           >
//             <EmptyState
//               icon={PackageSearch}
//               title="Summary unavailable"
//               description="Summary metrics will be displayed here after report APIs are connected."
//             />
//           </ReportSection>
//         </div>
//       </ReportLayout>
//     </ReportFilterProvider>
//   );
// }

"use client";

import { ReportFilterProvider } from "../context/ReportFilterContext";

import { ReportHeader, ReportFilterBar, ReportSection } from "../components";

export default function ReportsPage() {
  return (
    <ReportFilterProvider>
      <main className="space-y-6">
        <ReportHeader />

        <ReportFilterBar />

        <ReportSection />
      </main>
    </ReportFilterProvider>
  );
}
