import ProductGrid from "@/components/product/ProductGrid";
import dynamic from "next/dynamic";

const CheckoutButton = dynamic(() => import("@/components/checkout/Checkout"), {
  loading: () => (
    <div className="h-[68px] w-full animate-pulse rounded-2xl bg-slate-100" />
  ),
});

export default function DashboardPage() {
  return (
    <div className="w-full max-w-[1400px] px-5 mx-auto py-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Products</h1>
        <p className="mt-1 text-sm text-slate-500">
          Browse the catalog and add items to your cart.
        </p>
      </div>

      <ProductGrid />

      <CheckoutButton />
    </div>
  );
}
