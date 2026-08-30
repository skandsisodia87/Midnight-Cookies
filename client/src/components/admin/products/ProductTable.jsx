import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiStar,
  FiPlus,
  FiMinus,
  FiSliders,
} from "react-icons/fi";

const ProductTable = ({
  cookies = [],
  onEdit,
  onDelete,
  onViewDetails,
  onQuickStock,
  onToggleStatus,
  onToggleFeatured,
  onUpdateVariantStock,
  isUpdatingStock = false,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-[#4E342E]">
        <thead className="border-b border-[#F3E4D4] bg-[#FFFBF7] text-xs uppercase tracking-wider text-[#8A7064]">
          <tr>
            <th className="px-6 py-4 font-bold">Cookie Product</th>
            <th className="px-6 py-4 font-bold">Category & Pricing</th>
            <th className="px-6 py-4 font-bold">
              Variant Inventory (Stock Steppers)
            </th>
            <th className="px-6 py-4 font-bold text-center">Store Status</th>
            <th className="px-6 py-4 font-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F6EBE0]">
          {cookies.map((cookie) => {
            const variants = cookie.variants || [];
            const totalStock = variants.reduce(
              (sum, v) => sum + (v.stock || 0),
              0,
            );

            return (
              <tr
                key={cookie._id}
                className="transition-colors hover:bg-[#FFFDFB]"
              >
                {/* Product Column */}
                <td className="px-6 py-4.5 align-top">
                  <div className="flex items-start gap-3.5">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[#F2D8BE] bg-[#FFF8EF]">
                      {cookie.images?.[0]?.url ? (
                        <img
                          src={cookie.images[0].url}
                          alt={cookie.name}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl">
                          🍪
                        </div>
                      )}
                      {cookie.isFeatured && (
                        <span
                          title="Featured Cookie"
                          className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D98B2B] text-white shadow-xs"
                        >
                          <FiStar size={11} className="fill-white" />
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4
                          onClick={() => onViewDetails(cookie)}
                          className="font-bold text-[#4E342E] hover:text-[#D98B2B] cursor-pointer"
                        >
                          {cookie.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onToggleFeatured(cookie._id)}
                          title={
                            cookie.isFeatured
                              ? "Remove from Featured"
                              : "Mark as Featured"
                          }
                          className={`rounded-lg p-1 transition cursor-pointer ${cookie.isFeatured
                              ? "text-[#D98B2B] hover:text-[#B57018]"
                              : "text-[#D8C9C0] hover:text-[#D98B2B]"
                            }`}
                        >
                          <FiStar
                            size={14}
                            className={cookie.isFeatured ? "fill-current" : ""}
                          />
                        </button>
                      </div>

                      <p className="line-clamp-1 text-xs text-[#8A7064]">
                        {cookie.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <span className="rounded-md bg-[#FFF7EC] px-2 py-0.5 text-[11px] font-medium text-[#A15C38]">
                          slug: {cookie.slug}
                        </span>
                        {cookie.ingredients?.length > 0 && (
                          <span className="text-[11px] text-[#A89284]">
                            • {cookie.ingredients.slice(0, 2).join(", ")}
                            {cookie.ingredients.length > 2
                              ? ` +${cookie.ingredients.length - 2}`
                              : ""}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Category & Pricing */}
                <td className="px-6 py-4.5 align-top">
                  <div className="space-y-1.5">
                    <span className="inline-flex items-center rounded-full border border-[#E8D6C6] bg-[#FFF8EF] px-2.5 py-0.5 text-xs font-semibold text-[#8A5A36]">
                      {cookie.category?.name ||
                        cookie.category ||
                        "Uncategorized"}
                    </span>

                    <div className="text-sm font-bold text-[#4E342E]">
                      {cookie.minPrice === cookie.maxPrice || !cookie.maxPrice
                        ? `₹${cookie.minPrice || 0}`
                        : `₹${cookie.minPrice} – ₹${cookie.maxPrice}`}
                    </div>

                    <div className="text-xs text-[#8A7064]">
                      {variants.length} variant
                      {variants.length === 1 ? "" : "s"}
                    </div>
                  </div>
                </td>

                {/* Variant Inventory with Inline Steppers */}
                <td className="px-6 py-4.5 align-top">
                  <div className="space-y-2.5">
                    {variants.length === 0 ? (
                      <span className="text-xs text-[#A89284]">
                        No variants configured
                      </span>
                    ) : (
                      <div className="space-y-1.5">
                        {variants.map((v) => {
                          const isLow = v.stock > 0 && v.stock <= 5;
                          const isOut = v.stock === 0;

                          return (
                            <div
                              key={v._id || v.weight}
                              className="flex items-center justify-between gap-3 rounded-xl border border-[#F3E4D4] bg-[#FFFDFB] px-3 py-1.5 text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[#4E342E]">
                                  {v.weight}
                                </span>
                                <span className="text-[#8A7064]">
                                  ₹{v.discountPrice || v.price}
                                </span>
                              </div>

                              {/* Inline Quantity Stepper */}
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  disabled={v.stock <= 0 || isUpdatingStock}
                                  onClick={() =>
                                    onUpdateVariantStock({
                                      variantId: v._id,
                                      change: -1,
                                    })
                                  }
                                  title="Decrease quantity by 1"
                                  className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#E4D7C8] bg-white text-[#4E342E] shadow-2xs transition hover:bg-[#FFF4E6] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                                >
                                  <FiMinus size={11} />
                                </button>

                                <span
                                  className={`inline-flex min-w-7 items-center justify-center rounded-md px-1.5 py-0.5 text-center font-bold ${isOut
                                      ? "bg-[#FEE2E2] text-[#B85C5C]"
                                      : isLow
                                        ? "bg-[#FEF3C7] text-[#D97706]"
                                        : "bg-[#E8F5E9] text-[#5F8D4E]"
                                    }`}
                                >
                                  {v.stock}
                                </span>

                                <button
                                  type="button"
                                  disabled={isUpdatingStock}
                                  onClick={() =>
                                    onUpdateVariantStock({
                                      variantId: v._id,
                                      change: 1,
                                    })
                                  }
                                  title="Increase quantity by 1"
                                  className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#E4D7C8] bg-white text-[#4E342E] shadow-2xs transition hover:bg-[#FFF4E6] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                                >
                                  <FiPlus size={11} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-medium text-[#7A5C4D]">
                        Total Stock:{" "}
                        <strong className="text-[#4E342E]">
                          {totalStock} units
                        </strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => onQuickStock(cookie)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D98B2B] hover:text-[#B57018] cursor-pointer"
                      >
                        <FiSliders size={12} />
                        Batch Adjust
                      </button>
                    </div>
                  </div>
                </td>

                {/* Status Column */}
                <td className="px-6 py-4.5 text-center align-middle">
                  <div className="flex flex-col items-center gap-1.5">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={cookie.isActive}
                        onChange={() => onToggleStatus(cookie._id)}
                        className="peer sr-only"
                      />
                      <div className="h-6 w-11 rounded-full bg-[#D8C9C0] transition peer-checked:bg-[#5F8D4E]" />
                      <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
                    </label>
                    <span
                      className={`text-[11px] font-semibold ${cookie.isActive ? "text-[#5F8D4E]" : "text-[#8A7064]"
                        }`}
                    >
                      {cookie.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>

                {/* Action Buttons */}
                <td className="px-6 py-4.5 text-right align-middle">
                  <div className="inline-flex items-center gap-1 rounded-2xl border border-[#E4D7C8] bg-white p-1 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => onViewDetails(cookie)}
                      title="View Details"
                      className="rounded-xl p-2 text-[#7A5C4D] transition hover:bg-[#FFF4E6] hover:text-[#4E342E] cursor-pointer"
                    >
                      <FiEye size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(cookie)}
                      title="Edit Cookie & Variants"
                      className="rounded-xl p-2 text-[#8A5A36] transition hover:bg-[#FFF4E6] hover:text-[#4E342E] cursor-pointer"
                    >
                      <FiEdit2 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(cookie)}
                      title="Delete Cookie"
                      className="rounded-xl p-2 text-[#B85C5C] transition hover:bg-[#FEE2E2] hover:text-[#991B1B] cursor-pointer"
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

export default ProductTable;
