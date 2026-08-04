import { z } from "zod";

/**
 * Optional text field helper.
 *
 * The API treats empty strings and nulls interchangeably, so an
 * untouched optional input must validate cleanly.
 */
const optionalString = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .optional()
    .or(z.literal(""));

/**
 * Supplier Form Validation Schema
 */
export const supplierSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters.")
    .max(150, "Company name cannot exceed 150 characters."),

  contactPerson: optionalString(
    100,
    "Contact person cannot exceed 100 characters.",
  ),

  email: z
    .string()
    .trim()
    .max(150, "Email cannot exceed 150 characters.")
    .email("Enter a valid email address.")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit phone number.",
    )
    .optional()
    .or(z.literal("")),

  address: optionalString(
    500,
    "Address cannot exceed 500 characters.",
  ),
});

/**
 * React Hook Form Values
 */
export type SupplierFormValues = z.infer<typeof supplierSchema>;

/**
 * Backward-compatible alias
 * (used by useSupplierForm)
 */
export type SupplierSchema = SupplierFormValues;

/**
 * Default Form Values
 */
export const supplierDefaultValues: SupplierFormValues = {
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  address: "",
};
