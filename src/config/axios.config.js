import { axiosInstance } from "./axios";
import { useUserStore } from "../store/AuthStrore";
import { toast } from "react-toastify";

// Prevent infinite logout loops
let isLoggingOut = false;

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    // ---- Auto logout for expired token ----
    if ((status === 401 || status === 403) && !isLoggingOut) {

      // Avoid repeated triggers
      isLoggingOut = true;

      useUserStore.getState().clearAuth();

      toast.error(
        message === "session expired" || status === 401
          ? "Session expired. Please login again."
          : "Unauthorized access."
      );

      // Redirect user to login page
      window.location.href = "/auth/login";

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
