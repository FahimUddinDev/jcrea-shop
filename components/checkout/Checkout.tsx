export default function CheckoutButton() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Total
        </p>
        <p className="text-xl font-bold tabular-nums text-slate-900">200</p>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:active:scale-100"
      >
        Checkout
      </button>
    </div>
  );
}
