"use client";

import { ReactNode, Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Loader2 } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { buildLoginUrl } from "@/features/auth/utils/token";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Client-side companion to `middleware.ts`. Middleware gates on the cookie;
 * this gates on the decoded session, so a tampered or expired token still
 * cannot render protected UI.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      }
    >
      <ProtectedRouteInner>{children}</ProtectedRouteInner>
    </Suspense>
  );
}

function ProtectedRouteInner({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (loading || isAuthenticated) return;

    const query = searchParams.toString();

    // Remember the destination so login can return the user here.
    router.replace(buildLoginUrl(`${pathname}${query ? `?${query}` : ""}`));
  }, [loading, isAuthenticated, router, pathname, searchParams]);

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-background"
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />

          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>

        <span className="sr-only">Checking your session</span>
      </div>
    );
  }

  // Redirect is in flight; render nothing rather than flashing the app shell.
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
