"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "sonner";

import authService from "@/services/register.service";

import {
  registerSchema,
  RegisterFormValues,
} from "@/lib/validations/register-schema";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApiError {
  message?: string;
  errors?: Record<string, string[]>;
}

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const response = await authService.register(values);

      toast.success(
        response?.message ?? "Registration successful!"
      );

      reset();

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err) {
      const error = err as AxiosError<ApiError>;

      console.error(error);

      const apiErrors = error.response?.data?.errors;

      if (apiErrors) {
        Object.values(apiErrors).forEach((messages) => {
          messages.forEach((message) => toast.error(message));
        });

        return;
      }

      toast.error(
        error.response?.data?.message ??
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold">
          AssetIQ AI
        </CardTitle>

        <CardDescription>
          Create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">
              First Name
            </Label>

            <Input
              id="firstName"
              placeholder="John"
              autoComplete="given-name"
              disabled={isSubmitting}
              {...register("firstName")}
            />

            {errors.firstName && (
              <p className="text-sm text-destructive">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="lastName">
              Last Name
            </Label>

            <Input
              id="lastName"
              placeholder="Doe"
              autoComplete="family-name"
              disabled={isSubmitting}
              {...register("lastName")}
            />

            {errors.lastName && (
              <p className="text-sm text-destructive">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              disabled={isSubmitting}
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">
              Phone Number
            </Label>

            <Input
              id="phoneNumber"
              type="tel"
              placeholder="9876543210"
              autoComplete="tel"
              disabled={isSubmitting}
              {...register("phoneNumber")}
            />

            {errors.phoneNumber && (
              <p className="text-sm text-destructive">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              type="password"
              placeholder="********"
              autoComplete="new-password"
              disabled={isSubmitting}
              {...register("password")}
            />

            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirm Password
            </Label>

            <Input
              id="confirmPassword"
              type="password"
              placeholder="********"
              autoComplete="new-password"
              disabled={isSubmitting}
              {...register("confirmPassword")}
            />

            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Creating Account..."
              : "Create Account"}
          </Button>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}