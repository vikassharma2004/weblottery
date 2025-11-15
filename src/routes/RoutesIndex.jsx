import { Routes, Route, Navigate } from "react-router-dom";

import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";
import { adminRoutes } from "./adminRoutes";
import NotFound from "../pages/user/NotFound.jsx";

export default function RoutesIndex() {
  return (
    <Routes>
      {/* ✅ auth */}
      {authRoutes.map((route, i) => (
        <Route key={i} path={route.path} element={route.element} />
      ))}

      {/* ✅ user */}
      {userRoutes.map((route, i) => (
        <Route key={i} path={route.path} element={route.element} />
      ))}

      {/* ✅ admin */}
      {adminRoutes.map((route, i) => (
        <Route key={i} path={route.path} element={route.element} />
      ))}

      {/* ✅ MUST BE LAST */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
