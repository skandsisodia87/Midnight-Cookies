import api from "./axios";

export const createReview = async (body) => {
  const response = await api.post("/review", body);
  return response.data;
};
