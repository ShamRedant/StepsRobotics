"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);

  const [form, setForm] = useState({
    days: "",
    duration: "",
    time: "",
    venue: "",
    materials: "",
    mentors: "",
    batch_size: "",
  });

  // Fetch all programs
  const fetchPrograms = async () => {
    try {
      const res = await axios.get("/api/programs");
      setPrograms(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // Handle form field change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Open add/edit form
  const openForm = (program = null) => {
    if (program) {
      setEditingProgram(program);
      setForm({
        days: program.days,
        duration: program.duration,
        time: program.time,
        venue: program.venue,
        materials: program.materials,
        mentors: program.mentors,
        batch_size: program.batch_size,
      });
    } else {
      setEditingProgram(null);
      setForm({
        days: "",
        duration: "",
        time: "",
        venue: "",
        materials: "",
        mentors: "",
        batch_size: "",
      });
    }
    setShowForm(true);
  };

  // Add or Update program
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProgram) {
        await axios.put(`/api/programs/${editingProgram.id}`, form);
      } else {
        await axios.post("/api/programs", form);
      }
      setShowForm(false);
      fetchPrograms();
    } catch (error) {
      console.error(error);
      alert("Save failed");
    }
  };

  // Delete program
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this program?")) {
      try {
        await axios.delete(`/api/programs/${id}`);
        fetchPrograms();
      } catch (error) {
        console.error(error);
        alert("Delete failed");
      }
    }
  };

  return ( 
    <div className="p-6 ml-64 admin-main">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Program Management</h1>
        <button
          onClick={() => openForm()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Program
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {editingProgram ? "Edit Program" : "Add Program"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
              <input
                type="text"
                name="days"
                placeholder="Days (e.g. Saturday & Sunday)"
                value={form.days}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration (e.g. 2 Days (Weekend))"
                value={form.duration}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <input
                type="text"
                name="time"
                placeholder="Time (e.g. 10:00 AM – 4:00 PM)"
                value={form.time}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <textarea
                name="venue"
                placeholder="Venue"
                value={form.venue}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <textarea
                name="materials"
                placeholder="Materials"
                value={form.materials}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <textarea
                name="mentors"
                placeholder="Mentors"
                value={form.mentors}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <textarea
                name="batch_size"
                placeholder="Batch Size"
                value={form.batch_size}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
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
                  className="px-4 py-2 rounded ml-[10px] bg-blue-600 text-white hover:bg-blue-700"
                >
                  {editingProgram ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <p>Loading programs...</p>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b">ID</th>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b">Days</th>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b">Duration</th>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b">Venue</th>
                <th className="py-3 px-4 text-center text-sm font-semibold border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program, index) => (
                <tr
                  key={program.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors`}
                >
                  <td className="py-3 px-4 border-b">{program.id}</td>
                  <td className="py-3 px-4 border-b">{program.days}</td>
                  <td className="py-3 px-4 border-b">{program.duration}</td>
                  <td className="py-3 px-4 border-b truncate max-w-[300px]">
                    {program.venue}
                  </td>
                  <td className="py-3 px-4 border-b text-center flex justify-center gap-3">
                    <button
                      onClick={() => openForm(program)}
                      className="bg-yellow-400 px-3 py-1 rounded text-sm font-medium hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(program.id)}
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
