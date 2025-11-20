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
