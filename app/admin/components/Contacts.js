"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const fetchContacts = async () => {
    try {
      const res = await axios.get("/api/contact");
      setContacts(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openForm = (contact = null) => {
    if (contact) {
      setEditingContact(contact);
      setForm({
        firstName: contact.firstname || contact.firstName,
        lastName: contact.lastname || contact.lastName,
        email: contact.email,
        phone: contact.phone,
        message: contact.message,
      });
    } else {
      setEditingContact(null);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    }
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContact) {
        await axios.put(`/api/contact/${editingContact.id}`, form);
      } else {
        await axios.post("/api/contact", form);
      }
      setShowForm(false);
      fetchContacts();
    } catch (error) {
      console.error(error);
      alert("Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      try {
        await axios.delete(`/api/contact/${id}`);
        fetchContacts();
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
        <h1 className="text-2xl font-bold">Contacts</h1>
        <button
          onClick={() => openForm()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Contact
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">
              {editingContact ? "Edit Contact" : "Add Contact"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
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
                  className="px-4 py-2 rounded ml-[10px] bg-blue-600 text-white hover:bg-blue-700"
                >
                  {editingContact ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <p>Loading contacts...</p>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b">First Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b">Last Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b">Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b">Phone</th>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b">Message</th>
                <th className="py-3 px-4 text-center text-sm font-semibold border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr
                  key={contact.id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}
                >
                  <td className="py-3 px-4 border-b">{contact.firstname || contact.firstName}</td>
                  <td className="py-3 px-4 border-b">{contact.lastname || contact.lastName}</td>
                  <td className="py-3 px-4 border-b">{contact.email}</td>
                  <td className="py-3 px-4 border-b">{contact.phone}</td>
                  <td className="py-3 px-4 border-b truncate max-w-[300px]">{contact.message}</td>
                  <td className="py-3 px-4 border-b text-center flex justify-center gap-3">
                    <button
                      onClick={() => openForm(contact)}
                      className="bg-yellow-400 px-3 py-1 rounded text-sm font-medium hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
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
