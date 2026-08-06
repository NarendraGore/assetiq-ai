"use client";

import { useCallback, useMemo, useState } from "react";

import type { InventoryItem } from "../types";


export type StockAction = "in" | "out" | "adjust";

interface UseStockDialogsReturn {
  isOpen: boolean;
  action: StockAction;


  selectedItem: InventoryItem | null;

  open: (action: StockAction, item?: InventoryItem | null) => void;
  close: () => void;
}


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
