import { FiSearch } from "react-icons/fi";

const CouponToolbar = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="flex flex-col gap-4 border-b border-[#F3E4D4] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-sm">
        <FiSearch
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A58D80]"
          size={18}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search coupon code..."
          className="w-full rounded-xl border border-[#EBDDCF] bg-[#FFFDFB] py-2.5 pl-10 pr-4 text-sm text-[#4E342E] outline-none transition placeholder:text-[#B7A49A] focus:border-[#D98B2B] focus:ring-2 focus:ring-[#D98B2B]/10"
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden text-sm font-medium text-[#8A7064] sm:block">
          Status
        </span>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full rounded-xl border border-[#EBDDCF] bg-[#FFFDFB] px-4 py-2.5 text-sm font-medium text-[#4E342E] outline-none focus:border-[#D98B2B] sm:w-auto"
        >
          <option value="all">All Coupons</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="expired">Expired</option>
          <option value="scheduled">Scheduled</option>
          <option value="limit-reached">Limit Reached</option>
        </select>
      </div>
    </div>
  );
};

export default CouponToolbar;
