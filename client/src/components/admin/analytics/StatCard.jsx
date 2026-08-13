const StatCard = ({ title, value, subtitle, icon, iconBg, iconColor }) => (
  <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:rounded-3xl sm:p-5 lg:p-6">
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
          {title}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          {value}
        </h3>

        {subtitle && (
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">{subtitle}</p>
        )}
      </div>

      <div
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-lg sm:h-14 sm:w-14 sm:text-xl ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>
    </div>
  </div>
);

export default StatCard;
