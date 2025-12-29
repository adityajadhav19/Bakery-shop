"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Star, Heart, Award } from "lucide-react";
import WhatsAppButton from "@/components/whatsapp-button";
import { useEffect, useState } from "react";
import { translations } from "@/lib/translation";

export default function HomeClient({ products }: { products: any[] }) {
  const [lang, setLang] = useState<"en" | "mr">("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as "en" | "mr";
    if (savedLang) setLang(savedLang);
  }, []);

  const t = translations[lang];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[rgb(237,219,193)] to-[rgb(139,69,19)] py-25 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-[rgb(237,219,193)] text-[rgb(139,69,19)]">
                <Leaf className="w-4 h-4 mr-2" />
                {t.badge}
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-[rgb(139,69,19)]">
                {t.heroTitle1}
                <br />
                <span>{t.heroTitle2}</span>
              </h1>

              <p className="text-xl text-gray-600">{t.description}</p>

              <div className="flex gap-4">
                <Button asChild size="lg" className="bg-[rgb(139,69,19)]">
                  <Link href="/products">{t.shopNow}</Link>
                </Button>

                <Button asChild size="lg" variant="outline">
                  <Link href="/about">{t.ourStory}</Link>
                </Button>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400" />
                ))}
                <span className="ml-2 text-gray-600">{t.happyCustomers}</span>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/Hero.jpg"
                alt="Hero"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <Heart className="w-6 h-6 text-[rgb(139,69,19)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="bg-[rgb(139,69,19)] text-white">
              {t.featured}
            </Badge>
            <h2 className="text-3xl font-bold mt-4 text-[rgb(139,69,19)]">{t.bestSellers}</h2>
            <p className="text-black mt-2">{t.featuredDescription}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-black">
            {products.map((p) => (
              <Card key={p.id}>
                <Image
                  src={p.image}
                  alt={p.name}
                  width={400}
                  height={300}
                  className="rounded-t-lg"
                />
                <CardContent className="p-4 space-y-2 text-black">
                  <h3 className="font-bold">{p.name}</h3>
                  <p>{p.price}</p>
                  <Button asChild className="w-full bg-[rgb(139,69,19)]">
                    <Link href="/products">{t.viewAll}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Our Story Section */}
<section className="py-20 px-4 bg-gradient-to-r from-green-50 to-yellow-50">
  <div className="container mx-auto max-w-6xl">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Image */}
      <div className="relative">
        <Image
          src="/Shop.png"
          alt="Our Story"
          width={500}
          height={400}
          className="rounded-2xl shadow-lg"
        />
        <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-yellow-600" />
            <div>
              <p className="font-semibold text-gray-900">Since 2025</p>
              <p className="text-sm text-gray-600">Best Quality</p>
            </div>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="space-y-6">
        <Badge className="bg-yellow-100 text-yellow-800">
          {t.ourStory}
        </Badge>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          {t.storyTitle}
        </h2>

        <p className="text-lg text-gray-600 leading-relaxed">
          {t.storyPara1}
        </p>

        <p className="text-lg text-gray-600 leading-relaxed">
          {t.storyPara2}
        </p>

        <Button asChild className="bg-[rgb(198,134,66)]">
          <Link href="/about">{t.readMore}</Link>
        </Button>
      </div>
    </div>
  </div>
</section>


      <WhatsAppButton />
    </div>
  );
}
