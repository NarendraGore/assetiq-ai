"use client";

import { ReactNode, Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Loader2 } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { buildLoginUrl } from "@/features/auth/utils/token";

interface ProtectedRouteProps {
  children: ReactNode;
}

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

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
