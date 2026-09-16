export default function OrdersSkeleton() {
  return (
    <div className="space-y-5 sm:space-y-6 animate-pulse pb-5">
      <div className="rounded-[28px] border border-[#F3E4D4] bg-linear-to-r from-[#FFF7EC] via-white to-[#FFFDF8] p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="h-8 w-40 rounded-full bg-[#E8D4BE]" />
            <div className="h-4 w-72 rounded-full bg-[#EFD9C0]" />
          </div>
          <div className="h-9 w-32 rounded-full bg-[#F6E5D0]" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-[#F3E4D4] bg-white p-5 shadow-sm"
          >
            <div className="h-4 w-24 rounded-full bg-[#EFDCC7]" />
            <div className="mt-5 h-8 w-16 rounded-full bg-[#E9D2BA]" />
            <div className="mt-3 h-3 w-32 rounded-full bg-[#F5E7D7]" />
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-[#F3E4D4] bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            <div className="h-10 w-28 rounded-full bg-[#F1E1CF]" />
            <div className="h-10 w-32 rounded-full bg-[#F1E1CF]" />
            <div className="h-10 w-24 rounded-full bg-[#F1E1CF]" />
          </div>
          <div className="h-10 w-28 rounded-full bg-[#EFDCC7]" />
        </div>

        <div className="mt-6 space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-2xl border border-[#F2E1CF] bg-[#FFF9F2] p-4"
            >
              <div className="h-10 w-10 rounded-full bg-[#EEDCCB]" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 rounded-full bg-[#EEDCCB]" />
                <div className="h-3 w-2/3 rounded-full bg-[#F3E4D4]" />
              </div>
              <div className="h-8 w-20 rounded-full bg-[#EEDCCB]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
