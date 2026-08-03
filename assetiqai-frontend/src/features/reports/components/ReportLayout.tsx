"use client";

import type { ReactNode } from "react";

interface ReportLayoutProps {
  children: ReactNode;
}

export default function ReportLayout({ children }: ReportLayoutProps) {
  return (
    <div
      className="
        mx-auto
        flex
        w-full
        max-w-7xl
        flex-col
        space-y-6
        animate-in
        fade-in
        duration-300
      "
    >
      {children}
    </div>
  );
}
