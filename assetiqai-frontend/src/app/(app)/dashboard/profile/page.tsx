"use client";

import { useRouter } from "next/navigation";
import { LogOut, Mail, Phone, Shield, User } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

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

  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <main
      className="
        bg-background
        px-6
        py-8
      "
    >
      <div className="mx-auto max-w-5xl space-y-6">
        <Card
          className="
            rounded-2xl
            border-border
            shadow-sm
          "
        >
          <CardHeader
            className="
              flex
              flex-col
              items-center
              gap-5
              border-b
              border-border
              pb-8
            "
          >
            <Avatar className="h-24 w-24 shadow-sm">
              <AvatarFallback
                className="
                  bg-primary
                  text-3xl
                  font-semibold
                  text-primary-foreground
                "
              >
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-foreground">
                {user.firstName} {user.lastName}
              </h1>

              <Badge
                className="
                  rounded-full
                  bg-primary/10
                  px-4
                  py-1
                  text-primary
                  hover:bg-primary/10
                 
                 
                "
              >
                {user.role}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 p-8">
            <div
              className="
                grid
                gap-4
                md:grid-cols-2
              "
            >
              <ProfileInfoCard icon={Mail} label="Email" value={user.email} />

              <ProfileInfoCard
                icon={Phone}
                label="Phone Number"
                value={user.phoneNumber || "-"}
              />

              <ProfileInfoCard icon={Shield} label="Role" value={user.role} />

              <ProfileInfoCard icon={User} label="User ID" value={user.id} />
            </div>

            <div className="flex justify-end border-t border-border pt-6">
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="
                  min-w-[180px]
                  rounded-xl
                  transition-all
                  duration-200
                  focus-visible:ring-2
                  focus-visible:ring-destructive
                "
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
