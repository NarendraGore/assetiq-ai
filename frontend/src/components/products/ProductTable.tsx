"use client";

import { useMemo, useState } from "react";

import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Package,
} from "lucide-react";

import { Product } from "@/types/product";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProductTableProps {
  products?: Product[];

  loading?: boolean;

  onEdit: (product: Product) => void;

  onDelete: (product: Product) => void;
}

function ProductImageCell({
  imageUrl,
  alt,
}: {
  imageUrl?: string;
  alt: string;
}) {
  const [hasError, setHasError] = useState(false);

  const resolvedImageUrl = useMemo(() => {
    if (!imageUrl) return "";

    if (/^https?:\/\//i.test(imageUrl)) {
      return imageUrl;
    }

    const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
    const assetBase = apiBase.replace(/\/api\/?$/i, "");

    if (imageUrl.startsWith("/")) {
      return assetBase ? `${assetBase}${imageUrl}` : imageUrl;
    }

    return assetBase
      ? `${assetBase}/${imageUrl.replace(/^\/+/, "")}`
      : `/${imageUrl.replace(/^\/+/, "")}`;
  }, [imageUrl]);

  if (!imageUrl || hasError || !resolvedImageUrl) {
    return (
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border bg-muted">
        <Package className="h-6 w-6 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border bg-muted">
      <img
        src={resolvedImageUrl}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export default function ProductTable({
  products = [],
  loading = false,
  onEdit,
  onDelete,
}: ProductTableProps) {
  if (loading) {
    return (
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 6 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 9 }).map((_, cell) => (
                  <TableCell key={cell}>
                    <div className="h-5 w-full animate-pulse rounded bg-muted" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Image</TableHead>

            <TableHead>Product</TableHead>

            <TableHead>SKU</TableHead>

            <TableHead>Category</TableHead>

            <TableHead>Supplier</TableHead>

            <TableHead className="text-right">
              Price
            </TableHead>

            <TableHead className="text-center">
              Stock
            </TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="w-16" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length > 0 ? (
            products.map((product) => {
              const isOutOfStock =
                product.stockQuantity <= 0;
              const lowStock =
                !isOutOfStock &&
                product.stockQuantity <=
                  product.minimumStock;

              return (
                <TableRow
                  key={product.id}
                  className="hover:bg-muted/40"
                >
                  {/* Image */}

                  <TableCell>
                    <ProductImageCell
                      imageUrl={product.imageUrl}
                      alt={product.name}
                    />
                  </TableCell>

                  {/* Product */}

                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {product.name}
                      </p>

                      <p className="line-clamp-1 text-xs text-muted-foreground">
                        {product.description ||
                          "-"}
                      </p>
                    </div>
                  </TableCell>

                  {/* SKU */}

                  <TableCell className="font-mono text-sm">
                    {product.sku}
                  </TableCell>

                  {/* Category */}

                  <TableCell>
                    {product.categoryName ??
                      "-"}
                  </TableCell>

                  {/* Supplier */}

                  <TableCell>
                    {product.supplierName ??
                      "-"}
                  </TableCell>

                  {/* Price */}

                  <TableCell className="text-right font-semibold">
                    ₹
                    {Number(
                      product.unitPrice
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </TableCell>

                  {/* Stock */}

                  <TableCell className="text-center">
                    <Badge
                      variant={
                        lowStock
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {product.stockQuantity}
                    </Badge>
                  </TableCell>

                  {/* Status */}

                  <TableCell>
                    {isOutOfStock ? (
                      <Badge variant="destructive">
                        Out of Stock
                      </Badge>
                    ) : lowStock ? (
                      <Badge variant="destructive">
                        Low Stock
                      </Badge>
                    ) : (
                      <Badge>
                        In Stock
                      </Badge>
                    )}
                  </TableCell>

                  {/* Actions */}

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            onEdit(product)
                          }
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() =>
                            onDelete(product)
                          }
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={9}
                className="py-12 text-center text-muted-foreground"
              >
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}