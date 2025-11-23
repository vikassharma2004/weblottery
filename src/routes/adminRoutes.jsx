import ProtectedRoute from "../ProctedRoute";

import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Reports from "../pages/admin/Reports";
import Payments from "../pages/admin/Payments";
import Withdraws from "../pages/admin/Withdraws";
import AdminLayout from "../layouts/AdminLayout";
import PaymentProof from "../pages/admin/PaymentProof";
import AdminAnnouncementsPage from "../pages/admin/AnnouncementsPage";
import Settings from "../pages/admin/Settings";

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
        <Dashboard />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/PaymentProof",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
        <PaymentProof/>
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/announcements",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
        <AdminAnnouncementsPage/>
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/settings",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
        <Settings/>
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
         <AdminLayout>
        <Users />
         </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/reports",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
         <AdminLayout>
        <Reports />
         </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/payments",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
         <AdminLayout>
        <Payments />
         </AdminLayout>
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/withdraws",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
         <AdminLayout>

        <Withdraws />
         </AdminLayout>
      </ProtectedRoute>
    ),
  },
];
