import type { ReactNode } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/layout/Navbar";
import AppSidebar from "@/components/layout/AppSidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ProtectedRoute>
      <SidebarProvider defaultOpen>
        <AppSidebar />

        <SidebarInset>
          <Navbar />

          <main className="flex-1 overflow-y-auto bg-background">
            <div
              className="
                mx-auto
                flex
                w-full
                max-w-7xl
                flex-col
                gap-6
                px-4
                py-6
                sm:px-6
                lg:px-8
              "
            >
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
