import { FiUser, FiMail, FiPhone } from "react-icons/fi";

const CustomerInfo = ({ order, setOrder }) => {
  const handleChange = (field, value) => {
    setOrder((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value,
      },
    }));
  };

  return (
    <div className="rounded-2xl border border-[#F3E4D4] bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#F3E4D4] px-6 py-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF3E6]">
          <FiUser className="text-xl text-[#A15C38]" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E342E]">
            Customer Information
          </h2>

          <p className="text-sm text-gray-500">Edit customer details</p>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-5 p-6">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#A15C38] text-3xl font-semibold text-white">
            {order.customer.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-[#4E342E]">
              Customer Name
            </label>

            <input
              type="text"
              value={order.customer.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none transition focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Email */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#4E342E]">
              <FiMail size={16} />
              Email Address
            </label>

            <input
              type="email"
              value={order.customer.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none transition focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#4E342E]">
              <FiPhone size={16} />
              Phone Number
            </label>

            <input
              type="text"
              value={order.customer.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none transition focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
