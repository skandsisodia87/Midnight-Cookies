import api from "./axios";

const transformDashboardData = (data) => {
  try {
    if (!data || Object.keys(data).length == 0) {
      return {
        success: false,
        data: {},
        message: "No data found",
      };
    }
    const tempData = {};

    tempData.welcomeCard = {
      sales: data.todaySales || 0,
      usersEnrolledToday: data.usersEnrolledToday || 0,
    };

    tempData.dashboardStats = {
      customers: data.totalCustomers || 0,
      orders: data.totalOrders || 0,
      revenue: data.totalRevenue || 0,
      products: data.totalProducts || 0,
    };

    tempData.SalesChart = {};

    tempData.orderStats = {
      Cancelled: data.cancelledOrders || 0,
      Delivered: data.deliveredOrders || 0,
      Shipped: data.shippedOrders || 0,
      Baking: data.bakingOrders || 0,
      Confirmed: data.confirmedOrders || 0,
      Placed: data.placedOrders || 0,
    };

    tempData.recentOrders = data.recentOrders;

    tempData.topSellingProducts = data.topSellingProducts;
    tempData.lowStockProducts = data.lowStockProducts;

    return {
      success: true,
      data: tempData,
      message: null,
    };
  } catch (error) {
    return {
      success: false,
      data: {},
      message: `Transform Data Error: ${error.message}`,
    };
  }
};

export const getDashboard = async () => {
  const response = await api.get("/admin/dashboard");
  return transformDashboardData(response.data?.data);
};

export const getCustomers = async () => {
  const response = await api.get("/admin/customers");
  return response.data;
};

export const getOrders = async () => {
  const response = await api.post("/admin/orders", {});
  return response.data;
};

export const getCoupons = async () => {
  const response = await api.get("/admin/coupons");
  return response.data;
};

export const saveCoupon = async ({ formData, couponId = null }) => {
  const transformedData = {
    ...formData,
    discountValue: Number(formData.discountValue),
    minimumOrderAmount: Number(formData.minimumOrderAmount),
    maximumDiscount:
      formData.maximumDiscount === "" ? null : Number(formData.maximumDiscount),
    usageLimit: Number(formData.usageLimit),
  };

  if (couponId) {
    delete transformedData.code;
  } else {
    transformedData.code = formData.code.trim().toUpperCase();
  }

  const response = couponId
    ? await api.patch(`/admin/coupons/${couponId}`, transformedData)
    : await api.post("/admin/coupons", transformedData);

  return response.data;
};

export const toggleCouponStatus = async (couponId) => {
  const response = await api.patch(`/admin/coupons/${couponId}/status`);
  return response.data;
};

export const deleteCouponById = async (couponId) => {
  const response = await api.delete(`/admin/coupons/${couponId}`);
  return response.data;
};
