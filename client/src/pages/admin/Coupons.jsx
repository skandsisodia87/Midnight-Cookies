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
import CouponModal from "../../components/admin/coupons/CouponModal";
import DeleteDialog from "../../common/DeleteDialog";

const initialCoupons = [
  {
    _id: "1",
    code: "WELCOME10",
    discountType: "percentage",
    discountValue: 10,
    minimumOrderAmount: 499,
    maximumDiscount: 200,
    usageLimit: 100,
    usedCount: 42,
    startDate: "2026-08-01",
    expiryDate: "2026-08-31",
    isActive: true,
  },
  {
    _id: "2",
    code: "COOKIE50",
    discountType: "fixed",
    discountValue: 50,
    minimumOrderAmount: 599,
    maximumDiscount: null,
    usageLimit: 50,
    usedCount: 18,
    startDate: "2026-08-05",
    expiryDate: "2026-08-20",
    isActive: true,
  },
  {
    _id: "3",
    code: "MIDNIGHT20",
    discountType: "percentage",
    discountValue: 20,
    minimumOrderAmount: 999,
    maximumDiscount: 300,
    usageLimit: 200,
    usedCount: 200,
    startDate: "2026-07-01",
    expiryDate: "2026-07-31",
    isActive: false,
  },
  {
    _id: "4",
    code: "SWEET100",
    discountType: "fixed",
    discountValue: 100,
    minimumOrderAmount: 799,
    maximumDiscount: null,
    usageLimit: 100,
    usedCount: 64,
    startDate: "2026-08-01",
    expiryDate: "2026-09-15",
    isActive: true,
  },
];

const emptyCoupon = {
  code: "",
  discountType: "percentage",
  discountValue: "",
  minimumOrderAmount: "",
  maximumDiscount: "",
  usageLimit: "",
  startDate: "",
  expiryDate: "",
  isActive: true,
};

const Coupon = () => {
  const [coupons, setCoupons] = useState(initialCoupons);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState(emptyCoupon);

  const [deleteCoupon, setDeleteCoupon] = useState(null);

  const [errors, setErrors] = useState({});

  const today = new Date();

  const getCouponStatus = (coupon) => {
    const expiryDate = new Date(coupon.expiryDate);
    const startDate = new Date(coupon.startDate);

    if (!coupon.isActive) {
      return "inactive";
    }

    if (expiryDate < today) {
      return "expired";
    }

    if (startDate > today) {
      return "scheduled";
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return "limit-reached";
    }

    return "active";
  };

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

  const stats = useMemo(() => {
    return {
      total: coupons.length,

      active: coupons.filter((coupon) => getCouponStatus(coupon) === "active")
        .length,

      expired: coupons.filter((coupon) => getCouponStatus(coupon) === "expired")
        .length,

      redemptions: coupons.reduce(
        (total, coupon) => total + coupon.usedCount,
        0,
      ),
    };
  }, [coupons]);

  const openCreateModal = () => {
    setEditingCoupon(null);
    setFormData(emptyCoupon);
    setErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (coupon) => {
    setEditingCoupon(coupon);

    setFormData({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minimumOrderAmount: coupon.minimumOrderAmount,
      maximumDiscount: coupon.maximumDiscount || "",
      usageLimit: coupon.usageLimit,
      startDate: coupon.startDate,
      expiryDate: coupon.expiryDate,
      isActive: coupon.isActive,
    });

    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCoupon(null);
    setFormData(emptyCoupon);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = "Coupon code is required.";
    }

    if (!formData.discountValue) {
      newErrors.discountValue = "Discount value is required.";
    } else if (Number(formData.discountValue) <= 0) {
      newErrors.discountValue = "Enter a valid discount.";
    }

    if (
      formData.discountType === "percentage" &&
      Number(formData.discountValue) > 100
    ) {
      newErrors.discountValue = "Percentage cannot be greater than 100.";
    }

    if (!formData.minimumOrderAmount) {
      newErrors.minimumOrderAmount = "Minimum order amount is required.";
    }

    if (!formData.usageLimit) {
      newErrors.usageLimit = "Usage limit is required.";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required.";
    }

    if (
      formData.startDate &&
      formData.expiryDate &&
      new Date(formData.expiryDate) < new Date(formData.startDate)
    ) {
      newErrors.expiryDate = "Expiry date must be after start date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const couponData = {
      ...formData,
      code: formData.code.trim().toUpperCase(),
      discountValue: Number(formData.discountValue),
      minimumOrderAmount: Number(formData.minimumOrderAmount),
      maximumDiscount:
        formData.maximumDiscount === ""
          ? null
          : Number(formData.maximumDiscount),
      usageLimit: Number(formData.usageLimit),
    };

    if (editingCoupon) {
      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon._id === editingCoupon._id
            ? {
                ...coupon,
                ...couponData,
              }
            : coupon,
        ),
      );
    } else {
      const newCoupon = {
        _id: Date.now().toString(),
        ...couponData,
        usedCount: 0,
      };

      setCoupons((prev) => [newCoupon, ...prev]);
    }

    closeModal();
  };

  const handleToggleStatus = (id) => {
    setCoupons((prev) =>
      prev.map((coupon) =>
        coupon._id === id
          ? {
              ...coupon,
              isActive: !coupon.isActive,
            }
          : coupon,
      ),
    );
  };

  const handleDelete = () => {
    if (!deleteCoupon) return;

    setCoupons((prev) =>
      prev.filter((coupon) => coupon._id !== deleteCoupon._id),
    );

    setDeleteCoupon(null);
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDiscountText = (coupon) => {
    if (coupon.discountType === "percentage") {
      return `${coupon.discountValue}%`;
    }

    return `₹${coupon.discountValue}`;
  };

  const getStatusConfig = (coupon) => {
    const status = getCouponStatus(coupon);

    const config = {
      active: {
        label: "Active",
        className: "bg-[#EEF7EA] text-[#5F8D4E] border-[#D6E8CE]",
      },
      inactive: {
        label: "Inactive",
        className: "bg-gray-100 text-gray-600 border-gray-200",
      },
      expired: {
        label: "Expired",
        className: "bg-[#FFF0F0] text-[#B85C5C] border-[#F1D2D2]",
      },
      scheduled: {
        label: "Scheduled",
        className: "bg-[#FFF7E8] text-[#B7791F] border-[#F1DFB8]",
      },
      "limit-reached": {
        label: "Limit Reached",
        className: "bg-[#FFF0F0] text-[#B85C5C] border-[#F1D2D2]",
      },
    };

    return config[status];
  };

  const renderStatus = (coupon) => {
    const status = getStatusConfig(coupon);

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
      >
        {status.label === "Active" && <FiCheckCircle size={13} />}

        {status.label === "Expired" && <FiXCircle size={13} />}

        {status.label === "Inactive" && <FiPower size={13} />}

        {status.label === "Scheduled" && <FiClock size={13} />}

        {status.label === "Limit Reached" && <FiAlertTriangle size={13} />}

        {status.label}
      </span>
    );
  };

  return (
    <div className="">
      <div className="mx-auto max-w-7xl">
        <CouponHeader onCreate={openCreateModal} />

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <CouponStats
            title="Total Coupons"
            value={stats.total}
            icon={<FiTag size={20} />}
          />

          <CouponStats
            title="Active Coupons"
            value={stats.active}
            icon={<FiCheckCircle size={20} />}
          />

          <CouponStats
            title="Expired Coupons"
            value={stats.expired}
            icon={<FiClock size={20} />}
          />

          <CouponStats
            title="Total Redemptions"
            value={stats.redemptions}
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
                renderStatus={renderStatus}
                getDiscountText={getDiscountText}
                formatDate={formatDate}
              />

              <CouponMobileList
                coupons={filteredCoupons}
                openEditModal={openEditModal}
                handleToggleStatus={handleToggleStatus}
                setDeleteCoupon={setDeleteCoupon}
                renderStatus={renderStatus}
                getDiscountText={getDiscountText}
                formatDate={formatDate}
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
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
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
