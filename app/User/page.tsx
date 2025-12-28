"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Star, Heart } from "lucide-react";
import WhatsAppButton from "@/components/whatsapp-button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { translations } from "@/lib/translation";

export default function UserHomePage() {
  const router = useRouter();

  const [username, setUsername] = useState<string | null>(null);
  const [lang, setLang] = useState<"en" | "mr">("en");

  /* 🔐 Protect page */
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  /* 👤 Load username */
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUsername(storedName);
  }, []);

  /* 🌐 Load language */
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as "en" | "mr";
    if (savedLang) setLang(savedLang);
  }, []);

  const t = translations[lang];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-[rgb(237,219,193)] to-[rgb(139,69,19)] py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <div className="space-y-6">
              <Badge className="bg-[rgb(237,219,193)] text-[rgb(139,69,19)]">
                <Leaf className="w-4 h-4 mr-2" />
                {t.badge}
              </Badge>

              {/* Welcome */}
              {username && (
                <h2 className="text-2xl md:text-3xl font-semibold text-[rgb(139,69,19)]">
                  {t.welcome},{" "}
                  <span className="font-bold">{username}</span>
                </h2>
              )}

              <h1 className="text-4xl md:text-6xl font-bold text-[rgb(139,69,19)] leading-tight">
                {t.heroTitle1}
                <br />
                <span>{t.heroTitle2}</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                {t.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[rgb(139,69,19)] hover:scale-105 transition"
                >
                  <Link href="/products">{t.shopNow}</Link>
                </Button>

                <Button size="lg" variant="outline">
                  <Link href="/about">{t.ourStory}</Link>
                </Button>
              </div>

              <div className="flex items-center gap-2 pt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  {t.happyCustomers}
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Hero.jpg"
                  alt="Hero"
                  width={600}
                  height={500}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="bg-[rgb(237,219,193)] p-2 rounded-full">
                  <Heart className="w-6 h-6 text-[rgb(139,69,19)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4 bg-[rgb(139,69,19)] text-white">
            {t.featured}
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.bestSellers}
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.featuredDescription}
          </p>

          <div className="mt-12">
            <Button size="lg" variant="outline">
              <Link href="/products">{t.viewAll}</Link>
            </Button>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  );
}
