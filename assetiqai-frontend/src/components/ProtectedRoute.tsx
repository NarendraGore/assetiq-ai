"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  /**
   * Checking authentication...
   */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />

          <p className="text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  /**
   * Redirecting...
   */
  if (!isAuthenticated) {
    return null;
  }

  /**
   * Authenticated
   */
  return <>{children}</>;
}
