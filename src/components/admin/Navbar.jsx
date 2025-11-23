'use client';

import { Menu, Bell, Settings, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ADMINCOLORS } from '../../constant';
import { useUserStore } from '../../store/AuthStrore';
import { Link } from 'react-router-dom';
export default function Navbar({ onMenuClick }) {
  const {user}=useUserStore()
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header
      className="h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 shadow-md"
      style={{
        backgroundColor: ADMINCOLORS.card,
        borderBottom: `1px solid ${ADMINCOLORS.border}`
      }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg transition-colors"
          style={{ backgroundColor: ADMINCOLORS.sidebarAccent }}
        >
          <Menu size={24} style={{ color: ADMINCOLORS.foreground }} />
        </button>

        <div>
          <p className="text-sm font-medium" style={{ color: ADMINCOLORS.primary }}>
            Hello {user.name}
          </p>
          <p className="text-xs" style={{ color: ADMINCOLORS.muted }}>
            Welcome back
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg transition-colors  cursor-pointer"
          style={{ backgroundColor: ADMINCOLORS.sidebarAccent }}
        >
          <Bell size={20} style={{ color: ADMINCOLORS.foreground }} className=' cursor-pointer' />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: ADMINCOLORS.destructive }}
          ></span>
        </button>

     

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-2 rounded-lg transition-colors  cursor-pointer"
            style={{ backgroundColor: ADMINCOLORS.sidebarAccent }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: ADMINCOLORS.primary + "33" }}
            >
              <User size={16} style={{ color: ADMINCOLORS.primary }}  />
            </div>

            <ChevronDown
              size={16}
              className="hidden sm:block"
              style={{ color: ADMINCOLORS.muted }}
            />
          </button>

          {/* Dropdown */}
          {showProfile && (
            <div
              className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl z-50"
              style={{
                backgroundColor: ADMINCOLORS.sidebarAccent,
                border: `1px solid ${ADMINCOLORS.border}`
              }}
            >
              <div
                className="p-3 border-b"
                style={{ borderColor: ADMINCOLORS.border }}
              >
                <p className="font-medium text-sm" style={{ color: ADMINCOLORS.foreground }}>
                  Admin User
                </p>
                <p className="text-xs" style={{ color: ADMINCOLORS.muted }}>
                 {user?.email}
                </p>
              </div>
              <Link to={"/profile/change-password"}
                className="p-4 border-b"
                style={{ borderColor: ADMINCOLORS.border }}
              >
                <p className="font-medium text-sm" style={{ color: ADMINCOLORS.foreground }}>
                  Change password
                </p>
               
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
