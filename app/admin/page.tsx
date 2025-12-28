"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    "products" | "users" | "messages"
  >("products");

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "cake",
  });

  /* ---------------- AUTH ---------------- */
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
    }
    setLoading(false);
  }, [router]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    router.push("/login");
  };

  /* ---------------- LOADERS ---------------- */
  const loadProducts = async (authToken: string) => {
    const res = await fetch("/api/admin/products", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (res.status === 401) return logout();
    setProducts(await res.json());
  };

  const loadUsers = async (authToken: string) => {
    const res = await fetch("/api/admin/users", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (res.status === 401) return logout();
    setUsers(await res.json());
  };

  const loadMessages = async (authToken: string) => {
    const res = await fetch("/api/admin/messages", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (res.status === 401) return logout();
    setMessages(await res.json());
  };

  useEffect(() => {
    if (token) loadProducts(token);
  }, [token]);

  /* ---------------- PRODUCT ACTIONS ---------------- */
  const toggleField = async (
    id: number,
    field: "inStock" | "isVisible",
    value: boolean
  ) => {
    await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ [field]: !value }),
    });
    loadProducts(token!);
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Delete this product?")) return;

    await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadProducts(token!);
  };

  const addProduct = async () => {
    if (!form.name || !form.price || !imageFile) {
      alert("Name, price and image required");
      return;
    }

    const fd = new FormData();
    fd.append("file", imageFile);

    const upload = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });

    if (!upload.ok) return alert("Image upload failed");

    const { url } = await upload.json();

    await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...form, image: url }),
    });

    setShowModal(false);
    setForm({ name: "", description: "", price: "", category: "cake" });
    setImageFile(null);
    loadProducts(token!);
  };

  /* ---------------- MESSAGE ACTIONS ---------------- */
  const deleteMessage = async (id: number) => {
    if (!confirm("Delete this message?")) return;

    await fetch(`/api/admin/messages/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadMessages(token!);
  };

  if (loading) return null;

  return (
    <div className="p-8 min-h-screen bg-[rgb(237,219,193)] space-y-8 text-black">
      {/* TABS */}
      <div className="flex gap-4">
        {["products", "users", "messages"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab as any);
              if (tab === "users") loadUsers(token!);
              if (tab === "messages") loadMessages(token!);
            }}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-[rgb(178,87,38)] text-white"
                : "bg-[rgb(139,69,19)] text-black border"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
{activeTab === "products" && (
  <>
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-900">
        Products Management
      </h2>
      <button
        onClick={() => setShowModal(true)}
        className="bg-[rgb(139,69,19)] text-white px-4 py-2 rounded shadow"
      >
        + Add Product
      </button>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      {products.length === 0 ? (
        <p className="text-gray-600">No products found</p>
      ) : (
        products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow p-5 flex justify-between items-start"
          >
            <div>
              <h3 className="font-bold text-lg text-gray-900">
                {p.name}
              </h3>
              <p className="text-gray-700">{p.price}</p>

              <div className="mt-2 text-sm text-gray-600">
                <span
                  className={`mr-3 ${
                    p.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {p.inStock ? "In Stock" : "Out of Stock"}
                </span>
                |
                <span
                  className={`ml-3 ${
                    p.isVisible ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {p.isVisible ? "Visible" : "Hidden"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => toggleField(p.id, "inStock", p.inStock)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Toggle Stock
              </button>
              <button
                onClick={() =>
                  toggleField(p.id, "isVisible", p.isVisible)
                }
                className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
              >
                Toggle Visibility
              </button>
              <button
                onClick={() => deleteProduct(p.id)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </>
)}


      {/* USERS TAB */}
{activeTab === "users" && (
  <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="px-6 py-4 bg-[rgb(237,219,193)] border-b">
      <h2 className="text-xl font-semibold text-gray-900">
        Registered Users
      </h2>
      <p className="text-sm text-gray-600">
        View all users who have registered on the website
      </p>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[rgb(139,69,19)] text-white">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold">Username</th>
            <th className="px-4 py-3 text-sm font-semibold">Email</th>
            <th className="px-4 py-3 text-sm font-semibold">Phone</th>
            <th className="px-4 py-3 text-sm font-semibold">Joined On</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-6 text-center text-gray-600"
              >
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-[rgba(237,219,193,0.4)] transition"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {user.email}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {user.phone}
                </td>
                <td className="px-4 py-3 text-gray-600 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

     {/* MESSAGES */}
{activeTab === "messages" && (
  <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="px-6 py-4 bg-[rgb(237,219,193)] border-b">
      <h2 className="text-xl font-semibold text-gray-900">
        Contact Messages
      </h2>
      <p className="text-sm text-gray-600">
        Messages sent from the contact form
      </p>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-[rgb(139,69,19)] text-white">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Message</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-600">
                No messages received
              </td>
            </tr>
          ) : (
            messages.map((m) => (
              <tr
                key={m.id}
                className="border-b hover:bg-[rgba(237,219,193,0.4)] transition"
              >
                <td className="px-4 py-3 font-medium">
                  {m.name}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {m.email}
                </td>
                <td className="px-4 py-3 text-gray-700 max-w-md truncate">
                  {m.message}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => deleteMessage(m.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

      {/* ADD PRODUCT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="font-bold mb-4">Add Product</h2>

            <input
              className="w-full border p-2 mb-2"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <textarea
              className="w-full border p-2 mb-2"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-2"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <input
              type="file"
              className="w-full border p-2 mb-2"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                onClick={addProduct}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
