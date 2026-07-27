"use client";

import { Category } from "@/types/category";

import {
  CategoryFormValues,
} from "@/lib/validations/category-schema";

import CategoryForm from "./CategoryForm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CategoryDialogProps {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  category?: Category | null;

  loading?: boolean;

  onSubmit: (
    values: CategoryFormValues
  ) => void;
}

export default function CategoryDialog({
  open,
  onOpenChange,
  category,
  loading = false,
  onSubmit,
}: CategoryDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {category
              ? "Edit Category"
              : "Add Category"}
          </DialogTitle>
        </DialogHeader>

        <CategoryForm
          initialData={category}
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