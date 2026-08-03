"use client";

import { useMemo } from "react";

import CategoryToolbar from "../table/CategoryToolbar";
import CategoryTable from "../table/CategoryTable";
import { categoryColumns } from "../table/category-columns";

import CategoryDialog from "../dialogs/CategoryDialog";
import DeleteCategoryDialog from "../dialogs/DeleteCategoryDialog";

import { useCategories } from "../hooks";
import { useCategoryCrud } from "../hooks/useCategoryCrud";
import { useCategoryDialogs } from "../hooks/useCategoryDialogs";
import { useCategoryFilters } from "../hooks/useCategoryFilters";

export default function CategoriesPage() {
  const { search, setSearch, debouncedSearch, page, pageSize } =
    useCategoryFilters();

  const { data, isLoading, isFetching, isError, refetch } = useCategories({
    search: debouncedSearch,
    page,
    pageSize,
  });

  const {
    isCreateOpen,
    isEditOpen,
    isDeleteOpen,

    selectedCategory,

    openCreate,
    openEdit,
    openDelete,

    closeCreate,
    closeEdit,
    closeDelete,
  } = useCategoryDialogs();

  const {
    createCategory,
    updateCategory,
    deleteCategory,

    isCreating,
    isUpdating,
    isDeleting,
  } = useCategoryCrud();

  const categories = data?.items ?? [];

  const columns = useMemo(
    () =>
      categoryColumns({
        onEdit: openEdit,
        onDelete: openDelete,
      }),
    [openEdit, openDelete],
  );

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Categories
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage product categories for your inventory.
        </p>
      </div>

      <CategoryToolbar
        search={search}
        isRefreshing={isFetching}
        onSearchChange={setSearch}
        onRefresh={refetch}
        onAddCategory={openCreate}
      />

      <CategoryTable
        columns={columns}
        data={categories}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        onAddCategory={openCreate}
      />

      <CategoryDialog
        open={isCreateOpen}
        onOpenChange={(open) => {
          if (!open) closeCreate();
        }}
        mode="create"
        loading={isCreating}
        onSubmit={async (values) => {
          await createCategory(values);

          closeCreate();
        }}
      />

      <CategoryDialog
        open={isEditOpen}
        onOpenChange={(open) => {
          if (!open) closeEdit();
        }}
        mode="edit"
        defaultValues={selectedCategory}
        loading={isUpdating}
        onSubmit={async (values) => {
          if (!selectedCategory) return;

          await updateCategory(selectedCategory.id, values);

          closeEdit();
        }}
      />

      <DeleteCategoryDialog
        open={isDeleteOpen}
        onOpenChange={(open) => {
          if (!open) closeDelete();
        }}
        categoryName={selectedCategory?.name}
        loading={isDeleting}
        onDelete={() => {
          if (!selectedCategory) return;

          return deleteCategory(selectedCategory.id);
        }}
      />
    </div>
  );
}
