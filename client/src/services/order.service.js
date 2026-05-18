import api from "./axios";

export const getMyOrders = async () => {
  const response = await api.get("/orders/my-orders");
  return response.data;
};

export const getSingleOrder = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

export const addAddress = async (body) => {
  const response = await api.post("/address", body);
  return response.data;
};

export const getAddresses = async () => {
  const response = await api.get("/address");
  return response.data;
};
