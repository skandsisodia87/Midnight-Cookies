import constants from "../common/constants";
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
      [constants.CUSTOMERS]: data.totalCustomers || 0,
      orders: data.totalOrders || 0,
      revenue: data.totalRevenue || 0,
      [constants.PRODUCTS]: data.totalProducts || 0,
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

export const getAnalytics = async () => {
  const response = await api.get("/admin/analytics");
  return response.data;
};

export const getCustomers = async () => {
  const response = await api.get("/admin/customers");
  return response.data;
};

export const getOrders = async () => {
  const response = await api.post("/admin/orders", {});
  return response.data;
};

export const getAdminOrder = async (orderId) => {
  const response = await api.get(`/admin/orders/${orderId}`);
  return response.data;
};

export const updateAdminOrder = async ({ orderId, payload }) => {
  const response = await api.patch(`/admin/orders/${orderId}`, payload);
  return response.data;
};

export const getDeliveryAgents = async () => {
  const response = await api.get("/admin/delivery-agents");
  return response.data;
};

export const createDeliveryAgent = async (payload) => {
  const response = await api.post("/admin/delivery-agents", payload);
  return response.data;
};

export const updateDeliveryAgent = async ({ agentId, payload }) => {
  const response = await api.patch(
    `/admin/delivery-agents/${agentId}`,
    payload,
  );
  return response.data;
};

export const deleteDeliveryAgent = async (agentId) => {
  const response = await api.delete(`/admin/delivery-agents/${agentId}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/admin/categories");
  return response.data;
};

export const createCategory = async (formData) => {
  const response = await api.post("/admin/categories", formData);
  return response.data;
};

export const updateCategory = async ({ categoryId, payload }) => {
  const { image, ...updatePayload } = payload;

  const response = await api.patch(
    `/admin/categories/${categoryId}`,
    updatePayload,
  );

  return response.data;
};

export const deleteCategoryById = async (categoryId) => {
  const response = await api.delete(`/admin/categories/${categoryId}`);
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

export const getSubscribers = async () => {
  const response = await api.post(`/admin/newsletter`, {});
  return response.data.data;
};

export const sendNewsletter = async (payload) => {
  const response = await api.post("/admin/newsletter/send", payload);
  return response.data;
};

export const removeSubscriber = async (id) => {
  const response = await api.delete(`/admin/newsletter/${id}`);
  return response.data;
};

// Admin Products (Cookies & Variants)
export const getAdminCookies = async (params = {}) => {
  const response = await api.post("/admin/cookies/search", params);
  return response.data;
};

export const getAdminCookie = async (id) => {
  const response = await api.get(`/admin/cookies/${id}`);
  return response.data;
};

export const createAdminCookie = async (formData) => {
  const response = await api.post("/admin/cookies", formData);
  return response.data;
};

export const updateAdminCookie = async ({ id, formData }) => {
  const response = await api.patch(`/admin/cookies/${id}`, formData);
  return response.data;
};

export const deleteAdminCookie = async (id) => {
  const response = await api.delete(`/admin/cookies/${id}`);
  return response.data;
};

export const toggleAdminCookieStatus = async (id) => {
  const response = await api.patch(`/admin/cookies/${id}/status`);
  return response.data;
};

export const toggleAdminCookieFeatured = async (id) => {
  const response = await api.patch(`/admin/cookies/${id}/featured`);
  return response.data;
};

export const updateAdminVariantStock = async ({ variantId, stock, change }) => {
  const response = await api.patch(
    `/admin/cookies/variants/${variantId}/stock`,
    {
      stock,
      change,
    },
  );
  return response.data;
};
