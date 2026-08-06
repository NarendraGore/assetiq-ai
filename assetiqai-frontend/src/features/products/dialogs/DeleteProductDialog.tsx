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

interface DeleteProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  productName?: string;

  loading?: boolean;

  onDelete: () => Promise<void>;
}

export default function DeleteProductDialog({
  open,
  onOpenChange,
  productName,
  loading = false,
  onDelete,
}: DeleteProductDialogProps) {
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

            <AlertDialogTitle>Delete Product</AlertDialogTitle>
          </div>

          <AlertDialogDescription>
            Are you sure you want to permanently delete{" "}
            <span className="font-semibold text-foreground">
              {productName ?? "this product"}
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
              "Delete Product"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
