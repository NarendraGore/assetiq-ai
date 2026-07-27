"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  supplierSchema,
  SupplierFormValues,
} from "@/lib/validations/supplier-schema";

import { Supplier } from "@/types/supplier";

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
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Loader2,
} from "lucide-react";

interface SupplierFormProps {
  initialData?: Supplier | null;
  loading?: boolean;
  onSubmit: (values: SupplierFormValues) => void;
  onCancel: () => void;
}

export default function SupplierForm({
  initialData,
  loading = false,
  onSubmit,
  onCancel,
}: SupplierFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),

    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        companyName: initialData.companyName,
        contactPerson: initialData.contactPerson,
        email: initialData.email,
        phone: initialData.phone,
        address: initialData.address,
      });
    } else {
      reset({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  }, [initialData, reset]);

  const address = watch("address") ?? "";

  return (
    <Card className="border shadow-lg">
      <CardHeader className="border-b pb-5">
        <CardTitle className="text-xl">
          {initialData ? "Edit Supplier" : "Create Supplier"}
        </CardTitle>

        <CardDescription>
          Fill in supplier information below.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {/* Company */}

            <div className="space-y-2">
              <Label htmlFor="companyName">
                Company Name
                <span className="ml-1 text-red-500">*</span>
              </Label>

              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  id="companyName"
                  placeholder="ABC Technologies"
                  className="pl-10"
                  {...register("companyName")}
                />
              </div>

              {errors.companyName && (
                <p className="text-sm text-destructive">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* Contact */}

            <div className="space-y-2">
              <Label htmlFor="contactPerson">
                Contact Person
                <span className="ml-1 text-red-500">*</span>
              </Label>

              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  id="contactPerson"
                  placeholder="John Doe"
                  className="pl-10"
                  {...register("contactPerson")}
                />
              </div>

              {errors.contactPerson && (
                <p className="text-sm text-destructive">
                  {errors.contactPerson.message}
                </p>
              )}
            </div>

            {/* Email */}

            <div className="space-y-2">
              <Label htmlFor="email">
                Email
                <span className="ml-1 text-red-500">*</span>
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  className="pl-10"
                  {...register("email")}
                />
              </div>

              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone
                <span className="ml-1 text-red-500">*</span>
              </Label>

              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  id="phone"
                  placeholder="9876543210"
                  className="pl-10"
                  {...register("phone")}
                />
              </div>

              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Address */}

          <div className="space-y-2">
            <Label htmlFor="address">
              Address
              <span className="ml-1 text-red-500">*</span>
            </Label>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Textarea
                id="address"
                rows={5}
                maxLength={500}
                placeholder="Enter supplier address..."
                className="resize-none pl-10"
                {...register("address")}
              />
            </div>

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Maximum 500 characters.</span>
              <span>{address.length}/500</span>
            </div>

            {errors.address && (
              <p className="text-sm text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
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
                ? "Update Supplier"
                : "Create Supplier"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}