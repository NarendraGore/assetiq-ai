"use client";

import { useMemo } from "react";
import { toast } from "sonner";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  InventoryTable,
  InventoryToolbar,
  LowStockBanner,
  HistoryTable,
  HistoryToolbar,
  inventoryColumns,
  historyColumns,
} from "../table";

import { StockTransactionDialog } from "../dialogs";

import {
  useInventory,
  useInventoryFilters,
  useStockHistory,
  useHistoryFilters,
  useStockDialogs,
  useStockMutations,
  useProductActiveStatus,
  type StockFormValues,
} from "../hooks";

import type { InventoryItem } from "../types";

export default function InventoryPage() {

  const {
    search,
    setSearch,
    debouncedSearch,
    page,
    setPage,
    pageSize,
    setPageSize,
    hasActiveFilters,
  } = useInventoryFilters();

  const {
    data: inventoryData,
    isLoading: isInventoryLoading,
    isFetching: isInventoryFetching,
    isError: isInventoryError,
    refetch: refetchInventory,
  } = useInventory({
    Page: page,
    PageSize: pageSize,
    Search: debouncedSearch,
  });


  const { isProductInactive } = useProductActiveStatus();


  const history = useHistoryFilters();

  const {
    data: historyData,
    isLoading: isHistoryLoading,
    isFetching: isHistoryFetching,
    isError: isHistoryError,
    refetch: refetchHistory,
  } = useStockHistory({
    Page: history.page,
    PageSize: history.pageSize,
    Search: history.debouncedSearch,
    TransactionType: history.transactionType,
    FromDate: history.fromDate,
    ToDate: history.toDate,
  });


  const { isOpen, action, selectedItem, open, close } = useStockDialogs();

  const {
    stockIn,
    stockOut,
    adjustStock,
    isStockingIn,
    isStockingOut,
    isAdjusting,
  } = useStockMutations();

  const isMutating = isStockingIn || isStockingOut || isAdjusting;

  const handleSubmit = async (values: StockFormValues) => {



    if (isProductInactive(values.productId)) {
      toast.error(
        "This product is inactive. Reactivate it before recording stock movements.",
      );
      return;
    }

    const payload = {
      productId: values.productId,
      quantity: values.quantity,
      remarks: values.remarks?.trim() ? values.remarks.trim() : undefined,
    };

    if (action === "in") {
      await stockIn(payload);
    } else if (action === "out") {
      await stockOut(payload);
    } else {
      await adjustStock(payload);
    }

    close();
  };

  const columns = useMemo(
    () =>
      inventoryColumns({
        onStockIn: (item: InventoryItem) => open("in", item),
        onStockOut: (item: InventoryItem) => open("out", item),
        isProductInactive,
      }),
    [open, isProductInactive],
  );

  const inventoryItems = inventoryData?.items ?? [];
  const historyItems = historyData?.items ?? [];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Inventory
        </h1>

        <p className="text-sm text-muted-foreground">
          Track stock levels, record movements and review transaction history.
        </p>
      </div>

      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        { }
        <TabsContent value="inventory" className="space-y-6">
          <LowStockBanner onRestock={(item) => open("in", item)} />

          <InventoryToolbar
            search={search}
            isRefreshing={isInventoryFetching}
            onSearchChange={setSearch}
            onRefresh={refetchInventory}
            onNewTransaction={() => open("in")}
          />

          <InventoryTable
            columns={columns}
            data={inventoryItems}
            isLoading={isInventoryLoading}
            isFetching={isInventoryFetching}
            isError={isInventoryError}
            isFiltered={hasActiveFilters}
            onRetry={refetchInventory}
            page={inventoryData?.page ?? page}
            pageSize={inventoryData?.pageSize ?? pageSize}
            totalCount={inventoryData?.totalCount ?? 0}
            totalPages={inventoryData?.totalPages ?? 0}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </TabsContent>

        { }
        <TabsContent value="history" className="space-y-6">
          <HistoryToolbar
            search={history.search}
            onSearchChange={history.setSearch}
            transactionType={history.transactionType}
            onTransactionTypeChange={history.setTransactionType}
            dateRangePreset={history.dateRangePreset}
            onDateRangeChange={history.setDateRangePreset}
            hasActiveFilters={history.hasActiveFilters}
            onReset={history.resetFilters}
            isRefreshing={isHistoryFetching}
            onRefresh={refetchHistory}
          />

          <HistoryTable
            columns={historyColumns}
            data={historyItems}
            isLoading={isHistoryLoading}
            isFetching={isHistoryFetching}
            isError={isHistoryError}
            isFiltered={history.hasActiveFilters}
            page={historyData?.page ?? history.page}
            pageSize={historyData?.pageSize ?? history.pageSize}
            totalCount={historyData?.totalCount ?? 0}
            totalPages={historyData?.totalPages ?? 0}
            onPageChange={history.setPage}
            onPageSizeChange={history.setPageSize}
          />
        </TabsContent>
      </Tabs>

      <StockTransactionDialog
        open={isOpen}
        action={action}
        item={selectedItem}
        loading={isMutating}
        isProductInactive={isProductInactive}
        onOpenChange={(next) => {
          if (!next) close();
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
