"use client";

import { useState } from "react";

import {
  CategoryHeader,
  CategorySearch,
  CategoryPagination,
  CategoryTable,
  CategoryDialog,
  DeleteCategoryDialog,
  CategorySkeleton,
} from "@/components/categories";

import { useCategories } from "@/hooks/useCategories";
import { useCreateCategory } from "@/hooks/useCreateCategory";
import { useUpdateCategory } from "@/hooks/useUpdateCategory";
import { useDeleteCategory } from "@/hooks/useDeleteCategory";

import {
  Category,
  CreateCategoryDto,
} from "@/types/category";

import { toast } from "sonner";

export default function CategoriesPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const {
    data,
    isLoading,
  } = useCategories(page, 10, search);

  const createMutation =
    useCreateCategory();

  const updateMutation =
    useUpdateCategory();

  const deleteMutation =
    useDeleteCategory();

  const handleCreate = () => {
    setSelectedCategory(null);
    setDialogOpen(true);
  };

  const handleEdit = (
    category: Category
  ) => {
    setSelectedCategory(category);
    setDialogOpen(true);
  };

  const handleDelete = (
    category: Category
  ) => {
    setSelectedCategory(category);
    setDeleteOpen(true);
  };

  const handleSubmit = async (
    values: CreateCategoryDto
  ) => {
    try {
      if (selectedCategory) {
        await updateMutation.mutateAsync({
          id: selectedCategory.id,
          data: values,
        });

        toast.success(
          "Category updated successfully."
        );
      } else {
        await createMutation.mutateAsync(
          values
        );

        toast.success(
          "Category created successfully."
        );
      }

      setDialogOpen(false);
    } catch {}
  };

  const confirmDelete =
    async () => {
      if (!selectedCategory) return;

      try {
        await deleteMutation.mutateAsync(
          selectedCategory.id
        );

        toast.success(
          "Category deleted successfully."
        );

        setDeleteOpen(false);
      } catch {}
    };

  

  return (
    <div className="space-y-6">

      <CategoryHeader
        onAdd={handleCreate}
      />

      <CategorySearch
        value={search}
        onSearch={setSearch}
      />

      <CategoryTable
        categories={data?.items ?? []}
        loading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryPagination
        page={page}
        totalPages={
          data?.totalPages ?? 1
        }
        onPageChange={setPage}
      />

      <CategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        category={selectedCategory}
        loading={
          createMutation.isPending ||
          updateMutation.isPending
        }
        onSubmit={handleSubmit}
      />

      <DeleteCategoryDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        loading={
          deleteMutation.isPending
        }
        onDelete={confirmDelete}
      />

    </div>
  );
}