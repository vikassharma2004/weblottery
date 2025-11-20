import ProtectedRoute from "../ProctedRoute";

import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Reports from "../pages/admin/Reports";
import Payments from "../pages/admin/Payments";
import Withdraws from "../pages/admin/Withdraws";
import AdminLayout from "../layouts/AdminLayout";
import Sessions from "../pages/admin/Sessions";

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
    path: "/admin/sessions",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
         <AdminLayout>
        <Sessions />
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
