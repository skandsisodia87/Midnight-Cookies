export default function CustomersSkeleton() {
  return (
    <div className="animate-pulse px-4 py-12 bg-[#FFF6EC]">
      <div className="mx-auto max-w-6xl space-y-5 sm:space-y-6">
        <div className="h-32 rounded-[28px] bg-slate-200" />
        <div className="rounded-3xl border border-[#F3E4D4] bg-slate-200 p-6 shadow-sm">
          <div className="h-12 rounded-3xl bg-slate-200" />
          <div className="mt-6 h-72 rounded-3xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
