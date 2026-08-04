import type { Metadata } from "next";

import LoginForm from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
};

/**
 * The two-panel brand shell lives in `app/(auth)/layout.tsx`. This page used to
 * carry a commented-out copy of that shell plus its own `<main>`, and exported a
 * function named `LoginPage` regardless of which screen it actually rendered.
 */
export default function LoginPage() {
  return <LoginForm />;
}
