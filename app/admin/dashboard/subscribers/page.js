"use client";
import { useEffect, useState } from "react";

export default function SubscribersPage() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = async (pageNum = 1) => {
    const res = await fetch(`/api/subscribe?page=${pageNum}&limit=10`);
    const json = await res.json();

    setList(json.data);
    setPage(json.page);
    setTotalPages(json.totalPages);
  };

  const deleteEmail = async (id) => {
    await fetch(`/api/subscribe/${id}`, { method: "DELETE" });
    load(page); // reload same page
  };

  useEffect(() => {
    load(page);
  }, [page]);

  return (
    <div className="py-6 admin-main bg-gray-50 min-h-screen ml-64 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <h1 className="text-xl font-bold mb-4">Subscribers List</h1>

      {list.map((item) => (
        <div key={item.id} className="flex justify-between p-3 border mb-2 rounded-md bg-white">
          <div>
            <p className="font-medium">{item.email}</p>
            <p className="text-xs text-gray-500">
              {new Date(item.created_at).toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => deleteEmail(item.id)}
            className="text-red-600 hover:text-red-800 transition"
          >
            Delete
          </button>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex items-center gap-3 mt-6">
        <button
          disabled={page === 1}
          onClick={() => load(page - 1)}
          className={`px-4 py-2 rounded ${
            page === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500"
          }`}
        >
          Previous
        </button>

        <span className="px-3 py-1 text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => load(page + 1)}
          className={`px-4 py-2 rounded ${
            page === totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
