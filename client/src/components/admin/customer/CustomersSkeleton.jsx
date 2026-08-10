export default function CustomersSkeleton() {
  return (
    <div className="animate-pulse bg-[#FFF6EC] ">
      <div className="space-y-5 sm:space-y-6">
        <div className="rounded-[28px] border border-[#F3E4D4] bg-linear-to-r from-[#FFF7EC] via-white to-[#FFFDF8] p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <div className="h-8 w-40 rounded-full bg-slate-300" />
              <div className="h-4 w-72 rounded-full bg-slate-200" />
            </div>
            <div className="h-9 w-32 rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="rounded-3xl border border-[#F3E4D4] bg-white p-4 shadow-sm sm:p-5">
          <div className="overflow-x-auto">
            <div className="min-w-190 w-full">
              <div className="grid gap-4 rounded-t-3xl bg-[#FFF8F2] px-4 py-3 text-sm text-[#7A5C4D] sm:grid-cols-4">
                <div className="h-4 w-24 rounded-full bg-slate-200" />
                <div className="h-4 w-24 rounded-full bg-slate-200" />
                <div className="h-4 w-24 rounded-full bg-slate-200" />
                <div className="h-4 w-24 rounded-full bg-slate-200" />
              </div>

              <div className="space-y-3 p-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-3xl border border-[#F3E4D4] bg-[#F9F4EC] p-4 sm:grid-cols-4"
                  >
                    <div className="h-12 rounded-3xl bg-slate-200 sm:col-span-1" />
                    <div className="h-12 rounded-3xl bg-slate-200 sm:col-span-1" />
                    <div className="h-12 rounded-3xl bg-slate-200 sm:col-span-1" />
                    <div className="h-12 rounded-3xl bg-slate-200 sm:col-span-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
