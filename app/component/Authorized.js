"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Authorized() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Unauthorized</h1>
        <p className="text-gray-600 mb-6">
          You must be logged in to access this page.  
          Please log in to continue.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
