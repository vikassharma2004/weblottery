'use client';

import { useState } from 'react';
import { LayoutDashboard, BarChart3, CreditCard, Bell, LogOut, ChevronLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { id: 'withdrawals', label: 'Withdrawals', icon: CreditCard, href: '/admin/withdrawals' },
  { id: 'reports', label: 'Reports', icon: BarChart3, href: '/reports' },
  { id: 'payments', label: 'Payments', icon: CreditCard, href: '/payments' },
  { id: 'announcements', label: 'Announcements', icon: Bell, href: '/announcements' },
];

export default function Sidebar({ isOpen, onToggle }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative
          top-0 left-0
          h-screen
          bg-card border-r border-border
          transition-all duration-300 ease-in-out
          flex flex-col
          z-40
          ${isOpen ? 'w-64' : 'w-20'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary text-sm">A</span>
            </div>
            {isOpen && <span className="font-bold text-primary text-lg">Admin</span>}
          </div>
          <button
            onClick={onToggle}
            className="hidden lg:block p-1 hover:bg-accent/10 rounded transition-colors"
          >
            <ChevronLeft
              size={16}
              className={`transition-transform ${!isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                to={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${isActive
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-foreground hover:bg-accent/10'
                  }
                `}
                title={!isOpen ? item.label : ''}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="border-t border-border p-4">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

