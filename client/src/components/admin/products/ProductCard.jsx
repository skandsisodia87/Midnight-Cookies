import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiStar,
  FiPlus,
  FiMinus,
  FiSliders,
} from "react-icons/fi";

const ProductCard = ({
  cookie,
  onEdit,
  onDelete,
  onViewDetails,
  onQuickStock,
  onToggleStatus,
  onToggleFeatured,
  onUpdateVariantStock,
  isUpdatingStock = false,
}) => {
  const variants = cookie.variants || [];
  const totalStock = variants.reduce((sum, v) => sum + (v.stock || 0), 0);

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-[#F3E4D4] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Card Media Header */}
      <div className="relative h-48 w-full bg-[#FFF8EF]">
        {cookie.images?.[0]?.url ? (
          <img
            src={cookie.images[0].url}
            alt={cookie.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl">
            🍪
          </div>
        )}

        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#8A5A36] shadow-xs backdrop-blur-xs">
            {cookie.category?.name || cookie.category || "Uncategorized"}
          </span>
          {cookie.isFeatured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#D98B2B] px-2.5 py-1 text-[11px] font-bold text-white shadow-xs">
              <FiStar size={11} className="fill-white" />
              Featured
            </span>
          )}
        </div>

        <div className="absolute right-3 top-3 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onToggleFeatured(cookie._id)}
            title={cookie.isFeatured ? "Unfeature" : "Feature"}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#D98B2B] shadow-xs backdrop-blur-xs transition hover:scale-110 cursor-pointer"
          >
            <FiStar size={15} className={cookie.isFeatured ? "fill-[#D98B2B]" : ""} />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3
              onClick={() => onViewDetails(cookie)}
              className="text-lg font-bold text-[#4E342E] hover:text-[#D98B2B] cursor-pointer"
            >
              {cookie.name}
            </h3>
            <p className="mt-0.5 text-xs text-[#A89284]">slug: {cookie.slug}</p>
          </div>

          <div className="text-right">
            <div className="text-base font-extrabold text-[#4E342E]">
              {cookie.minPrice === cookie.maxPrice || !cookie.maxPrice
                ? `₹${cookie.minPrice || 0}`
                : `₹${cookie.minPrice} – ₹${cookie.maxPrice}`}
            </div>
            <span
              className={`inline-block text-[11px] font-semibold ${
                cookie.isActive ? "text-[#5F8D4E]" : "text-[#B85C5C]"
              }`}
            >
              {cookie.isActive ? "● Live" : "○ Inactive"}
            </span>
          </div>
        </div>

        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-[#7A5C4D]">
          {cookie.description}
        </p>

        {/* Ingredients preview */}
        {cookie.ingredients?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {cookie.ingredients.slice(0, 3).map((ing, i) => (
              <span
                key={i}
                className="rounded-md bg-[#FFF7EC] px-2 py-0.5 text-[10px] font-medium text-[#A15C38]"
              >
                {ing}
              </span>
            ))}
            {cookie.ingredients.length > 3 && (
              <span className="rounded-md bg-[#FFF7EC] px-1.5 py-0.5 text-[10px] font-medium text-[#A15C38]">
                +{cookie.ingredients.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Variants & Stock Steppers */}
        <div className="mt-4 rounded-2xl border border-[#F3E4D4] bg-[#FFFDFB] p-3">
          <div className="flex items-center justify-between pb-2 text-xs">
            <span className="font-bold text-[#4E342E]">
              Variants ({variants.length})
            </span>
            <button
              type="button"
              onClick={() => onQuickStock(cookie)}
              className="inline-flex items-center gap-1 font-semibold text-[#D98B2B] hover:text-[#B57018] cursor-pointer text-[11px]"
            >
              <FiSliders size={12} />
              Quick Stock
            </button>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-0.5">
            {variants.map((v) => {
              const isLow = v.stock > 0 && v.stock <= 5;
              const isOut = v.stock === 0;

              return (
                <div
                  key={v._id || v.weight}
                  className="flex items-center justify-between gap-2 rounded-xl bg-white p-2 text-xs border border-[#F3E4D4]"
                >
                  <div className="min-w-0">
                    <span className="font-bold text-[#4E342E]">{v.weight}</span>
                    <span className="ml-2 text-[#8A7064]">
                      ₹{v.discountPrice || v.price}
                    </span>
                  </div>

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
                      title="Decrease by 1"
                      className="flex h-5 w-5 items-center justify-center rounded-md border border-[#E4D7C8] bg-white text-[#4E342E] shadow-2xs transition hover:bg-[#FFF4E6] active:scale-95 disabled:opacity-30 cursor-pointer"
                    >
                      <FiMinus size={10} />
                    </button>

                    <span
                      className={`inline-flex min-w-[24px] items-center justify-center rounded-md px-1 py-0.5 text-center font-bold text-[11px] ${
                        isOut
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
                      title="Increase by 1"
                      className="flex h-5 w-5 items-center justify-center rounded-md border border-[#E4D7C8] bg-white text-[#4E342E] shadow-2xs transition hover:bg-[#FFF4E6] active:scale-95 disabled:opacity-30 cursor-pointer"
                    >
                      <FiPlus size={10} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-2.5 flex items-center justify-between border-t border-[#F6EBE0] pt-2 text-[11px] text-[#7A5C4D]">
            <span>Total Stock</span>
            <strong className="text-[#4E342E] font-bold">{totalStock} units</strong>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={cookie.isActive}
                onChange={() => onToggleStatus(cookie._id)}
                className="peer sr-only"
              />
              <div className="h-5 w-9 rounded-full bg-[#D8C9C0] transition peer-checked:bg-[#5F8D4E]" />
              <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-xs transition peer-checked:translate-x-4" />
            </label>
            <span className="text-xs font-semibold text-[#7A5C4D]">
              {cookie.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onViewDetails(cookie)}
              title="View Specifications"
              className="rounded-xl border border-[#E4D7C8] p-2 text-[#7A5C4D] transition hover:bg-[#FFF4E6] hover:text-[#4E342E] cursor-pointer"
            >
              <FiEye size={14} />
            </button>
            <button
              type="button"
              onClick={() => onEdit(cookie)}
              title="Edit Cookie"
              className="rounded-xl border border-[#E4D7C8] p-2 text-[#8A5A36] transition hover:bg-[#FFF4E6] hover:text-[#4E342E] cursor-pointer"
            >
              <FiEdit2 size={14} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(cookie)}
              title="Delete Cookie"
              className="rounded-xl border border-[#E4D7C8] p-2 text-[#B85C5C] transition hover:bg-[#FEE2E2] hover:text-[#991B1B] cursor-pointer"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
