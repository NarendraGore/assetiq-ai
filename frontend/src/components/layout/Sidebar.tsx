"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { navigation } from "@/constants/navigation";

import { useAuthStore } from "@/store/auth.store";
import type { UserRole } from "@/constants/roles";

export default function Sidebar() {

    const pathname = usePathname();

    const user =
        useAuthStore(
            state => state.user
        );

   const menuItems = navigation.filter((item) =>
  item.roles.includes(user?.role as UserRole)
);
      

    return (

        <aside className="w-64 border-r">

            <div className="p-6">

                <h2 className="text-xl font-bold">
                    AssetIQ AI
                </h2>

            </div>

            <nav>

                {menuItems.map(item => {

                    const Icon = item.icon;

                    return (

                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-5 py-3 hover:bg-muted
                            ${
                                pathname === item.href
                                    ? "bg-muted font-semibold"
                                    : ""
                            }`}
                        >

                            <Icon size={20} />

                            {item.title}

                        </Link>

                    );

                })}

            </nav>

        </aside>

    );

}