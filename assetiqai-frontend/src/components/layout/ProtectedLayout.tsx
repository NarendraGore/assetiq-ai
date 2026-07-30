
"use client";
import {useAuth} from "../../features/auth/hooks/useAuth";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center h-screen">Please login</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  );
}
