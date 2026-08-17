import axios from "axios";
import useAuthStore from "../store/authStore";
import constants from "../common/constants";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // Let Axios/browser set Content-Type + boundary
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === "LOGOUT_USER"
    ) {
      useAuthStore.getState().logout();

      window.location.href = constants.ROUTES.LOGIN;
    }

    return Promise.reject(error);
  },
);

export default api;
