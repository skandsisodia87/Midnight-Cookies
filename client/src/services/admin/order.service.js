import api from "../axios";

export const getOrders = async () => {
  const response = await api.post("/admin/orders", {});
  return response.data;
};
