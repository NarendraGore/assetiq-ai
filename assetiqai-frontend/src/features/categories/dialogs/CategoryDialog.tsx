"use client";

import { Category } from "../types";
import { CategoryFormValues } from "../validation";

import { CategoryForm } from "../form/CategoryForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  mode?: "create" | "edit";

  defaultValues?: Partial<Category>;

  loading?: boolean;

  onSubmit: (values: CategoryFormValues) => Promise<void> | void;
}

export default function CategoryDialog({
  open,
  onOpenChange,

  mode = "create",

  defaultValues,

  loading = false,

  onSubmit,
}: CategoryDialogProps) {
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
        className="sm:max-w-lg"
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
            {isCreate ? "Create Category" : "Edit Category"}
          </DialogTitle>

          <DialogDescription>
            {isCreate
              ? "Create a new category to organize products across your inventory."
              : "Update the category information. Changes will be reflected throughout the system."}
          </DialogDescription>
        </DialogHeader>

        <CategoryForm
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
