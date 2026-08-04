import { z } from "zod";

/**
 * Product Form Validation Schema
 *
 * Image upload is intentionally out of scope for now, so `imageUrl` is not
 * part of the form. Numeric fields are coerced from their string input values
 * and constrained to sensible inventory ranges.
 */
export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters.")
    .max(150, "Product name cannot exceed 150 characters."),

  sku: z
    .string()
    .trim()
    .min(2, "SKU must be at least 2 characters.")
    .max(50, "SKU cannot exceed 50 characters."),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .optional()
    .or(z.literal("")),

  categoryId: z
    .string({ error: "Please select a category." })
    .min(1, "Please select a category."),

  supplierId: z
    .string({ error: "Please select a supplier." })
    .min(1, "Please select a supplier."),

  unitPrice: z.coerce
    .number({ error: "Enter a valid price." })
    .min(0, "Price cannot be negative.")
    .max(9_999_999, "Price is too large."),

  stockQuantity: z.coerce
    .number({ error: "Enter a valid quantity." })
    .int("Quantity must be a whole number.")
    .min(0, "Quantity cannot be negative.")
    .max(9_999_999, "Quantity is too large."),

  minimumStock: z.coerce
    .number({ error: "Enter a valid minimum stock." })
    .int("Minimum stock must be a whole number.")
    .min(0, "Minimum stock cannot be negative.")
    .max(9_999_999, "Minimum stock is too large."),

  isActive: z.boolean(),
});

/**
 * React Hook Form Values
 */
export type ProductFormValues = z.infer<typeof productSchema>;

/**
 * Backward-compatible alias (used by useProductForm)
 */
export type ProductSchema = ProductFormValues;

/**
 * Default Form Values
 */
export const productDefaultValues: ProductFormValues = {
  name: "",
  sku: "",
  description: "",
  categoryId: "",
  supplierId: "",
  unitPrice: 0,
  stockQuantity: 0,
  minimumStock: 0,
  isActive: true,
};
