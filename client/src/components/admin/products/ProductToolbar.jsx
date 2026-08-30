import { FiSearch, FiX, FiList, FiGrid } from "react-icons/fi";

const ProductToolbar = ({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  stockFilter,
  setStockFilter,
  statusFilter,
  setStatusFilter,
  viewMode,
  setViewMode,
  categories = [],
}) => {
  const hasActiveFilters =
    Boolean(search) ||
    categoryFilter !== "all" ||
    stockFilter !== "all" ||
    statusFilter !== "all";

  const clearAllFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setStockFilter("all");
    setStatusFilter("all");
  };

  return (
    <div className="border-b border-[#F3E4D4] bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A89284]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by cookie name, category, or ingredients..."
            className="w-full rounded-2xl border border-[#E4D7C8] bg-[#FFFDFB] py-2.5 pl-11 pr-10 text-sm text-[#4E342E] placeholder-[#B7A49A] outline-none transition focus:border-[#D98B2B] focus:ring-2 focus:ring-[#D98B2B]/10"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#A89284] hover:bg-[#FFF4E6] hover:text-[#4E342E]"
            >
              <FiX size={14} />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category Filter */}
          <div className="relative min-w-35">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-[#E4D7C8] bg-[#FFFDFB] px-3.5 py-2.5 pr-8 text-xs font-semibold text-[#4E342E] outline-none transition hover:border-[#D98B2B] focus:border-[#D98B2B] cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A7064]">
              ▾
            </div>
          </div>

          {/* Stock Filter */}
          <div className="relative min-w-32.5">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-[#E4D7C8] bg-[#FFFDFB] px-3.5 py-2.5 pr-8 text-xs font-semibold text-[#4E342E] outline-none transition hover:border-[#D98B2B] focus:border-[#D98B2B] cursor-pointer"
            >
              <option value="all">All Stock Levels</option>
              <option value="in_stock">In Stock (&gt; 5)</option>
              <option value="low_stock">Low Stock (1 - 5)</option>
              <option value="out_of_stock">Out of Stock (0)</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A7064]">
              ▾
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative min-w-31.25">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-[#E4D7C8] bg-[#FFFDFB] px-3.5 py-2.5 pr-8 text-xs font-semibold text-[#4E342E] outline-none transition hover:border-[#D98B2B] focus:border-[#D98B2B] cursor-pointer"
            >
              <option value="all">All Visibility</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
              <option value="featured">Featured Only</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A7064]">
              ▾
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1.5 rounded-2xl border border-dashed border-[#D98B2B] bg-[#FFF8EF] px-3 py-2 text-xs font-semibold text-[#A15C38] transition hover:bg-[#FFEECF] cursor-pointer"
            >
              <FiX size={14} />
              Reset
            </button>
          )}

          {/* View Mode Toggle */}
          <div className="ml-auto flex items-center rounded-2xl border border-[#E4D7C8] bg-[#FFFDFB] p-1">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              title="Table View"
              className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm transition cursor-pointer ${
                viewMode === "table"
                  ? "bg-[#4E342E] text-white shadow-xs"
                  : "text-[#7A5C4D] hover:text-[#4E342E]"
              }`}
            >
              <FiList />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              title="Grid Card View"
              className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm transition cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#4E342E] text-white shadow-xs"
                  : "text-[#7A5C4D] hover:text-[#4E342E]"
              }`}
            >
              <FiGrid />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductToolbar;
