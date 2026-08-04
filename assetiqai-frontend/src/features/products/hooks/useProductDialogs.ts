"use client";

import { useCallback, useMemo, useState } from "react";

import { ProductListItem } from "../types";

interface UseProductDialogsReturn {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  isDeleteOpen: boolean;
  isViewOpen: boolean;

  selectedProduct: ProductListItem | null;

  openCreate: () => void;
  closeCreate: () => void;

  openEdit: (product: ProductListItem) => void;
  closeEdit: () => void;

  openDelete: (product: ProductListItem) => void;
  closeDelete: () => void;

  openView: (product: ProductListItem) => void;
  closeView: () => void;

  closeAll: () => void;
}

export function useProductDialogs(): UseProductDialogsReturn {
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isViewOpen, setViewOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<ProductListItem | null>(null);

  const openCreate = useCallback(() => {
    setSelectedProduct(null);
    setCreateOpen(true);
  }, []);

  const closeCreate = useCallback(() => {
    setCreateOpen(false);
  }, []);

  const openEdit = useCallback((product: ProductListItem) => {
    setSelectedProduct(product);
    setEditOpen(true);
  }, []);

  const closeEdit = useCallback(() => {
    setEditOpen(false);
    setSelectedProduct(null);
  }, []);

  const openDelete = useCallback((product: ProductListItem) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  }, []);

  const closeDelete = useCallback(() => {
    setDeleteOpen(false);
    setSelectedProduct(null);
  }, []);

  const openView = useCallback((product: ProductListItem) => {
    setSelectedProduct(product);
    setViewOpen(true);
  }, []);

  const closeView = useCallback(() => {
    setViewOpen(false);
    setSelectedProduct(null);
  }, []);

  const closeAll = useCallback(() => {
    setCreateOpen(false);
    setEditOpen(false);
    setDeleteOpen(false);
    setViewOpen(false);
    setSelectedProduct(null);
  }, []);

  return useMemo(
    () => ({
      isCreateOpen,
      isEditOpen,
      isDeleteOpen,
      isViewOpen,

      selectedProduct,

      openCreate,
      closeCreate,

      openEdit,
      closeEdit,

      openDelete,
      closeDelete,

      openView,
      closeView,

      closeAll,
    }),
    [
      isCreateOpen,
      isEditOpen,
      isDeleteOpen,
      isViewOpen,
      selectedProduct,
      openCreate,
      closeCreate,
      openEdit,
      closeEdit,
      openDelete,
      closeDelete,
      openView,
      closeView,
      closeAll,
    ]
  );
}
