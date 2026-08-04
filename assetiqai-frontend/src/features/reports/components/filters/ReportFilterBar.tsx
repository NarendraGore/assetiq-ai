"use client";

import SearchInput from "./SearchInput";
import CategoryFilter, { type CategoryOption } from "./CategoryFilter";
import SupplierFilter, { type SupplierOption } from "./SupplierFilter";
import TransactionTypeFilter from "./TransactionTypeFilter";
import DateRangeFilter from "./DateRangeFilter";
import FilterActions from "./FilterActions";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { useSuppliers } from "@/features/suppliers/hooks";

export default function ReportFilterBar() {
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();

  const { data: suppliersData, isLoading: suppliersLoading } = useSuppliers();

  const categoryOptions: CategoryOption[] =
    categoriesData?.items.map((category) => ({
      id: category.id,
      name: category.name,
    })) ?? [];

  const supplierOptions: SupplierOption[] =
    suppliersData?.items.map((supplier) => ({
      id: supplier.id,
      name: supplier.companyName,
    })) ?? [];

  return (
    <section
      className="
        rounded-2xl
        border
        border-border
        bg-card
        p-5
        shadow-sm
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5
          xl:flex-row
          xl:items-start
          xl:justify-between
        "
      >
        <div className="flex-1 space-y-4">
          <div
            className="
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            <SearchInput />

            <CategoryFilter
              options={categoryOptions}
              loading={categoriesLoading}
            />

            <SupplierFilter
              options={supplierOptions}
              loading={suppliersLoading}
            />

            <TransactionTypeFilter />
          </div>

          <DateRangeFilter />
        </div>

        <div
          className="
            flex
            shrink-0
            items-start
            justify-end
            xl:pt-0
          "
        >
          <FilterActions />
        </div>
      </div>
    </section>
  );
}
