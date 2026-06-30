import api from "./axios";

export const subscribeNewsletter = async (email) => {
  const response = await api.post("/newsletter/subscribe", { email });
  return response.data;
};
