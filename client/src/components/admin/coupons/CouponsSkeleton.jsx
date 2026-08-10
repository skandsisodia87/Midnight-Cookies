const CouponsSkeleton = () => {
  return (
    <div className="space-y-6 px-4 sm:px-6 animate-pulse">
      <div className="rounded-[28px] border border-[#F3E4D4] bg-linear-to-r from-[#FFF7EC] via-white to-[#FFFDF8] p-6 shadow-sm">
        <div className="h-8 w-52 rounded-full bg-slate-200" />
        <div className="mt-4 h-4 w-3/4 rounded-full bg-slate-200" />
        <div className="mt-2 h-4 w-1/2 rounded-full bg-slate-200" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-[#F3E4D4] bg-slate-200/70 p-5 shadow-sm"
          >
            <div className="h-4 w-24 rounded-full bg-slate-300" />
            <div className="mt-4 h-10 w-3/4 rounded-full bg-slate-300" />
            <div className="mt-3 h-4 w-3/5 rounded-full bg-slate-300" />
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-[#F3E4D4] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#F3E4D4] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-10 w-full max-w-sm rounded-full bg-slate-200" />
          <div className="h-10 w-40 rounded-full bg-slate-200" />
        </div>

        <div className="mt-6 space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-16 rounded-3xl bg-slate-200 p-4" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CouponsSkeleton;
