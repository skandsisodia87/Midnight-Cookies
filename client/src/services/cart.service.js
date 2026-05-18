import api from "./axios";

export const addToCart = async (body) => {
  const response = await api.post("/cart/add", body);
  return response.data;
};

export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};
