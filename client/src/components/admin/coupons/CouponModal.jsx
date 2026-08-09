import { FiCalendar, FiPercent, FiTag, FiX } from "react-icons/fi";

const FormField = ({
  label,
  required,
  error,
  hint,
  children,
  className = "",
}) => {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm font-semibold text-[#4E342E]">
          {label}
          {required && <span className="ml-1 text-[#B85C5C]">*</span>}
        </label>

        {hint && <span className="text-xs text-[#A58D80]">{hint}</span>}
      </div>

      {children}

      {error && (
        <p className="mt-1 text-xs font-medium text-[#B85C5C]">{error}</p>
      )}
    </div>
  );
};

const inputClass = (error = false) => {
  return `
    w-full rounded-xl border
    ${
      error
        ? "border-[#B85C5C] focus:border-[#B85C5C]"
        : "border-[#EBDDCF] focus:border-[#D98B2B]"
    }
    bg-[#FFFDFB]
    px-3.5 py-2.5
    text-sm text-[#4E342E]
    outline-none
    transition
    placeholder:text-[#B7A49A]
    focus:ring-2
    ${error ? "focus:ring-[#B85C5C]/10" : "focus:ring-[#D98B2B]/10"}
  `;
};

export default function CouponModal({
  isOpen,
  editingCoupon,
  formData,
  errors,
  handleChange,
  handleSubmit,
  closeModal,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D1B16]/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#F3E4D4] px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-[#4E342E] sm:text-xl">
              {editingCoupon ? "Edit Coupon" : "Create Coupon"}
            </h2>

            <p className="mt-0.5 text-xs text-[#8A7064] sm:text-sm">
              {editingCoupon
                ? "Update your coupon details."
                : "Create a new discount coupon."}
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#8A7064] transition hover:bg-[#FFF5E9] hover:text-[#4E342E]"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              label="Coupon Code"
              required
              error={errors.code}
              className="sm:col-span-2"
            >
              <div className="relative">
                <FiTag
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A58D80]"
                  size={16}
                />

                <input
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g. WELCOME10"
                  className={inputClass(errors.code) + " pl-9 uppercase"}
                />
              </div>
            </FormField>

            <FormField label="Discount Type" required>
              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
                className={inputClass()}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </FormField>

            <FormField
              label="Discount Value"
              required
              error={errors.discountValue}
            >
              <div className="relative">
                {formData.discountType === "percentage" ? (
                  <FiPercent
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A58D80]"
                    size={16}
                  />
                ) : (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#A58D80]">
                    ₹
                  </span>
                )}

                <input
                  type="number"
                  name="discountValue"
                  min="0"
                  value={formData.discountValue}
                  onChange={handleChange}
                  placeholder={
                    formData.discountType === "percentage" ? "10" : "100"
                  }
                  className={inputClass(errors.discountValue) + " pl-9"}
                />
              </div>
            </FormField>

            <FormField
              label="Minimum Order Amount"
              required
              error={errors.minimumOrderAmount}
            >
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#A58D80]">
                  ₹
                </span>

                <input
                  type="number"
                  name="minimumOrderAmount"
                  min="0"
                  value={formData.minimumOrderAmount}
                  onChange={handleChange}
                  placeholder="499"
                  className={inputClass(errors.minimumOrderAmount) + " pl-9"}
                />
              </div>
            </FormField>

            <FormField label="Maximum Discount" hint="Optional">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#A58D80]">
                  ₹
                </span>

                <input
                  type="number"
                  name="maximumDiscount"
                  min="0"
                  value={formData.maximumDiscount}
                  onChange={handleChange}
                  placeholder="200"
                  className={inputClass() + " pl-9"}
                />
              </div>
            </FormField>

            <FormField label="Usage Limit" required error={errors.usageLimit}>
              <input
                type="number"
                name="usageLimit"
                min="1"
                value={formData.usageLimit}
                onChange={handleChange}
                placeholder="100"
                className={inputClass(errors.usageLimit)}
              />
            </FormField>

            <FormField label="Start Date" required error={errors.startDate}>
              <div className="relative">
                <FiCalendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A58D80]"
                  size={16}
                />

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={inputClass(errors.startDate) + " pl-9"}
                />
              </div>
            </FormField>

            <FormField label="Expiry Date" required error={errors.expiryDate}>
              <div className="relative">
                <FiCalendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A58D80]"
                  size={16}
                />

                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className={inputClass(errors.expiryDate) + " pl-9"}
                />
              </div>
            </FormField>

            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#F3E4D4] bg-[#FFFDFB] p-4">
                <div>
                  <p className="text-sm font-semibold text-[#4E342E]">
                    Active Coupon
                  </p>

                  <p className="mt-0.5 text-xs text-[#8A7064]">
                    Customers can use this coupon when active.
                  </p>
                </div>

                <div className="relative">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="peer sr-only"
                  />

                  <div className="h-6 w-11 rounded-full bg-[#D8C9C0] transition peer-checked:bg-[#5F8D4E]" />

                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
                </div>
              </label>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#F3E4D4] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-xl border border-[#EBDDCF] px-5 py-2.5 text-sm font-semibold text-[#6D5549] transition hover:bg-[#FFF8F2]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#4E342E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3E2723]"
            >
              {editingCoupon ? "Update Coupon" : "Create Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
