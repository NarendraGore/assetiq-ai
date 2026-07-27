import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100),

  sku: z
    .string()
    .min(1, "SKU is required")
    .max(50),

  description: z
    .string()
    .max(500)
    .optional(),

  categoryId: z.string().min(1, "Category is required"),

  supplierId: z.string().min(1, "Supplier is required"),

  unitPrice: z.coerce
    .number()
    .min(0.01, "Price must be greater than 0"),

  stockQuantity: z.coerce
    .number()
    .min(0),

  minimumStock: z.coerce
    .number()
    .min(0),

  imageUrl: z.string().optional(),

  isActive: z.boolean(),
});

export type ProductFormValues =
  z.infer<typeof productSchema>;