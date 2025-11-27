"use client";

import { 
  Home, 
  BookOpen, 
  Calendar, 
  ClipboardList, 
  MessageSquare, 
  Trophy, 
  Settings, 
  LogOut,
  X,
  GraduationCap,
  BarChart3,
  Users
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useUser } from "../Context/UserContext";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, current: true },
  { name: 'My Courses', href: '/courses', icon: BookOpen, current: false, badge: '6' },
  { name: 'Schedule', href: '/schedule', icon: Calendar, current: false },
  { name: 'Assignments', href: '/assignments', icon: ClipboardList, current: false, badge: '4' },
  { name: 'Messages', href: '/messages', icon: MessageSquare, current: false, badge: '2' },
  { name: 'Grades', href: '/grades', icon: Trophy, current: false },
  { name: 'Study Groups', href: '/groups', icon: Users, current: false },
  { name: 'Progress', href: '/progress', icon: BarChart3, current: false },
  { name: 'Settings', href: '/settings', icon: Settings, current: false },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const router = useRouter();
  const { user, loading } = useUser();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      localStorage.removeItem('role');
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const displayName = user?.full_name || "Loading...";
  const displayDept = user?.department || "Loading...";

  const renderUserInfo = () => {
    if (loading) {
      return <p className="text-gray-500 text-sm">Loading user...</p>;
    }

    return (
      <div className="flex items-center space-x-3 mb-3">
        <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-sm">{displayName.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
          <p className="text-xs text-gray-500 truncate">{displayDept}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:pt-16">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 overflow-y-auto shadow-sm">
          <div className="flex items-center flex-shrink-0 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-blue-600">Steps Robotics</h1>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.name);
                }}
                className={`
                  group flex items-center justify-between px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                  ${activeItem === item.name
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                  }
                `}
              >
                <div className="flex items-center">
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors duration-200 ${
                      activeItem === item.name ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
                  {item.name}
                </div>
                {item.badge && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-blue-600 bg-blue-100 rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          <div className="flex-shrink-0 border-t border-gray-200 bg-gray-50">
            <div className="px-4 py-4">
              {renderUserInfo()}
              <button 
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                <LogOut className="mr-3 h-4 w-4 text-gray-400" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-blue-600">EduPortal</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.name);
                  setSidebarOpen(false);
                }}
                className={`
                  group flex items-center justify-between px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                  ${activeItem === item.name
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                  }
                `}
              >
                <div className="flex items-center">
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors duration-200 ${
                      activeItem === item.name ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
                  {item.name}
                </div>
                {item.badge && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-blue-600 bg-blue-100 rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-gray-50">
            <div className="px-4 py-4">
              {renderUserInfo()}
              <button 
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                <LogOut className="mr-3 h-4 w-4 text-gray-400" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
