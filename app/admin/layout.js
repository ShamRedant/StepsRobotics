'use client';
import { useState } from "react";
import { Poppins } from "next/font/google";
import Sidebar from "./components/Sidebar";
import "./admin.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`${poppins.variable} font-sans flex`}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className={`p-6 admin-main bg-gray-50 min-h-screen w-full transition-all duration-300
          ml-0 md:ml-${collapsed ? '14' : '64'}`}
      >
        {children}
      </main>
    </div>
  );
}
