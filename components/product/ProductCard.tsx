"use client";

import { Product, getStockStatus } from "@/lib/mock-data";
import { useCartStore } from "@/store/cart-store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

const STOCK_CONFIG = {
  out: {
    label: "Out of stock",
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
  },
  low: {
    label: "Low stock",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  },
  normal: {
    label: "",
    dot: "bg-emerald-500",
    badge: "",
  },
} as const;

export default function ProductCard({ product }: { product: Product }) {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const isAdmin = role === "admin";

  const status = getStockStatus(product.stock);
  const config = STOCK_CONFIG[status];
  const addItem = useCartStore((state) => state.addItem);

  const isOutOfStock = status === "out";

  // Debounce ref to prevent rapid click spam
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const clickCountRef = useRef(0);

  // Debounced Add to Cart Handler
  const handleAddToCart = useCallback(() => {
    if (isOutOfStock) return;

    // Optimistically update store immediately
    addItem(product);
    clickCountRef.current += 1;

    // Debounce
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const count = clickCountRef.current;
      toast.success(
        count > 1
          ? `Added ${count}x ${product.name} to cart`
          : `${product.name} added to cart`,
        { id: `add-cart-${product.id}` },
      );
      clickCountRef.current = 0;
    }, 350);
  }, [isOutOfStock, addItem, product]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-md hover:shadow-slate-200/60">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {status !== "normal" && (
          <span
            className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
            {config.label}
          </span>
        )}

        {/* Role-restricted UI Action: Admin Edit Stock Button */}
        {isAdmin && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toast.success(
                `[${role?.toUpperCase()}] Managing stock for ${product.name} (Qty: ${product.stock})`,
              );
            }}
            className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-bold text-orange-400 backdrop-blur-md transition hover:bg-slate-900 active:scale-95"
          >
            ⚙️ Edit Stock
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-slate-900">{product.name}</h3>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold tabular-nums text-slate-900">
            ${product.price.toLocaleString()}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className="rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:active:scale-100"
            >
              {isOutOfStock ? "Out of stock" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
