import {
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  Wallet,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.webp";

const AdminSidebar = () => {
  const navLinks = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Payments", icon: CreditCard, path: "/admin/payments" },
    { name: "Reports", icon: BarChart3, path: "/admin/reports" },
    { name: "Withdraws", icon: Wallet, path: "/admin/withdraws" },
  ];

  return (
    <aside className="h-[calc(100vh-32px)] w-[250px] bg-white border border-gray-200 rounded-xl flex flex-col justify-between shadow-md">
      {/* ---- Top Logo Section ---- */}
      <div className="p-5 flex items-center gap-3 border-b border-gray-100">
        <img
          src={logo}
          alt="App Logo"
          className="w-10 h-10 object-contain rounded-md"
        />
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
          SpinShare
        </h1>
      </div>

      {/* ---- Middle Navigation ---- */}
      <nav className="flex-1 px-4 py-5 space-y-2">
        {navLinks.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-150 ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      {/* ---- Bottom Logout ---- */}
      <div className="border-t border-gray-100 p-4">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium text-red-600 hover:bg-red-50 transition-all">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
