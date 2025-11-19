'use client';

import { Menu, Bell, Settings, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ onMenuClick }) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* Greeting */}
        <div>
          <p className="text-sm font-medium text-primary">Hello Admin</p>
          <p className="text-xs text-muted-foreground">Welcome back</p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button 
          className="relative p-2 hover:bg-accent/10 rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} className="text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </button>

        {/* Settings */}
        <button 
          className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
          aria-label="Settings"
        >
          <Settings size={20} className="text-foreground" />
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-2 hover:bg-accent/10 rounded-lg transition-colors"
            aria-label="Profile menu"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User size={16} className="text-primary" />
            </div>
            <ChevronDown size={16} className="text-muted-foreground hidden sm:block" />
          </button>

          {/* Dropdown menu */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
              <div className="p-3 border-b border-border">
                <p className="font-medium text-sm">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@example.com</p>
              </div>

              <button className="w-full text-left px-4 py-2 hover:bg-accent/10 text-sm transition-colors">
                Profile Settings
              </button>

              <button className="w-full text-left px-4 py-2 hover:bg-accent/10 text-sm transition-colors">
                Preferences
              </button>

              <button className="w-full text-left px-4 py-2 hover:bg-accent/10 text-sm text-destructive border-t border-border transition-colors">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
