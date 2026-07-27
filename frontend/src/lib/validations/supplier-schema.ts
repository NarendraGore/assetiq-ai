import { z } from "zod";

export const supplierSchema = z.object({
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(100),

  contactPerson: z
    .string()
    .min(1, "Contact person is required")
    .max(100),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email"),

  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone must be 10 digits"),

  address: z
    .string()
    .min(1, "Address is required")
    .max(500),
});

export type SupplierFormValues =
  z.infer<typeof supplierSchema>;