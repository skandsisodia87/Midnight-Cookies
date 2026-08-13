import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FiUpload } from "react-icons/fi";
import { toast } from "sonner";
import {
  createCategory,
  updateCategory,
} from "../../../services/admin.service";
import { useEffect, useState } from "react";

const inputClass = (hasError = false) =>
  `w-full rounded-2xl border ${
    hasError
      ? "border-[#E2A0A0] focus:border-[#D98B2B]"
      : "border-[#E4D7C8] focus:border-[#D98B2B]"
  } bg-[#FFFDFB] px-4 py-3 text-sm text-[#4E342E] outline-none transition placeholder:text-[#B7A49A] focus:ring-2 focus:ring-[#D98B2B]/10`;

const initialForm = {
  name: "",
  slug: "",
  description: "",
  image: null,
};

const CategoryModal = ({ isOpen, onClose, editingCategory }) => {
  if (!isOpen) return null;
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        slug: editingCategory.slug,
        description: editingCategory.description,
        isActive: editingCategory.isActive,
        image: null,
      });
    } else {
      setFormData(initialForm);
      setErrors({});
    }
  }, [editingCategory]);

  const reset = () => {
    queryClient.invalidateQueries(["admin-categories"]);
    onClose();
    setFormData(initialForm);
    setErrors({});
  };

  const { mutate: addCategory, isPending: isCreating } = useMutation({
    mutationFn: createCategory,
    onSuccess: (response) => {
      toast.success(response.message || "Category created successfully.");
      reset();
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create category.",
      );
    },
  });

  const { mutate: editCategory, isPending: isUpdating } = useMutation({
    mutationFn: updateCategory,
    onSuccess: (response) => {
      toast.success(response.message || "Category updated successfully.");
      reset();
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update category.",
      );
    },
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const validateForm = ({ imageRequired }) => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required.";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug =
        "Slug can only contain lowercase letters, numbers, and hyphens.";
    }

    if (imageRequired && !formData.image) {
      newErrors.image = "Category image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!validateForm({ imageRequired: editingCategory === null })) {
      return;
    }

    if (editingCategory === null) {
      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("slug", formData.slug.trim());
      payload.append("description", formData.description.trim());
      payload.append("category_image", formData.image);

      addCategory(payload);
    } else {
      editCategory({ categoryId: editingCategory._id, payload: formData });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D1B16]/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-4xl bg-white shadow-2xl">
        <div className="flex flex-col gap-2 border-b border-[#F3E4D4] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#4E342E]">
              {editingCategory ? "Edit Category" : "Create Category"}
            </h2>
            <p className="text-sm text-[#7A5C4D]">
              {editingCategory
                ? "Update category for your store."
                : "Add a new category for your store."}
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

          {!editingCategory ? (
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
                  {formData.image
                    ? formData.image.name
                    : "Select an image file"}
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
          ) : (
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#F3E4D4] bg-[#FFFDFB] p-4">
              <div>
                <p className="text-sm font-semibold text-[#4E342E]">
                  Active Category
                </p>
                <p className="mt-0.5 text-xs text-[#8A7064]">
                  Display this category on your storefront.
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
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-[#E4D7C8] px-5 py-3 text-sm font-semibold text-[#4E342E] transition hover:bg-[#FFF4E6]"
            >
              Cancel
            </button>
            {editingCategory ? (
              <button
                type="submit"
                disabled={isUpdating}
                className="rounded-2xl bg-[#4E342E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3E2723] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {isUpdating ? "Updating..." : "Update Category"}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isCreating}
                className="rounded-2xl bg-[#4E342E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3E2723] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {isCreating ? "Creating..." : "Create Category"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
