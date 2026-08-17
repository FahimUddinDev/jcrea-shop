import Image from "next/image";

export default function ProductCard() {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-md hover:shadow-slate-200/60">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
        <Image
          src={"/assets/logo.png"}
          alt={"logo"}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />

        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium `}
        >
          <span className={`h-1.5 w-1.5 rounded-full `} />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Shirt
        </span>
        <h3 className="text-sm font-semibold text-slate-900">
          Follo formal shirt
        </h3>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold tabular-nums text-slate-900">
            100
          </span>

          <button
            type="button"
            className="rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-95"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
