"use client";

import { useMemo, useState } from "react";

import {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from "@/types/product";

import {
  ProductHeader,
  ProductSearch,
  ProductFilters,
  ProductPagination,
  ProductDialog,
  DeleteProductDialog,
  ProductSkeleton,
  ProductTable,
} from "@/components/products";

import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useSuppliers } from "@/hooks/useSuppliers";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

import { useCreateProduct } from "@/hooks/useCreateProduct";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";

import { toast } from "sonner";

export default function ProductsPage() {
  /* ------------------------------------------------------- */
  /* Search & Pagination                                     */
  /* ------------------------------------------------------- */

  const [page, setPage] = useState(1);

  const [pageSize] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

  const search = useDebouncedValue(searchInput, 300);
  const debouncedMinPrice = useDebouncedValue(minPriceInput, 300);
  const debouncedMaxPrice = useDebouncedValue(maxPriceInput, 300);

  /* ------------------------------------------------------- */
  /* Filters                                                 */
  /* ------------------------------------------------------- */


  /* ------------------------------------------------------- */
  /* Dialogs                                                 */
  /* ------------------------------------------------------- */

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  /* ------------------------------------------------------- */
  /* Selected Product                                        */
  /* ------------------------------------------------------- */

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState<Product | null>(null);

  /* ------------------------------------------------------- */
  /* Queries                                                 */
  /* ------------------------------------------------------- */

  const filters = useMemo(
    () => ({
      page,
      pageSize,
      search,
      categoryId,
      supplierId,
      minPrice:
        debouncedMinPrice === ""
          ? undefined
          : Number(debouncedMinPrice),
      maxPrice:
        debouncedMaxPrice === ""
          ? undefined
          : Number(debouncedMaxPrice),
    }),
    [page, pageSize, search, categoryId, supplierId, debouncedMinPrice, debouncedMaxPrice]
  );

  const {
    data: productData,
    isLoading,
  } = useProducts(filters);

  const { data: categories } =
    useCategories(1, 1000, "");

  const { data: suppliers } =
    useSuppliers(1, 1000, "");

  const categoryOptions = useMemo(() => {
    const categoryItems = (categories as { items?: Array<{ id: string; name: string }> } | undefined)?.items ?? [];

    return categoryItems.map((category) => ({
      id: category.id,
      name: category.name,
    }));
  }, [categories]);

  const supplierOptions = useMemo(() => {
    const supplierItems =
      (suppliers as { items?: Array<{ id: string; companyName?: string; contactPerson?: string }> } | undefined)?.items ??
      [];

    return supplierItems.map((supplier) => ({
      id: supplier.id,
      name:
        supplier.companyName ||
        supplier.contactPerson ||
        "Unnamed supplier",
    }));
  }, [suppliers]);

  /* ------------------------------------------------------- */
  /* Mutations                                               */
  /* ------------------------------------------------------- */

  const createProduct =
    useCreateProduct();

  const updateProduct =
    useUpdateProduct();

  const deleteProduct =
    useDeleteProduct();

  /* ------------------------------------------------------- */
  /* Header Actions                                          */
  /* ------------------------------------------------------- */

  const handleAdd = () => {
    setSelectedProduct(null);

    setDialogOpen(true);
  };

  const handleEdit = (
    product: Product
  ) => {
    setSelectedProduct(product);

    setDialogOpen(true);
  };

  const handleDelete = (
    product: Product
  ) => {
    setSelectedProduct(product);

    setDeleteOpen(true);
  };

  /* ------------------------------------------------------- */
  /* Save Product                                            */
  /* ------------------------------------------------------- */

  const handleSubmit = async (
    values:
      | CreateProductDto
      | UpdateProductDto
  ) => {
    try {
      if (selectedProduct) {
        await updateProduct.mutateAsync({
          id: selectedProduct.id,
          data:
            values as UpdateProductDto,
        });

        toast.success(
          "Product updated successfully."
        );
      } else {
        await createProduct.mutateAsync(
          values as CreateProductDto
        );

        toast.success(
          "Product created successfully."
        );
      }

      setDialogOpen(false);

      setSelectedProduct(null);
    } catch {
      toast.error(
        "Something went wrong."
      );
    }
  };

  /* ------------------------------------------------------- */
  /* Delete Product                                          */
  /* ------------------------------------------------------- */

  const confirmDelete =
    async () => {
      if (!selectedProduct) return;

      try {
        await deleteProduct.mutateAsync(
          selectedProduct.id
        );

        toast.success(
          "Product deleted successfully."
        );

        setDeleteOpen(false);

        setSelectedProduct(null);
      } catch {
        toast.error(
          "Failed to delete product."
        );
      }
    };

  /* ------------------------------------------------------- */
  /* Loading                                                 */
  /* ------------------------------------------------------- */

  if (isLoading) {
    return <ProductSkeleton />;
  }

   return (
    <div className="space-y-6">
      {/* Header */}

      <ProductHeader onAdd={handleAdd} />

      {/* Search */}

      <ProductSearch
        value={searchInput}
        onValueChange={(value) => {
          setSearchInput(value);
          setPage(1);
        }}
      />

      {/* Filters */}

      <ProductFilters
        categoryId={categoryId}
        supplierId={supplierId}
        minPrice={minPriceInput}
        maxPrice={maxPriceInput}
        categories={categoryOptions}
        suppliers={supplierOptions}
        onCategoryChange={(value) => {
          setCategoryId(value);
          setPage(1);
        }}
        onSupplierChange={(value) => {
          setSupplierId(value);
          setPage(1);
        }}
        onMinPriceChange={(value) => {
          setMinPriceInput(value);
          setPage(1);
        }}
        onMaxPriceChange={(value) => {
          setMaxPriceInput(value);
          setPage(1);
        }}
        onReset={() => {
          setSearchInput("");
          setCategoryId("");
          setSupplierId("");
          setMinPriceInput("");
          setMaxPriceInput("");
          setPage(1);
        }}
      />

      {/* Table */}

      <ProductTable
        products={productData?.items ?? []}
        loading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}

      <ProductPagination
        page={productData?.page ?? 1}
        totalPages={productData?.totalPages ?? 1}
        onPageChange={setPage}
      />

      {/* Add / Edit Dialog */}

      <ProductDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);

          if (!open) {
            setSelectedProduct(null);
          }
        }}
        product={selectedProduct}
        loading={
          createProduct.isPending ||
          updateProduct.isPending
        }
        categories={categories?.items ?? []}
        suppliers={suppliers?.items ?? []}
        onSubmit={handleSubmit}
      />

      {/* Delete Dialog */}

      <DeleteProductDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);

          if (!open) {
            setSelectedProduct(null);
          }
        }}
        product={selectedProduct}
        loading={deleteProduct.isPending}
        onDelete={confirmDelete}
      />
    </div>
  );
}