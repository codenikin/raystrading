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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-2 sm:max-w-xl md:max-w-2xl">
        <button
          onClick={handleClose}
          className="absolute right-1 top-1 z-10 rounded-full bg-white p-2 text-gray-600 shadow-lg transition-colors hover:text-gray-800 sm:-right-4 sm:-top-4"
          aria-label="Close popup"
        >
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6"
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
        <div className="relative aspect-[4/3] w-full sm:aspect-[3/2]">
          <Image
            src={imageUrl}
            alt={altText}
            fill
            priority
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 70vw, 800px"
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
