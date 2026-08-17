import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-66px)] flex-col items-center justify-center overflow-hidden bg-slate-50 px-6 py-20 text-center">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-1/3 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-10 flex max-w-md flex-col items-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-inset ring-orange-200">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          404 Error
        </span>

        {/* 404 Large Text */}
        <h1 className="mt-4 text-7xl font-extrabold tracking-tight text-slate-900 sm:text-8xl">
          4<span className="text-orange-500">0</span>4
        </h1>

        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Page not found
        </h2>

        <p className="mt-3 text-sm text-slate-500 sm:text-base">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have
          been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="w-full rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600 active:scale-95 sm:w-auto"
          >
            Back to Home
          </Link>
          <Link
            href="/dashboard"
            className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 active:scale-95 sm:w-auto"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
