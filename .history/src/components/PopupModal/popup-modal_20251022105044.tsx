'use client'
import { Phone, Mail, Home, Globe, Download, ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface PopupModalProps {
  imageUrl: string
  altText?: string
  onClose?: () => void
  autoShowDelay?: number // delay in milliseconds before showing the popup
}

export default function PopupModal({
  imageUrl,
  altText = 'Popup Image',
  onClose,
  autoShowDelay = 0,
}: PopupModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, autoShowDelay)

    return () => clearTimeout(timer)
  }, [autoShowDelay])

  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 p-3">
      <div className="relative w-full max-h-[90vh] overflow-y-auto rounded-xl bg-white p-4 sm:w-[90%] md:w-[600px]">
        {/* Close button - Fixed position */}
        <div className="sticky top-0 right-0 z-[70] flex justify-end">
          <button
            onClick={handleClose}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-xl transition-all hover:bg-red-600 active:scale-95"
            aria-label="Close popup"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="mt-2 w-full rounded-xl bg-white shadow-sm space-y-4">
          <h2 className="text-center text-2xl font-semibold mb-2">
            CONTACT <span className="text-red-600">US</span>
          </h2>
          <div className="flex items-start gap-3">
            <Home className="text-red-600 mt-1" />
            <h1 className="text-center text-xl font-bold mb-4">Exide Care - Rays Trading Hosur</h1>
          </div>
          <div className="flex items-start gap-3">
            <Home className="text-red-600 mt-1" />

            <p>
              Rays Trading(Exide care) #66/3,Railway station Road,
              <br />
              Shanthi Nagar West,Near Murugan Temple,Opp. Singaravelan Bakery
              <br />
              Hosur-635109,Tamil Nadu
            </p>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Phone className="text-red-600" />
            <a href="tel:+918069840399" className="text-blue-600 hover:underline">
              +91-9442532024
            </a>
          </div>

          {/* Website */}
          <div className="flex items-start gap-3">
            <Globe className="text-red-600 mt-1" />
            <a
              href="https://maps.app.goo.gl/qprMpkGQ5HjJCqfbA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              Location
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="text-red-600" />
            <a href="mailto:srinivasabatteries@yahoo.com" className="text-blue-600 hover:underline">
              yogeshna3@gmail.com
            </a>
          </div>

          {/* QR Section */}
          <div className="text-center mt-6">
            <img
              src="/images/raysqr2.png"
              alt="QR Code"
              className="mx-auto w-48 h-48 object-contain"
            />
            <p className="mt-3 text-sm">
              Tell us about your experience. <br />
              Scan this QR code to discover more with us.
            </p>

            <div className=" bg-white border-t  flex justify-around py-3">
              <a
                href="tel:+919442532024"
                className="text-green-600 font-semibold flex items-center gap-2"
              >
                <Phone size={18} /> Call
              </a>
              <a
                href="https://maps.app.goo.gl/VzM5xL3Z53X5Pzom8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold flex items-center gap-2"
              >
                <Globe size={18} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
