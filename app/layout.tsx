import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Royal Cake Studio - Premium & Custom Cake Studio | Maharashtra",
  description:
    "Experience premium, freshly baked cakes and desserts in Kamalpura, Ranjangaon, Chhatrapati Sambhajinagar. Made with carefully selected ingredients and a passion for baking, our creations add sweetness to every celebration.",
  keywords:
    "Premium cakes, custom cakes, bakery in Kamalpura, cake shop in Ranjangaon, fresh bakery items, celebration cakes, local bakery Maharashtra",
  authors: [{ name: "The Royal Cake Studio" }],
  creator: "The Royal Cake Studio",
  publisher: "The Royal Cake Studio",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://TheRoyalCakeStudio.com",
    siteName: "The Royal Cake Studio",
    title: "The Royal Cake Studio - Premium & Custom Cake Studio",
    description: "Experience premium, freshly baked cakes and desserts in Kamalpura, Ranjangaon, Chhatrapati Sambhajinagar. Made with carefully selected ingredients and a passion for baking, our creations add sweetness to every celebration.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Active Amla Delights - Premium Amla Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Royal Cake Studio - Premium & Custom Cake Studio",
    description: "Experience premium, freshly baked cakes and desserts in Kamalpura, Ranjangaon, Chhatrapati Sambhajinagar. Made with carefully selected ingredients and a passion for baking, our creations add sweetness to every celebration.",
    images: ["/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
