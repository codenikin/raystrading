'use client'
import { useState } from 'react'
import ZoomImage from '@/components/ZoomImage'
import FullScreenImageModal from '@/components/FullScreenImageModal'

type ProductImageSectionProps = {
  selectedImage: string
  productTitle: string
  productHighlights?: { spec: string }[]
}

export default function ProductImageSection({
  selectedImage,
  productTitle,
  productHighlights,
}: ProductImageSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <div className="p-4 sm:p-6 bg-white space-y-6">
        <div className="relative h-72 sm:h-[400px] rounded-xl overflow-hidden group flex items-center justify-center">
          <ZoomImage
            src={selectedImage}
            alt={productTitle}
            width={500}
            height={384}
            onClick={openModal}
          />
        </div>

        {/* Color Options */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Features</h3>
            <div className="grid grid-cols-3 gap-3">
              {['WITH  WARRANTY', 'FREE  DELIVERY', '100% GENUINE'].map((resolution) => (
                <label key={resolution} className="relative">
                  <input
                    type="radio"
                    name="image-resolution"
                    value={resolution}
                    className="peer sr-only"
                  />
                  <div className="peer-checked:bg-red-600 peer-checked:text-white text-black text-center py-2 border border-gray-300 rounded cursor-pointer transition-all hover:border-red-600 peer-checked:border-red-600">
                    {resolution}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Quick Highlights */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Highlights</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {productHighlights?.map((spec, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span className="text-gray-600">{spec.spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 sm:gap-4"></div>
      </div>

      <FullScreenImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        src={selectedImage}
        alt={productTitle}
      />
    </>
  )
}
