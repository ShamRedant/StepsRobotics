"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";
import { icons } from "lucide-react";

export default function Sidebar({ collapsed, setCollapsed }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      localStorage.removeItem("role");
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.push("/unauthorized");
      return;
    }
    setAuthorized(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [router]);
  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "/attendance.svg" },
    { href: "/admin/add-users", label: "Users", icon: "/user.svg" },
    { href: "/admin/dashboard/courses", label: "Courses", icon: "/lms.svg" },
    {
      href: "/admin/dashboard",
      label: "Classroom & Timetable",
      icon: "/class.svg",
    },
    { href: "/admin/dashboard/programs", label: "Programs", icon: "/exam.svg" },
    { href: "/admin/dashboard/content", label: "Content", icon: "/exam.svg" },
    { href: "/admin/dashboard/feedbackcourse", label: "Course Feedback", icon: "/attendance.svg" },
    { href: "/admin/reports", label: "Exams & Results", icon: "/exam.svg" },
    { href: "/admin/dashboard/roles", label: "Roles", icon: "/user.svg" },
    { href: "/admin/dashboard/contacts", label: "Contact Info", icon: "/user.svg" },
    { href: "/admin/settings", label: "Settings", icon: "/settings.svg" },
  ];
  if (loading) return <Loader />;
  if (!authorized) return null;
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed overflow-y-auto left-0 top-0 h-full bg-white shadow-xl z-50 transform transition-all duration-300 ease-in-out border-r border-gray-200
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
          ${collapsed ? "lg:w-20" : "lg:w-64"} 
          w-64`}
      >
        <div
          className={`p-4 border-b border-gray-200 flex items-center ${collapsed ? "lg:justify-center" : "justify-between"
            }`}
        >
          <div className={`flex items-center ${collapsed ? "lg:hidden" : ""}`}>
              <Image
                            src="/logo.png"
                            alt="Steps Robotics Logo"
                            width={700}
                            height={60}
                            className="h-16 w-auto"
                          />
          </div>
          <div className={`${collapsed ? "hidden lg:block" : "hidden"}`}>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-teal-600 font-bold text-lg shadow-md">
              SA
            </div>
          </div>
          <button
            className="lg:hidden text-xl p-2 hover:bg-gray-200 rounded-lg transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="hidden lg:block p-3 border-b border-gray-100">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full p-3 text-gray-600 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-all duration-200 flex items-center ${collapsed ? "justify-center" : "justify-between"
              } group`}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span className={`${collapsed ? "hidden" : "text-sm font-medium"}`}>
              Toggle Menu
            </span>
            <span
              className={`transform transition-transform duration-300 text-lg ${collapsed ? "" : "group-hover:translate-x-1"
                }`}
            >
              {collapsed ? "▶️" : "◀️"}
            </span>
          </button>
        </div>
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-3 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 group relative transform hover:scale-105 ${collapsed ? "lg:justify-center lg:px-2" : ""
                }`}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.label : ""}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={24}
                height={24}
                className="min-w-[28px] transition-transform duration-200 group-hover:scale-110"
              />
              <span
                className={`ml-3 font-medium transition-all duration-200 ${collapsed ? "lg:hidden" : ""
                  }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center px-3 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 group relative ${collapsed ? "lg:justify-center lg:px-2" : ""
              }`}
          >
            <Image
              src="/logout.svg"
              alt="Logout"
              width={24}
              height={24}
              className="min-w-[28px] transition-transform duration-200 group-hover:scale-110"
            />
            <span
              className={`ml-3 font-medium transition-all duration-200 ${collapsed ? "lg:hidden" : ""
                }`}
            >
              Logout
            </span>
          </button>
        </nav>
        <div
          className={`p-4 border-t border-gray-200 mt-auto ${collapsed ? "lg:px-2" : ""
            } bg-gray-50`}
        >
          <div
            className={`flex items-center ${collapsed ? "lg:justify-center" : ""
              }`}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold">U</span>
            </div>
            <div className={`ml-3 ${collapsed ? "lg:hidden" : ""}`}>
              <p className="text-sm font-semibold text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@company.com</p>
            </div>
          </div>
        </div>
      </aside>
      <button
        className="fixed top-4 left-4 z-30 lg:hidden p-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
      >
        <span className="text-lg">☰</span>
      </button>
    </>
  );
}
