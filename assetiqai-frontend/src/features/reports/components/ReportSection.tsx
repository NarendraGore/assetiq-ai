"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { InventoryReportTable, StockReportTable } from "./tables";

export default function ReportSection() {
  return (
    <section className="space-y-6">
      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList
          className="
            h-11
            rounded-xl
            border
            border-border
            bg-muted/40
            p-1
          "
        >
          <TabsTrigger
            value="inventory"
            className="
              rounded-lg
              transition-all
              duration-200
              data-[state=active]:bg-primary
              data-[state=active]:text-primary-foreground
            "
          >
            Inventory Report
          </TabsTrigger>

          <TabsTrigger
            value="stock"
            className="
              rounded-lg
              transition-all
              duration-200
              data-[state=active]:bg-primary
              data-[state=active]:text-primary-foreground
            "
          >
            Stock Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          <InventoryReportTable />
        </TabsContent>

        <TabsContent value="stock" className="space-y-6">
          <StockReportTable />
        </TabsContent>
      </Tabs>
    </section>
  );
}
