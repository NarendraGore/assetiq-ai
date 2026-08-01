"use client";

import { useRouter } from "next/navigation";
import { LogOut, Mail, Phone, Shield, User } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const router = useRouter();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logged out successfully.");

      router.replace("/login");
    } catch {
      toast.error("Unable to logout.");
    }
  };

  if (!user) return null;

  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl">
        <Card className="rounded-3xl border-slate-200 shadow-lg">
          <CardHeader className="flex flex-col items-center gap-4 border-b pb-8">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-blue-600 text-3xl font-semibold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="text-center">
              <CardTitle className="text-3xl">
                {user.firstName} {user.lastName}
              </CardTitle>

              <Badge className="mt-3 rounded-full bg-blue-100 px-4 py-1 text-blue-700 hover:bg-blue-100">
                {user.role}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-8">
            <div className="flex items-center gap-4 rounded-xl border p-4">
              <Mail className="h-5 w-5 text-blue-600" />

              <div>
                <p className="text-sm text-slate-500">Email</p>

                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border p-4">
              <Phone className="h-5 w-5 text-blue-600" />

              <div>
                <p className="text-sm text-slate-500">Phone Number</p>

                <p className="font-medium">{user.phoneNumber || "-"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border p-4">
              <Shield className="h-5 w-5 text-blue-600" />

              <div>
                <p className="text-sm text-slate-500">Role</p>

                <p className="font-medium">{user.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border p-4">
              <User className="h-5 w-5 text-blue-600" />

              <div>
                <p className="text-sm text-slate-500">User ID</p>

                <p className="break-all font-medium">{user.id}</p>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              variant="destructive"
              className="h-11 w-full rounded-xl"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
