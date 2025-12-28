import Link from "next/link"
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-[rgb(237,219,193)] p-2 rounded-full">
                <img src="logo-cut.png" alt="logo" height="47em" width="47em"/>
              </div>
              <div>
                <div className="text-xl font-bold">The Royal Cake Studio</div>
                <div className="text-sm text-gray-400">Since 2025</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Experience premium, freshly baked cakes and desserts in Kamalpura, Ranjangaon, Chhatrapati Sambhajinagar. Made with carefully selected ingredients and a passion for baking, our creations add sweetness to every celebration.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/the_royal_cake_studio_?igsh=c3ltZXA0N2IyMzhr" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-green-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-green-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-green-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Products</h3>
             <dl className="space-y-2">
    <dt className="text-lg font-bold text-[rgb(139,69,19)]">Cake</dt>
    <dd>Chocolate Classic</dd>
    <dd>Chocolate Truffle</dd>
    <dd>Rasmalai</dd>
    <dd>Rabadi</dd>
    <dd>Kesar Dry Fruit</dd>
    <dd>Kulfi Faluda</dd>
    <dd>Butterscotch</dd>

  </dl>

  <dl className="space-y-2">
    <dt className="text-lg font-bold text-[rgb(139,69,19)]">Pastry</dt>
    <dd>Chocolate Classic</dd>
    <dd>Chocolate Truffle</dd>
    <dd>Rasmalai</dd>
    <dd>Rabadi</dd>
  </dl>

  <dl className="space-y-2">
    <dt className="text-lg font-bold text-[rgb(139,69,19)]">Pizza</dt>
    <dd>Plain</dd>
    <dd>Veggie</dd>
    <dd>Margherita</dd>
  </dl>

            
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <a href="https://maps.app.goo.gl/jrkWzZNst1N49pbW9">Kamalapur, Near Enternace gate, Ranjangaon
                  <br />
                  Chhatrapati Sambhajinagar, Maharashtra 431136</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div className="text-gray-400 text-sm">+91 7756855898</div>
                <br/>
                <div className="text-gray-400 text-sm">+91 9373749146</div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div className="text-gray-400 text-sm">mored5293@gmail.com</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} The Royal Cake Studio. All rights reserved. Made with ❤️ in Maharashtra.
          </p>
        </div>
      </div>
    </footer>
  )
}
