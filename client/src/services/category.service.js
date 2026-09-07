import api from "./axios";

export const getActiveCategories = async () => {
  const response = await api.get("/category");
  return response.data;
};