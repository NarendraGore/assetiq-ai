"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SupplierForm from "./SupplierForm";

import { Supplier } from "@/types/supplier";

import { SupplierFormValues } from "@/lib/validations/supplier-schema";

interface SupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplier?: Supplier | null;
  loading?: boolean;
  onSubmit: (values: SupplierFormValues) => void;
}

export default function SupplierDialog({
  open,
  onOpenChange,
  supplier,
  loading = false,
  onSubmit,
}: SupplierDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {supplier
              ? "Edit Supplier"
              : "Add Supplier"}
          </DialogTitle>
        </DialogHeader>

        <SupplierForm
          key={supplier?.id ?? "new"}
          initialData={supplier}
          loading={loading}
          onSubmit={onSubmit}
          onCancel={() =>
            onOpenChange(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
}