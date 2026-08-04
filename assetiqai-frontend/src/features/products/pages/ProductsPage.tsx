"use client";

import { useMemo } from "react";

import ProductToolbar from "../table/ProductToolbar";
import ProductFilterBar from "../table/ProductFilterBar";
import ProductTable from "../table/ProductTable";
import { productColumns } from "../table/product-columns";

import {
  ProductDialog,
  DeleteProductDialog,
  ProductDetailsDialog,
} from "../dialogs";

import { useProducts } from "../hooks/useProducts";
import { useProductCrud } from "../hooks/useProductCrud";
import { useProductDialogs } from "../hooks/useProductDialogs";
import { useProductFilters } from "../hooks/useProductFilters";
import { useProductLookups } from "../hooks/useProductLookups";

export default function ProductsPage() {
  const {
    search,
    setSearch,
    debouncedSearch,

    categoryId,
    setCategoryId,

    supplierId,
    setSupplierId,

    minPriceInput,
    maxPriceInput,
    setMinPrice,
    setMaxPrice,
    minPrice,
    maxPrice,

    page,
    setPage,
    pageSize,
    setPageSize,

    hasActiveFilters,
    resetFilters,
  } = useProductFilters();

  const { data, isLoading, isFetching, isError, refetch } = useProducts({
    page,
    pageSize,
    search: debouncedSearch,
    CategoryId: categoryId,
    SupplierId: supplierId,
    MinPrice: minPrice,
    MaxPrice: maxPrice,
  });

  const {
    categoryOptions,
    supplierOptions,
    isLoading: isLoadingLookups,
  } = useProductLookups();

  const {
    isCreateOpen,
    isEditOpen,
    isDeleteOpen,
    isViewOpen,

    selectedProduct,

    openCreate,
    openEdit,
    openDelete,
    openView,

    closeCreate,
    closeEdit,
    closeDelete,
    closeView,
  } = useProductDialogs();

  const {
    createProduct,
    updateProduct,
    deleteProduct,

    isCreating,
    isUpdating,
    isDeleting,
  } = useProductCrud();

  const products = data?.items ?? [];

  const columns = useMemo(
    () =>
      productColumns({
        onView: openView,
        onEdit: openEdit,
        onDelete: openDelete,
      }),
    [openView, openEdit, openDelete]
  );

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Products
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage your product catalog, pricing, and stock levels.
        </p>
      </div>

      <ProductToolbar
        search={search}
        isRefreshing={isFetching}
        onSearchChange={setSearch}
        onRefresh={refetch}
        onAddProduct={openCreate}
      />

      <ProductFilterBar
        categoryId={categoryId}
        supplierId={supplierId}
        minPriceInput={minPriceInput}
        maxPriceInput={maxPriceInput}
        categoryOptions={categoryOptions}
        supplierOptions={supplierOptions}
        isLoadingLookups={isLoadingLookups}
        hasActiveFilters={hasActiveFilters}
        onCategoryChange={setCategoryId}
        onSupplierChange={setSupplierId}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onReset={resetFilters}
      />

      <ProductTable
        columns={columns}
        data={products}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isFiltered={hasActiveFilters}
        onRetry={refetch}
        onAddProduct={openCreate}
        onRowClick={openView}
        page={data?.page ?? page}
        pageSize={data?.pageSize ?? pageSize}
        totalCount={data?.totalCount ?? 0}
        totalPages={data?.totalPages ?? 0}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      {/* Create */}
      <ProductDialog
        open={isCreateOpen}
        onOpenChange={(open) => {
          if (!open) closeCreate();
        }}
        mode="create"
        loading={isCreating}
        onSubmit={async (values) => {
          await createProduct(values);

          closeCreate();
        }}
      />

      {/* Edit */}
      <ProductDialog
        open={isEditOpen}
        onOpenChange={(open) => {
          if (!open) closeEdit();
        }}
        mode="edit"
        productId={selectedProduct?.id}
        loading={isUpdating}
        onSubmit={async (values) => {
          if (!selectedProduct) return;

          await updateProduct(selectedProduct.id, values);

          closeEdit();
        }}
      />

      {/* View */}
      <ProductDetailsDialog
        open={isViewOpen}
        onOpenChange={(open) => {
          if (!open) closeView();
        }}
        productId={selectedProduct?.id}
        onEdit={() => {
          if (!selectedProduct) return;

          const product = selectedProduct;

          closeView();
          openEdit(product);
        }}
      />

      {/* Delete */}
      <DeleteProductDialog
        open={isDeleteOpen}
        onOpenChange={(open) => {
          if (!open) closeDelete();
        }}
        productName={selectedProduct?.name}
        loading={isDeleting}
        onDelete={async () => {
          if (!selectedProduct) return;

          await deleteProduct(selectedProduct.id);
        }}
      />
    </div>
  );
}
