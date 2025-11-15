import Home from "../pages/user/Home";
import Profile from "../pages/user/Profile";
import ReferEarn from "../pages/user/ReferEarn";
import Wallet from "../pages/user/Wallet";
import ProtectedRoute from "../ProctedRoute.jsx";
import UserLayout from "../layouts/UserLayout.jsx";
import PaymentHistory from "../pages/user/PaymentHistory.jsx";
export const userRoutes = [
  {
    path: "/",
    element: (
  
        <UserLayout>
          <Home />
        </UserLayout>

    ),
  },
  {
    path: "/user/profile",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <UserLayout>
          <Profile />
        </UserLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/refer-earn",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <UserLayout>
          <ReferEarn />
        </UserLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/wallet",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <UserLayout>
          <Wallet />
        </UserLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/payment-history",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <UserLayout>
          <PaymentHistory/>
        </UserLayout>
      </ProtectedRoute>
    ),
  },
];