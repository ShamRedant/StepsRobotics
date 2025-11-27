"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "../components/Loader";
import Link from "next/link";
import axios from "axios";

export default function LMSDashboard() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const [counts, setCounts] = useState({
    totalUsers: 0,
    totalStudents: 0,
    newStudents: 0
  });


  const fetchCounts = async () => {
    try {
      const res = await axios.get("/api/register/count");
      console.log("API response:", res.data); // ✅ Check the shape
      setCounts(res.data); // ✅ Only once
      setLoading(false);
    } catch (error) {
      console.error("Error fetching counts:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCounts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.push("/unauthorized");
      return;
    }
    setAuthorized(true);
    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
      setCurrentTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) return <Loader />;
  if (!authorized) return null;



  return (
    <div className="p-6 admin-main bg-gray-50 min-h-screen ml-64">
      {/* Header */}
      <div className="container admin-header py-4">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
          <div className="col-span-12 md:col-span-3">
            <p className="font-poppins admin-user-name font-semibold text-lg">
              Hello Admin
            </p>
            <p className="text-sm font-poppins text-gray-600">{currentTime}</p>
          </div>
          <div className="col-span-12 md:col-span-6">
            <input
              type="search"
              placeholder="Search Students, Courses..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-12 md:col-span-3 flex items-center justify-end space-x-6">
            <div className="relative">
              <Image src="/notify.svg" width={24} height={24} alt="notify" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                5
              </span>
            </div>
            <div className="flex items-center space-x-3 bg-gray-50 px-3 py-2 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition">
              <Image
                src="/profile.png"
                width={40}
                height={40}
                alt="profile"
                className="rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">LMS Super Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-green-50 shadow-md rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700">Total Students</p>
          <h2 className="text-2xl font-bold mt-1">
            {counts.totalStudents.toLocaleString()}
          </h2>
          <p className="text-sm text-green-600 mt-1">
            {counts.newStudents} New
          </p>
        </div>
        <div className="bg-blue-50 shadow-md rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700">Total Courses</p>
          <h2 className="text-2xl font-bold mt-1">85</h2>
          <p className="text-sm text-blue-600 mt-1">5 New</p>
        </div>
        <div className="bg-purple-50 shadow-md rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700">Active Faculty</p>
          <h2 className="text-2xl font-bold mt-1">120</h2>
          <p className="text-sm text-purple-600 mt-1">12 New</p>
        </div>
        <div className="bg-yellow-50 shadow-md rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700">Total Staff</p>
          <h2 className="text-2xl font-bold mt-1">35</h2>
          <p className="text-sm text-yellow-600 mt-1">2 New</p>
        </div>
      </div>

      {/* Courses & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Ongoing Courses</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="pb-2">Course</th>
                <th className="pb-2">Progress</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Faculty</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="hover:bg-gray-50 transition">
                <td className="py-2">Web Development</td>
                <td className="py-2">
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">70%</span>
                </td>
                <td className="py-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                    On Track
                  </span>
                </td>
                <td className="py-2">John Doe</td>
                <td className="py-2">...</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="py-2">Data Science</td>
                <td className="py-2">
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">45%</span>
                </td>
                <td className="py-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                    Delayed
                  </span>
                </td>
                <td className="py-2">Jane Smith</td>
                <td className="py-2">...</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Task Progress */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Assignments Progress</h3>
          <div className="flex justify-between mb-4">
            <div className="text-center">
              <p className="text-xl font-bold">40</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">15</p>
              <p className="text-xs text-gray-500">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">5</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>

          <div className="flex h-2 rounded-full overflow-hidden mb-4">
            <div className="bg-blue-400" style={{ width: "60%" }}></div>
            <div className="bg-green-400" style={{ width: "30%" }}></div>
            <div className="bg-red-400" style={{ width: "10%" }}></div>
          </div>

          <h3 className="text-lg font-semibold mb-2">Recent Activities</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✔ Assignment &quot;React Basics&quot; completed</li>
            <li>⚠ Assignment &quot;API Integration&quot; delayed</li>
            <li>✔ Assignment &quot;Deploy Project&quot; submitted</li>
          </ul>
        </div>
      </div>

      {/* Notifications & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="font-semibold mb-2">Notifications</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>New student registered</li>
            <li>Course &quot;Python&quot; updated</li>
            <li>Faculty meeting scheduled</li>
          </ul>
        </div>
        {/* <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="font-semibold mb-2">Quick Actions</h4>
          <button className="w-full bg-blue-500 text-white py-2 rounded mb-2 hover:bg-blue-600">
            Add Student
          </button>
          <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Add Course
          </button>
        </div> */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="font-semibold mb-2">Quick Actions</h4>

          <Link href="/admin/add-users">
            <button className="w-full bg-blue-500 text-white py-2 rounded mb-2 hover:bg-blue-600">
              Add Student
            </button>
          </Link>

          <Link href="/courses/add">
            <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
              Add Course
            </button>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="font-semibold mb-2">Messages</h4>
          <p className="text-sm text-gray-600">No new messages</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="font-semibold mb-2">System Status</h4>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">All systems operational</p>
        </div>
      </div>
    </div>
  );
}
