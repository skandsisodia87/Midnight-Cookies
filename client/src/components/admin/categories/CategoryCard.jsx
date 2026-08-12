import { FiEdit2, FiTrash2 } from "react-icons/fi";

const CategoryCard = ({ category, onDelete, onEdit }) => {
  return (
    <article className="group overflow-hidden rounded-4xl border border-[#F3E4D4] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden bg-[#F9EFE2]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image})` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#1F140F]/80 via-transparent to-transparent" />
        <span className="absolute right-4 bottom-4 inline-flex rounded-full bg-[#EEF7EA] px-3 py-1 text-xs font-semibold text-[#4F7C5B]">
          Active
        </span>
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

          {!category?.isDefault && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                // onClick={() => onEdit(category)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#1B67B2]/10 text-[#1B67B2] transition hover:bg-[#E8F2FC] hover:text-[#155493] cursor-pointer"
              >
                <FiEdit2 size={18} />
              </button>

              <button
                type="button"
                onClick={() => onDelete(category)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#A15C4D]/10 text-[#A15C4D] transition hover:bg-[#FDE8E7] hover:text-[#C7413E] cursor-pointer"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-[#7A5C4D]">
          <span className="rounded-2xl bg-[#FFF5E3] px-3 py-2">
            ID: {category._id.slice(-6)}
          </span>
          <span className="rounded-2xl bg-[#F5F0EC] px-3 py-2">
            {category.slug}
          </span>
        </div>
      </div>
    </article>
  );
};

export default CategoryCard;
