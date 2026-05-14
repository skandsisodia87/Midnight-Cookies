import api from "./axios";

export const loginUser = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const forgotPassword = async (body) => {
  const response = await api.post("/auth/forgot-password", body);
  return response.data;
};

export const resetPassword = async (body, token) => {
  const response = await api.post(`/auth/reset-password/${token}`, body);
  return response.data;
};

export const registerUser = async (body) => {
  const response = await api.post("/auth/register", body);
  return response.data;
};

export const sendVerificationOtp = async (body) => {
  const response = await api.post("/auth/send-verification-otp", body);
  return response.data;
};

export const verifyEmailOtp = async (email, otp) => {
  const response = await api.post("/auth/verify-email-otp", { email, otp });
  return response.data;
};
