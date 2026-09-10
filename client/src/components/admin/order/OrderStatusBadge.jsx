const colors = {
  placed: "bg-[#E8F4FD] text-[#3A6C8C]",
  confirmed: "bg-[#FFF4E6] text-[#A15C38]",
  baking: "bg-[#FDF1E5] text-[#B36A2E]",
  shipped: "bg-[#EEE9FF] text-[#5F4FA3]",
  delivered: "bg-[#E8F8EE] text-[#2E7D4F]",
  cancelled: "bg-[#FDECEC] text-[#C84C4C]",
};

export default function OrderStatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${colors[status]} uppercase`}
    >
      {status}
    </span>
  );
}
