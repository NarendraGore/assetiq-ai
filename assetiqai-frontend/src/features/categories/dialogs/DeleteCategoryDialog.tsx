"use client";

import { AlertTriangle, Loader2 } from "lucide-react";

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
  onOpenChange: (open: boolean) => void;

  categoryName?: string;

  loading?: boolean;

  onDelete: () => Promise<void>;
}

export default function DeleteCategoryDialog({
  open,
  onOpenChange,
  categoryName,
  loading = false,
  onDelete,
}: DeleteCategoryDialogProps) {
  const handleDelete = async () => {
    await onDelete();

    onOpenChange(false);
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (loading) return;

        onOpenChange(nextOpen);
      }}
    >
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>

            <AlertDialogTitle>Delete Category</AlertDialogTitle>
          </div>

          <AlertDialogDescription>
            Are you sure you want to permanently delete{" "}
            <span className="font-semibold text-foreground">
              {categoryName ?? "this category"}
            </span>
            ?
            <br />
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={async (event) => {
              event.preventDefault();

              await handleDelete();
            }}
            className="
              bg-destructive
              text-destructive-foreground
              hover:bg-destructive/90
              focus-visible:ring-2
              focus-visible:ring-destructive
            "
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Category"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
