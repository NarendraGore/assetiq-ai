"use client";

import { useCallback, useMemo, useState } from "react";

import type { InventoryItem } from "../types";

/** The three stock operations a dialog can be opened for. */
export type StockAction = "in" | "out" | "adjust";

interface UseStockDialogsReturn {
  isOpen: boolean;
  action: StockAction;

  /** The product the dialog was opened for, if launched from a row. */
  selectedItem: InventoryItem | null;

  open: (action: StockAction, item?: InventoryItem | null) => void;
  close: () => void;
}

/**
 * Manages the single shared stock-transaction dialog: which action it's in
 * (in/out/adjust) and which product (if any) it was pre-filled from.
 */
export function useStockDialogs(): UseStockDialogsReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<StockAction>("in");
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const open = useCallback(
    (nextAction: StockAction, item: InventoryItem | null = null) => {
      setAction(nextAction);
      setSelectedItem(item);
      setIsOpen(true);
    },
    [],
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setSelectedItem(null);
  }, []);

  return useMemo(
    () => ({ isOpen, action, selectedItem, open, close }),
    [isOpen, action, selectedItem, open, close],
  );
}
