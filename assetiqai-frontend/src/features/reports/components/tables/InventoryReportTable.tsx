"use client";

import DataTable from "@/components/tables/DataTable";

import ReportToolbar from "./ReportToolbar";
import ReportSkeleton from "./ReportSkeleton";
import ReportEmpty from "./ReportEmpty";
import { inventoryColumns } from "./InventoryColumns";

import { inventoryExportColumns } from "../../constants";
import { useInventoryReport } from "../../hooks/useInventoryReport";
import { useReportFilter } from "../../hooks/useReportFilter";

export default function InventoryReportTable() {
  const { filter } = useReportFilter();

  const { data, isLoading, isError, refetch } = useInventoryReport({
    filters: filter,
  });

  const rows = data?.data ?? [];

  if (isLoading) {
    return <ReportSkeleton />;
  }

  if (isError) {
    return (
      <ReportEmpty
        title="Unable to load inventory report"
        description="Something went wrong while loading the inventory report."
        onRetry={refetch}
      />
    );
  }

  return (
    <section className="space-y-6">
      <ReportToolbar
        title="Inventory Report"
        total={data?.pagination.totalRecords ?? 0}
        loading={isLoading}
        onRefresh={refetch}
        exportFilename="inventory-report"
        exportColumns={inventoryExportColumns}
        exportData={rows}
      />

      {rows.length === 0 ? (
        <ReportEmpty
          title="No inventory records found"
          description="Try adjusting your filters or refresh the report."
        />
      ) : (
        <DataTable
          columns={inventoryColumns}
          data={rows}
          enableSorting
          enablePagination={false}
        />
      )}
    </section>
  );
}
