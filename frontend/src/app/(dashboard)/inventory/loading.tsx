import { InventorySkeleton } from "@/components/Inventory";

export default function Loading() {
  return (
    <div className="space-y-8">
      <InventorySkeleton />
      <InventorySkeleton />
      <InventorySkeleton />
    </div>
  );
}