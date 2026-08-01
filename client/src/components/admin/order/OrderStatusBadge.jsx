const colors = {
  Placed: "bg-[#E8F4FD] text-[#3A6C8C]",

  Confirmed: "bg-[#FFF4E6] text-[#A15C38]",

  Baking: "bg-[#FDF1E5] text-[#B36A2E]",

  Shipped: "bg-[#EEE9FF] text-[#5F4FA3]",

  Delivered: "bg-[#E8F8EE] text-[#2E7D4F]",

  Cancelled: "bg-[#FDECEC] text-[#C84C4C]",
};

export default function OrderStatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
}
