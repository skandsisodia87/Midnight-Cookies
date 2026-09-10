import {
  FiPackage,
  FiCheckCircle,
  FiCoffee,
  FiTruck,
  FiHome,
  FiXCircle,
} from "react-icons/fi";

const STATUS_OPTIONS = [
  { value: "placed", label: "Placed" },
  { value: "confirmed", label: "Confirmed" },
  { value: "baking", label: "Baking" },
  { value: "shipped", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const STATUS_STEPS = [
  {
    value: "placed",
    label: "Placed",
    icon: FiPackage,
  },
  {
    value: "confirmed",
    label: "Confirmed",
    icon: FiCheckCircle,
  },
  {
    value: "baking",
    label: "Baking",
    icon: FiCoffee,
  },
  {
    value: "shipped",
    label: "Out for Delivery",
    icon: FiTruck,
  },
  {
    value: "delivered",
    label: "Delivered",
    icon: FiHome,
  },
];

const badgeColor = {
  placed: "bg-blue-100 text-blue-700",

  confirmed: "bg-yellow-100 text-yellow-700",

  baking: "bg-orange-100 text-orange-700",

  shipped: "bg-purple-100 text-purple-700",

  delivered: "bg-green-100 text-green-700",

  cancelled: "bg-red-100 text-red-700",
};

const StatusSelector = ({ order, setOrder }) => {
  const currentIndex = STATUS_STEPS.findIndex(
    (step) => step.value === order.status,
  );

  return (
    <div className="rounded-2xl border border-[#F3E4D4] bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-[#F3E4D4] px-6 py-4">
        <h2 className="text-lg font-semibold text-[#4E342E]">Order Status</h2>

        <p className="text-sm text-gray-500 mt-1">Update order progress</p>
      </div>

      <div className="space-y-6 p-6">
        {/* Current Badge */}

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Current Status</span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${badgeColor[order.status]}`}
          >
            {order.status}
          </span>
        </div>

        {/* Dropdown */}

        <div>
          <label className="mb-2 block text-sm font-medium text-[#4E342E]">
            Change Status
          </label>

          <select
            value={order.status}
            onChange={(e) =>
              setOrder({
                ...order,
                status: e.target.value,
              })
            }
            className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none focus:border-[#A15C38]"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Timeline */}

        {order.status !== "cancelled" ? (
          <div className="space-y-5">
            {STATUS_STEPS.map((step, index) => {
              const Icon = step.icon;

              const active = index <= currentIndex;

              return (
                <div key={step.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        active
                          ? "bg-[#A15C38] text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Icon size={18} />
                    </div>

                    {index !== STATUS_STEPS.length - 1 && (
                      <div
                        className={`mt-1 h-10 w-1 rounded ${
                          active ? "bg-[#A15C38]" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>

                  <div className="pt-1">
                    <h4
                      className={`font-medium ${
                        active ? "text-[#4E342E]" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </h4>

                    <p className="text-xs text-gray-500">
                      {active ? "Completed" : "Pending"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-3">
              <FiXCircle className="text-red-600" />

              <div>
                <h4 className="font-semibold text-red-700">Order Cancelled</h4>

                <p className="text-sm text-red-500">
                  This order has been cancelled.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info */}

        <div className="rounded-xl bg-[#FFF8F2] p-4">
          <p className="text-sm text-gray-500">Estimated Delivery</p>

          <p className="mt-1 font-semibold text-[#4E342E]">
            {order.delivery?.expectedDate || "--"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusSelector;
