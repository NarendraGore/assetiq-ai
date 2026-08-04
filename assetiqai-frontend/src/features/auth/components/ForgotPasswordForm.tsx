"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { getErrorMessage } from "@/lib/getErrorMessage";
import { z } from "zod";

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

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      /**
       * TODO
       *
       * await authApi.forgotPassword(data);
       */

      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(
        "If an account exists, a password reset link has been sent.",
      );

      reset();
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to process your request."));
    }
  };

  return (
    <Card className="w-full max-w-md rounded-3xl border border-border shadow-xl">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Mail className="h-6 w-6" />
        </div>

        <CardTitle className="text-3xl font-bold">Forgot Password</CardTitle>

        <CardDescription>
          Enter your email and we will send you a password reset link.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <Input
              id="email"
              type="email"
              autoFocus
              autoComplete="email"
              placeholder="john@example.com"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="h-11 w-full rounded-xl bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
