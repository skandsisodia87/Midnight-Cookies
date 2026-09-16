const Skeleton = ({ className = "" }) => {
  return (
    <div className={`animate-pulse rounded-md bg-[#F3E8DE] ${className}`} />
  );
};

const NewsletterSkeleton = () => {
  return (
    <div className="pb-5">
      <div className="mx-auto">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-11 w-11 rounded-xl" />

            <div>
              <Skeleton className="h-8 w-40 sm:h-9 sm:w-48" />
              <Skeleton className="mt-2 h-4 w-72 sm:w-96" />
            </div>
          </div>
          <Skeleton className="h-12 w-44 rounded-xl" />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex h-28 items-center justify-between rounded-[20px] border border-[#F1E1D3] bg-white p-5 shadow-sm"
            >
              <div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-4 h-7 w-12" />
              </div>
              <Skeleton className="h-12 w-12 rounded-xl" />
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#F1E1D3] bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[#F1E1D3] p-5 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-12 w-full rounded-xl sm:w-105.75" />
            <div className="flex w-full gap-3 sm:w-auto">
              <Skeleton className="h-12 w-full rounded-xl sm:w-32" />

              <Skeleton className="h-12 w-full rounded-xl sm:w-48" />
            </div>
          </div>
          <div className="hidden border-b border-[#F1E1D3] px-5 py-4 md:grid md:grid-cols-[2fr_1.1fr_1fr_1.1fr_80px] md:gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="ml-auto h-4 w-16" />
          </div>

          <div>
            {Array.from({ length: 3 }).map((_, index) => (
              <SubscriberSkeletonRow key={index} />
            ))}
          </div>
          <div className="border-t border-[#F1E1D3] px-5 py-4">
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SubscriberSkeletonRow = () => {
  return (
    <div className="border-b border-[#F1E1D3] px-5 py-4 last:border-b-0">
      <div className="hidden items-center md:grid md:grid-cols-[2fr_1.1fr_1fr_1.1fr_80px] md:gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />

          <div>
            <Skeleton className="h-4 w-48" />
            <Skeleton className="mt-2 h-3 w-32" />
          </div>
        </div>

        <Skeleton className="h-7 w-28 rounded-full" />
        <Skeleton className="h-7 w-24 rounded-full" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-24" />
        </div>

        <Skeleton className="ml-auto h-10 w-10 rounded-xl" />
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-11 w-11 rounded-xl" />

            <div>
              <Skeleton className="h-4 w-40" />
              <Skeleton className="mt-2 h-3 w-28" />
            </div>
          </div>

          <Skeleton className="h-10 w-10 rounded-xl" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-7 w-28 rounded-full" />
          <Skeleton className="h-7 w-24 rounded-full" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
};

export default NewsletterSkeleton;
