import type { ExportColumn } from "@/shared/export";
import type { StockReport } from "../types";

const transactionMap: Record<number, string> = {
  1: "IN",
  2: "OUT",
  3: "TRANSFER",
  4: "ADJUSTMENT",
};

export const stockExportColumns: ExportColumn<StockReport>[] = [
  {
    header: "Product",
    key: "productName",
  },
  {
    header: "SKU",
    key: "sku",
  },
  {
    header: "Transaction",
    key: "transactionType",
    formatter: (value) =>
      transactionMap[Number(value)] ?? String(value),
  },
  {
    header: "Quantity",
    key: "quantity",
  },
  {
    header: "Previous Quantity",
    key: "previousQuantity",
  },
  {
    header: "New Quantity",
    key: "newQuantity",
  },
  {
    header: "Remarks",
    key: "remarks",
  },
  {
    header: "Created By",
    key: "createdBy",
  },
  {
    header: "Created At",
    key: "createdAt",
    formatter: (value) =>
      value ? new Date(String(value)).toLocaleString() : "",
  },
];