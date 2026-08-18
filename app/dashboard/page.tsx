import CheckoutButton from "@/components/checkout/Checkout";
import AdminControlBar from "@/components/global/AdminControlBar";
import ProductGrid from "@/components/product/ProductGrid";

export default function DashboardPage() {
  return (
    <div className="w-full max-w-[1400px] px-5 mx-auto py-10">
      <AdminControlBar />
      <div className="mb-6">
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
