import {
  FiDollarSign,
  FiEdit2,
  FiPercent,
  FiPower,
  FiTag,
  FiTrash2,
} from "react-icons/fi";

const CouponTable = ({
  coupons,
  openEditModal,
  handleToggleStatus,
  setDeleteCoupon,
  renderStatus,
  getDiscountText,
  formatDate,
}) => {
  return (
    <div className="hidden overflow-x-auto lg:block">
      <table className="w-full min-w-250">
        <thead>
          <tr className="border-b border-[#F3E4D4] bg-[#FFFDFB] text-left">
            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#8A7064]">
              Coupon
            </th>

            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#8A7064]">
              Discount
            </th>

            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#8A7064]">
              Minimum Order
            </th>

            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#8A7064]">
              Usage
            </th>

            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#8A7064]">
              Validity
            </th>

            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#8A7064]">
              Status
            </th>

            <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#8A7064]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#F3E4D4]">
          {coupons.map((coupon) => {
            const usagePercentage = coupon.usageLimit
              ? Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100)
              : 0;

            return (
              <tr key={coupon._id} className="transition hover:bg-[#FFFCF9]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF3E5] text-[#D98B2B]">
                      <FiTag size={18} />
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
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 font-bold text-[#4E342E]">
                    {coupon.discountType === "percentage" ? (
                      <FiPercent size={14} className="text-[#D98B2B]" />
                    ) : (
                      <FiDollarSign size={14} className="text-[#D98B2B]" />
                    )}

                    {getDiscountText(coupon)}
                  </div>

                  {coupon.maximumDiscount && (
                    <p className="mt-1 text-xs text-[#A58D80]">
                      Max ₹{coupon.maximumDiscount}
                    </p>
                  )}
                </td>

                <td className="px-5 py-4 text-sm font-medium text-[#5D473D]">
                  ₹{Number(coupon.minimumOrderAmount).toLocaleString("en-IN")}
                </td>

                <td className="px-5 py-4">
                  <div className="w-32">
                    <div className="mb-1.5 flex justify-between text-xs">
                      <span className="font-semibold text-[#5D473D]">
                        {coupon.usedCount}
                      </span>

                      <span className="text-[#A58D80]">
                        {coupon.usageLimit}
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-[#F3E4D4]">
                      <div
                        className="h-full rounded-full bg-[#D98B2B]"
                        style={{ width: `${usagePercentage}%` }}
                      />
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="text-sm">
                    <p className="font-medium text-[#5D473D]">
                      {formatDate(coupon.startDate)}
                    </p>

                    <p className="mt-1 text-xs text-[#A58D80]">
                      to {formatDate(coupon.expiryDate)}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">{renderStatus(coupon)}</td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(coupon)}
                      title="Edit coupon"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EBDDCF] text-[#6D5549] transition hover:border-[#D98B2B] hover:bg-[#FFF5E9] hover:text-[#D98B2B]"
                    >
                      <FiEdit2 size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus(coupon._id)}
                      title={
                        coupon.isActive
                          ? "Deactivate coupon"
                          : "Activate coupon"
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EBDDCF] text-[#6D5549] transition hover:border-[#5F8D4E] hover:bg-[#EEF7EA] hover:text-[#5F8D4E]"
                    >
                      <FiPower size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteCoupon(coupon)}
                      title="Delete coupon"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EBDDCF] text-[#6D5549] transition hover:border-[#B85C5C] hover:bg-[#FFF0F0] hover:text-[#B85C5C]"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CouponTable;
