import type {
  BaseReportEntity,
  ReportResponse,
} from "./report.types";

export interface InventoryReport extends BaseReportEntity {
  productId: string;

  productName: string;

  sku: string;

  categoryName: string;

  supplierName: string;

  currentStock: number;

  minimumStock: number;

  unitPrice: number;

  stockValue: number;

  isLowStock: boolean;

  isOutOfStock: boolean;

  isActive: boolean;
}

export type InventoryReportResponse =
  ReportResponse<InventoryReport>;