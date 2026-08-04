import type { Metadata } from "next";

import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot password",
};

/**
 * The two-panel brand shell lives in `app/(auth)/layout.tsx`. This page used to
 * carry a commented-out copy of that shell plus its own `<main>`, and exported a
 * function named `LoginPage` regardless of which screen it actually rendered.
 */
export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
