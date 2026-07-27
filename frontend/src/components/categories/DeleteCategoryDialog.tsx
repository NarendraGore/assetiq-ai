"use client";

import { Category } from "@/types/category";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteCategoryDialogProps {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  category?: Category | null;

  loading?: boolean;

  onDelete: () => void;
}

export default function DeleteCategoryDialog({
  open,
  onOpenChange,
  category,
  loading = false,
  onDelete,
}: DeleteCategoryDialogProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Category
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to
            delete{" "}
            <strong>
              {category?.name}
            </strong>
            ?
            <br />
            <br />
            This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}