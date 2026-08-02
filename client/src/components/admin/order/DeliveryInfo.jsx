import {
  FiTruck,
  FiUser,
  FiPhone,
  FiHash,
  FiCalendar,
  FiClock,
  FiFileText,
} from "react-icons/fi";

const deliveryPartners = [
  "Shadowfax",
  "Porter",
  "Dunzo",
  "Swiggy Genie",
  "Blinkit",
  "Self Delivery",
];

const DeliveryInfo = ({ order, setOrder }) => {
  const handleChange = (field, value) => {
    setOrder((prev) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        [field]: value,
      },
    }));
  };

  return (
    <div className="rounded-2xl border border-[#F3E4D4] bg-white shadow-sm mt-4">
      <div className="flex items-center gap-3 border-b border-[#F3E4D4] px-6 py-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF3E6]">
          <FiTruck className="text-[#A15C38]" size={20} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E342E]">
            Delivery Information
          </h2>

          <p className="text-sm text-gray-500">Manage delivery details</p>
        </div>
      </div>
      <div className="space-y-5 p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#4E342E]">
              Delivery Partner
            </label>

            <select
              value={order.delivery.partner}
              onChange={(e) => handleChange("partner", e.target.value)}
              className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
            >
              {deliveryPartners.map((partner) => (
                <option key={partner} value={partner}>
                  {partner}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#4E342E]">
              <FiUser size={15} />
              Delivery Agent
            </label>

            <input
              type="text"
              value={order.delivery.agentName}
              onChange={(e) => handleChange("agentName", e.target.value)}
              className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#4E342E]">
              <FiPhone size={15} />
              Agent Phone
            </label>

            <input
              type="text"
              value={order.delivery.agentPhone}
              onChange={(e) => handleChange("agentPhone", e.target.value)}
              className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#4E342E]">
              <FiHash size={15} />
              Tracking Number
            </label>

            <input
              type="text"
              value={order.delivery.trackingNumber}
              onChange={(e) => handleChange("trackingNumber", e.target.value)}
              className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#4E342E]">
              <FiCalendar size={15} />
              Expected Delivery
            </label>

            <input
              type="date"
              value={order.delivery.expectedDate}
              onChange={(e) => handleChange("expectedDate", e.target.value)}
              className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#4E342E]">
              <FiClock size={15} />
              Delivery Slot
            </label>

            <input
              type="text"
              value={order.delivery.deliverySlot}
              onChange={(e) => handleChange("deliverySlot", e.target.value)}
              placeholder="e.g. 6:00 PM - 7:00 PM"
              className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
            />
          </div>
        </div>

        {/* Instructions */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#4E342E]">
            <FiFileText size={15} />
            Delivery Instructions
          </label>

          <textarea
            rows={4}
            value={order.delivery.instructions}
            onChange={(e) => handleChange("instructions", e.target.value)}
            placeholder="Special instructions for delivery..."
            className="w-full resize-none rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
