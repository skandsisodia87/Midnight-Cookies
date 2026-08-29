import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiUpload,
  FiPlus,
  FiTrash2,
  FiX,
  FiStar,
  FiCheck,
  FiInfo,
} from "react-icons/fi";
import { toast } from "sonner";
import {
  createAdminCookie,
  updateAdminCookie,
} from "../../../services/admin.service";
import constants from "../../../common/constants";

const inputClass = (hasError = false) =>
  `w-full rounded-2xl border ${
    hasError
      ? "border-[#E2A0A0] focus:border-[#B85C5C]"
      : "border-[#E4D7C8] focus:border-[#D98B2B]"
  } bg-[#FFFDFB] px-4 py-3 text-sm text-[#4E342E] outline-none transition placeholder:text-[#B7A49A] focus:ring-2 focus:ring-[#D98B2B]/10`;

const defaultVariant = {
  weight: "500g",
  price: 299,
  discountPrice: 249,
  stock: 20,
  isAvailable: true,
};

const initialForm = {
  name: "",
  slug: "",
  description: "",
  category: "",
  ingredients: ["Belgian Dark Chocolate", "Butter", "Brown Sugar", "Flour"],
  variants: [
    { weight: "250g", price: 199, discountPrice: 169, stock: 15, isAvailable: true },
    { weight: "500g", price: 349, discountPrice: 299, stock: 25, isAvailable: true },
  ],
  image: null,
  isFeatured: false,
  isActive: true,
};

const commonIngredientSuggestions = [
  "Belgian Dark Chocolate",
  "Dutch Cocoa",
  "Vanilla Extract",
  "Sea Salt",
  "Brown Butter",
  "Roasted Hazelnuts",
  "Walnuts",
  "Cane Sugar",
  "Marshmallows",
  "Caramel Drizzle",
];

const ProductModal = ({ isOpen, onClose, editingCookie, categories = [] }) => {
  if (!isOpen) return null;

  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(initialForm);
  const [ingredientInput, setIngredientInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingCookie) {
      setFormData({
        name: editingCookie.name || "",
        slug: editingCookie.slug || "",
        description: editingCookie.description || "",
        category:
          editingCookie.category?._id ||
          editingCookie.category ||
          categories[0]?._id ||
          "",
        ingredients: editingCookie.ingredients?.length
          ? [...editingCookie.ingredients]
          : ["Butter", "Flour", "Sugar"],
        variants: editingCookie.variants?.length
          ? editingCookie.variants.map((v) => ({
              _id: v._id,
              weight: v.weight || "",
              price: v.price ?? "",
              discountPrice: v.discountPrice ?? "",
              stock: v.stock ?? 0,
              isAvailable: v.isAvailable !== false,
            }))
          : [{ ...defaultVariant }],
        image: null,
        isFeatured: Boolean(editingCookie.isFeatured),
        isActive: editingCookie.isActive !== false,
      });
      setImagePreview(editingCookie.images?.[0]?.url || null);
    } else {
      setFormData({
        ...initialForm,
        category: categories[0]?._id || "",
      });
      setImagePreview(null);
    }
    setErrors({});
  }, [editingCookie, categories]);

  const { mutate: createCookieMutate, isPending: isCreating } = useMutation({
    mutationFn: createAdminCookie,
    onSuccess: (res) => {
      toast.success(res.message || "Cookie created successfully!");
      queryClient.invalidateQueries({ queryKey: [constants.ADMIN_PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [constants.DASHBOARD_DATA] });
      onClose();
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to create cookie.",
      );
    },
  });

  const { mutate: updateCookieMutate, isPending: isUpdating } = useMutation({
    mutationFn: updateAdminCookie,
    onSuccess: (res) => {
      toast.success(res.message || "Cookie updated successfully!");
      queryClient.invalidateQueries({ queryKey: [constants.ADMIN_PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [constants.DASHBOARD_DATA] });
      onClose();
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to update cookie.",
      );
    },
  });

  const handleTextChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  // Ingredients tag manager
  const handleAddIngredient = (ing) => {
    const val = (ing || ingredientInput).trim();
    if (!val) return;
    if (!formData.ingredients.includes(val)) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, val],
      }));
    }
    setIngredientInput("");
  };

  const handleRemoveIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  // Variant manager
  const handleVariantChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedVariants = [...prev.variants];
      updatedVariants[index] = {
        ...updatedVariants[index],
        [field]: value,
      };
      return { ...prev, variants: updatedVariants };
    });
  };

  const handleAddVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          weight: "1kg",
          price: 599,
          discountPrice: 499,
          stock: 10,
          isAvailable: true,
        },
      ],
    }));
  };

  const handleRemoveVariant = (index) => {
    if (formData.variants.length <= 1) {
      toast.error("A cookie must have at least one variant.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const errs = {};

    if (!formData.name.trim()) errs.name = "Cookie name is required.";
    if (!formData.description.trim())
      errs.description = "Description is required.";
    if (!formData.category.trim()) errs.category = "Category is required.";

    if (!editingCookie && !formData.image) {
      errs.image = "Cookie image is required for new products.";
    }

    if (!formData.ingredients.length) {
      errs.ingredients = "Add at least one ingredient.";
    }

    if (!formData.variants.length) {
      errs.variants = "Add at least one variant.";
    } else {
      formData.variants.forEach((v, idx) => {
        if (!v.weight?.trim()) {
          errs[`variant_${idx}_weight`] = "Weight is required";
        }
        if (v.price === "" || Number(v.price) < 0) {
          errs[`variant_${idx}_price`] = "Valid price required";
        }
        if (v.stock === "" || Number(v.stock) < 0) {
          errs[`variant_${idx}_stock`] = "Valid stock required";
        }
      });
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the form errors before submitting.");
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name.trim());
    payload.append("description", formData.description.trim());
    payload.append("category", formData.category.trim());
    payload.append("isFeatured", String(formData.isFeatured));
    payload.append("isActive", String(formData.isActive));
    payload.append("ingredients", JSON.stringify(formData.ingredients));
    payload.append("variants", JSON.stringify(formData.variants));

    if (formData.image) {
      payload.append("cookie_image", formData.image);
    }

    if (editingCookie) {
      updateCookieMutate({ id: editingCookie._id, formData: payload });
    } else {
      createCookieMutate(payload);
    }
  };

  const isSaving = isCreating || isUpdating;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D1B16]/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="my-8 w-full max-w-3xl overflow-hidden rounded-[32px] bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#F3E4D4] bg-[#FFFDFB] px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-[#4E342E]">
              {editingCookie ? "Edit Cookie Recipe" : "Add New Cookie Recipe"}
            </h2>
            <p className="text-xs text-[#8A7064]">
              {editingCookie
                ? "Update pricing, description, variants, and stock quantity."
                : "Fill in cookie details, weight variants, pricing, and initial stock."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#7A5C4D] hover:bg-[#FFF4E6] hover:text-[#4E342E] transition cursor-pointer"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-h-[78vh] overflow-y-auto p-6 space-y-6">
          {/* Section: General Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#A15C38]">
              1. General Details
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1.5 text-xs font-bold text-[#4E342E]">
                Cookie Name *
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleTextChange}
                  placeholder="e.g. Triple Belgian Chocolate Crunch"
                  className={inputClass(Boolean(errors.name))}
                />
                {errors.name && (
                  <p className="text-[11px] font-medium text-[#B85C5C]">
                    {errors.name}
                  </p>
                )}
              </label>

              <label className="space-y-1.5 text-xs font-bold text-[#4E342E]">
                Category *
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleTextChange}
                  className={inputClass(Boolean(errors.category))}
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                  {!categories.some((c) => c._id === formData.category) &&
                    formData.category && (
                      <option value={formData.category}>
                        {formData.category}
                      </option>
                    )}
                </select>
                {errors.category && (
                  <p className="text-[11px] font-medium text-[#B85C5C]">
                    {errors.category}
                  </p>
                )}
              </label>
            </div>

            <label className="block space-y-1.5 text-xs font-bold text-[#4E342E]">
              Description *
              <textarea
                name="description"
                value={formData.description}
                onChange={handleTextChange}
                rows={3}
                placeholder="Delicious handcrafted cookie with rich gooey chocolate center..."
                className={inputClass(Boolean(errors.description))}
              />
              {errors.description && (
                <p className="text-[11px] font-medium text-[#B85C5C]">
                  {errors.description}
                </p>
              )}
            </label>
          </div>

          {/* Section: Cookie Image */}
          <div className="space-y-3 border-t border-[#F6EBE0] pt-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#A15C38]">
              2. Product Image
            </h3>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#E4D7C8] bg-[#FFF8EF]">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center text-[#8A7064]">
                    <FiUpload size={24} className="mx-auto mb-1 text-[#D98B2B]" />
                    <span className="text-[10px]">No image</span>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-[#D98B2B] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#B57018] shadow-xs">
                  <FiUpload size={16} />
                  {imagePreview ? "Change Image" : "Upload Cookie Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <p className="text-xs text-[#8A7064]">
                  Recommended: High-resolution square PNG or JPG, max 5MB.
                </p>
                {errors.image && (
                  <p className="text-[11px] font-medium text-[#B85C5C]">
                    {errors.image}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section: Ingredients Manager */}
          <div className="space-y-3 border-t border-[#F6EBE0] pt-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#A15C38]">
              3. Ingredients
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddIngredient();
                  }
                }}
                placeholder="Type ingredient (e.g. Sea Salt) and press enter"
                className={inputClass()}
              />
              <button
                type="button"
                onClick={() => handleAddIngredient()}
                className="shrink-0 rounded-2xl bg-[#FFF8EF] border border-[#E4D7C8] px-4 text-xs font-bold text-[#8A5A36] hover:bg-[#FFEECF] transition cursor-pointer"
              >
                + Add
              </button>
            </div>

            {/* Current tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {formData.ingredients.map((ing, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E8D6C6] bg-[#FFF8EF] px-3 py-1 text-xs font-medium text-[#8A5A36]"
                >
                  {ing}
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="hover:text-[#B85C5C] text-[#A89284] cursor-pointer"
                  >
                    <FiX size={13} />
                  </button>
                </span>
              ))}
            </div>

            {/* Quick Suggestions */}
            <div className="pt-1">
              <p className="text-[11px] font-semibold text-[#8A7064] mb-1.5">
                Quick additions:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {commonIngredientSuggestions.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => handleAddIngredient(sug)}
                    className="rounded-lg border border-[#F2D8BE] bg-white px-2 py-0.5 text-[10px] text-[#8A5A36] hover:bg-[#FFF7EC] transition cursor-pointer"
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Cookie Variants & Stock */}
          <div className="space-y-4 border-t border-[#F6EBE0] pt-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#A15C38]">
                  4. Variants & Quantity (Stock)
                </h3>
                <p className="text-xs text-[#8A7064]">
                  Set weights (e.g. 250g, 500g, 1kg), price, discount price, and inventory stock.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddVariant}
                className="inline-flex items-center gap-1.5 rounded-2xl bg-[#FFF8EF] border border-[#D98B2B] px-3.5 py-2 text-xs font-bold text-[#A15C38] hover:bg-[#FFEECF] transition cursor-pointer"
              >
                <FiPlus size={14} />
                Add Variant
              </button>
            </div>

            <div className="space-y-3">
              {formData.variants.map((variant, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl border border-[#F3E4D4] bg-[#FFFDFB] p-4 shadow-2xs"
                >
                  <div className="grid gap-3 sm:grid-cols-4">
                    {/* Weight */}
                    <label className="space-y-1 text-xs font-bold text-[#4E342E]">
                      Weight / Size *
                      <input
                        type="text"
                        value={variant.weight}
                        onChange={(e) =>
                          handleVariantChange(index, "weight", e.target.value)
                        }
                        placeholder="e.g. 500g"
                        className={inputClass(
                          Boolean(errors[`variant_${index}_weight`]),
                        )}
                      />
                    </label>

                    {/* Price */}
                    <label className="space-y-1 text-xs font-bold text-[#4E342E]">
                      Price (₹) *
                      <input
                        type="number"
                        min="0"
                        value={variant.price}
                        onChange={(e) =>
                          handleVariantChange(index, "price", e.target.value)
                        }
                        placeholder="299"
                        className={inputClass(
                          Boolean(errors[`variant_${index}_price`]),
                        )}
                      />
                    </label>

                    {/* Discount Price */}
                    <label className="space-y-1 text-xs font-bold text-[#4E342E]">
                      Discount Price (₹)
                      <input
                        type="number"
                        min="0"
                        value={variant.discountPrice}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "discountPrice",
                            e.target.value,
                          )
                        }
                        placeholder="249"
                        className={inputClass()}
                      />
                    </label>

                    {/* Stock */}
                    <label className="space-y-1 text-xs font-bold text-[#4E342E]">
                      Stock Qty *
                      <input
                        type="number"
                        min="0"
                        value={variant.stock}
                        onChange={(e) =>
                          handleVariantChange(index, "stock", e.target.value)
                        }
                        placeholder="20"
                        className={inputClass(
                          Boolean(errors[`variant_${index}_stock`]),
                        )}
                      />
                    </label>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-[#F6EBE0] pt-2.5">
                    <label className="flex items-center gap-2 text-xs font-medium text-[#7A5C4D] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={variant.isAvailable}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "isAvailable",
                            e.target.checked,
                          )
                        }
                        className="rounded accent-[#5F8D4E]"
                      />
                      Available for Ordering
                    </label>

                    {formData.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveVariant(index)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#B85C5C] hover:text-[#991B1B] transition cursor-pointer"
                      >
                        <FiTrash2 size={13} />
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Publishing Settings */}
          <div className="space-y-3 border-t border-[#F6EBE0] pt-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#A15C38]">
              5. Storefront Settings
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Active Toggle */}
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#F3E4D4] bg-[#FFFDFB] p-4">
                <div>
                  <p className="text-sm font-bold text-[#4E342E]">
                    Active on Store
                  </p>
                  <p className="text-xs text-[#8A7064]">
                    Display cookie on public catalog
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleTextChange}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-[#D8C9C0] transition peer-checked:bg-[#5F8D4E]" />
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-xs transition peer-checked:translate-x-5" />
                </div>
              </label>

              {/* Featured Toggle */}
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#F3E4D4] bg-[#FFFDFB] p-4">
                <div>
                  <p className="text-sm font-bold text-[#4E342E]">
                    Featured Cookie
                  </p>
                  <p className="text-xs text-[#8A7064]">
                    Highlight on homepage carousel
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleTextChange}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-[#D8C9C0] transition peer-checked:bg-[#D98B2B]" />
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-xs transition peer-checked:translate-x-5" />
                </div>
              </label>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#F3E4D4] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-2xl border border-[#E4D7C8] px-6 py-3 text-sm font-bold text-[#4E342E] transition hover:bg-[#FFF4E6] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#4E342E] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#3E2723] disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? (
                <span>Saving...</span>
              ) : editingCookie ? (
                <span>Update Cookie</span>
              ) : (
                <span>Create Cookie</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
