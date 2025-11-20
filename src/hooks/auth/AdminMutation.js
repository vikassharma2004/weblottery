import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllReportsService, getAllWithdrawsService, getAnalyticsService, getStatsService } from "../../api/AdminApi";
export const useReports = ({ page, limit, issueType, status }) => {
  return useQuery({
    queryKey: ["reports", { page, limit, issueType, status }],
    queryFn: () =>
      getAllReportsService({ page, limit, issueType, status }),
    keepPreviousData: true,
  });
};
export const useWithdraws = ({
  page,
  limit,
  status,
  withdrawId,
  email,
  startDate,
  endDate,
}) => {
  return useQuery({
    queryKey: [
      "withdraws",
      { page, limit, status, withdrawId, email, startDate, endDate },
    ],
    queryFn: () =>
      getAllWithdrawsService({
        page,
        limit,
        status,
        withdrawId,
        email,
        startDate,
        endDate,
      }),
    keepPreviousData: true,
  });
};

export const useStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: getStatsService,
       staleTime: 5 * 60 * 1000, // 5 min cache (optional)
    refetchOnWindowFocus: false,
  });
};
export const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics-dashboard"],
    queryFn: getAnalyticsService,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};