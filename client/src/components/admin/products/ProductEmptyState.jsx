import { FiPlus, FiPackage } from "react-icons/fi";

const ProductEmptyState = ({
  onAddProduct,
  isFiltered = false,
  onResetFilters,
}) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FFF8EF] border border-[#F2D8BE] text-4xl shadow-xs">
        🍪
      </div>

      <h3 className="mt-5 text-xl font-bold text-[#4E342E]">
        {isFiltered ? "No matching cookies found" : "No cookies created yet"}
      </h3>

      <p className="mt-2 max-w-md text-sm text-[#7A5C4D]">
        {isFiltered
          ? "Try adjusting your search criteria or reset filters to see all available products."
          : "Add your first freshly baked cookie recipe with weights, pricing, and initial stock."}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {isFiltered && onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="rounded-2xl border border-[#E4D7C8] bg-white px-5 py-2.5 text-xs font-bold text-[#4E342E] shadow-2xs transition hover:bg-[#FFF4E6] cursor-pointer"
          >
            Clear Filters
          </button>
        )}

        <button
          type="button"
          onClick={onAddProduct}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#4E342E] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#3E2723] cursor-pointer"
        >
          <FiPlus size={16} />
          Add Cookie
        </button>
      </div>
    </div>
  );
};

export default ProductEmptyState;
