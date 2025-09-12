'use client'

import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'

const brandImages = [
  { src: '/images/exidenobg.png', alt: 'Dahua Brand' },
  { src: '/images/din.png', alt: 'Dahua Technology' },
  { src: '/images/rider.png', alt: 'Dahua Security' },
  { src: '/images/pro.png', alt: 'Dahua Solutions' },
  { src: '/images/three.png', alt: 'Dahua Systems' },
]

const BrandSlider = () => {
  const controls = useAnimation()

  React.useEffect(() => {
    controls.start({
      x: [0, -2000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 30,
          ease: 'linear',
        },
      },
    })
    return () => controls.stop()
  }, [controls])

  return (
    <div className="relative w-full overflow-hidden bg-white py-10 dark:bg-gray-900">
      <div className="relative mx-auto max-w-[85rem] px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 font-anton dark:text-gray-200 sm:text-3xl">
            Your Power, Our Promise with Exide
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-full">
          <div className="relative">
            <motion.div
              className="flex items-center justify-around gap-6"
              animate={controls}
              initial={{ x: 0 }}
            >
              {[...brandImages, ...brandImages, ...brandImages].map((image, index) => (
                <motion.div
                  key={index}
                  className="relative h-40 w-80 flex-shrink-0 cursor-pointer"
                  whileHover={{
                    scale: 1.1,
                    filter: 'brightness(1.2)',
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100px, 160px"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandSlider
