'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface TabContentProps {
  id: string
  aria: string
  src: string
  alt: string
  isVisible: boolean
}

export const TabContent: React.FC<TabContentProps> = ({ id, aria, src, alt, isVisible }) => {
  const [imageError, setImageError] = useState(false)

  // Return early if no src or previous error
  if (!src || imageError) {
    console.warn(`No image source provided for tab ${id}`)
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        id={id}
        role="tabpanel"
        aria-labelledby={aria}
        className={isVisible ? 'block' : 'hidden'}
      >
        <div className="relative aspect-[4/3] bg-gray-100 rounded-xl">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            No image available
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      id={id}
      role="tabpanel"
      aria-labelledby={aria}
      className={isVisible ? 'block' : 'hidden'}
    >
      <div className="relative aspect-[4/3]">
        <Image
          className="w-full rounded-xl object-cover shadow-xl"
          src={src}
          alt={alt || ''}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          onError={() => setImageError(true)}
        />
      </div>
    </motion.div>
  )
}

export default TabContent
