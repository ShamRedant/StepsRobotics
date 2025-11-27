"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react";
import axios from "axios";

export default function FeedbackCourse() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    rating: "",
    text: "",
  });

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("/api/coursefeedback");
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // 🔹 Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Open Add/Edit form
  const openForm = (feedback = null) => {
    if (feedback) {
      setEditingFeedback(feedback);
      setForm({
        name: feedback.name,
        role: feedback.role,
        rating: feedback.rating,
        text: feedback.text,
      });
    } else {
      setEditingFeedback(null);
      setForm({
        name: "",
        role: "",
        rating: "",
        text: "",
      });
    }
    setFile(null);
    setShowForm(true);
  };

  // 🔹 Handle form submit (with image)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (file) formData.append("image", file);

      if (editingFeedback) {
        await axios.put(`/api/coursefeedback/${editingFeedback.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("/api/coursefeedback", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setShowForm(false);
      fetchFeedbacks();
    } catch (error) {
      console.error(error);
      alert("Save failed");
    }
  };

  // 🔹 Delete a feedback
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this feedback?")) {
      try {
        await axios.delete(`/api/coursefeedback/${id}`);
        fetchFeedbacks();
      } catch (error) {
        console.error(error);
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="p-6 admin-main ml-64">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Course Feedbacks</h1>
        <button
          onClick={() => openForm()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Feedback
        </button>
      </div>

      {/* Add/Edit Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">
              {editingFeedback ? "Edit Feedback" : "Add Feedback"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <input
                type="text"
                name="role"
                placeholder="Role (e.g. Principal - School Name)"
                value={form.role}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />

              {/* File upload */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="border rounded px-3 py-2 w-full"
              />

              {/* Show existing image in edit mode */}
              {editingFeedback?.image && !file && (
                <div className="flex items-center gap-3">
                  <img
                    src={editingFeedback.image}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <span className="text-sm text-gray-500">Current image</span>
                </div>
              )}

              <input
                type="number"
                name="rating"
                placeholder="Rating (0-5)"
                step="0.5"
                value={form.rating}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <textarea
                name="text"
                placeholder="Feedback message"
                value={form.text}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                rows={4}
              />

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
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  {editingFeedback ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feedback Table */}
      {loading ? (
        <p>Loading feedbacks...</p>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b">
                  Role
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b">
                  Image
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b">
                  Rating
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b">
                  Text
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback, index) => (
                <tr
                  key={feedback.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors`}
                >
                  <td className="py-3 px-4 border-b">{feedback.name}</td>
                  <td className="py-3 px-4 border-b">{feedback.role}</td>
                  <td className="py-3 px-4 border-b">
                    {feedback.image ? (
                      <img
                        src={feedback.image}
                        alt={feedback.name}
                        className="w-[25px] h-[25px] rounded-full object-cover"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="py-3 px-4 border-b">{feedback.rating}</td>
                  <td className="py-3 px-4 border-b max-w-[300px] truncate">
                    {feedback.text}
                  </td>
                  <td className="py-3 px-4 border-b text-center flex justify-center gap-3">
                    <button
                      onClick={() => openForm(feedback)}
                      className="bg-yellow-400 px-3 py-1 rounded text-sm font-medium hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(feedback.id)}
                      className="bg-red-500 px-3 py-1 rounded text-sm font-medium text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
