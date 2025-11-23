import { axiosInstance as axios } from "../config/axios.js";

export const getAllReportsService = async ({
  page = 1,
  limit = 20,
  issueType = "all",
  status = "all",
}) => {
  let url = `/report?page=${page}&limit=${limit}`;

  if (issueType !== "all") {
    url += `&issueType=${issueType}`;
  }

  if (status !== "all") {
    url += `&status=${status}`;
  }

  const { data } = await axios.get(url, {
    withCredentials: true, // if adminSessionMiddleware uses cookies
  });

  return data;
};

export const getAllWithdrawsService = async ({
  page = 1,
  limit = 20,
  status = "",
  withdrawId = "",
  email = "",
  startDate = "",
  endDate = "",
}) => {
  let url = `/withdraw/all?page=${page}&limit=${limit}`;

  if (status) url += `&status=${status}`;
  if (withdrawId) url += `&withdrawId=${withdrawId}`;
  if (email) url += `&email=${email}`;
  if (startDate) url += `&startDate=${startDate}`;
  if (endDate) url += `&endDate=${endDate}`;

  const { data } = await axios.get(url, {
    withCredentials: true, // admin session middleware uses cookies
  });
  return data;
}

export const getStatsService = async () => {
  const { data } = await axios.get("/analytics/stats", {
    withCredentials: true,
  });

  return data.stats; // only stats object
};

export const getAnalyticsService = async () => {
  const { data } = await axios.get("/analytics", {
    withCredentials: true,
  });

  return data; // returns { success, withdrawalData, usersData, paymentsData, recentTransactions }
};



export const getAllUsersService = async ({
  page = 1,
  limit = 20,
  email = "",
  hasPaid = "",
  isSuspended = "",
}) => {
  let url = `/admin/users/all?page=${page}&limit=${limit}`;

  if (email) url += `&email=${email}`;
  if (hasPaid) url += `&hasPaid=${hasPaid}`;
  if (isSuspended) url += `&isSuspended=${isSuspended}`;

  const { data } = await axios.get(url, {
    withCredentials: true, // admin session middleware uses cookies
  });

  return data;
};

// annoument api
export const getAnnouncementsService = async ({
  status // "active" | "inactive" | "all"
}) => {
  let url = `/announcements?status=${status}`;

  const { data } = await axios.get(url, {
    withCredentials: true, // admin panel uses session cookies
  });

  return data;
};

// CREATE announcement (admin only)
export const createAnnouncementApi = async (data) => {
  const res = await axios.post("/announcements", data);
  return res.data;
};

// UPDATE announcement
export const updateAnnouncementApi = async ({ id, payload }) => {
  const res = await axios.patch(`/announcements/${id}`, payload, {
    withCredentials: true,
  });
  return res.data;
};

// DELETE announcement
export const deleteAnnouncementApi = async (id) => {
  const res = await axios.delete(`/announcements/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

// { payment api}
export const getActivePaymentApi = async () => {
  const res = await axios.get("/payment-settings/active");
  return res.data.activePayment;
};
// Get all payments
export const getAllPaymentsApi = async () => {
  const res = await axios.get("/payment-settings");
  return res.data.payments;
};

// Update a specific payment
export const updatePaymentApi = async (id, payload) => {
  const res = await axios.patch(`/payment-settings/${id}`, payload);
  return res.data;
};

// Delete a payment
export const deletePaymentApi = async (id) => {
  const res = await axios.delete(`/payment-settings/${id}`);
  return res.data;
};

//reports api
// GET SINGLE REPORT
export const getReportByIdApi = async (id) => {
  const res = await axios.get(`/report/${id}`);
  return res.data.report; // because controller returns { message, data }
};

// UPDATE REPORT STATUS
export const updateReportStatusApi = async (id, status) => {
  const res = await axios.put(`/report/${id}`, { status });
  return res.data;
};
export const toggleSuspendUserApi = async (id) => {
  const res = await axios.patch(`/admin/users/suspend/${id}`);
  return res.data;
};

export const createPaymentSettingApi = async (formData) => {
  const res = await axios.post("/payment-settings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
export const submitPaymentVerificationApi = async (formData) => {
  const res = await axios.post("/payment-verification/submit", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
export const getPendingPaymentsApi = async ({ page, limit=20, startDate, endDate }) => {
  const params = {};

  if (page) params.page = page;
  if (limit) params.limit = limit;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const res = await axios.get("/payment-verification/all", { params });

  return res.data;
};

export const verifyPaymentApi = async ({ id, status, adminNote }) => {
  const payload = { status };
  if (adminNote) payload.adminNote = adminNote;

  const res = await axios.patch(`/payment-verification/${id}`, payload);
  return res.data;
};

export const apiGetWithdrawById = async (id) => {
  const res = await axios.get(`/withdraw/${id}`);
  return res.data?.withdraw;
};
export const apiProcessWithdraw = async ({ id, status, note }) => {
  const res = await axios.patch(`/withdraw/${id}/update`, {
    status,
    note,
  });
  return res.data;
};