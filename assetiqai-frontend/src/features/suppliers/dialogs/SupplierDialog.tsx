"use client";

import { Supplier } from "../types";
import { SupplierFormValues } from "../validation";

import { SupplierForm } from "../form/SupplierForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  mode?: "create" | "edit";

  defaultValues?: Partial<Supplier>;

  loading?: boolean;

  onSubmit: (values: SupplierFormValues) => Promise<void> | void;
}

export default function SupplierDialog({
  open,
  onOpenChange,

  mode = "create",

  defaultValues,

  loading = false,

  onSubmit,
}: SupplierDialogProps) {
  const isCreate = mode === "create";

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!loading) {
          onOpenChange(nextOpen);
        }
      }}
    >
      <DialogContent
        className="sm:max-w-2xl"
        onPointerDownOutside={(event) => {
          if (loading) {
            event.preventDefault();
          }
        }}
        onEscapeKeyDown={(event) => {
          if (loading) {
            event.preventDefault();
          }
        }}
      >
        <DialogHeader className="space-y-2">
          <DialogTitle>
            {isCreate ? "Create Supplier" : "Edit Supplier"}
          </DialogTitle>

          <DialogDescription>
            {isCreate
              ? "Add a new supplier to source products and manage procurement."
              : "Update the supplier information. Changes will be reflected throughout the system."}
          </DialogDescription>
        </DialogHeader>

        <SupplierForm
          mode={mode}
          defaultValues={defaultValues}
          loading={loading}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
