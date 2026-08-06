"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { InventoryReportTable, StockReportTable } from "./tables";

import type { ReportTab } from "../types";

interface ReportSectionProps {
  activeTab: ReportTab;
  onTabChange: (tab: ReportTab) => void;
}

export default function ReportSection({
  activeTab,
  onTabChange,
}: ReportSectionProps) {
  return (
    <section className="space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={(value) => onTabChange(value as ReportTab)}
        className="space-y-6"
      >
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
