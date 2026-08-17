export default function ProductSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="aspect-[4/3] w-full animate-pulse bg-slate-100" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
        <div className="h-4 w-32 animate-pulse rounded bg-slate-100" />
        <div className="mt-3 flex items-center justify-between">
          <div className="h-5 w-14 animate-pulse rounded bg-slate-100" />
          <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 py-10">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
