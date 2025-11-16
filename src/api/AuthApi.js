import { axiosInstance as axios } from "../config/axios.js";

/**
 * Wrapper helpers for auth & misc API calls.
 * These return `response.data` on success and throw the axios error on failure.
 * Designed to be used with react-query / useMutation / useQuery.
 */

// --- Auth ---
export const registerUser = async (payload) => {
  const { data } = await axios.post("/auth/register", payload);
  return data;
};

export const changePassword = async (payload) => {
  // payload: { oldPassword, newPassword } or as your backend expects
  const { data } = await axios.post("/auth/change-password", payload);
  return data;
};

export const loginUser = async (payload) => {
  // payload: { email, password }
  const { data } = await axios.post("/auth/login", payload);
  return data;
};

export const logoutUser = async () => {
  const { data } = await axios.post("/auth/logout");
  return data;
};

// NOTE: confirm whether your backend exposes profile at /auth/profile or /user/profile
export const getProfile = async () => {
  const { data } = await axios.get("/auth/profile");
  return data;
};

// --- Password reset / OTP ---
export const sendResetToken = async (payload) => {
  // payload: { email }
  const { data } = await axios.post("/auth/send-reset-token", payload);
  return data;
};

export const resetPassword = async (payload) => {
  // payload: { token, password }
  const { data } = await axios.post(`/auth/reset-password/${payload.token}`, payload);
  return data;
};

export const verifyToken = async (payload) => {
  // If your backend expects token as body or query — adapt accordingly.
  // Many APIs use GET /auth/verify-token?token=abc or POST /auth/verify-token { token }
  const { data } = await axios.post("/auth/verify-token", payload);
  return data;
};

// --- OTP ---
export const generateOtp = async (payload) => {
  // payload example: { email } or { phone }
  const { data } = await axios.post("/otp/generate", payload);
  return data;
};

export const verifyOtp = async (payload) => {
  // payload example: { email, otp } or { phone, otp }
  const { data } = await axios.post("/otp/verify", payload);
  return data;
};

// --- Support / Misc ---
export const reportIssue = async (payload) => {
  // payload: { email, issueType, summary }
  const { data } = await axios.post("/report", payload);
  return data;
};

// --- Notifications ---
export const getNotifications = async () => {
  const { data } = await axios.get("/Notification/all");
  return data;
};

export const markAllAsRead = async () => {
  const { data } = await axios.post("/Notification/mark-read");
  return data;
};
export const getReferralSummary = async () => {
  const res = await axios.get("/user/referrals", {
    withCredentials: true,
  });
  return res.data;
};

export const getWalletInfo = async () => {
  const res = await axios.get("/user/wallet", {
    withCredentials: true,
  });
  return res.data;
};
export const getPaymentHistory = async ({ page = 1, status = "all" }) => {
  let url = `/payment/history?page=${page}&limit=10`;

  if (status !== "all") {
    url += `&status=${status}`;
  }

  const { data } = await axios.get(url);
  return data;
};
export const createWithdrawRequest = async ({ amount, upiId }) => {
  const { data } = await axios.post(
    "/withdraw/create-withdraw-request",
    { amount, upiId }
  );
  return data;
};