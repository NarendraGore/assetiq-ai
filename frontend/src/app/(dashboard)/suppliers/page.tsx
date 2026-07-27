"use client";

import { useState } from "react";

import {
  Supplier,
  CreateSupplierDto,
  UpdateSupplierDto,
} from "@/types/supplier";

import SupplierHeader from "@/components/suppliers/SupplierHeader";
import SupplierSearch from "@/components/suppliers/SupplierSearch";
import SupplierPagination from "@/components/suppliers/SupplierPagination";
import SupplierDialog from "@/components/suppliers/SupplierDialog";
import DeleteSupplierDialog from "@/components/suppliers/DeleteSupplierDialog";
import SupplierSkeleton from "@/components/suppliers/SupplierSkeleton";
import { SupplierTable } from "@/components/suppliers";
 
import { useSuppliers } from "@/hooks/useSuppliers";
import { useCreateSupplier } from "@/hooks/useCreateSupplier";
import { useUpdateSupplier } from "@/hooks/useUpdateSupplier";
import { useDeleteSupplier } from "@/hooks/useDeleteSupplier";



import { toast } from "sonner";

export default function SuppliersPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedSupplier, setSelectedSupplier] =
    useState<Supplier | null>(null);

  const {
    data,
    isLoading,
  } = useSuppliers(page, 10, search);

  const createSupplier = useCreateSupplier();

  const updateSupplier = useUpdateSupplier();

  const deleteSupplier = useDeleteSupplier();

  const handleCreate = () => {
    setSelectedSupplier(null);
    setDialogOpen(true);
  };

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setDialogOpen(true);
  };

  const handleDelete = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setDeleteOpen(true);
  };

  const handleSubmit = async (
    values: CreateSupplierDto | UpdateSupplierDto
  ) => {
    try {
      if (selectedSupplier) {
        await updateSupplier.mutateAsync({
          id: selectedSupplier.id,
          data: values as UpdateSupplierDto,
        });

        toast.success("Supplier updated successfully.");
      } else {
        await createSupplier.mutateAsync(
          values as CreateSupplierDto
        );

        toast.success("Supplier created successfully.");
      }

      setDialogOpen(false);
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const confirmDelete = async () => {
    if (!selectedSupplier) return;

    try {
      await deleteSupplier.mutateAsync(
        selectedSupplier.id
      );

      toast.success("Supplier deleted.");

      setDeleteOpen(false);
    } catch {
      toast.error("Delete failed.");
    }
  };

  if (isLoading) {
    return <SupplierSkeleton />;
  }

  return (
    <div className="space-y-6">
      <SupplierHeader onAdd={handleCreate} />

      <SupplierSearch
        value={search}
        onValueChange={setSearch}
      />

      <SupplierTable
        suppliers={data?.items ?? []}
        loading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SupplierPagination
        page={data?.page ?? 1}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
      />

      <SupplierDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        supplier={selectedSupplier}
        loading={
          createSupplier.isPending ||
          updateSupplier.isPending
        }
        onSubmit={handleSubmit}
      />

      <DeleteSupplierDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        loading={deleteSupplier.isPending}
        onDelete={confirmDelete}
      />
    </div>
  );
}