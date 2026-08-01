"use client";

import { useContext } from "react";

import {
  ReportFilterContext,
  type ReportFilterContextValue,
} from "../context/ReportFilterContext";



export function useReportFilter(): ReportFilterContextValue {
  const context = useContext(ReportFilterContext);

  if (!context) {
    throw new Error(
      "useReportFilter must be used within a ReportFilterProvider",
    );
  }

  return context;
}