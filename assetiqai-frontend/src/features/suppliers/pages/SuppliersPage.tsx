"use client";

import { useMemo } from "react";

import SupplierToolbar from "../table/SupplierToolbar";
import SupplierTable from "../table/SupplierTable";
import { supplierColumns } from "../table/supplier-columns";

import SupplierDialog from "../dialogs/SupplierDialog";
import DeleteSupplierDialog from "../dialogs/DeleteSupplierDialog";

import { useSuppliers } from "../hooks";
import { useSupplierCrud } from "../hooks/useSupplierCrud";
import { useSupplierDialogs } from "../hooks/useSupplierDialogs";
import { useSupplierFilters } from "../hooks/useSupplierFilters";

export default function SuppliersPage() {
  const {
    search,
    setSearch,
    debouncedSearch,
    page,
    pageSize,
  } = useSupplierFilters();

  const { data, isLoading, isFetching, isError, refetch } = useSuppliers({
    search: debouncedSearch,
    page,
    pageSize,
  });

  const {
    isCreateOpen,
    isEditOpen,
    isDeleteOpen,

    selectedSupplier,

    openCreate,
    openEdit,
    openDelete,

    closeCreate,
    closeEdit,
    closeDelete,
  } = useSupplierDialogs();

  const {
    createSupplier,
    updateSupplier,
    deleteSupplier,

    isCreating,
    isUpdating,
    isDeleting,
  } = useSupplierCrud();

  const suppliers = data?.items ?? [];

  const columns = useMemo(
    () =>
      supplierColumns({
        onEdit: openEdit,
        onDelete: openDelete,
      }),
    [openEdit, openDelete],
  );

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Suppliers
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage suppliers and vendor contacts for your inventory.
        </p>
      </div>

      <SupplierToolbar
        search={search}
        isRefreshing={isFetching}
        onSearchChange={setSearch}
        onRefresh={refetch}
        onAddSupplier={openCreate}
      />

      <SupplierTable
        columns={columns}
        data={suppliers}
        isLoading={isLoading}
        isError={isError}
        isSearchResult={!!debouncedSearch}
        onRetry={refetch}
        onAddSupplier={openCreate}
      />

      <SupplierDialog
        open={isCreateOpen}
        onOpenChange={(open) => {
          if (!open) closeCreate();
        }}
        mode="create"
        loading={isCreating}
        onSubmit={async (values) => {
          await createSupplier(values);

          closeCreate();
        }}
      />

      <SupplierDialog
        open={isEditOpen}
        onOpenChange={(open) => {
          if (!open) closeEdit();
        }}
        mode="edit"
        defaultValues={selectedSupplier ?? undefined}
        loading={isUpdating}
        onSubmit={async (values) => {
          if (!selectedSupplier) return;

          await updateSupplier(selectedSupplier.id, values);

          closeEdit();
        }}
      />

      <DeleteSupplierDialog
        open={isDeleteOpen}
        onOpenChange={(open) => {
          if (!open) closeDelete();
        }}
        supplierName={selectedSupplier?.companyName}
        loading={isDeleting}
        onDelete={async () => {
          if (!selectedSupplier) return;

          await deleteSupplier(selectedSupplier.id);
        }}
      />
    </div>
  );
}
