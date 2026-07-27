"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  categorySchema,
  CategoryFormValues,
} from "@/lib/validations/category-schema";

import { Category } from "@/types/category";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Tag,
  FileText,
  Loader2,
} from "lucide-react";

interface CategoryFormProps {
  initialData?: Category | null;

  loading?: boolean;

  onSubmit: (
    values: CategoryFormValues
  ) => void;

  onCancel: () => void;
}

export default function CategoryForm({
  initialData,
  loading = false,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),

    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description:
          initialData.description ?? "",
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [initialData, reset]);

  const description =
    watch("description") || "";

  return (
    <Card className="border shadow-lg">

      <CardHeader className="border-b pb-5">

        <CardTitle className="text-xl">
          {initialData
            ? "Edit Category"
            : "Create Category"}
        </CardTitle>

        <CardDescription>
          Fill in the details below to
          {initialData
            ? " update the category."
            : " create a new category."}
        </CardDescription>

      </CardHeader>

      <CardContent className="pt-6">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Category Name */}

          <div className="space-y-2">

            <Label htmlFor="name">
              Category Name
              <span className="ml-1 text-red-500">
                *
              </span>
            </Label>

            <div className="relative">

              <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                id="name"
                placeholder="Electronics"
                className="pl-10 transition-all focus-visible:ring-2"
                {...register("name")}
              />

            </div>

            <p className="text-xs text-muted-foreground">
              Maximum 100 characters.
            </p>

            {errors.name && (
              <p className="text-sm font-medium text-destructive">
                {errors.name.message}
              </p>
            )}

          </div>

          {/* Description */}

          <div className="space-y-2">

            <Label htmlFor="description">
              Description
            </Label>

            <div className="relative">

              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Textarea
                id="description"
                rows={5}
                maxLength={500}
                placeholder="Enter category description..."
                className="resize-none pl-10 transition-all focus-visible:ring-2"
                {...register("description")}
              />

            </div>

            <div className="flex justify-between text-xs text-muted-foreground">

              <span>
                Maximum 500 characters.
              </span>

              <span>
                {description.length}/500
              </span>

            </div>

            {errors.description && (
              <p className="text-sm font-medium text-destructive">
                {errors.description.message}
              </p>
            )}

          </div>

          {/* Footer */}

          <div className="flex items-center justify-end gap-3 border-t pt-5">

            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={onCancel}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
            >
              {loading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}

              {initialData
                ? "Update Category"
                : "Create Category"}
            </Button>

          </div>

        </form>

      </CardContent>

    </Card>
  );
}