import {
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiPower,
  FiXCircle,
} from "react-icons/fi";

const today = new Date();

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

export const getCouponStatus = (coupon) => {
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

export const renderStatus = (coupon) => {
  const status = config[getCouponStatus(coupon)];

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

export const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getDiscountText = (coupon) => {
  if (coupon.discountType === "percentage") {
    return `${coupon.discountValue}%`;
  }

  return `₹${coupon.discountValue}`;
};
