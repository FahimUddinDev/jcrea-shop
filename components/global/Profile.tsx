"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

function Profile() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      {/* Profile with dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2.5 rounded-lg p-1 transition hover:bg-white/10"
          aria-haspopup="true"
          aria-expanded={open}
        >
          <Image
            src={"/assets/user.png"}
            alt={"User"}
            width={32}
            height={32}
            className="rounded-full object-cover ring-1 ring-slate-200 aspect-square"
          />
          <span className="hidden text-sm font-medium text-white sm:inline">
            Fahim
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
          <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-700 bg-gray-900 py-1 shadow-xl ring-1 ring-black/20 animate-fade-in">
            {/* Profile link */}
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

            {/* Log out button */}
            <div className="px-3 py-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  // handle logout here
                }}
                className="w-full rounded-lg border border-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:border-orange-700 hover:bg-orange-500"
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
