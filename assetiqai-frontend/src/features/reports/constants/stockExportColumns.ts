import type { ExportColumn } from "@/shared/export";
import type { StockReport } from "../types";

const transactionTypeMap: Record<number, string> = {
  1: "IN",
  2: "OUT",
  3: "ADJUSTMENT",
};

export const stockExportColumns: ExportColumn<StockReport>[] = [
  {
    key: "productName",
    header: "Product",
  },
  {
    key: "sku",
    header: "SKU",
  },
  {
    key: "transactionType",
    header: "Transaction",
    formatter: value =>
      transactionTypeMap[Number(value)] ?? "Unknown",
  },
  {
    key: "quantity",
    header: "Quantity",
  },
  {
    key: "previousQuantity",
    header: "Previous Qty",
  },
  {
    key: "newQuantity",
    header: "New Qty",
  },
  {
    key: "remarks",
    header: "Remarks",
  },
  {
    key: "createdBy",
    header: "Created By",
  },
  {
    key: "createdAt",
    header: "Created At",
  },
];