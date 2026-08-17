function LoginCard() {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-200/60">
      {/* Subtle top accent line */}
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-orange-400 via-orange-500 to-indigo-500" />

      {/* Logo */}
      <div className="flex items-center justify-center">
        <span className="text-2xl font-extrabold tracking-tight text-slate-900">
          J<span className="text-orange-500">Crea</span>
          <span className="text-orange-500">.</span>
        </span>
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-slate-100" />

      {/* Heading */}
      <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
      <p className="mt-2 text-sm text-slate-500">
        Sign in with your Google account to continue shopping.
      </p>

      {/* Google Button */}
      <button
        type="button"
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0">
          <path
            fill="#4285F4"
            d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.6 5.6 0 0 1-2.4 3.63v3h3.86c2.26-2.09 3.56-5.17 3.56-8.87Z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.86l-3.86-3c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A12 12 0 0 0 12 24Z"
          />
          <path
            fill="#FBBC05"
            d="M5.27 14.33A7.2 7.2 0 0 1 4.89 12c0-.81.14-1.6.38-2.33V6.58H1.29A12 12 0 0 0 0 12c0 1.94.46 3.77 1.29 5.42l3.98-3.09Z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.58l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
          />
        </svg>
        Continue with Google
      </button>

      <p className="mt-6 text-xs text-slate-400">
        By signing in, you agree to our{" "}
        <a
          href="#"
          className="text-orange-500 underline-offset-2 hover:underline"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="text-orange-500 underline-offset-2 hover:underline"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}

export default LoginCard;
