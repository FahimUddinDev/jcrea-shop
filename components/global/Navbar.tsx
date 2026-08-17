"use client";
import Image from "next/image";
import Link from "next/link";
import CartCount from "./CartCount";
import Profile from "./Profile";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-gray-800 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-slate-900"
        >
          <Image src="/assets/logo.png" alt="logo" width={100} height={100} />
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <CartCount />

          {/* Divider */}
          <div className="hidden h-6 w-px bg-slate-200 sm:block" />
          <Profile />
        </div>
      </div>
    </header>
  );
}
