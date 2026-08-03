import type { ExportColumn } from "@/shared/export";
import type { InventoryReport } from "../types";

export const inventoryExportColumns: ExportColumn<InventoryReport>[] = [
  {
    key: "productName",
    header: "Product",
  },
  {
    key: "sku",
    header: "SKU",
  },
  {
    key: "categoryName",
    header: "Category",
  },
  {
    key: "supplierName",
    header: "Supplier",
  },
  {
    key: "currentStock",
    header: "Current Stock",
  },
  {
    key: "minimumStock",
    header: "Minimum Stock",
  },
  {
    key: "unitPrice",
    header: "Unit Price",
  },
  {
    key: "stockValue",
    header: "Stock Value",
  },
  {
    key: "isLowStock",
    header: "Low Stock",
    formatter: (value) => (value ? "Yes" : "No"),
  },
  {
    key: "isOutOfStock",
    header: "Out of Stock",
    formatter: (value) => (value ? "Yes" : "No"),
  },
];