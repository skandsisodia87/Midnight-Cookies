const CategoriesSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse px-4 sm:px-6">
      <div className="rounded-[28px] border border-[#F3E4D4] bg-slate-100 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="h-10 w-48 rounded-full bg-slate-200" />
            <div className="h-4 w-3/4 rounded-full bg-slate-200" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-32 rounded-2xl bg-slate-200" />
            <div className="h-12 w-12 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-4xl border border-[#F3E4D4] bg-white shadow-sm"
          >
            <div className="h-48 bg-slate-200" />
            <div className="space-y-3 p-6">
              <div className="h-5 w-3/4 rounded-full bg-slate-200" />
              <div className="h-4 w-1/2 rounded-full bg-slate-200" />
              <div className="flex items-center gap-3 pt-4">
                <div className="h-9 w-24 rounded-full bg-slate-200" />
                <div className="h-9 w-16 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSkeleton;
