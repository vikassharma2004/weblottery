import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  sendResetToken,
  resetPassword,
  verifyToken,
  generateOtp,
  verifyOtp,
  reportIssue,
  markAllAsRead,
  getReferralSummary,
  getWalletInfo,
  getPaymentHistory,
  createWithdrawRequest,
  getProfile,
  getNotifications,
  createOrderApi
} from "../../api/AuthApi";

import { useUserStore } from "../../store/AuthStrore";
import { useNavigate } from "react-router-dom";

// 🔥 Register
export const useReferralSummary = () => {
  return useQuery({
    queryKey: ["referral-summary"],
    queryFn: getReferralSummary,
    staleTime: 1000 * 60 * 5, // 5 mins
    retry: 1,
  });
};
export const useWalletInfo = () => {
  return useQuery({
    queryKey: ["wallet-info"],
    queryFn: getWalletInfo,
    staleTime: 1000 * 60 * 2, // 2 mins
    retry: 1,
  });
};
export const useRegister = () => {

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data?.message || "Registration successful!");

    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Registration failed"),
  });
};


// 🔥 Login
export const useLogin = () => {
  const setUser = useUserStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (res) => {

      const message = res?.message?.toLowerCase();

      // CASE 1 → Email not verified → send to OTP verify page
      if (message.includes("email not verified")) {
        toast.error("Email not verified. Please verify first.");

        navigate("/auth/verify-otp", {
          state: { 
            email: res?.email,     // backend must return this
            action: "verifyEmail",
          },
        });

        return;
      }

      // CASE 2 → Successful login
      if (res?.user) {
        setUser(res?.token,res.user);
        toast.success("Login successful!")

        // role-based routing
        if (res.user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }

        return;
      }

      // fallback
      toast.error("Unexpected login response");
    },

    onError: (error) => {
      const msg = error?.response?.data?.message || "Login failed";

      toast.error(msg);

      // Email not verified case
      if (msg.toLowerCase().includes("email not verified")) {
        navigate("/auth/verify-otp", {
          state: {
            email: error?.response?.data?.email,
            action: "verifyEmail",
          },
        });
      }
    },
  });
};




// 🔥 Logout
export const useLogout = async() => {
  const logout = useUserStore((s) => s.clearAuth);

  return useMutation ({
    mutationFn: logoutUser,
/*************  ✨ Windsurf Command ⭐  *************/
/**

/*******  3f70e588-b2fa-4c33-aaf3-1a97d4886880  *******/
    onSuccess:async () => {
      await logout();
      toast.success("Logged out successfully");
    },
    onError: () => toast.error("Failed to logout"),
  });
};


// 🔥 Change Password
export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success(data?.message || "Password updated successfully");
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Password change failed"),
  });
};


// 🔥 Send Reset Token
export const useSendResetToken = () => {
  return useMutation({
    mutationFn: sendResetToken,
    onSuccess: (data) =>
      toast.success(data?.message || "Reset link sent to email"),
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Failed to send reset link"),
  });
};


// 🔥 Reset Password
export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) =>{

      toast.success(data?.message || "Password reset successful"),
      navigate("/auth/login")
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Reset failed"),
  });
};


// 🔥 Verify Token
export const useVerifyToken = () => {
  return useMutation({
    mutationFn: verifyToken,
    onSuccess: (data) => {
      toast.success(data?.message || "Token verified");
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Invalid or expired token"),
  });
};


// 🔥 Generate OTP
export const useGenerateOtp = () => {
  return useMutation({
    mutationFn: generateOtp,
    onSuccess: (data) =>
      toast.success(data?.message || "OTP sent successfully"),
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Failed to send OTP"),
  });
};


// 🔥 Verify OTP
export const useVerifyOtp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      toast.success(data?.message || "OTP verified");
      navigate("/auth/login");
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Invalid OTP"),
  });
};


// 🔥 Report Issue
export const useReportIssue = () => {
  return useMutation({
    mutationFn: reportIssue,
    onSuccess: (data) =>
      toast.success(data?.message || "Issue submitted"),
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Failed to submit issue"),
  });
};


export const usePaymentHistory = (status) => {
  return useInfiniteQuery({
    queryKey: ["payment-history", status],

    queryFn: ({ pageParam }) =>
      getPaymentHistory({ page: pageParam, status }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (!lastPage?.pagination?.hasNextPage) return undefined;
      return lastPage.pagination.page + 1;
    },
  });
};

// 🔥 Mark Notifications as Read

export const useWithdraw = () => {
  return useMutation({
    mutationFn: createWithdrawRequest,
    onSuccess: (data) => {
      toast.success(data?.message || "Withdrawal request submitted!");
    },
    invalidateQueries: ["wallet-info"],
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Withdrawal failed");
    },
  });
};
export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, // 5 min cache (optional)
     retry: 1,
  });
};
export const useNotifications = (enabled = true) => {

  const notificationsQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    enabled,
    staleTime: 1000 * 60 * 2,
  });

  const markReadMutation = useMutation({
    mutationFn:markAllAsRead,
    onSuccess: () => {
      // instantly update UI without refetching
      notificationsQuery.refetch();
    },
  });

  const unreadCount =
    notificationsQuery.data?.notifications?.filter((n) => !n.read).length || 0;

  return {
    notificationsQuery,
    markReadMutation,
    unreadCount,
  };
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrderApi,
    onSuccess: (data) => {
      toast.success("Order created successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Order creation failed");
    },
  });
};
