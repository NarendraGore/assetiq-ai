import type { ReactNode } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top Navigation */}
          <Navbar />

          {/* Page Content */}
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
        </div>
      </div>
    </ProtectedRoute>
  );
}
