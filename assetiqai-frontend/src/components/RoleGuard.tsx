"use client";

import { ReactNode } from "react";
import { ShieldAlert } from "lucide-react";

import { useAuth } from "@//features/auth/hooks/useAuth";

interface RoleGuardProps {
  roles: string[];
  children: ReactNode;
  fallback?: ReactNode;
}

export default function RoleGuard({
  roles,
  children,
  fallback,
}: RoleGuardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return null;
  }

  const hasPermission = roles.includes(user.role);

  if (!hasPermission) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <ShieldAlert className="mb-4 h-12 w-12 text-red-500" />

        <h2 className="text-xl font-semibold text-slate-900">Access Denied</h2>

        <p className="mt-2 max-w-md text-slate-600">
          You dont have permission to view this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
