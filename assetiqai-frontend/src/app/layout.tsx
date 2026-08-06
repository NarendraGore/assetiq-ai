import type { Metadata } from "next";

import "./globals.css";

import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import { TooltipProvider } from "@/components/ui/tooltip";

import { AuthProvider } from "@/features/auth/context/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "ASSETIQ AI",
    template: "%s | ASSETIQ AI",
  },
  description:
    "ASSETIQ AI - Intelligent asset and inventory management platform.",
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={0}>
            <QueryProvider>
              <AuthProvider>
                {children}

                <Toaster
                  richColors
                  position="top-right"
                  closeButton
                  expand={false}
                />
              </AuthProvider>
            </QueryProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
