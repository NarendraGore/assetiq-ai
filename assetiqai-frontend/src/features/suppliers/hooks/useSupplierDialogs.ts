"use client";

import { useCallback, useMemo, useState } from "react";

import { Supplier } from "../types";

interface UseSupplierDialogsReturn {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  isDeleteOpen: boolean;

  selectedSupplier: Supplier | null;

  openCreate: () => void;
  closeCreate: () => void;

  openEdit: (supplier: Supplier) => void;
  closeEdit: () => void;

  openDelete: (supplier: Supplier) => void;
  closeDelete: () => void;

  closeAll: () => void;
}

export function useSupplierDialogs(): UseSupplierDialogsReturn {
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const [selectedSupplier, setSelectedSupplier] =
    useState<Supplier | null>(null);

  const openCreate = useCallback(() => {
    setSelectedSupplier(null);
    setCreateOpen(true);
  }, []);

  const closeCreate = useCallback(() => {
    setCreateOpen(false);
  }, []);

  const openEdit = useCallback((supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setEditOpen(true);
  }, []);

  const closeEdit = useCallback(() => {
    setEditOpen(false);
    setSelectedSupplier(null);
  }, []);

  const openDelete = useCallback((supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setDeleteOpen(true);
  }, []);

  const closeDelete = useCallback(() => {
    setDeleteOpen(false);
    setSelectedSupplier(null);
  }, []);

  const closeAll = useCallback(() => {
    setCreateOpen(false);
    setEditOpen(false);
    setDeleteOpen(false);
    setSelectedSupplier(null);
  }, []);

  return useMemo(
    () => ({
      isCreateOpen,
      isEditOpen,
      isDeleteOpen,

      selectedSupplier,

      openCreate,
      closeCreate,

      openEdit,
      closeEdit,

      openDelete,
      closeDelete,

      closeAll,
    }),
    [
      isCreateOpen,
      isEditOpen,
      isDeleteOpen,
      selectedSupplier,
      openCreate,
      closeCreate,
      openEdit,
      closeEdit,
      openDelete,
      closeDelete,
      closeAll,
    ]
  );
}
