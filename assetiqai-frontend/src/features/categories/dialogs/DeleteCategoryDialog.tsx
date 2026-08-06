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
  productCount?: number;
  loading?: boolean;
  onDelete: () => Promise<void>;
}

export default function DeleteCategoryDialog({
  open,
  onOpenChange,
  categoryName,
  productCount = 0,
  loading = false,
  onDelete,
}: DeleteCategoryDialogProps) {
  const hasProducts = productCount > 0;

  const handleDelete = async () => {
    try {
      await onDelete();

      onOpenChange(false);
    } catch {


    }
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

          {hasProducts ? (
            <div className="rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-400">
              <p className="font-semibold">Deletion Prevented</p>
              <p className="mt-1 text-xs leading-relaxed">
                This category <span className="font-semibold">{categoryName}</span> cannot be deleted because it is assigned to{" "}
                <span className="font-semibold text-foreground">{productCount}</span> product(s).
                Please reassign or delete those products before removing this category.
              </p>
            </div>
          ) : (
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
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            {hasProducts ? "Close" : "Cancel"}
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={loading || hasProducts}
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
              disabled:opacity-50
              disabled:pointer-events-none
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
