"use client";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
      <p className="text-muted-foreground mb-6">{error.message}</p>
      <Button onClick={() => reset()}>Try Again</Button>
    </div>
  );
}
