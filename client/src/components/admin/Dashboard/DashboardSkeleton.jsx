export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 px-4 sm:px-6 animate-pulse">
      <div className="rounded-[2.5rem] bg-slate-200/80 shadow-xl p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div className="space-y-4">
            <div className="h-5 w-40 rounded-full bg-slate-300" />
            <div className="h-10 w-3/4 rounded-full bg-slate-300" />
            <div className="h-4 w-full rounded-full bg-slate-300" />
            <div className="h-4 w-[80%] rounded-full bg-slate-300" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="h-24 rounded-3xl bg-slate-300" />
            <div className="h-24 rounded-3xl bg-slate-300" />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-3xl bg-slate-300 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-200" />
            <div className="h-4 w-40 rounded-full bg-slate-200" />
          </div>
          <div className="h-8 w-24 rounded-full bg-slate-200" />
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-slate-200/80 rounded-3xl p-5 sm:p-6 h-40 shadow-sm"
          >
            <div className="h-4 w-28 rounded-full bg-slate-300" />
            <div className="mt-5 h-10 w-2/3 rounded-full bg-slate-300" />
            <div className="mt-4 h-4 w-4/5 rounded-full bg-slate-300" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="bg-slate-200/80 rounded-3xl p-6 h-115 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-3">
                <div className="h-5 w-40 rounded-full bg-slate-300" />
                <div className="h-4 w-56 rounded-full bg-slate-300" />
              </div>
              <div className="h-8 w-24 rounded-full bg-slate-300" />
            </div>
            <div className="mt-6 h-85 rounded-3xl bg-slate-300" />
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-slate-200/80 rounded-3xl p-6 h-115 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-3">
                <div className="h-5 w-40 rounded-full bg-slate-300" />
                <div className="h-4 w-52 rounded-full bg-slate-300" />
              </div>
              <div className="h-8 w-24 rounded-full bg-slate-300" />
            </div>
            <div className="mt-6 space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-12 rounded-3xl bg-slate-300" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <div className="bg-slate-200/80 rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <div className="h-5 w-48 rounded-full bg-slate-300" />
              <div className="h-4 w-64 rounded-full bg-slate-300" />
            </div>
            <div className="h-10 w-32 rounded-full bg-slate-300" />
          </div>
          <div className="mt-6 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="space-y-3 rounded-3xl border border-slate-300/80 bg-slate-200 p-4"
              >
                <div className="h-4 w-1/2 rounded-full bg-slate-300" />
                <div className="h-3 w-40 rounded-full bg-slate-300" />
                <div className="h-2.5 rounded-full bg-slate-300" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-200/80 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="h-5 w-40 rounded-full bg-slate-300" />
              <div className="h-4 w-56 rounded-full bg-slate-300" />
            </div>
            <div className="h-8 w-24 rounded-full bg-slate-300" />
          </div>
          <div className="mt-6 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-300/80 bg-slate-200 p-4"
              >
                <div className="h-4 w-1/2 rounded-full bg-slate-300" />
                <div className="mt-3 h-3 w-3/4 rounded-full bg-slate-300" />
                <div className="mt-4 h-2.5 rounded-full bg-slate-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
