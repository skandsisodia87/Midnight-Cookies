import {
  FiX,
  FiEdit2,
  FiStar,
  FiSliders,
} from "react-icons/fi";

const ProductDetailsModal = ({
  isOpen,
  onClose,
  cookie,
  onEdit,
  onQuickStock,
}) => {
  if (!isOpen || !cookie) return null;

  const variants = cookie.variants || [];
  const totalStock = variants.reduce((sum, v) => sum + (v.stock || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D1B16]/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-2xl overflow-hidden rounded-4xl bg-white shadow-2xl">
        {/* Header with image */}
        <div className="relative h-56 w-full bg-[#FFF8EF]">
          {cookie.images?.[0]?.url ? (
            <img
              src={cookie.images[0].url}
              alt={cookie.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-5xl">
              🍪
            </div>
          )}

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-xs transition hover:bg-black/60 cursor-pointer"
          >
            <FiX size={18} />
          </button>

          {/* Badges */}
          <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#8A5A36] shadow-sm backdrop-blur-xs">
              {cookie.category?.name || cookie.category || "Uncategorized"}
            </span>
            {cookie.isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#D98B2B] px-3 py-1 text-xs font-bold text-white shadow-sm">
                <FiStar size={12} className="fill-white" />
                Featured on Homepage
              </span>
            )}
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                cookie.isActive
                  ? "bg-[#E8F5E9] text-[#5F8D4E]"
                  : "bg-[#FEE2E2] text-[#B85C5C]"
              }`}
            >
              {cookie.isActive ? "● Active Storefront" : "○ Inactive"}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-5">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-[#4E342E]">
                  {cookie.name}
                </h2>
                <p className="text-xs text-[#8A7064] mt-0.5">
                  slug: {cookie.slug}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-[#8A7064]">Total Stock</p>
                <p className="text-lg font-extrabold text-[#4E342E]">
                  {totalStock} units
                </p>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#7A5C4D]">
              {cookie.description}
            </p>
          </div>

          {/* Ingredients */}
          {cookie.ingredients?.length > 0 && (
            <div className="space-y-2 border-t border-[#F6EBE0] pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#A15C38]">
                Ingredients & Composition
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {cookie.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-[#F2D8BE] bg-[#FFF8EF] px-3 py-1 text-xs font-medium text-[#8A5A36]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Variants Table */}
          <div className="space-y-2 border-t border-[#F6EBE0] pt-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#A15C38]">
                Variant Specifications & Pricing ({variants.length})
              </h4>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onQuickStock(cookie);
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#D98B2B] hover:text-[#B57018] cursor-pointer"
              >
                <FiSliders size={12} />
                Adjust Stock
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#F3E4D4]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF8EF] font-bold text-[#8A5A36]">
                  <tr>
                    <th className="px-3.5 py-2.5">Weight/Size</th>
                    <th className="px-3.5 py-2.5">Regular</th>
                    <th className="px-3.5 py-2.5">Discount</th>
                    <th className="px-3.5 py-2.5">Stock</th>
                    <th className="px-3.5 py-2.5">SKU</th>
                    <th className="px-3.5 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F6EBE0] text-[#4E342E]">
                  {variants.map((v) => (
                    <tr key={v._id || v.weight} className="hover:bg-[#FFFDFB]">
                      <td className="px-3.5 py-2.5 font-bold">{v.weight}</td>
                      <td className="px-3.5 py-2.5 text-[#8A7064]">
                        ₹{v.price}
                      </td>
                      <td className="px-3.5 py-2.5 font-semibold text-[#5F8D4E]">
                        {v.discountPrice ? `₹${v.discountPrice}` : "—"}
                      </td>
                      <td className="px-3.5 py-2.5 font-bold">
                        <span
                          className={`rounded-md px-1.5 py-0.5 ${
                            v.stock === 0
                              ? "bg-[#FEE2E2] text-[#B85C5C]"
                              : v.stock <= 5
                                ? "bg-[#FEF3C7] text-[#D97706]"
                                : "bg-[#E8F5E9] text-[#5F8D4E]"
                          }`}
                        >
                          {v.stock} units
                        </span>
                      </td>
                      <td className="px-3.5 py-2.5 text-[#A89284]">
                        {v.sku || "N/A"}
                      </td>
                      <td className="px-3.5 py-2.5 font-medium">
                        {v.isAvailable ? (
                          <span className="text-[#5F8D4E]">Available</span>
                        ) : (
                          <span className="text-[#B85C5C]">Unavailable</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#F3E4D4] bg-[#FFFDFB] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-[#E4D7C8] px-5 py-2.5 text-xs font-bold text-[#4E342E] hover:bg-[#FFF4E6] transition cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit(cookie);
            }}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#4E342E] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#3E2723] shadow-xs transition cursor-pointer"
          >
            <FiEdit2 size={14} />
            Edit Cookie Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
