const status = [
  {
    key: "Placed",
    value: 5,
    color: "bg-amber-400",
  },
  {
    key: "Confirmed",
    value: 12,
    color: "bg-amber-400",
  },
  {
    key: "Baking",
    value: 10,
    color: "bg-orange-400",
  },
  {
    key: "Shipped",
    value: 5,
    color: "bg-emerald-400",
  },
  {
    key: "Delivered",
    value: 122,
    color: "bg-red-400",
  },
  {
    key: "Cancelled",
    value: 4,
    color: "bg-red-400",
  },
];

export default function OrderStatus({ stats }) {
  const maxValue = Object.values(stats).reduce((acc, sum) => sum + acc, 0);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-lg text-slate-900">Order Status</h2>
          <p className="mt-1 text-sm text-slate-500">
            Track order progress at a glance.
          </p>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-900">
          Updated now
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {status.map((item) => {
          const val = stats[item.key];
          return (
            <div key={item.key} className="space-y-2">
              <div className="flex items-center justify-between text-sm text-slate-700">
                <span className="font-medium">{item.key}</span>
                <span className="font-semibold">{val}</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`${item.color} h-full rounded-full`}
                  style={{
                    width: `${Math.max(0, (val / maxValue) * 100)}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
