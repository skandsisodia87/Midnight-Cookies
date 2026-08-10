import { FiEdit2, FiPower, FiTag, FiTrash2 } from "react-icons/fi";
import { getDiscountText, renderStatus, formatDate } from "./coupon.helper.jsx";

const CouponMobileList = ({
  coupons,
  openEditModal,
  handleToggleStatus,
  setDeleteCoupon,
}) => {
  return (
    <div className="divide-y divide-[#F3E4D4] lg:hidden">
      {coupons.map((coupon) => {
        const usagePercentage = coupon.usageLimit
          ? Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100)
          : 0;

        return (
          <div key={coupon._id} className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF3E5] text-[#D98B2B]">
                  <FiTag size={19} />
                </div>

                <div>
                  <p className="font-bold text-[#4E342E]">{coupon.code}</p>

                  <p className="mt-0.5 text-xs text-[#A58D80]">
                    {coupon.discountType === "percentage"
                      ? "Percentage discount"
                      : "Fixed discount"}
                  </p>
                </div>
              </div>

              {renderStatus(coupon)}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-[#A58D80]">Discount</p>

                <p className="mt-1 font-bold text-[#4E342E]">
                  {getDiscountText(coupon)}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#A58D80]">Min. Order</p>

                <p className="mt-1 font-bold text-[#4E342E]">
                  ₹{Number(coupon.minimumOrderAmount).toLocaleString("en-IN")}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#A58D80]">Used</p>

                <p className="mt-1 font-bold text-[#4E342E]">
                  {coupon.usedCount}/{coupon.usageLimit}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#A58D80]">Expires</p>

                <p className="mt-1 font-bold text-[#4E342E]">
                  {formatDate(coupon.expiryDate)}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-xs">
                <span className="text-[#8A7064]">Usage</span>

                <span className="font-semibold text-[#5D473D]">
                  {Math.round(usagePercentage)}%
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-[#F3E4D4]">
                <div
                  className="h-full rounded-full bg-[#D98B2B]"
                  style={{ width: `${usagePercentage}%` }}
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2 border-t border-[#F3E4D4] pt-4">
              <button
                type="button"
                onClick={() => openEditModal(coupon)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#EBDDCF] px-3 py-2 text-xs font-semibold text-[#6D5549] hover:bg-[#FFF5E9] hover:text-[#D98B2B]"
              >
                <FiEdit2 size={14} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleToggleStatus(coupon._id)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#EBDDCF] px-3 py-2 text-xs font-semibold text-[#6D5549] hover:bg-[#EEF7EA] hover:text-[#5F8D4E]"
              >
                <FiPower size={14} />
                {coupon.isActive ? "Disable" : "Enable"}
              </button>

              <button
                type="button"
                onClick={() => setDeleteCoupon(coupon)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#EBDDCF] px-3 py-2 text-xs font-semibold text-[#6D5549] hover:bg-[#FFF0F0] hover:text-[#B85C5C]"
              >
                <FiTrash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CouponMobileList;
