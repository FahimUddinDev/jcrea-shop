"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const cartItems = useCartStore((state) => state.items);

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="h-48 w-full animate-pulse rounded-3xl bg-slate-200" />
      </div>
    );
  }

  const user = session?.user;
  const name = user?.name ?? "Guest User";
  const email = user?.email ?? "Not provided";
  const image = user?.image;
  const role = (user as any)?.role ?? "User";
  const firstChar = name.charAt(0).toUpperCase();

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const mockOrders = [
    {
      id: "ORD-1727663597",
      date: "Aug 17, 2026",
      items: "MacBook Pro M2 (1x)",
      total: 2499,
      status: "Delivered",
    },
    {
      id: "ORD-1727651200",
      date: "Aug 15, 2026",
      items: "Dell XPS 15 (1x), MX Master (1x)",
      total: 1998,
      status: "Delivered",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl">
        <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            {image ? (
              <Image
                src={image}
                alt={name}
                width={80}
                height={80}
                className="h-20 w-20 rounded-full border-2 border-white/20 object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-500 text-3xl font-extrabold text-white shadow-lg ring-4 ring-orange-400/30">
                {firstChar}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {name}
                </h1>
                <span className="rounded-full bg-orange-500/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-orange-400 ring-1 ring-inset ring-orange-400/30">
                  {role}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-300">{email}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20 active:scale-95"
            >
              ← Back to Dashboard
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="rounded-xl border border-orange-500/40 bg-orange-500/20 px-4 py-2.5 text-sm font-medium text-orange-200 transition hover:bg-orange-500 hover:text-white active:scale-95"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Total Orders
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">2 Orders</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Cart Items
          </p>
          <p className="mt-2 text-2xl font-bold text-indigo-600">
            {totalCartCount} Items
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Total Spent
          </p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">$4,497.00</p>
        </div>
      </div>

      {/* Main Grid: Orders & Settings */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Orders List */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Order History</h2>
            <span className="text-xs text-slate-400">Last 30 days</span>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-slate-900">
                      {order.id}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{order.items}</p>
                  <p className="text-[11px] text-slate-400">{order.date}</p>
                </div>

                <div className="text-right">
                  <span className="text-base font-bold text-slate-900">
                    ${order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Details & Preferences */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Account Details</h2>

            <div className="mt-4 space-y-3 text-sm">
              <div>
                <span className="text-xs text-slate-400 block">Full Name</span>
                <span className="font-medium text-slate-800">{name}</span>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-400 block">Email Address</span>
                <span className="font-medium text-slate-800">{email}</span>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-400 block">Role</span>
                <span className="font-medium text-slate-800">{role}</span>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-400 block">Auth Provider</span>
                <span className="font-medium text-slate-800">Google OAuth 2.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
