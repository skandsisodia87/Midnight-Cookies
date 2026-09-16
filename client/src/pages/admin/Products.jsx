import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import DeleteDialog from "../../common/DeleteDialog";
import ErrorPage from "../../common/ErrorPage";
import constants from "../../common/constants";
import {
  getAdminCookies,
  getCategories,
  deleteAdminCookie,
  toggleAdminCookieStatus,
  toggleAdminCookieFeatured,
  updateAdminVariantStock,
} from "../../services/admin.service";

import ProductHeader from "../../components/admin/products/ProductHeader";
import ProductStats from "../../components/admin/products/ProductStats";
import ProductToolbar from "../../components/admin/products/ProductToolbar";
import ProductTable from "../../components/admin/products/ProductTable";
import ProductCardGrid from "../../components/admin/products/ProductCardGrid";
import ProductModal from "../../components/admin/products/ProductModal";
import QuickStockModal from "../../components/admin/products/QuickStockModal";
import ProductDetailsModal from "../../components/admin/products/ProductDetailsModal";
import ProductsSkeleton from "../../components/admin/products/ProductsSkeleton";
import ProductEmptyState from "../../components/admin/products/ProductEmptyState";

const Products = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCookie, setEditingCookie] = useState(null);
  const [selectedDetailsCookie, setSelectedDetailsCookie] = useState(null);
  const [selectedStockCookie, setSelectedStockCookie] = useState(null);
  const [deleteCookie, setDeleteCookie] = useState(null);

  // Fetch Cookies
  const {
    data: cookiesData,
    isLoading: isCookiesLoading,
    isError: isCookiesError,
    refetch: refetchCookies,
    isRefetching,
  } = useQuery({
    queryKey: [constants.ADMIN_PRODUCTS],
    queryFn: () => getAdminCookies(),
    staleTime: 60 * 1000,
  });

  // Fetch Categories for dropdowns
  const { data: categoriesData } = useQuery({
    queryKey: [constants.ADMIN_CATEGORIES],
    queryFn: getCategories,
    staleTime: 60 * 60 * 1000,
  });

  const cookies = cookiesData?.cookies || cookiesData?.data || [];
  const stats = cookiesData?.stats || {};
  const categories = categoriesData?.categories || [];

  // Mutation: Delete Cookie
  const { mutate: removeCookie, isPending: isDeleting } = useMutation({
    mutationFn: deleteAdminCookie,
    onSuccess: (res) => {
      toast.success(res.message || "Cookie deleted successfully.");
      queryClient.invalidateQueries({ queryKey: [constants.ADMIN_PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [constants.DASHBOARD_DATA] });
      setDeleteCookie(null);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete cookie.",
      );
    },
  });

  // Mutation: Toggle Active Status
  const { mutate: toggleStatus } = useMutation({
    mutationFn: toggleAdminCookieStatus,
    onSuccess: (res) => {
      toast.success(res.message || "Status updated.");
      queryClient.invalidateQueries({ queryKey: [constants.ADMIN_PRODUCTS] });
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to toggle status.",
      );
    },
  });

  // Mutation: Toggle Featured Status
  const { mutate: toggleFeatured } = useMutation({
    mutationFn: toggleAdminCookieFeatured,
    onSuccess: (res) => {
      toast.success(res.message || "Featured status updated.");
      queryClient.invalidateQueries({ queryKey: [constants.ADMIN_PRODUCTS] });
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to toggle featured status.",
      );
    },
  });

  // Mutation: Inline Fast Variant Stock Update
  const { mutate: updateStock, isPending: isUpdatingStock } = useMutation({
    mutationFn: updateAdminVariantStock,
    onMutate: async ({ variantId, change, stock }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [constants.ADMIN_PRODUCTS],
      });

      // Snapshot previous value
      const previousData = queryClient.getQueryData([constants.ADMIN_PRODUCTS]);

      // Optimistically update cache
      if (previousData?.cookies) {
        const updatedCookies = previousData.cookies.map((c) => {
          const updatedVariants = (c.variants || []).map((v) => {
            if (v._id === variantId) {
              const newStock =
                change !== undefined
                  ? Math.max(0, (v.stock || 0) + change)
                  : Math.max(0, stock);
              return {
                ...v,
                stock: newStock,
                isAvailable: newStock > 0,
              };
            }
            return v;
          });
          const totalStock = updatedVariants.reduce(
            (sum, v) => sum + (v.stock || 0),
            0,
          );
          return {
            ...c,
            variants: updatedVariants,
            totalStock,
          };
        });

        queryClient.setQueryData([constants.ADMIN_PRODUCTS], {
          ...previousData,
          cookies: updatedCookies,
        });
      }

      return { previousData };
    },
    onSuccess: (res) => {
      toast.success(res.message || "Stock quantity updated.");
      queryClient.invalidateQueries({ queryKey: [constants.DASHBOARD_DATA] });
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [constants.ADMIN_PRODUCTS],
          context.previousData,
        );
      }
      toast.error(
        err.response?.data?.message || err.message || "Failed to update stock.",
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [constants.ADMIN_PRODUCTS] });
    },
  });

  // Filter and Search processing
  const filteredCookies = useMemo(() => {
    return cookies.filter((cookie) => {
      // Search
      const term = search.toLowerCase().trim();
      const catName =
        cookie.category?.name ||
        (typeof cookie.category === "string" ? cookie.category : "");
      const matchesSearch =
        !term ||
        cookie.name?.toLowerCase().includes(term) ||
        cookie.slug?.toLowerCase().includes(term) ||
        catName.toLowerCase().includes(term) ||
        cookie.ingredients?.some((ing) => ing.toLowerCase().includes(term));

      // Category
      const catId = cookie.category?._id || cookie.category;
      const matchesCategory =
        categoryFilter === "all" ||
        catId === categoryFilter ||
        catName.toLowerCase() === categoryFilter.toLowerCase();

      // Status
      let matchesStatus = true;
      if (statusFilter === "active") matchesStatus = cookie.isActive === true;
      if (statusFilter === "inactive")
        matchesStatus = cookie.isActive === false;
      if (statusFilter === "featured")
        matchesStatus = cookie.isFeatured === true;

      // Stock
      let matchesStock = true;
      const totalStock = (cookie.variants || []).reduce(
        (sum, v) => sum + (v.stock || 0),
        0,
      );
      if (stockFilter === "in_stock") matchesStock = totalStock > 5;
      if (stockFilter === "low_stock")
        matchesStock = totalStock > 0 && totalStock <= 5;
      if (stockFilter === "out_of_stock") matchesStock = totalStock === 0;

      return matchesSearch && matchesCategory && matchesStatus && matchesStock;
    });
  }, [cookies, search, categoryFilter, statusFilter, stockFilter]);

  // Actions
  const handleOpenCreate = () => {
    setEditingCookie(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cookie) => {
    setEditingCookie(cookie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCookie(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteCookie?._id) return;
    removeCookie(deleteCookie._id);
  };

  if (isCookiesLoading) {
    return <ProductsSkeleton />;
  }

  if (isCookiesError) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <ErrorPage
          title="Unable to load products"
          message="We encountered an issue while fetching your cookies catalog. Please check your connection and try again."
          buttonText="Retry"
          onButtonClick={() => refetchCookies()}
        />
      </div>
    );
  }

  const isFiltered =
    Boolean(search) ||
    categoryFilter !== "all" ||
    stockFilter !== "all" ||
    statusFilter !== "all";

  return (
    <div className="space-y-6 pb-5">
      <ProductHeader
        onAddProduct={handleOpenCreate}
        totalCount={cookies.length}
        isRefetching={isRefetching}
        onRefresh={() => refetchCookies()}
      />

      <ProductStats stats={stats} />

      <div className="overflow-hidden rounded-[28px] border border-[#F3E4D4] bg-white shadow-sm">
        <ProductToolbar
          search={search}
          setSearch={setSearch}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          categories={categories}
          totalFiltered={filteredCookies.length}
        />

        {/* Content View: Table / Grid / Empty State */}
        {filteredCookies.length > 0 ? (
          viewMode === "table" ? (
            <ProductTable
              cookies={filteredCookies}
              onEdit={handleOpenEdit}
              onDelete={setDeleteCookie}
              onViewDetails={setSelectedDetailsCookie}
              onQuickStock={setSelectedStockCookie}
              onToggleStatus={(id) => toggleStatus(id)}
              onToggleFeatured={(id) => toggleFeatured(id)}
              onUpdateVariantStock={updateStock}
              isUpdatingStock={isUpdatingStock}
            />
          ) : (
            <ProductCardGrid
              cookies={filteredCookies}
              onEdit={handleOpenEdit}
              onDelete={setDeleteCookie}
              onViewDetails={setSelectedDetailsCookie}
              onQuickStock={setSelectedStockCookie}
              onToggleStatus={(id) => toggleStatus(id)}
              onToggleFeatured={(id) => toggleFeatured(id)}
              onUpdateVariantStock={updateStock}
              isUpdatingStock={isUpdatingStock}
            />
          )
        ) : (
          <ProductEmptyState
            onAddProduct={handleOpenCreate}
            isFiltered={isFiltered}
            onResetFilters={() => {
              setSearch("");
              setCategoryFilter("all");
              setStockFilter("all");
              setStatusFilter("all");
            }}
          />
        )}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingCookie={editingCookie}
        categories={categories}
      />

      <QuickStockModal
        isOpen={Boolean(selectedStockCookie)}
        onClose={() => setSelectedStockCookie(null)}
        cookie={selectedStockCookie}
      />

      <ProductDetailsModal
        isOpen={Boolean(selectedDetailsCookie)}
        onClose={() => setSelectedDetailsCookie(null)}
        cookie={selectedDetailsCookie}
        onEdit={handleOpenEdit}
        onQuickStock={setSelectedStockCookie}
      />

      <DeleteDialog
        open={Boolean(deleteCookie)}
        onClose={() => setDeleteCookie(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Cookie Recipe"
        message={`Are you sure you want to delete "${deleteCookie?.name}"? This will permanently delete the cookie recipe, its images, and all linked weight variants.`}
        confirmLabel={isDeleting ? "Deleting..." : "Delete Cookie"}
        loading={isDeleting}
      />
    </div>
  );
};

export default Products;
