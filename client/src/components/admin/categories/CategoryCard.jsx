import { FiTrash2 } from "react-icons/fi";

const CategoryCard = ({ category, onDelete }) => {
  return (
    <article className="group overflow-hidden rounded-4xl border border-[#F3E4D4] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden bg-[#F9EFE2]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image})` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#1F140F]/80 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 inline-flex rounded-full bg-[#FFF3E2]/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#A15C38] shadow-sm">
          {category.slug}
        </span>
        <button
          type="button"
          onClick={() => onDelete(category)}
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#A15C4D] transition hover:bg-[#FDE8E7] hover:text-[#C7413E]"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-[#3E2723]">
              {category.name}
            </h2>
            <p className="mt-1 text-sm text-[#8C6A4B]">
              {category.description || "No description available."}
            </p>
          </div>
          <span className="rounded-full bg-[#EEF7EA] px-3 py-1 text-xs font-semibold text-[#4F7C5B]">
            Active
          </span>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-[#7A5C4D]">
          <span className="rounded-2xl bg-[#FFF5E3] px-3 py-2">
            ID: {category._id.slice(-6)}
          </span>
          <span className="rounded-2xl bg-[#F5F0EC] px-3 py-2">
            Image ready
          </span>
        </div>
      </div>
    </article>
  );
};

export default CategoryCard;
