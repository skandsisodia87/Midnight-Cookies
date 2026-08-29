import { FiPlus, FiRefreshCw } from "react-icons/fi";

const ProductHeader = ({ onAddProduct, totalCount = 0, isRefetching, onRefresh }) => {
  return (
    <div className="rounded-[28px] border border-[#F3E4D4] bg-linear-to-r from-[#FFF7EC] via-white to-[#FFFDF8] p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#4E342E]">
              Cookies & Products
            </h1>
            <span className="inline-flex items-center rounded-full border border-[#F2D8BE] bg-[#FFF8EF] px-3 py-0.5 text-xs font-bold text-[#A15C38]">
              {totalCount} Total
            </span>
          </div>
          <p className="max-w-2xl text-sm text-[#7A5C4D] sm:text-base">
            Create, update, and manage your cookie recipes, variant sizes, pricing, and live inventory stock.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefetching}
              title="Refresh cookies list"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E4D7C8] bg-white text-[#4E342E] shadow-xs transition hover:bg-[#FFF4E6] active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <FiRefreshCw className={`text-base ${isRefetching ? "animate-spin text-[#D98B2B]" : ""}`} />
            </button>
          )}

          <button
            type="button"
            onClick={onAddProduct}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#4E342E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3E2723] hover:shadow active:scale-98 cursor-pointer"
          >
            <FiPlus size={18} className="stroke-[2.5]" />
            <span>Add New Cookie</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
