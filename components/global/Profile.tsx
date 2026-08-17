"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
            {/* Avatar: image or initial */}
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

            {/* Chevron */}
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
                  <p className="truncate text-xs font-semibold text-white">{name}</p>
                  <p className="truncate text-[10px] text-slate-400">{user.email}</p>
                </div>
              </div>

              {/* My Profile link */}
              <Link
                href="/profile"
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
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                My Profile
              </Link>

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
        // Not logged in → Sign in button
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
