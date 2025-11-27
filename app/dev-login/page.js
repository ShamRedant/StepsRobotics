"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  useEffect(() => {
    function hideElements() {
      const header = document.querySelector(".header_part");
      const footer = document.querySelector(".footer");
      if (header) header.style.display = "none";
      if (footer) footer.style.display = "none";
    }
    hideElements();
    const observer = new MutationObserver(() => hideElements());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      const header = document.querySelector(".header_part");
      const footer = document.querySelector(".footer");
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/dev-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Invalid username or password");

      router.replace(next);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="w-full max-w-sm bg-gray-900/70 backdrop-blur-md border border-gray-700 shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Authentication Login</h1>

        {error && <p className="text-sm text-red-400 text-center mb-2">{error}</p>}

        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-1">
            <label className="text-sm text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-xl"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-xl"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition text-white font-medium disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}