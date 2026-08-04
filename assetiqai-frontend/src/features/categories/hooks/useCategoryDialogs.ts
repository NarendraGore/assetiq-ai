"use client";

import { useCallback, useMemo, useState } from "react";

import { Category } from "../types";

interface UseCategoryDialogsReturn {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  isDeleteOpen: boolean;

  selectedCategory: Category | null;

  openCreate: () => void;
  closeCreate: () => void;

  openEdit: (category: Category) => void;
  closeEdit: () => void;

  openDelete: (category: Category) => void;
  closeDelete: () => void;

  closeAll: () => void;
}

export function useCategoryDialogs(): UseCategoryDialogsReturn {
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const openCreate = useCallback(() => {
    setSelectedCategory(null);
    setCreateOpen(true);
  }, []);

  const closeCreate = useCallback(() => {
    setCreateOpen(false);
  }, []);

  const openEdit = useCallback((category: Category) => {
    setSelectedCategory(category);
    setEditOpen(true);
  }, []);

  const closeEdit = useCallback(() => {
    setEditOpen(false);
    setSelectedCategory(null);
  }, []);

  const openDelete = useCallback((category: Category) => {
    setSelectedCategory(category);
    setDeleteOpen(true);
  }, []);

  const closeDelete = useCallback(() => {
    setDeleteOpen(false);
    setSelectedCategory(null);
  }, []);

  const closeAll = useCallback(() => {
    setCreateOpen(false);
    setEditOpen(false);
    setDeleteOpen(false);
    setSelectedCategory(null);
  }, []);

  return useMemo(
    () => ({
      isCreateOpen,
      isEditOpen,
      isDeleteOpen,

      selectedCategory,

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
      selectedCategory,
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