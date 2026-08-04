"use client";

import DataTable from "@/components/tables/DataTable";
import ServerPagination from "@/components/tables/ServerPagination";

import ReportToolbar from "./ReportToolbar";
import ReportSkeleton from "./ReportSkeleton";
import ReportEmpty from "./ReportEmpty";
import { inventoryColumns } from "./InventoryColumns";

import { inventoryExportColumns } from "../../constants";
import { useInventoryReport } from "../../hooks/useInventoryReport";
import { useReportFilter } from "../../hooks/useReportFilter";

export default function InventoryReportTable() {
  const { filter, updateFilter } = useReportFilter();

  const { data, isLoading, isFetching, isError, refetch } = useInventoryReport({
    filters: filter,
  });

  const rows = data?.data ?? [];
  const pagination = data?.pagination;

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
        total={data?.pagination?.totalRecords ?? 0}
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
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <DataTable
            columns={inventoryColumns}
            data={rows}
            enableSorting
            enablePagination={false}
            loading={isFetching}
          />

          {pagination && (
            <ServerPagination
              page={pagination.page}
              pageSize={pagination.pageSize}
              totalCount={pagination.totalRecords}
              totalPages={pagination.totalPages}
              onPageChange={(page) => updateFilter("page", page)}
              onPageSizeChange={(pageSize) =>
                updateFilter("pageSize", pageSize)
              }
            />
          )}
        </div>
      )}
    </section>
  );
}
