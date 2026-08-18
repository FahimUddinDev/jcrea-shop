"use client";

import { useCartStore } from "@/store/cart-store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function CheckoutButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [loading, setLoading] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = async (forceFail = false) => {
    //if not logged in, redirect to login page with callbackUrl
    if (status !== "authenticated" || !session) {
      toast.error("Please sign in to proceed to checkout");
      router.push("/login?callbackUrl=/dashboard");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty. Add items to checkout.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forceFail }),
      });

      const contentType = res.headers.get("content-type");
      let data: { message?: string } = {};
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { message: text || "Checkout service error" };
      }

      if (!res.ok) {
        throw new Error(data.message || "Checkout failed");
      }

      toast.success(data.message || "Order placed successfully!");
      clearCart();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Checkout failed. Please try again.";
      toast.error(
        (t) => (
          <div className="flex items-center gap-2">
            <span>{errorMessage}</span>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                handleCheckout(false);
              }}
              className="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        ),
        { duration: 6000 },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Order Summary ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
        </p>
        <p className="text-2xl font-bold tabular-nums text-slate-900">
          ${total.toLocaleString()}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={loading || items.length === 0}
          onClick={() => handleCheckout(false)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100"
        >
          {loading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </>
          ) : (
            "Proceed to Checkout"
          )}
        </button>
      </div>
    </div>
  );
}
