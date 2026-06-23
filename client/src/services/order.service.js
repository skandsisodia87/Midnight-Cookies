import api from "./axios";

export const getMyOrders = async () => {
  const response = await api.get("/orders/my-orders");
  return response.data;
};

export const createOrder = async (body) => {
  const response = await api.post("/orders", body);
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

export const updateAddress = async (addressId, body) => {
  const response = await api.put(`/address/${addressId}`, body);
  return response.data;
};

export const deleteAddress = async (addressId) => {
  const response = await api.delete(`/address/${addressId}`);
  return response.data;
};
