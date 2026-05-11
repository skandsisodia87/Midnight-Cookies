import api from "./axios";

export const loginUser = async (payload) => {
  const response = await api.post("/auth/login", payload);

  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
