"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const message = "Hi! I'm interested in your Cakes. Please share more details."
    const whatsappNumber = "917756855898" // Replace with actual number
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="bg-[rgb(139,69,19)] hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        size="lg"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="sr-only">Contact us on WhatsApp</span>
      </Button>
      
    </div>
  )
}
