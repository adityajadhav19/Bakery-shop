"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const msg = await res.text();
      setError(msg);
      setLoading(false);
      return;
    }

    setSuccess("Signup successful! You can now continue.");
    setForm({ username: "", email: "", phone: "" , password: "" });

    setTimeout(() => {
      router.push("/");
    }, 1500);

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(237,219,193)]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-[rgb(139,69,19)]">
          Create Account
        </h1>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <input
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          required
        />

        <input
          placeholder="Email"
          type="email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <input
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          required
        />
        <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        value={form.password}
        onChange={(e) =>
            setForm({ ...form, password: e.target.value })
        }
        required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[rgb(139,69,19)] text-white rounded hover:opacity-90"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
        <button type="button" className="mt-4 text-black hover:text-[rgb(139,69,19)]" onClick={() => router.push("/login")}>
        Already have an account? Login 
      </button>
      </form>
    </div>
  );
}
