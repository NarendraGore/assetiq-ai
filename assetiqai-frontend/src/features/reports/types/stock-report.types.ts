import type {
  BaseReportEntity,
  ReportResponse,
} from "./report.types";

export interface StockReport extends BaseReportEntity {
  transactionId: string;

  productId: string;

  productName: string;

  sku: string;

  transactionType: number;

  quantity: number;

  previousQuantity: number;

  newQuantity: number;

  remarks: string;

  createdAt: string;

  createdBy: string;
}

export type StockReportResponse =
  ReportResponse<StockReport>;