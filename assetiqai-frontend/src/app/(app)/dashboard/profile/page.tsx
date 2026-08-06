"use client";

import { useRouter } from "next/navigation";
import { KeyRound, LogOut, Mail, Phone, Shield, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProfileInfoCard from "@/features/profile/components/ProfileInfoCard";

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

  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <main className="space-y-6 px-1 py-4 md:px-6 md:py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Profile</h1>
          <p className="text-sm text-muted-foreground">Your account details.</p>
        </div>

        <Button variant="destructive" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <Card>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-lg font-bold text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-lg font-semibold text-foreground">
                  {user.firstName} {user.lastName}
                </h2>
                <Badge variant="secondary">{user.role}</Badge>
              </div>
              <p className="truncate text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ProfileInfoCard icon={UserIcon} label="First Name" value={user.firstName} />
            <ProfileInfoCard icon={UserIcon} label="Last Name" value={user.lastName} />
            <ProfileInfoCard icon={Mail} label="Email Address" value={user.email} copyable />
            <ProfileInfoCard
              icon={Phone}
              label="Phone Number"
              value={user.phoneNumber || "Not provided"}
              copyable={Boolean(user.phoneNumber)}
            />
            <ProfileInfoCard icon={Shield} label="System Role" value={user.role} />
            <ProfileInfoCard icon={KeyRound} label="User ID" value={user.id} copyable />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
