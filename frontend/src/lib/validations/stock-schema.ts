import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Stock In
|--------------------------------------------------------------------------
*/

export const stockInSchema = z.object({
  productId: z
    .string()
    .min(1, "Product is required"),

  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .min(1, "Quantity must be greater than 0"),

  remarks: z
    .string()
    .trim()
    .min(1, "Remarks are required")
    .max(500, "Remarks cannot exceed 500 characters"),
});

export type StockInFormValues =
  z.infer<typeof stockInSchema>;

/*
|--------------------------------------------------------------------------
| Stock Out
|--------------------------------------------------------------------------
*/

export const stockOutSchema = z.object({
  productId: z
    .string()
    .min(1, "Product is required"),

  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .min(1, "Quantity must be greater than 0"),

  remarks: z
    .string()
    .trim()
    .min(1, "Remarks are required")
    .max(500, "Remarks cannot exceed 500 characters"),
});

export type StockOutFormValues =
  z.infer<typeof stockOutSchema>;

/*
|--------------------------------------------------------------------------
| Stock Adjustment
|--------------------------------------------------------------------------
*/

export const stockAdjustSchema = z.object({
  productId: z
    .string()
    .min(1, "Product is required"),

  newQuantity: z
    .number({
      required_error: "New quantity is required",
      invalid_type_error: "New quantity must be a number",
    })
    .min(0, "Quantity cannot be negative"),

  remarks: z
    .string()
    .trim()
    .min(1, "Remarks are required")
    .max(500, "Remarks cannot exceed 500 characters"),
});

export type StockAdjustFormValues =
  z.infer<typeof stockAdjustSchema>;