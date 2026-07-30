"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
      <Link href="/">Home</Link>
      {segments.map((segment, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/");
        return (
          <span key={i}>
            {" / "}
            <Link href={href}>{segment}</Link>
          </span>
        );
      })}
    </nav>
  );
}
