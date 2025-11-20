import { Navigate } from "react-router-dom";
import { useUserStore } from "./store/AuthStrore";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, token } = useUserStore(); // 👈 get from store
  // const isAuth = Boolean(token);          // auth check
  const role = user?.role



  // Role not allowed
  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
