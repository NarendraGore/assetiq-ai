// src/components/layout/navConfig.ts
import { Home, Package, Users, BarChart, FileText } from "lucide-react";

export const navConfig = {
  admin: [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/suppliers", label: "Suppliers", icon: Users },
    { href: "/reports", label: "Reports", icon: BarChart },
  ],
  manager: [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/reports", label: "Reports", icon: FileText },
  ],
  employee: [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/products", label: "Products", icon: Package },
  ],
};
