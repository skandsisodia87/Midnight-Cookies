const ProductsSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse p-1">
      {/* Header Skeleton */}
      <div className="rounded-[28px] border border-[#F3E4D4] bg-white p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="h-8 w-64 rounded-xl bg-[#F3E4D4]/60" />
            <div className="h-4 w-96 rounded-lg bg-[#F3E4D4]/40" />
          </div>
          <div className="h-12 w-40 rounded-2xl bg-[#F3E4D4]/60" />
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-3xl border border-[#F3E4D4] bg-white p-5 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="h-3 w-20 rounded bg-[#F3E4D4]/50" />
                <div className="h-7 w-16 rounded-lg bg-[#F3E4D4]/70" />
              </div>
              <div className="h-11 w-11 rounded-2xl bg-[#F3E4D4]/40" />
            </div>
            <div className="h-3 w-32 rounded bg-[#F3E4D4]/30" />
          </div>
        ))}
      </div>

      {/* Table/List Skeleton */}
      <div className="overflow-hidden rounded-3xl border border-[#F3E4D4] bg-white">
        <div className="border-b border-[#F3E4D4] p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="h-10 flex-1 rounded-2xl bg-[#F3E4D4]/50" />
            <div className="h-10 w-32 rounded-2xl bg-[#F3E4D4]/40" />
            <div className="h-10 w-32 rounded-2xl bg-[#F3E4D4]/40" />
          </div>
        </div>

        <div className="divide-y divide-[#F6EBE0] p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between gap-4 pt-3">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-[#F3E4D4]/60 shrink-0" />
                <div className="space-y-2">
                  <div className="h-4 w-44 rounded-md bg-[#F3E4D4]/60" />
                  <div className="h-3 w-64 rounded-md bg-[#F3E4D4]/40" />
                </div>
              </div>
              <div className="h-6 w-24 rounded-full bg-[#F3E4D4]/40" />
              <div className="h-8 w-40 rounded-xl bg-[#F3E4D4]/40" />
              <div className="h-8 w-20 rounded-2xl bg-[#F3E4D4]/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSkeleton;
