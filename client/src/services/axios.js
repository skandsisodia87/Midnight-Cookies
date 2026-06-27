import axios from "axios";
import useAuthStore from "../store/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === "LOGOUT_USER"
    ) {
      // useAuthStore.getState().logout();

      // window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
