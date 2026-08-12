import { FiUpload } from "react-icons/fi";

const inputClass = (hasError = false) =>
  `w-full rounded-2xl border ${
    hasError
      ? "border-[#E2A0A0] focus:border-[#D98B2B]"
      : "border-[#E4D7C8] focus:border-[#D98B2B]"
  } bg-[#FFFDFB] px-4 py-3 text-sm text-[#4E342E] outline-none transition placeholder:text-[#B7A49A] focus:ring-2 focus:ring-[#D98B2B]/10`;

const CategoryModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  errors,
  onSubmit,
  submitting,
}) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D1B16]/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-4xl bg-white shadow-2xl">
        <div className="flex flex-col gap-2 border-b border-[#F3E4D4] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#4E342E]">
              Create Category
            </h2>
            <p className="text-sm text-[#7A5C4D]">
              Add a new category for your store.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-[#4E342E]">
              Name
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Cookie category name"
                className={inputClass(Boolean(errors.name))}
              />
              {errors.name && (
                <p className="text-xs text-[#B85C5C]">{errors.name}</p>
              )}
            </label>
            <label className="space-y-2 text-sm font-medium text-[#4E342E]">
              Slug
              <input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="fresh-bakes"
                className={inputClass(Boolean(errors.slug))}
              />
              {errors.slug && (
                <p className="text-xs text-[#B85C5C]">{errors.slug}</p>
              )}
            </label>
          </div>

          <label className="space-y-2 text-sm font-medium text-[#4E342E]">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Short category description"
              className={inputClass(Boolean(errors.description))}
            />
            {errors.description && (
              <p className="text-xs text-[#B85C5C]">{errors.description}</p>
            )}
          </label>

          <label className="space-y-3">
            <span className="text-sm font-medium text-[#4E342E]">
              Category Image
            </span>
            <div className="flex items-center gap-3 rounded-2xl border border-[#E4D7C8] bg-[#FFFDFB] px-4 py-3">
              <label
                htmlFor="category-image"
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-[#D98B2B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c97818]"
              >
                <FiUpload size={18} />
                Browse
              </label>
              <span className="text-sm text-[#7A5C4D]">
                {formData.image ? formData.image.name : "Select an image file"}
              </span>
            </div>
            <input
              id="category-image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="sr-only"
            />
            {errors.image && (
              <p className="text-xs text-[#B85C5C]">{errors.image}</p>
            )}
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-[#E4D7C8] px-5 py-3 text-sm font-semibold text-[#4E342E] transition hover:bg-[#FFF4E6]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-2xl bg-[#4E342E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3E2723] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {submitting ? "Saving..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
