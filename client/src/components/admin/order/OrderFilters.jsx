import { FiSearch, FiFilter } from "react-icons/fi";

export default function OrderFilters() {
  return (
    <div className="rounded-3xl border border-[#F3E4D4] bg-linear-to-r from-[#FFFDF9] via-white to-[#FFF7EC] p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <label className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A15C38]" />

          <input
            placeholder="Search order..."
            className="w-full rounded-2xl border border-[#E9D5C5] bg-white py-3 pl-11 pr-4 text-sm text-[#4E342E] shadow-sm outline-none transition focus:border-[#A15C38] focus:ring-2 focus:ring-[#A15C38]/15"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <label className="relative min-w-45">
            <FiFilter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#A15C38]" />

            <select className="w-full appearance-none rounded-2xl border border-[#E9D5C5] bg-white py-3 pl-9 pr-4 text-sm text-[#4E342E] shadow-sm outline-none transition focus:border-[#A15C38] focus:ring-2 focus:ring-[#A15C38]/15">
              <option>All Status</option>
              <option>Placed</option>
              <option>Confirmed</option>
              <option>Baking</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </label>

          <input
            type="date"
            className="min-w-45 rounded-2xl border border-[#E9D5C5] bg-white px-4 py-3 text-sm text-[#4E342E] shadow-sm outline-none transition focus:border-[#A15C38] focus:ring-2 focus:ring-[#A15C38]/15"
          />
        </div>
      </div>
    </div>
  );
}
