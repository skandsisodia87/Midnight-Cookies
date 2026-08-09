import { FiPlus, FiTag } from "react-icons/fi";

const CouponEmptyState = ({ onCreate }) => {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF3E5] text-[#D98B2B]">
        <FiTag size={24} />
      </div>

      <h3 className="mt-4 text-base font-bold text-[#4E342E]">
        No coupons found
      </h3>

      <p className="mx-auto mt-1 max-w-sm text-sm text-[#8A7064]">
        Try changing your search or filter, or create a new coupon.
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#4E342E] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3E2723]"
      >
        <FiPlus size={16} />
        Create Coupon
      </button>
    </div>
  );
};

export default CouponEmptyState;
