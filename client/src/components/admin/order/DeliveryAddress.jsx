import { FiMapPin, FiHome } from "react-icons/fi";

const DeliveryAddress = ({ order, setOrder }) => {
  const handleChange = (field, value) => {
    setOrder((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  return (
    <div className="rounded-2xl border border-[#F3E4D4] bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#F3E4D4] px-6 py-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF3E6]">
          <FiMapPin className="text-xl text-[#A15C38]" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E342E]">
            Delivery Address
          </h2>

          <p className="text-sm text-gray-500">Update delivery information</p>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-5 p-6">
        {/* House Number */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#4E342E]">
            <FiHome size={16} />
            House / Flat No.
          </label>

          <input
            type="text"
            value={order.address.house}
            onChange={(e) => handleChange("house", e.target.value)}
            placeholder="House / Flat Number"
            className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none transition focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
          />
        </div>

        {/* Street */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#4E342E]">
            Street Address
          </label>

          <textarea
            rows={3}
            value={order.address.street}
            onChange={(e) => handleChange("street", e.target.value)}
            placeholder="Street, Landmark..."
            className="w-full resize-none rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none transition focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
          />
        </div>

        {/* City & State */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#4E342E]">
              City
            </label>

            <input
              type="text"
              value={order.address.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="City"
              className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none transition focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#4E342E]">
              State
            </label>

            <input
              type="text"
              value={order.address.state}
              onChange={(e) => handleChange("state", e.target.value)}
              placeholder="State"
              className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none transition focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
            />
          </div>
        </div>

        {/* Pincode */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#4E342E]">
            Pincode
          </label>

          <input
            type="text"
            value={order.address.pincode}
            onChange={(e) => handleChange("pincode", e.target.value)}
            placeholder="Enter Pincode"
            className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none transition focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
