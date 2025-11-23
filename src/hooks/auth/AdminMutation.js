import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createAnnouncementApi,  createPaymentSettingApi,  deleteAnnouncementApi,  deletePaymentApi,  getActivePaymentApi,  getAllPaymentsApi,  getAllReportsService, getAllUsersService, getAllWithdrawsService, getAnalyticsService, getAnnouncementsService, getPendingPaymentsApi, getReportByIdApi, getStatsService, submitPaymentVerificationApi, toggleSuspendUserApi, updateAnnouncementApi, updatePaymentApi, updateReportStatusApi, verifyPaymentApi } from "../../api/AdminApi";
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
export const useUsers = ({ page, limit, email, hasPaid, isSuspended }) => {
  return useQuery({
    queryKey: [
      "users",
      {
        page,
        limit,
        email,
        hasPaid,
        isSuspended,
      },
    ],

    queryFn: () =>
      getAllUsersService({
        page,
        limit,
        email,
        hasPaid,
        isSuspended,
      }),

    keepPreviousData: true,
      // 👇 Add staleTime + cacheTime
    staleTime: 1000 * 10,  // 10 seconds → data considered fresh
    cacheTime: 1000 * 60 * 5, // 5 mins cache
  });
};

export const useAnnouncements = ({
  status="active",
}) => {
  return useQuery({
    queryKey: ["announcements",status],
    queryFn: () =>
      getAnnouncementsService({
        status,
      }),
    keepPreviousData: true,
  });
};

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAnnouncementApi,
    onSuccess: () => {
      toast.success("Announcement created");
      queryClient.invalidateQueries(["announcements"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });
};

// UPDATE HOOK
export const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAnnouncementApi,
    onSuccess: () => {
      toast.success("Announcement updated");
      queryClient.invalidateQueries(["announcements"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Update failed");
    },
  });
};

// DELETE HOOK
export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAnnouncementApi,
    onSuccess: (data) => {
      toast.success(data.message || "Deleted successfully");
      queryClient.invalidateQueries(["announcements"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Deletion failed");
    },
  });
};

export const useActivePayment = () => {
  return useQuery({
    queryKey: ["activePayment"],
    queryFn: getActivePaymentApi,
  });
};

export const useGetPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: getAllPaymentsApi,
    staleTime: 1000 * 60,
  });
};
export const useUpdatePayment = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updatePaymentApi(id, data),

    onSuccess: (res) => {
      toast.success(res.message || "Payment updated");
      qc.invalidateQueries(["payments"]);
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update");
    },
  });
};

export const useDeletePayment = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) => deletePaymentApi(id),

    onSuccess: (res) => {
      toast.success(res.message || "Deleted");
      qc.invalidateQueries(["payments"]);
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Delete failed");
    },
  });
};

export const useReportById = (id, enabled = false) => {
  return useQuery({
    queryKey: ["report", id],
    queryFn: () => getReportByIdApi(id)
    
  });
};
export const useUpdateReportStatus = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => updateReportStatusApi(id, status),

    onSuccess: (res) => {
      toast.success(res.message || "Status updated");
      qc.invalidateQueries(["reports"]); // Refresh list
      qc.invalidateQueries(["report"]);  // Refresh modal data
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update");
    },
  });
};


export const useToggleSuspendUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) => toggleSuspendUserApi(id),

    onSuccess: (res) => {
      toast.success(res.message || "User updated");
      qc.invalidateQueries(["users"]); // refresh table
    },

    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Failed to suspend/unsuspend user"
      );
    },
  });
};
export const useCreatePaymentSetting = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (formData) => createPaymentSettingApi(formData),

    onSuccess: (res) => {
      toast.success(res.message || "Payment created");
      qc.invalidateQueries(["payments"]);
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to create payment");
    },
  });
};
export const useSubmitPaymentVerification = () => {
  return useMutation({
    mutationFn: (formData) => submitPaymentVerificationApi(formData),

    onSuccess: () => {
      toast.success("Payment proof submitted successfully");
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Submission failed");
    },
  });
};
export const usePendingPayments = ({ page, limit, startDate, endDate }) => {
  return useQuery({
    queryKey: ["pending-payments", page, limit, startDate, endDate],
    queryFn: () => getPendingPaymentsApi({ page, limit, startDate, endDate }),
    keepPreviousData: true,
  });
};
export const useVerifyPayment = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, adminNote }) =>
      verifyPaymentApi({ id, status, adminNote }),

    onSuccess: (res) => {
      toast.success(res.message || "Payment updated");
      qc.invalidateQueries(["pending-payments"]);
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Action failed");
    }
  });
};