import api from "./axios";

export const getAllCookies = async () => {
  const response = await api.get("/cookie");
  return response.data;
};

export const getSingleCookie = async (slug) => {
  const response = await api.get(`/cookie/${slug}`);
  return response.data;
};

export const getFeaturedCookie = async () => {
  const response = await api.get(`/cookie/featured`);
  return response.data?.cookies ?? [];
};
