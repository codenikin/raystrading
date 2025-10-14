'use client'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-2xl rounded-lg bg-white p-2">
        <button
          onClick={handleClose}
          className="absolute -right-4 -top-4 rounded-full bg-white p-2 text-gray-600 shadow-lg hover:text-gray-800"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="relative h-[400px] w-[600px]">
          <Image
            src={imageUrl}
            alt={altText}
            fill
            priority
            className="rounded-lg object-contain"
            onError={(e) => {
              console.error('Error loading image:', imageUrl)
            }}
          />
        </div>
      </div>
    </div>
  )
}
