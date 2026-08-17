import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";
import DeleteDialog from "../../common/DeleteDialog";
import ErrorPage from "../../common/ErrorPage";
import EmptyState from "../../common/EmptyState";
import CategoryModal from "../../components/admin/categories/CategoryModal";
import CategoryCard from "../../components/admin/categories/CategoryCard";
import CategoriesSkeleton from "../../components/admin/categories/CategoriesSkeleton";
import {
  deleteCategoryById,
  getCategories,
} from "../../services/admin.service";
import constants from "../../common/constants";

const Categories = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [constants.ADMIN_CATEGORIES],
    queryFn: getCategories,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  const categories = data?.categories || [];

  const { mutate: removeCategory, isPending: isDeleting } = useMutation({
    mutationFn: deleteCategoryById,
    onSuccess: (response) => {
      toast.success(response.message || "Category deleted successfully.");
      queryClient.invalidateQueries([constants.ADMIN_CATEGORIES]);
      setDeleteCategory(null);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete category.",
      );
    },
  });

  const confirmDelete = () => {
    if (!deleteCategory) return;
    removeCategory(deleteCategory._id);
  };

  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  if (isError) {
    return (
      <div className="min-h-screen px-4 py-12 bg-[#FFF6EC]">
        <div className="max-w-4xl mx-auto">
          <ErrorPage
            title="Unable to load categories"
            message="There was an issue fetching categories. Please refresh the page or try again later."
            buttonText={constants.BACK_TO_DASHBOARD}
            redirectLink={constants.ROUTES.ADMIN.DASHBOARD}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-[#F3E4D4] bg-linear-to-r from-[#FFF7EC] via-white to-[#FFFDF8] p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#4E342E]">Categories</h1>
            <p className="mt-2 max-w-2xl text-sm text-[#7A5C4D] sm:text-base">
              Organize your cookie collection by category and keep your
              storefront easy to browse.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#4E342E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3E2723] cursor-pointer"
            >
              <FiPlus size={18} />
              Add category
            </button>

            <div className="inline-flex items-center gap-3 rounded-full border border-[#F2D8BE] bg-[#FFF8EF] px-4 py-2 text-sm font-medium text-[#A15C38]">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#D98B2B]/10 text-[#D98B2B]">
                {categories.length}
              </span>
              {categories.length} category{categories.length === 1 ? "" : "ies"}
            </div>
          </div>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="min-h-[60vh] px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <EmptyState
              icon="🗂️"
              title="No categories yet"
              message="Add your first category to organize your store."
              buttonText="Add category"
              onButtonClick={() => setIsModalOpen(true)}
              className="max-w-xl mx-auto"
            />
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              onDelete={setDeleteCategory}
              onEdit={(category) => {
                setEditingCategory(category);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        editingCategory={editingCategory}
      />

      <DeleteDialog
        open={Boolean(deleteCategory)}
        onClose={() => setDeleteCategory(null)}
        onConfirm={confirmDelete}
        title="Delete Category"
        message={`Are you sure you want to delete the "${deleteCategory?.name}" category? This action cannot be undone.`}
        confirmLabel={isDeleting ? "Deleting..." : "Delete"}
        loading={isDeleting}
      />
    </div>
  );
};

export default Categories;
