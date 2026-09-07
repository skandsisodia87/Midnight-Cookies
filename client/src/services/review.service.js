import api from "./axios";

export const createReview = async (body) => {
  const response = await api.post("/review", body);
  return response.data;
};

export const getCookieReviews = async (cookieId) => {
  const response = await api.get(`/review/${cookieId}`);
  return response.data?.reviews ?? [];
};

export const getTestimonials = async () => {
  const response = await api.get("/review/testimonials");
  return response.data?.reviews ?? [];
};
