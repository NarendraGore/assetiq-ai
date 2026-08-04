/**
 * Stock transaction type enum + display helpers.
 *
 * The history endpoint returns a numeric `transactionType`. This is the single
 * source of truth for how those numbers map to labels, badge colours and the
 * options shown in the History filter.
 */

export const TRANSACTION_TYPE = {
  STOCK_IN: 1,
  STOCK_OUT: 2,
  ADJUSTMENT: 3,
} as const;

export type TransactionTypeValue =
  (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

export interface TransactionTypeOption {
  value: number;
  label: string;
}

export const TRANSACTION_TYPE_OPTIONS: TransactionTypeOption[] = [
  { value: TRANSACTION_TYPE.STOCK_IN, label: "Stock In" },
  { value: TRANSACTION_TYPE.STOCK_OUT, label: "Stock Out" },
  { value: TRANSACTION_TYPE.ADJUSTMENT, label: "Adjustment" },
];

export function getTransactionLabel(type: number): string {
  switch (type) {
    case TRANSACTION_TYPE.STOCK_IN:
      return "Stock In";
    case TRANSACTION_TYPE.STOCK_OUT:
      return "Stock Out";
    case TRANSACTION_TYPE.ADJUSTMENT:
      return "Adjustment";
    default:
      return "Unknown";
  }
}

/**
 * Tailwind classes for the coloured transaction badge. Kept aligned with the
 * palette used by the Reports feature's stock columns.
 */
export function getTransactionClass(type: number): string {
  switch (type) {
    case TRANSACTION_TYPE.STOCK_IN:
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
    case TRANSACTION_TYPE.STOCK_OUT:
      return "bg-destructive/10 text-destructive";
    case TRANSACTION_TYPE.ADJUSTMENT:
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}
