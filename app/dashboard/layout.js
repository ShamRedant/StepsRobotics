'use client';
import { useRouter } from "next/navigation";

import { useState } from 'react';
import { Menu, Bell, User } from 'lucide-react';
import Sidebar from '../component/Sidebar';
import { useUser } from "../Context/UserContext";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // ✅ new state for profile menu
  const { user, loading } = useUser();

  const displayName = user?.full_name || "Loading...";
  const displayDept = user?.department || "Loading...";

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      localStorage.removeItem('role');
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo (Mobile) */}
          <div className="flex items-center">
            <div className="lg:hidden flex items-center">
              <h1 className="text-xl font-bold text-blue-600">Steps Robotics</h1>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Section */}
            <div
              className="flex items-center space-x-3 cursor-pointer relative"
              onClick={() => setProfileOpen(!profileOpen)} // ✅ toggle dropdown
            >
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{displayName}</p>
                <p className="text-xs text-gray-500">{displayDept}</p>
              </div>
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 top-12 bg-white border rounded-lg shadow-lg w-48 z-50">
                  <ul className="py-2">
                    <li
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => alert('Profile Settings Clicked')}
                    >
                      Profile Settings
                    </li>
                    <li
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => alert('Update Profile Clicked')}
                    >
                      Update Profile
                    </li>
                    <li
                      className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* MAIN CONTENT */}
      <main className="lg:pl-64 pt-16">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
