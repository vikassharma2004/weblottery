import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ChangePassword from "../pages/auth/ChangePassword";
import VerifyOtp from "../pages/auth/VerifyOtp.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import ReferralRedirect from "../pages/auth/ReferralRedirect.jsx";
import { authImages } from "../image.js";
import { TermsAndConditions } from "../Termsconditions.jsx";
import FAQSection from "../FAQSection.jsx";
import UserLayout from "../layouts/UserLayout.jsx";
import SupportPage from "../pages/auth/Support.jsx";
import ProtectedRoute from "../ProctedRoute.jsx";
export const authRoutes = [
  {
    path: "/auth/login",
    element: (
      <UserLayout>
        <AuthLayout src={authImages.login}>
          <Login />
        </AuthLayout>
      </UserLayout>
    ),
  },
  {
    path: "/auth/register",
    element: (
      <AuthLayout src={authImages.register}>
        <Register />
      </AuthLayout>
    ),
  },
  {
    path: "/ref/:referralCode",
    element: <ReferralRedirect />,
  },
  {
    path: "/auth/forgot-password",
    element: (
      <AuthLayout src={authImages.forgot}>
        <ForgotPassword />
      </AuthLayout>
    ),
  },
  {
    path: "/auth/reset-password/:token",
    element: (
    
        <AuthLayout src={authImages.reset}>
          <ResetPassword />
        </AuthLayout>
    
    ),
  },
  {
    path: "/profile/change-password",
    element: (
      <ProtectedRoute allowedRoles={["user", "admin"]}>
        <UserLayout>
          <AuthLayout src={authImages.change}>
            <ChangePassword />
          </AuthLayout>
        </UserLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth/verify-otp",
    element: (

      <AuthLayout src={authImages.otp}>
        <VerifyOtp />
      </AuthLayout>
    ),
  },
  
  {
    path: "/support",
    element: (
      <UserLayout>
        <AuthLayout src={authImages.support}>
          <SupportPage />
        </AuthLayout>
      </UserLayout>
    ),
  },
  {
    path: "/faq",
    element: (
      <UserLayout>
        <FAQSection />
      </UserLayout>
    ),
  },
  {
    path: "/terms",
    element: (
      <UserLayout>
        <TermsAndConditions />
      </UserLayout>
    ),
  },
];
