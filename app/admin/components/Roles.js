"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";

export default function Roles() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [form, setForm] = useState({
    full_name: "",
    student_id: "0",
    age: "",
    grade: "1",
    email: "",
    parent_phone: "0000000000",
    password: "",
    role: "",
    access: 1,
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/register/roles");
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openForm = (user = null) => {
    if (user) {
      setEditingUser(user);
      setForm({
        full_name: user.full_name || "",
        student_id: user.student_id || "",
        age: user.age || "",
        grade: user.grade || "",
        email: user.email || "",
        parent_phone: user.parent_phone || "",
        password: "",
        role: user.role || "",
      });
    } else {
      setEditingUser(null);
      setForm({
        full_name: "",
        student_id: "0",
        age: "0",
        grade: "1",
        email: "",
        parent_phone: "0000000000",
        password: "",
        role: "",
        access: "1",
      });
    }
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`/api/register/${editingUser.id}`, form);
      } else {
        await axios.post("/api/register", form);
      }
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/register/${id}`);
        fetchUsers();
      } catch (error) {
        console.error(error);
        alert("Deletion failed");
      }
    }
  };

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.full_name?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.role?.toLowerCase().includes(searchLower) ||
        user.id?.toString().includes(searchLower)
      );
    });
  }, [users, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginationRange = () => {
    const range = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) range.push(i);
        range.push('...');
        range.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        range.push(1);
        range.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) range.push(i);
      } else {
        range.push(1);
        range.push('...');
        range.push(currentPage - 1);
        range.push(currentPage);
        range.push(currentPage + 1);
        range.push('...');
        range.push(totalPages);
      }
    }
    return range;
  };

  return (
    <div className="p-6 ml-64">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Roles Management</h1>
        <button
          onClick={() => openForm()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add User Account
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? "Edit User" : "Add User"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={form.full_name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder={
                  editingUser ? "Leave blank to keep password" : "Password"
                }
                value={form.password}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required={!editingUser}
              />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="support">Support</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="staff">Staff</option>
              </select>

              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 ml-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  {editingUser ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search and Items Per Page */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by name, email, role, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Show:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold border-b">ID</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold border-b">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold border-b">Email</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold border-b">Role</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500">
                      {searchTerm ? "No users found matching your search" : "No users found"}
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition-colors`}
                    >
                      <td className="py-3 px-4 border-b">{user.id}</td>
                      <td className="py-3 px-4 border-b font-medium">{user.full_name}</td>
                      <td className="py-3 px-4 border-b">{user.email}</td>
                      <td className="py-3 px-4 border-b">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-700"
                              : user.role === "editor"
                              ? "bg-green-100 text-green-700"
                              : user.role === "staff"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => openForm(user)}
                            className="bg-yellow-400 px-3 py-1 rounded text-sm font-medium hover:bg-yellow-500 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="bg-red-500 px-3 py-1 rounded text-sm font-medium text-white hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Info and Controls */}
          {filteredUsers.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of{" "}
                {filteredUsers.length} entries
                {searchTerm && ` (filtered from ${users.length} total entries)`}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>

                {getPaginationRange().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    disabled={page === '...'}
                    className={`px-3 py-1 rounded border ${
                      page === currentPage
                        ? "bg-blue-500 text-white"
                        : page === '...'
                        ? "bg-white text-gray-400 cursor-default"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded border ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}