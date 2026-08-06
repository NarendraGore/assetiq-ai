import { z } from "zod";



const productId = z
  .string({ error: "Please select a product." })
  .min(1, "Please select a product.");

const remarks = z
  .string()
  .trim()
  .max(250, "Remarks cannot exceed 250 characters.")
  .optional()
  .or(z.literal(""));


export type StockLookup = (productId: string) => number | undefined;


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


export const createStockOutSchema = (getAvailableStock?: StockLookup) =>
  stockMovementSchema.superRefine((values, ctx) => {
    const available = getAvailableStock?.(values.productId);

    if (
      typeof available === "number" &&
      typeof values.quantity === "number" &&
      values.quantity > available
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["quantity"],
        message: `Cannot remove more than the available stock (${available.toLocaleString(
          "en-IN",
        )}).`,
      });
    }
  });


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


export const createStockAdjustSchema = (getAvailableStock?: StockLookup) =>
  stockAdjustSchema.superRefine((values, ctx) => {
    const available = getAvailableStock?.(values.productId);

    if (
      typeof available === "number" &&
      typeof values.quantity === "number" &&
      available + values.quantity < 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["quantity"],
        message: `Adjustment would drive stock below zero (only ${available.toLocaleString(
          "en-IN",
        )} available).`,
      });
    }
  });

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
