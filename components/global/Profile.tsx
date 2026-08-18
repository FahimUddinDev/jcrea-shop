"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

function Profile() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = session?.user;
  const name = user?.name ?? "User";
  const image = user?.image;
  const firstChar = name.charAt(0).toUpperCase();

  return (
    <>
      {/* Loading skeleton */}
      {status === "loading" ? (
        <div className="h-8 w-24 animate-pulse rounded-lg bg-white/10" />
      ) : status === "authenticated" && user ? (
        <div className="relative" ref={dropdownRef}>
          {/* Avatar button */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2.5 rounded-lg p-1 transition hover:bg-white/10"
            aria-haspopup="true"
            aria-expanded={open}
          >
            {/* Avatar image or initial */}
            {image ? (
              <Image
                src={image}
                alt={name}
                width={32}
                height={32}
                className="aspect-square rounded-full object-cover ring-1 ring-slate-200"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 ring-1 ring-orange-300 text-sm font-bold text-white">
                {firstChar}
              </div>
            )}

            {/* Name */}
            <span className="hidden max-w-[80px] truncate text-sm font-medium text-white sm:inline">
              {name.split(" ")[0]}
            </span>

            {/* Chevron icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`hidden h-4 w-4 text-slate-300 transition-transform duration-200 sm:block ${
                open ? "rotate-180" : ""
              }`}
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-700 bg-gray-900 py-1 shadow-xl ring-1 ring-black/20 animate-fade-in">
              {/* User info header */}
              <div className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-700">
                {image ? (
                  <Image
                    src={image}
                    alt={name}
                    width={28}
                    height={28}
                    className="aspect-square rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                    {firstChar}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-xs font-semibold text-white">
                      {name}
                    </p>
                    {user.role && (
                      <span className="rounded bg-orange-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-orange-400">
                        {user.role}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-[10px] text-slate-400">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Dashboard link */}
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                  />
                </svg>
                Dashboard
              </Link>

              {/* Role-restricted UI Action: Admin Settings */}
              {user.role === "admin" && (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    toast.success("Admin Panel Opened");
                  }}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-orange-400 transition hover:bg-orange-500/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.75}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Admin Settings
                </button>
              )}

              {/* Divider */}
              <div className="my-1 h-px bg-slate-700" />

              {/* Log out */}
              <div className="px-3 py-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="w-full rounded-lg border border-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:border-orange-700 hover:bg-orange-500"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Sign in button
        <Link
          href="/login"
          className="rounded-lg bg-orange-500 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-orange-700"
        >
          Sign in
        </Link>
      )}
    </>
  );
}

export default Profile;
