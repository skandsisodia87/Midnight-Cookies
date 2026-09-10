import { useMemo, useState } from "react";
import {
  FiTag,
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiPower,
} from "react-icons/fi";
import CouponHeader from "../../components/admin/coupons/CouponHeader";
import CouponToolbar from "../../components/admin/coupons/CouponToolbar";
import CouponStats from "../../components/admin/coupons/CouponStats";
import CouponTable from "../../components/admin/coupons/CouponTable";
import CouponMobileList from "../../components/admin/coupons/CouponMobileList";
import CouponEmptyState from "../../components/admin/coupons/CouponEmptyState";
import { getCouponStatus } from "../../components/admin/coupons/coupon.helper.jsx";
import CouponModal from "../../components/admin/coupons/CouponModal";
import DeleteDialog from "../../common/DeleteDialog";
import ErrorPage from "../../common/ErrorPage";
import CouponsSkeleton from "../../components/admin/coupons/CouponsSkeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteCouponById,
  getCoupons,
  toggleCouponStatus,
} from "../../services/admin.service";
import constants from "../../common/constants.js";

const Coupon = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [deleteCoupon, setDeleteCoupon] = useState(null);

  const { data, isError, isLoading } = useQuery({
    queryKey: [constants.COUPONS],
    queryFn: getCoupons,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  const coupons = data?.coupons || [];
  const stats = data?.stats || {};

  const { mutate: toggleStatus } = useMutation({
    mutationFn: toggleCouponStatus,
    onSuccess: (data) => {
      toast.success(data.message || "Coupon status updated successfully.");
      queryClient.invalidateQueries([constants.COUPONS]);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update coupon status.",
      );
    },
  });

  const { mutate: deleteCouponMutate } = useMutation({
    mutationFn: deleteCouponById,
    onSuccess: (data) => {
      toast.success(data.message || "Coupon deleted successfully.");
      queryClient.invalidateQueries([constants.COUPONS]);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete coupon.",
      );
    },
  });

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const matchesSearch = coupon.code
        .toLowerCase()
        .includes(search.toLowerCase());

      const status = getCouponStatus(coupon);

      const matchesStatus = statusFilter === "all" || status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [coupons, search, statusFilter]);

  if (isLoading) {
    return <CouponsSkeleton />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#FFF6EC] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <ErrorPage
            title="Unable to load coupons"
            message="There was an issue fetching coupons. Please refresh the page or try again later."
            buttonText="Go Back"
            redirectLink={constants.ROUTES.ADMIN.DASHBOARD}
          />
        </div>
      </div>
    );
  }

  const openCreateModal = () => {
    setEditingCoupon(null);
    setIsModalOpen(true);
  };

  const openEditModal = (coupon) => {
    setEditingCoupon(coupon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCoupon(null);
  };

  const handleToggleStatus = (id) => {
    toggleStatus(id);
  };

  const handleDelete = () => {
    if (!deleteCoupon?._id) return;
    deleteCouponMutate(deleteCoupon._id);
    setDeleteCoupon(null);
  };

  return (
    <div className="">
      <div className="mx-auto max-w-[90%]">
        <CouponHeader onCreate={openCreateModal} />

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <CouponStats
            title="Total Coupons"
            value={stats.totalCoupons}
            icon={<FiTag size={20} />}
          />

          <CouponStats
            title="Active Coupons"
            value={stats.activeCoupons}
            icon={<FiCheckCircle size={20} />}
          />

          <CouponStats
            title="Expired Coupons"
            value={stats.expiredCoupons}
            icon={<FiClock size={20} />}
          />

          <CouponStats
            title="Total Redemptions"
            value={stats.totalUsage}
            icon={<FiUsers size={20} />}
          />
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#F3E4D4] bg-white shadow-sm">
          <CouponToolbar
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          {filteredCoupons.length > 0 ? (
            <>
              <CouponTable
                coupons={filteredCoupons}
                openEditModal={openEditModal}
                handleToggleStatus={handleToggleStatus}
                setDeleteCoupon={setDeleteCoupon}
              />

              <CouponMobileList
                coupons={filteredCoupons}
                openEditModal={openEditModal}
                handleToggleStatus={handleToggleStatus}
                setDeleteCoupon={setDeleteCoupon}
              />
            </>
          ) : (
            <CouponEmptyState onCreate={openCreateModal} />
          )}
        </div>
      </div>

      <CouponModal
        isOpen={isModalOpen}
        editingCoupon={editingCoupon}
        closeModal={closeModal}
      />

      <DeleteDialog
        open={Boolean(deleteCoupon)}
        onClose={() => setDeleteCoupon(null)}
        onConfirm={handleDelete}
        title="Delete Coupon"
        message={`Are you sure you want to delete ${deleteCoupon?.code || "this coupon"}? This action cannot be undone.`}
        confirmLabel="Delete Coupon"
      />
    </div>
  );
};

export default Coupon;
