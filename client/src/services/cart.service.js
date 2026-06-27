import api from "./axios";

export const addToCart = async (body) => {
  const response = await api.post("/cart/add", body);
  return response.data;
};

export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const emptyCart = async () => {
  const response = await api.delete("/cart/clear");
  return response.data;
};

export const removeCartItem = async (cookieId) => {
  const response = await api.delete(`/cart/remove/${cookieId}`);
  return response.data;
};

export const updateCartItemQuantity = async (cookieId, quantity) => {
  const response = await api.patch(`/cart/update/${cookieId}`, { quantity });
  return response.data;
};

export const updateCartItemsQuantity = async (items) => {
  const response = await api.patch("/cart/batch-update", { items });
  return response.data;
};
