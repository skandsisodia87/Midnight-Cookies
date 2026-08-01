import moment from "moment";

function StatusBadge({ status }) {
  const map = {
    cancelled: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-orange-100 text-orange-800",
    placed: "bg-orange-100 text-orange-800",
    baking: "bg-red-100 text-red-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase whitespace-nowrap ${
        map[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function RecentOrders({ recentOrders = [] }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-lg text-slate-900">
            Recent Orders
          </h2>
          <p className="text-sm text-slate-500">
            Latest sales and customer activity.
          </p>
        </div>
        <button className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-200">
          View all orders
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3 text-right">Total (₹)</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-right">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {recentOrders.map((order) => (
              <tr
                key={order?._id}
                className="transition-colors hover:bg-slate-50"
              >
                <td className="px-4 py-4 font-semibold text-slate-900">
                  {order?.orderId}
                </td>

                <td className="px-4 py-4 text-slate-700">
                  {order?.userId?.name}
                </td>

                <td className="px-4 py-4 text-right font-medium text-slate-900">
                  ₹{order?.totalAmount}
                </td>

                <td className="px-4 py-4 text-center">
                  <StatusBadge status={order?.orderStatus} />
                </td>

                <td className="px-4 py-4 text-right whitespace-nowrap text-slate-500">
                  {moment(order?.createdAt).format("DD MMM YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
