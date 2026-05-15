import api from "./axios";

export const getMyOrders = async () => {
  const response = await api.get("/orders/my-orders");
  return response.data;
};

export const getSingleOrder = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};
