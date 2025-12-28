//contact/page.tsx
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-[rgb(237,219,193)] py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[rgb(139,69,19)] text-[rgb(237,219,193)]">
            <MessageCircle className="w-4 h-4 mr-2 text-[rgb(237,219,193)]" />
            Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact <span className="text-[rgb(139,69,19)]">Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about our products or want to place a custom order? We'd love to hear from you. Reach out and
            we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 bg-white p-10 rounded-2xl shadow-lg">
          {/* Contact Form */}
          <Card className="shadow-xl border-0 bg-[rgb(139,69,19)] text-[rgb(237,219,193)]">
            <CardHeader>
              <CardTitle className="text-2xl text-[rgb(237,219,193)]">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[rgb(237,219,193)] mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[rgb(237,219,193)] mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[rgb(237,219,193)] mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full"
                    placeholder="Tell us about your inquiry, custom orders, or any questions you have..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[rgb(237,219,193)] hover:bg-[rgb(234,198,147)] py-6 text-black font-bold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-[rgb(237,219,193)]">
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">
                      Sorry, there was an error sending your message. Please try again or contact us directly.
                    </p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
          <div className="grid lg:grid-row-2 gap-12">
          {/* Business Hours */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-[rgb(139,69,19)] via-[rgb(173,125,59)] to-[rgb(139,69,19)] text-[rgb(237,219,193)]">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-[rgb(139,69,19)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[rgb(237,219,193)] mb-2">Business Hours</h3>
                    <div className="text-[rgb(237,219,193)] space-y-1">
                      <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                      <p>Sunday: 10:00 AM - 5:00 PM</p>
                      <p className="text-sm text-[rgb(237,219,193)]">Closed on major holidays</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          {/* Visit Our Store */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-[rgb(139,69,19)] via-[rgb(173,125,59)] to-[rgb(139,69,19)] text-[rgb(237,219,193)]">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-[rgb(237,219,193)] p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-[rgb(139,69,19)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[rgb(237,219,193)] mb-2">Visit Our Store</h3>
                    <p className="text-[rgb(237,219,193)] leading-relaxed">
                      The Royal Cake Studio
                      <br />
                      Kamalapur, Near Enternace gate, Ranjangaon, 
                      <br />
                      Chhatrapati Sambhajinagar, Maharashtra 431136
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
            {/* Call Us */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-[rgb(139,69,19)] via-[rgb(173,125,59)] to-[rgb(139,69,19)] text-[rgb(237,219,193)]">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Phone: +91 7756855898
                      <br />
                      WhatsApp: +91 7756855898
                      <br />
                      <span className="text-sm text-gray-500">Available 9 AM - 7 PM</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Us */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-[rgb(139,69,19)] via-[rgb(173,125,59)] to-[rgb(139,69,19)] text-[rgb(237,219,193)]">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                    <p className="text-gray-600 leading-relaxed">
                      mored5293@gmail.com
                      <br />
                      mored5293@gmail.com
                      <br />
                      <span className="text-sm text-gray-500">We reply within 2-4 hours</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

        </div>

        {/* Map Section */}
        <div className="mt-20">
          <Card className="shadow-xl border border-[rgb(139,69,19)] overflow-hidden rounded-2xl 
  bg-gradient-to-r from-[rgb(211,149,62)] via-[rgb(221,188,141)] to-[rgb(211,149,62)]">

  {/* Header */}
  <CardHeader className="py-1">
    <CardTitle className="text-2xl text-black text-center">
      Find Us Here
    </CardTitle>
  </CardHeader>
  {/* Map */}
  <CardContent className="p-0">
    <div className="w-full h-96">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d749.9519889979724!2d75.21902017799775!3d19.836022911815395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1sen!2sin!4v1766838519970!5m2!1sen!2sin"
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>

    {/* Address */}
    <div className="flex items-center justify-center gap-2 p-4 text-black bg-[rgba(255,255,255,0.6)]">
      <MapPin className="w-5 h-5 text-[rgb(139,69,19)]" />
      <p className="text-sm text-center">
        Kamalapur, Near Entrance Gate, Ranjangaon,  
        Chhatrapati Sambhajinagar, Maharashtra 431136
      </p>
    </div>
  </CardContent>
</Card>

        </div>

        {/* Quick Contact CTA */}
        <div className="mt-20 text-center p-12 bg-gradient-to-r from-[rgb(139,69,19)] via-[rgb(221,188,141)] to-[rgb(139,69,19)] rounded-2xl border-0 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Immediate Assistance?</h2>
          <p className="text-xl font-bold text-gray-800 mb-8 max-w-2xl mx-auto">
            For urgent inquiries or immediate support, reach out to us on WhatsApp. We're here to help you with your
            Bakery needs.
          </p>
          <Button
            size="lg"
            className="bg-[rgb(139,69,19)] hover:bg-[rgb(146,101,37)]"
            onClick={() => {
              const message = "Hi! I have a question about your Bakery products. Could you please help me?"
              window.open(`https://wa.me/917756855898?text=${encodeURIComponent(message)}`, "_blank")
            }}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat on WhatsApp
          </Button>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  )
}
