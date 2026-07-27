"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  InventoryHeader,
  InventorySearch,
  InventoryFilters,
  InventoryPagination,
  InventoryTable,
  HistoryTable,
  LowStockTable,
  StockInDialog,
  StockOutDialog,
  StockAdjustDialog,
} from "@/components/Inventory";

import { useInventory } from "@/hooks/useInventory";
import { useStockHistory } from "@/hooks/useStockHistory";
import { useLowStock } from "@/hooks/useLowStock";
import stockService from "@/services/stock.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type {
  StockAdjustDto,
  StockInDto,
  StockOutDto,
} from "@/types/stock";
import type { StockTransactionFormValues } from "@/components/Inventory/StockTransactionForm";

export default function InventoryPage() {
  // Inventory State
  const [inventoryPage, setInventoryPage] = useState(1);
  const [inventorySearch, setInventorySearch] = useState("");

  // History State
  const [historyPage, setHistoryPage] = useState(1);
  const [historySearch, setHistorySearch] = useState("");
  const [transactionType, setTransactionType] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const pageSize = 10;
  const queryClient = useQueryClient();

  const invalidateInventoryData = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.inventory }),
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.stockHistory }),
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lowStock }),
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD_SUMMARY }),
    ]);
  };

  const stockInMutation = useMutation({
    mutationFn: (data: StockInDto) => stockService.stockIn(data),
    onSuccess: async () => {
      await invalidateInventoryData();
      setStockInOpen(false);
      toast.success("Stock added successfully.");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to add stock right now.";
      toast.error(message);
    },
  });

  const stockOutMutation = useMutation({
    mutationFn: (data: StockOutDto) => stockService.stockOut(data),
    onSuccess: async () => {
      await invalidateInventoryData();
      setStockOutOpen(false);
      toast.success("Stock removed successfully.");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to remove stock right now.";
      toast.error(message);
    },
  });

  const adjustMutation = useMutation({
    mutationFn: (data: StockAdjustDto) => stockService.adjustStock(data),
    onSuccess: async () => {
      await invalidateInventoryData();
      setAdjustOpen(false);
      toast.success("Stock adjusted successfully.");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to adjust stock right now.";
      toast.error(message);
    },
  });

  const handleStockSubmit = (mode: "in" | "out" | "adjust") => {
    return (values: StockTransactionFormValues) => {
      if (mode === "in") {
        const stockInValues = values as Extract<
          StockTransactionFormValues,
          { quantity: number; remarks: string; productId: string }
        >;
        stockInMutation.mutate({
          productId: stockInValues.productId,
          quantity: stockInValues.quantity,
          remarks: stockInValues.remarks,
        });
        return;
      }

      if (mode === "out") {
        const stockOutValues = values as Extract<
          StockTransactionFormValues,
          { quantity: number; remarks: string; productId: string }
        >;
        stockOutMutation.mutate({
          productId: stockOutValues.productId,
          quantity: stockOutValues.quantity,
          remarks: stockOutValues.remarks,
        });
        return;
      }

      const adjustValues = values as Extract<
        StockTransactionFormValues,
        { newQuantity: number; remarks: string; productId: string }
      >;
      adjustMutation.mutate({
        productId: adjustValues.productId,
        newQuantity: adjustValues.newQuantity,
        remarks: adjustValues.remarks,
      });
    };
  };

  // Dialogs
  const [stockInOpen, setStockInOpen] = useState(false);
  const [stockOutOpen, setStockOutOpen] = useState(false);
  const [adjustOpen, setAdjustOpen] = useState(false);

  // Inventory
  const inventory = useInventory({
    page: inventoryPage,
    pageSize,
    search: inventorySearch,
  });

  const normalizedTransactionType =
    transactionType === "all" ? undefined : Number(transactionType);

  // History
  const history = useStockHistory({
    page: historyPage,
    pageSize,
    search: historySearch,
    transactionType: normalizedTransactionType,
    fromDate,
    toDate,
  });

  // Low Stock
  const lowStock = useLowStock();

  return (
    <div className="space-y-10">
      {/* Inventory Section */}

      <InventoryHeader
        onStockIn={() => setStockInOpen(true)}
        onStockOut={() => setStockOutOpen(true)}
        onAdjust={() => setAdjustOpen(true)}
      />

      <InventorySearch
        value={inventorySearch}
        onValueChange={setInventorySearch}
      />

      <InventoryTable
        items={inventory.data?.items ?? []}
        loading={inventory.isLoading}
        onStockIn={() => setStockInOpen(true)}
        onStockOut={() => setStockOutOpen(true)}
        onAdjust={() => setAdjustOpen(true)}
      />

      <InventoryPagination
        page={inventoryPage}
        totalPages={inventory.data?.totalPages ?? 1}
        onPageChange={setInventoryPage}
      />

      {/* History Section */}

      <InventoryHeader
        title="Stock History"
        description="Track all inventory transactions."
      />

      <InventorySearch
        value={historySearch}
        onValueChange={setHistorySearch}
      />

      <InventoryFilters
        transactionType={transactionType}
        fromDate={fromDate}
        toDate={toDate}
        onTransactionTypeChange={setTransactionType}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
      />

      <HistoryTable
        items={history.data?.items ?? []}
        loading={history.isLoading}
      />

      <InventoryPagination
        page={historyPage}
        totalPages={history.data?.totalPages ?? 1}
        onPageChange={setHistoryPage}
      />

      {/* Low Stock */}

      <InventoryHeader
        title="Low Stock Products"
        description="Products below minimum stock level."
      />

      <LowStockTable
        items={lowStock.data ?? []}
        loading={lowStock.isLoading}
      />

      {/* Dialogs */}

      <StockInDialog
        open={stockInOpen}
        loading={stockInMutation.isPending}
        onOpenChange={setStockInOpen}
        onSubmit={handleStockSubmit("in")}
      />

      <StockOutDialog
        open={stockOutOpen}
        loading={stockOutMutation.isPending}
        onOpenChange={setStockOutOpen}
        onSubmit={handleStockSubmit("out")}
      />

      <StockAdjustDialog
        open={adjustOpen}
        loading={adjustMutation.isPending}
        onOpenChange={setAdjustOpen}
        onSubmit={handleStockSubmit("adjust")}
      />
    </div>
  );
}