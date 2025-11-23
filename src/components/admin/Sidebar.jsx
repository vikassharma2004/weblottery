'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  ChevronLeft,
  LogOut,
  Wallet,
  FileCheck,
  Megaphone,
  Settings,
  FileWarning,
} from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/logo.webp";
import { ADMINCOLORS } from '../../constant';
import { useUserStore } from '../../store/AuthStrore';
import { useLogout } from '../../hooks/auth/AuthMutation';
import { axiosInstance as axios } from '../../config/axios';
const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },

  {
    id: "users",
    label: "Users",
    icon: Users,
    href: "/admin/users",
  },

  {
    id: "withdrawals",
    label: "Withdrawals",
    icon: Wallet,
    href: "/admin/withdraws",
  },

  {
    id: "paymentProof",
    label: "Payment Proof",
    icon: FileCheck,
    href: "/admin/PaymentProof",
  },

  {
    id: "announcements",
    label: "Announcements",
    icon: Megaphone, // Better than Bell
    href: "/admin/announcements",
  },

 

  {
    id: "reports",
    label: "Reports",
    icon: FileWarning, // cleaner than Flag
    href: "/admin/reports",
  },
   {
    id: "settings",
    label: "Settings",
    icon: Settings, // Proper settings icon
    href: "/admin/settings",
  }
];
export default function Sidebar({ isOpen, onToggle }) {
  const { pathname } = useLocation();
  const {logout}=useLogout();
const {clearAuth}=useUserStore();
  const handleLogout=async()=>{
    // clearAuth();
    await axios.post("/auth/logout");
    clearAuth();
  }
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 lg:hidden z-40"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={onToggle}
        />
      )}

      <aside
        className={`
          fixed lg:relative top-0 left-0
          h-screen border-r transition-all duration-300 flex flex-col z-40
          ${isOpen ? 'w-64' : 'w-20'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{
          backgroundColor: ADMINCOLORS.sidebar,
          borderColor: ADMINCOLORS.border
        }}
      >
        {/* Logo */}
        <div
          className="h-16 flex items-center justify-between px-4 border-b"
          style={{
            backgroundColor: ADMINCOLORS.sidebarAccent,
            borderColor: ADMINCOLORS.border
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: ADMINCOLORS.primary + "33" }}
            >
              <img src={logo} alt="logo" className="rounded-md" />
            </div>

            {isOpen && (
              <span className="font-bold text-lg" style={{ color: ADMINCOLORS.primary }}>
                Spin Share
              </span>
            )}
          </div>

          <button
            onClick={onToggle}
            className="hidden lg:block p-1 rounded transition-colors"
            style={{ backgroundColor: ADMINCOLORS.accent + "00" }}
          >
            <ChevronLeft
              size={16}
              className='cursor-pointer'
              style={{
                color: ADMINCOLORS.foreground,
                transform: !isOpen ? 'rotate(180deg)' : 'none',
                transition: "0.2s"
              }}
            />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-2">
          {menuItems.map(({ id, href, label, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={id}
                to={href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                style={{
                  backgroundColor: isActive ? ADMINCOLORS.primary + "33" : "transparent",
                  color: isActive ? ADMINCOLORS.primary : ADMINCOLORS.foreground,
                  border: isActive ? `1px solid ${ADMINCOLORS.primary}55` : "none"
                }}
                title={!isOpen ? label : ""}
              >
                <Icon size={20} />
                {isOpen && <span className="text-sm font-medium">{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div
          className="border-t p-4"
          style={{ borderColor: ADMINCOLORS.border }}
        >
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer"
            onClick={handleLogout}
            style={{
              color: ADMINCOLORS.destructive,
              backgroundColor: ADMINCOLORS.destructive + "00"
            }}
          >
            <LogOut size={20} className='cursor-pointer' />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
