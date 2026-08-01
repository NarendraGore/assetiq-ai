import type { ExportColumn } from "@/shared/export";
import type { InventoryReport } from "../types";

export const inventoryExportColumns: ExportColumn<InventoryReport>[] = [
  {
    header: "Product",
    key: "productName",
  },
  {
    header: "SKU",
    key: "sku",
  },
  {
    header: "Category",
    key: "categoryName",
  },
  {
    header: "Supplier",
    key: "supplierName",
  },
  {
    header: "Current Stock",
    key: "currentStock",
  },
  {
    header: "Minimum Stock",
    key: "minimumStock",
  },
  {
    header: "Unit Price",
    key: "unitPrice",
  },
  {
    header: "Stock Value",
    key: "stockValue",
  },
  {
    header: "Active",
    key: "isActive",
    formatter: (value) => (value ? "Yes" : "No"),
  },
];