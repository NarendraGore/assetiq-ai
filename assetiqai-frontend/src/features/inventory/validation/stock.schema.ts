import { z } from "zod";

/**
 * Stock transaction validation.
 *
 * Stock In / Stock Out take a positive whole quantity. Adjustment is a signed
 * delta (per product decision): positive adds to current stock, negative
 * removes — but it may not be zero, since a zero adjustment is a no-op.
 */

const productId = z
  .string({ error: "Please select a product." })
  .min(1, "Please select a product.");

const remarks = z
  .string()
  .trim()
  .max(250, "Remarks cannot exceed 250 characters.")
  .optional()
  .or(z.literal(""));

/** Shared schema for Stock In and Stock Out. */
export const stockMovementSchema = z.object({
  productId,
  quantity: z.coerce
    .number({ error: "Enter a valid quantity." })
    .int("Quantity must be a whole number.")
    .positive("Quantity must be greater than zero.")
    .max(9_999_999, "Quantity is too large."),
  remarks,
});

export type StockMovementValues = z.infer<typeof stockMovementSchema>;

/** Adjustment schema — signed delta, non-zero. */
export const stockAdjustSchema = z.object({
  productId,
  quantity: z.coerce
    .number({ error: "Enter a valid amount." })
    .int("Amount must be a whole number.")
    .min(-9_999_999, "Amount is too small.")
    .max(9_999_999, "Amount is too large.")
    .refine((value) => value !== 0, {
      message: "Adjustment cannot be zero.",
    }),
  remarks,
});

export type StockAdjustValues = z.infer<typeof stockAdjustSchema>;

export const stockMovementDefaultValues: StockMovementValues = {
  productId: "",
  quantity: 1,
  remarks: "",
};

export const stockAdjustDefaultValues: StockAdjustValues = {
  productId: "",
  quantity: 0,
  remarks: "",
};
