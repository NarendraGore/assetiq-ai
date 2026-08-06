"use client";

import DataTable from "@/components/tables/DataTable";
import ServerPagination from "@/components/tables/ServerPagination";

import ReportToolbar from "./ReportToolbar";
import ReportSkeleton from "./ReportSkeleton";
import ReportEmpty from "./ReportEmpty";
import { stockColumns } from "./StockColumns";

import { stockExportColumns } from "../../constants";
import { useReportFilter } from "../../hooks/useReportFilter";
import { useStockReport } from "../../hooks/useStockReport";

export default function StockReportTable() {
  const { filter, updateFilter } = useReportFilter();

  const { data, isLoading, isFetching, isError, refetch } = useStockReport({
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
        title="Unable to load stock report"
        description="Something went wrong while loading the stock report."
        onRetry={refetch}
      />
    );
  }

  return (
    <section className="space-y-6">
      <ReportToolbar
        title="Stock Report"
        total={data?.pagination?.totalRecords ?? 0}
        loading={isLoading}
        onRefresh={refetch}
        exportFilename="stock-report"
        exportColumns={stockExportColumns}
        exportData={rows}
      />

      {rows.length === 0 ? (
        <ReportEmpty
          title="No stock transactions found"
          description="Try adjusting your filters or refresh the report."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <DataTable
            columns={stockColumns}
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
