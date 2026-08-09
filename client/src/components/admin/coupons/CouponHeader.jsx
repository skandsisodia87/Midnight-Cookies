import { FiPlus } from "react-icons/fi";

const CouponHeader = ({ onCreate }) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#4E342E] sm:text-3xl">
          Coupons
        </h1>

        <p className="mt-1 text-sm text-[#8A7064] sm:text-base">
          Create and manage discount coupons for your customers.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4E342E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3E2723] active:scale-[0.98]"
      >
        <FiPlus size={18} />
        Create Coupon
      </button>
    </div>
  );
};

export default CouponHeader;
