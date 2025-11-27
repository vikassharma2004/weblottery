import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Gift,
  Wallet,
  User,
  Menu,
  X,
  LogOut,
  Bell,
  Megaphone,
} from "lucide-react";
import { COLORS } from "../../constant";
import { useState } from "react";
import logo from "../../assets/logo.webp";
import { useUserStore } from "../../store/AuthStrore";
import { logoutUser } from "../../api/AuthApi";
import { Toaster } from "react-hot-toast";
import NotificationDropdown from "../NotificationDropdown";
import { useNotifications } from "../../hooks/auth/AuthMutation";

export default function UserNavbar() {
  const navigate = useNavigate();
  const { clearAuth, user } = useUserStore();


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const isLoggedIn = Boolean(user);
  
// Only fetch notifications when logged in
const { unreadCount } = useNotifications(isLoggedIn);

  const handleLogout = async () => {
    const data = await logoutUser();
    await clearAuth();
    navigate("/auth/login");
  };

  return (
    <>
      <header
        className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-50"
        style={{
          borderBottom: `1px solid ${COLORS.BORDER}`,
          boxShadow: `0 4px 10px ${COLORS.SHADOW}`,
        }}
      >
        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          <img src={logo} className="w-8 h-8 rounded-md" />
          <h1 className="text-lg font-bold" style={{ color: COLORS.PRIMARY }}>
            SpinShare
          </h1>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-10">
          <DesktopLink
            to="/"
            icon={<Home className="w-4 h-4" />}
            label="Home"
          />
          {isLoggedIn && user.role != "user" && (
            <DesktopLink
              to="/admin/dashboard"
              icon={<Home className="w-4 h-4" />}
              label="Dashbaord"
            />
          )}
          {isLoggedIn && user.role === "user" && (
            <>
              <DesktopLink
                to="/refer-earn"
                icon={<Gift className="w-4 h-4" />}
                label="Refer & Earn"
              />
              <DesktopLink
                to="/user/wallet"
                icon={<Wallet className="w-4 h-4" />}
                label="Wallet"
              />
              <DesktopLink
                to="/announcements"
                icon={<Megaphone className="w-4 h-4" />}
                label="Announcements"
              />
            </>
          )}
        </nav>

        {/* RIGHT SIDE (DESKTOP + MOBILE COMBINED) */}
        <div className="flex items-center gap-4">
          {/* MOBILE NOTIFICATION BELL */}
          {user && (
            <div className="relative flex md:hidden items-center">
              <button onClick={() => setOpen((p) => !p)} className="relative">
                <Bell className="w-6 h-6 text-gray-800" />

                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {open && (
                <div className="absolute right-0 mt-2">
                  <NotificationDropdown onClose={() => setOpen(false)} />
                </div>
              )}
            </div>
          )}

          {/* MOBILE MENU ICON */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="w-7 h-7 text-gray-800" />
            ) : (
              <Menu className="w-7 h-7 text-gray-800" />
            )}
          </button>

          {/* DESKTOP NOTIFICATION BELL */}
          {user && user.role == "user" && (
            <div className="relative hidden md:flex items-center">
              <button onClick={() => setOpen((p) => !p)} className="relative">
                <Bell className="w-6 h-6 text-gray-800 cursor-pointer" />

                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 cursor-pointer">
                  <NotificationDropdown onClose={() => setOpen(false)} />
                </div>
              )}
            </div>
          )}

          {/* DESKTOP AVATAR */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <div className="relative">
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full cursor-pointer overflow-hidden flex items-center justify-center border-2"
                  style={{ borderColor: COLORS.PRIMARY }}
                >
                  <img
                    src={
                      user?.avatar ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEz1ve3QQhGM3EKWe1dDjnQAOqyMv0RUEcnw&s"
                    }
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEz1ve3QQhGM3EKWe1dDjnQAOqyMv0RUEcnw&s")
                    }
                  />
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border rounded-xl shadow-lg w-44 py-2 text-sm font-medium">
                    <DropdownLink
                      to="/user/profile"
                      label="My Profile"
                      onClose={() => setDropdownOpen(false)}
                    />
                    <DropdownLink
                      to="/user/payment-history"
                      label="Payment History"
                      onClose={() => setDropdownOpen(false)}
                    />
                    <DropdownLink
                      to="/profile/change-password"
                      label="Change Password"
                      onClose={() => setDropdownOpen(false)}
                    />

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 flex items-center gap-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/auth/login")}
                className="px-4 py-2 bg-yellow-500 text-black rounded-lg cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div
          className="absolute top-16 left-0 w-full bg-white shadow-xl md:hidden animate-slideDown pb-6 z-50"
          style={{ borderTop: `2px solid ${COLORS.PRIMARY}` }}
        >
          <div className="flex flex-col gap-2 p-6 z-10">
            {isLoggedIn ? (
              <>
                <MobileLink
                  to="/refer-earn"
                  label="Refer & Earn"
                  onClose={() => setMenuOpen(false)}
                />
                <MobileLink
                  to="/user/wallet"
                  label="Wallet"
                  onClose={() => setMenuOpen(false)}
                />
                <MobileLink
                  to="/user/profile"
                  label="My Profile"
                  onClose={() => setMenuOpen(false)}
                />
                <MobileLink
                  to="/profile/change-password"
                  label="Change Password"
                  onClose={() => setMenuOpen(false)}
                />
                <MobileLink
                  to="/user/payment-history"
                  label="Payment History"
                  onClose={() => setMenuOpen(false)}
                />
                <MobileLink
                  to="/announcements"
                  label="Announcements"
                  onClose={() => setMenuOpen(false)}
                />

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 mt-3"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/auth/login")}
                className="w-full mt-2 py-3 bg-[#FFB800] text-black rounded-lg text-center"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

      <Toaster position="top-center" />
    </>
  );
}

/* ---------------- COMPONENTS ---------------- */

function DesktopLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 text-sm font-medium ${
          isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
        }`
      }
    >
      {icon} {label}
    </NavLink>
  );
}

function DropdownLink({ to, label, onClose }) {
  return (
    <NavLink
      to={to}
      onClick={() => onClose && onClose()}
      className="block px-4 py-2 hover:bg-gray-100"
    >
      {label}
    </NavLink>
  );
}

function MobileLink({ to, label, onClose }) {
  return (
    <NavLink
      to={to}
      onClick={() => onClose && onClose()}
      className={({ isActive }) =>
        `py-3 px-3 rounded-lg font-medium transition-all ${
          isActive ? "text-white shadow-md" : "text-gray-800 hover:bg-gray-100"
        }`
      }
      style={({ isActive }) => ({
        backgroundImage: isActive ? COLORS.PRIMARY_GRADIENT : "none",
      })}
    >
      {label}
    </NavLink>
  );
}
