"use client";

import DataTable from "@/components/tables/DataTable";

import ReportToolbar from "./ReportToolbar";
import ReportSkeleton from "./ReportSkeleton";
import ReportEmpty from "./ReportEmpty";
import { inventoryColumns } from "./InventoryColumns";

import { inventoryExportColumns } from "../../constants/inventoryExportColumns";
import { useReportFilter } from "../../hooks/useReportFilter";
import { useInventoryReport } from "../../hooks/useInventoryReport";

export default function InventoryReportTable() {
  const { filter } = useReportFilter();

  const { data, isLoading, isError, refetch } = useInventoryReport({
    filters: filter,
  });

  const rows = data?.items ?? [];

  if (isLoading) {
    return <ReportSkeleton />;
  }

  if (isError) {
    return (
      <ReportEmpty
        title="Unable to load inventory report"
        description="Something went wrong while loading the report."
        onRetry={refetch}
      />
    );
  }

  if (!rows.length) {
    return (
      <ReportEmpty
        title="No inventory records found"
        description="Try adjusting the filters."
      />
    );
  }

  return (
    <section className="space-y-4">
      <ReportToolbar
        title="Inventory Report"
        total={data?.totalCount ?? rows.length}
        loading={isLoading}
        onRefresh={refetch}
        exportFilename="inventory-report"
        exportColumns={inventoryExportColumns}
        exportData={rows}
      />

      <DataTable
        columns={inventoryColumns}
        data={rows}
        enableSorting
        enablePagination={false}
      />
    </section>
  );
}
