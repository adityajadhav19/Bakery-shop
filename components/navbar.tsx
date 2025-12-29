"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { translations } from "@/lib/translation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<"admin" | "user" | null>(null);

  /* 🌐 Language */
  const [lang, setLang] = useState<"en" | "mr">("en");
  const t = translations[lang];

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as "en" | "mr";
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleLanguage = () => {
    const nextLang = lang === "en" ? "mr" : "en";
    localStorage.setItem("lang", nextLang);
    setLang(nextLang);
    window.location.reload(); // simple & safe
  };

  /* 🔐 Auth check */
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("userToken");

    if (adminToken) {
      setIsLoggedIn(true);
      setRole("admin");
    } else if (userToken) {
      setIsLoggedIn(true);
      setRole("user");
    } else {
      setIsLoggedIn(false);
      setRole(null);
    }
  }, [pathname]);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
    router.push("/");
  };

  const navigation = [
    { key: "home", href: "/" },
    { key: "products", href: "/products" },
    { key: "about", href: "/about" },
    { key: "contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl px-5">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-[rgb(237,219,193)] p-2 rounded-full">
              <img src="/logo-cut.png" alt="Logo" width={47} height={47} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">
                The Royal Cake Studio
              </div>
              <div className="text-xs text-gray-600">Since 2025</div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-6 ">
            {navigation.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-gray-900 hover:text-[rgb(139,69,19)] font-medium"
              >
                {t[item.key as keyof typeof t]}
              </Link>
            ))}

            {/* 🌐 Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 border rounded text-sm bg-[rgb(139,69,19)] text-white hover:bg-[rgb(237,219,193)] hover:text-black transition"
            >
              {lang === "en" ? "मराठी" : "English"}
            </button>

            {/* WhatsApp */}
            <Button
              className="bg-[rgb(139,69,19)] hover:scale-105 transition"
              onClick={() => {
                const msg =
                  "Hi! I'm interested in your Cakes. Please share more details.";
                window.open(
                  `https://wa.me/917020513097?text=${encodeURIComponent(msg)}`,
                  "_blank"
                );
              }}
            >
              {t.orderNow}
            </Button>

            {/* AUTH */}
            {!isLoggedIn ? (
              <Link href="/login">
                <button className="px-4 py-2 border rounded bg-[rgb(139,69,19)] text-white">
                  {t.login}
                </button>
              </Link>
            ) : (
              <>
                {role === "admin" && (
                  <Link href="/admin">
                    <button className="px-4 py-2 border rounded bg-[rgb(139,69,19)] text-white">
                      {t.admin}
                    </button>
                  </Link>
                )}

                {role === "user" && (
                  <Link href="/user">
                    <button className="px-4 py-2 border rounded bg-[rgb(139,69,19)] text-white">
                      {t.dashboard}
                    </button>
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="px-4 py-2 bg-black text-white rounded"
                >
                  {t.logout}
                </button>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden text-gray-900">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {isOpen && (
          <div className="md:hidden bg-white border-t px-4 py-3 space-y-3 text-black">
            {navigation.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-900 font-medium"
              >
                {t[item.key as keyof typeof t]}
              </Link>
            ))}

            <button
              onClick={toggleLanguage}
              className="w-full border px-3 py-2 rounded"
            >
              {lang === "en" ? "मराठी" : "English"}
            </button>

            {!isLoggedIn ? (
              <Link href="/login">
                <button className="w-full border px-3 py-2 rounded">
                  {t.login}
                </button>
              </Link>
            ) : (
              <>
                {role === "admin" && (
                  <Link href="/admin">
                    <button className="w-full border px-3 py-2 rounded">
                      {t.admin}
                    </button>
                  </Link>
                )}

                {role === "user" && (
                  <Link href="/user">
                    <button className="w-full border px-3 py-2 rounded">
                      {t.dashboard}
                    </button>
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="w-full bg-red-600 text-white px-3 py-2 rounded"
                >
                  {t.logout}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
