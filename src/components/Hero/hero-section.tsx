'use client'
import { motion } from 'framer-motion'
import { Homepage } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

interface HeroSectionProps {
  homepage: Homepage
}
const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="container mx-auto h-full  px-4 py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row h-full items-center gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 px-4 md:px-1 py-18 lg:py-24">
            <motion.div
              initial={{ opacity: 1, x: 0, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1.05 }}
              transition={{
                duration: 4,
                ease: 'linear',
              }}
              className="max-w-xl"
            >
              <h1 className="text-5xl md:text-7xl font-anton text-white mb-4 tracking-wide leading-tight">
                We are more than
                <span className="text-red-600 block !font-anton tracking-wide font-extrabold">
                  just a battery shop
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-4 font-anton">
                we’re your trusted partner for reliable power solutions. With unmatched prices,
                genuine products, and professional service, Rayas Trading is the name customers
                across Hosur count on.
              </p>

              <div className="flex flex-wrap  gap-4 mt-16">
                <Link
                  href="/products"
                  className="mt-8 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-md text-lg !font-outfit transition-all"
                >
                  Explore Products
                </Link>
                <Link
                  href="/contact"
                  className="mt-8 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-md text-lg !font-outfit transition-all"
                >
                  Contact Sales
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <motion.div
              className="relative w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1.1 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear',
              }}
            >
              <Image
                src="/images/exidenobg.png"
                alt="Next Generation Security Solutions"
                width={800}
                height={600}
                priority
                className="w-full h-auto max-h-[300px] md:max-h-[400px] lg:max-h-[600px] object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
      {/* 
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 "
        animate={{
          y: [0, -10, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        <div className="w-8 h-12 border-2 border-white rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </motion.div> */}
    </section>
  )
}

export default HeroSection
