import {
  Boxes,
  CircleDollarSign,
  Package,
  TriangleAlert,
  Ban,
} from "lucide-react";

export const dashboardCards = [
  {
    title: "Total Products",
    key: "totalProducts",
    icon: Boxes,
    color: "text-blue-600",
  },
  {
    title: "Active Products",
    key: "activeProducts",
    icon: Package,
    color: "text-green-600",
  },
  {
    title: "Inventory Value",
    key: "totalInventoryValue",
    icon: CircleDollarSign,
    color: "text-orange-600",
  },
  {
    title: "Low Stock",
    key: "lowStockProducts",
    icon: TriangleAlert,
    color: "text-yellow-600",
  },
  {
    title: "Out Of Stock",
    key: "outOfStockProducts",
    icon: Ban,
    color: "text-red-600",
  },
];