import { axiosInstance } from "./axios";
import { useUserStore } from "../store/AuthStrore";


axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error?.response?.status;

    // Auto logout on token expiry
    if (status === 401 || status === 403) {
      useUserStore.getState().logout();
      console.warn("Session expired. Logged out.");
    }

    return Promise.reject(error);
  }
);
