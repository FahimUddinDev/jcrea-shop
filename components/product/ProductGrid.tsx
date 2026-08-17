"use client";

import { useCallback, useEffect, useState } from "react";
import { Product } from "@/lib/mock-data";
import EmptyState from "../empty/EmptyState";
import ErrorState from "../error/ErrorState";
import ProductCard from "./ProductCard";
import { ProductGridSkeleton } from "./ProductSkeleton";

type Status = "loading" | "error" | "success";

interface ProductsResponse {
  products: Product[];
}

function ProductGrid() {
  const [status, setStatus] = useState<Status>("loading");
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      if (!res.ok) throw new Error("Request failed");
      const data: ProductsResponse = await res.json();
      setProducts(data.products);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (status === "loading") return <ProductGridSkeleton />;
  if (status === "error") return <ErrorState onRetry={fetchProducts} />;
  if (products.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 py-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
