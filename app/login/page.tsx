"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 🔹 Clear old session
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const msg = await res.text();
      setError(msg || "Invalid credentials");
      return;
    }

    const data = await res.json();

    // 🔐 Store token + username
    if (data.role === "admin") {
      localStorage.setItem("adminToken", data.token);
    } else {
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userName", data.username); // ✅ IMPORTANT
    }

    // 🚀 Redirect from backend
    router.push(data.redirect);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "rgb(237,219,193)" }}
    >
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "rgb(139,69,19)" }}
        >
          Login
        </h1>

        {error && (
          <p className="text-red-600 mb-4 text-center">{error}</p>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-black font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border text-black"
            style={{ borderColor: "rgb(139,69,19)" }}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-black font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded border text-black"
            style={{ borderColor: "rgb(139,69,19)" }}
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-2 rounded text-white font-semibold"
          style={{ backgroundColor: "rgb(139,69,19)" }}
        >
          Login
        </button>

        {/* Signup */}
        <button
          type="button"
          className="mt-4 text-black hover:text-[rgb(139,69,19)]"
          onClick={() => router.push("/signup")}
        >
          Don't have an account? Sign Up
        </button>
      </form>
    </div>
  );
}
