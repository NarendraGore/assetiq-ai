"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  CheckCircle2,
  Copy,
  Globe,
  KeyRound,
  LogOut,
  Mail,
  Phone,
  Shield,
  ShieldCheck,
  Sparkles,
  User as UserIcon,
  UserCheck,
  Lock,
  Boxes,
  Truck,
  Layers,
  FileBarChart,
} from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileInfoCard from "@/features/profile/components/ProfileInfoCard";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [idCopied, setIdCopied] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully.");
      router.replace("/login");
    } catch {
      toast.error("Unable to logout.");
    }
  };

  const handleCopyId = async () => {
    if (!user?.id) return;
    try {
      await navigator.clipboard.writeText(user.id);
      setIdCopied(true);
      toast.success("User ID copied to clipboard");
      setTimeout(() => setIdCopied(false), 2000);
    } catch {
      toast.error("Failed to copy User ID");
    }
  };

  if (!user) return null;

  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

  const getRoleBadgeVariant = (role?: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "manager":
        return "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30";
      default:
        return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30";
    }
  };

  const permissionsList = [
    {
      title: "Inventory & Stock Operations",
      description: "Create, edit, adjust, and track product stock levels across warehouses.",
      icon: Boxes,
      available: true,
    },
    {
      title: "Category Administration",
      description: "Create and organize product categories with delete prevention safeguards.",
      icon: Layers,
      available: true,
    },
    {
      title: "Supplier & Vendor Management",
      description: "Manage supplier directory, contact details, and assigned products.",
      icon: Truck,
      available: true,
    },
    {
      title: "Analytics & Report Exports",
      description: "Generate and export inventory summary, low-stock, and movement reports.",
      icon: FileBarChart,
      available: true,
    },
  ];

  return (
    <main className="space-y-8 px-1 py-4 md:px-6 md:py-8">
      {/* Hero Cover & Banner Header */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm">
        {/* Decorative Background Gradient Mesh */}
        <div className="h-44 w-full bg-gradient-to-r from-primary/30 via-indigo-500/20 to-purple-500/30 dark:from-primary/20 dark:via-indigo-900/30 dark:to-purple-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent dark:from-white/5" />
          <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute top-12 left-1/3 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />
        </div>

        {/* Profile Card Header Info */}
        <div className="relative px-6 pb-6 pt-0 md:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            {/* Avatar & Main Identity */}
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              <div className="relative -mt-16 sm:-mt-20">
                <div className="rounded-full p-1.5 bg-background shadow-xl ring-4 ring-background">
                  <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border border-border/50">
                    <AvatarFallback className="bg-gradient-to-br from-primary via-indigo-600 to-purple-600 text-3xl sm:text-4xl font-bold text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <span
                  className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-2 border-background bg-emerald-500 shadow-xs"
                  title="Online & Active"
                />
              </div>

              <div className="space-y-1.5 pt-2 sm:pt-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    {user.firstName} {user.lastName}
                  </h1>
                  <Badge
                    variant="outline"
                    className={`gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${getRoleBadgeVariant(
                      user.role
                    )}`}
                  >
                    <Shield className="h-3.5 w-3.5" />
                    {user.role}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    {user.email}
                  </span>
                  <span className="inline-block h-1 w-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="h-3.5 w-3.5 text-emerald-500" />
                    Verified Account
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-start sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyId}
                className="h-10 gap-2 rounded-xl border-border/80 px-4 font-medium transition-all hover:bg-muted"
              >
                {idCopied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Copied ID</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-muted-foreground" />
                    <span>Copy User ID</span>
                  </>
                )}
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                className="h-10 gap-2 rounded-xl px-5 font-semibold shadow-xs transition-all hover:bg-destructive/90"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Overview Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border-border/60 bg-card/60 p-4 shadow-xs backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account Standing</p>
              <p className="text-sm font-bold text-foreground mt-0.5">Active & Authorized</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border-border/60 bg-card/60 p-4 shadow-xs backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Access Scope</p>
              <p className="text-sm font-bold text-foreground mt-0.5">{user.role} Permissions</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border-border/60 bg-card/60 p-4 shadow-xs backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Authentication</p>
              <p className="text-sm font-bold text-foreground mt-0.5">JWT Bearer Token</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border-border/60 bg-card/60 p-4 shadow-xs backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Workspace</p>
              <p className="text-sm font-bold text-foreground mt-0.5">AssetIQ AI Enterprise</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Tabbed Profile Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="h-12 w-full justify-start rounded-2xl bg-muted/60 p-1 backdrop-blur-sm sm:w-auto">
          <TabsTrigger
            value="overview"
            className="rounded-xl px-5 py-2 text-sm font-semibold transition-all data-[state=active]:bg-background data-[state=active]:shadow-xs"
          >
            <UserIcon className="mr-2 h-4 w-4 text-primary" />
            Personal Info
          </TabsTrigger>

          <TabsTrigger
            value="permissions"
            className="rounded-xl px-5 py-2 text-sm font-semibold transition-all data-[state=active]:bg-background data-[state=active]:shadow-xs"
          >
            <ShieldCheck className="mr-2 h-4 w-4 text-emerald-500" />
            Permissions & Scope
          </TabsTrigger>

          <TabsTrigger
            value="security"
            className="rounded-xl px-5 py-2 text-sm font-semibold transition-all data-[state=active]:bg-background data-[state=active]:shadow-xs"
          >
            <KeyRound className="mr-2 h-4 w-4 text-purple-500" />
            Security & System
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Personal Info Grid */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="rounded-3xl border-border/70 bg-card p-6 shadow-sm">
            <CardHeader className="px-0 pt-0 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">Personal Account Details</CardTitle>
                  <CardDescription className="mt-1 text-sm">
                    Manage and inspect your registered user identity and profile specifications.
                  </CardDescription>
                </div>
                <Sparkles className="h-5 w-5 text-primary opacity-60" />
              </div>
            </CardHeader>

            <CardContent className="px-0 pb-0">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ProfileInfoCard
                  icon={UserIcon}
                  label="First Name"
                  value={user.firstName}
                  badge="Given Name"
                />

                <ProfileInfoCard
                  icon={UserIcon}
                  label="Last Name"
                  value={user.lastName}
                  badge="Family Name"
                />

                <ProfileInfoCard
                  icon={Mail}
                  label="Email Address"
                  value={user.email}
                  copyable
                  badge="Primary Email"
                />

                <ProfileInfoCard
                  icon={Phone}
                  label="Phone Number"
                  value={user.phoneNumber || "Not provided"}
                  copyable={Boolean(user.phoneNumber)}
                  badge="Contact"
                />

                <ProfileInfoCard
                  icon={Shield}
                  label="System Role"
                  value={user.role}
                  badge="Access Control"
                />

                <ProfileInfoCard
                  icon={KeyRound}
                  label="User Unique Identifier"
                  value={user.id}
                  copyable
                  badge="UUID"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Permissions & Role Matrix */}
        <TabsContent value="permissions" className="space-y-6">
          <Card className="rounded-3xl border-border/70 bg-card p-6 shadow-sm">
            <CardHeader className="px-0 pt-0 pb-6">
              <CardTitle className="text-xl font-bold">Role Capabilities & Access Matrix</CardTitle>
              <CardDescription className="mt-1 text-sm">
                Operational privileges granted to your <span className="font-semibold text-foreground">{user.role}</span> account role in AssetIQ AI.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 pb-0 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {permissionsList.map((perm) => {
                  const IconComponent = perm.icon;
                  return (
                    <div
                      key={perm.title}
                      className="flex items-start gap-4 rounded-2xl border border-border/60 bg-muted/30 p-4 transition-all hover:bg-muted/50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-foreground">{perm.title}</h3>
                          <Badge variant="secondary" className="gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px]">
                            <CheckCircle2 className="h-3 w-3" />
                            Granted
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{perm.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Security & System Status */}
        <TabsContent value="security" className="space-y-6">
          <Card className="rounded-3xl border-border/70 bg-card p-6 shadow-sm">
            <CardHeader className="px-0 pt-0 pb-6">
              <CardTitle className="text-xl font-bold">Security & Active Session</CardTitle>
              <CardDescription className="mt-1 text-sm">
                System telemetry and authentication session health for your user account.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 pb-0 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3 rounded-2xl border border-border/60 bg-muted/20 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Session Security</h4>
                      <p className="text-xs text-muted-foreground">HTTP-Only SSL & JWT Encrypted</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Your current session is authenticated via JWT tokens and scoped to your organization. Requests are verified on every API invocation.
                  </p>
                </div>

                <div className="space-y-3 rounded-2xl border border-border/60 bg-muted/20 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600">
                      <KeyRound className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Account Credentials</h4>
                      <p className="text-xs text-muted-foreground">Managed by AssetIQ Authentication</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Password hashes are stored using secure salted algorithms. To change credentials or update your login details, contact your system admin.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-destructive/20 bg-destructive/5 p-4 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <LogOut className="h-5 w-5 text-destructive" />
                  <div>
                    <p className="text-sm font-bold text-foreground">Terminate Current Session</p>
                    <p className="text-xs text-muted-foreground">Safely log out from this browser session and clear stored tokens.</p>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="rounded-xl px-5 font-semibold shadow-xs"
                >
                  Sign Out Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
