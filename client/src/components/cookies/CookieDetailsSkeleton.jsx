const CookieDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#FFF6EC] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 bg-amber-200/50 rounded-full" />
          <div className="h-4 w-3 bg-amber-200/40 rounded-full" />
          <div className="h-4 w-20 bg-amber-200/50 rounded-full" />
          <div className="h-4 w-3 bg-amber-200/40 rounded-full" />
          <div className="h-4 w-32 bg-amber-300/60 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white/70 rounded-3xl sm:rounded-[36px] aspect-square w-full shadow-md border border-amber-100/60 p-4" />
            <div className="flex gap-3 justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/70 rounded-2xl border border-amber-100/60" />
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/70 rounded-2xl border border-amber-100/60" />
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/70 rounded-2xl border border-amber-100/60" />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-7 w-28 bg-amber-200/60 rounded-full" />
              <div className="h-7 w-32 bg-amber-200/40 rounded-full" />
            </div>

            <div className="space-y-3">
              <div className="h-10 sm:h-12 w-4/5 bg-amber-200/70 rounded-2xl" />
              <div className="h-6 w-1/3 bg-amber-200/50 rounded-xl" />
            </div>

            <div className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl border border-amber-100/60 w-fit">
              <div className="h-10 w-28 bg-amber-300/70 rounded-xl" />
              <div className="h-6 w-20 bg-amber-200/40 rounded-lg" />
            </div>

            <div className="space-y-2.5">
              <div className="h-4 w-full bg-amber-200/50 rounded-full" />
              <div className="h-4 w-5/6 bg-amber-200/50 rounded-full" />
              <div className="h-4 w-4/6 bg-amber-200/50 rounded-full" />
            </div>

            <div className="space-y-3">
              <div className="h-5 w-28 bg-amber-200/60 rounded-full" />
              <div className="flex gap-3">
                <div className="h-12 w-28 bg-white/80 rounded-2xl border border-amber-200/60" />
                <div className="h-12 w-28 bg-white/80 rounded-2xl border border-amber-200/60" />
                <div className="h-12 w-28 bg-white/80 rounded-2xl border border-amber-200/60" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="h-14 flex-1 bg-amber-400/60 rounded-full" />
              <div className="h-14 flex-1 bg-white/80 rounded-full border border-amber-300/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieDetailsSkeleton;

