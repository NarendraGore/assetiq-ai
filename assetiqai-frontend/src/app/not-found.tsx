// src/app/not-found.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link href="/">
        <Button variant="default">Go Back Home</Button>
      </Link>
    </div>
  );
}
