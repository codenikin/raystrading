'use client'
import { Homepage, Media } from '@/payload-types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
interface Herosectionprops {
  videoUrl: Media
  homepage: Homepage
}
export const HeroSection: React.FC<Herosectionprops> = ({ videoUrl }) => {
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleError = () => {
      console.error('Video failed to load')
      setVideoError(true)
    }

    const handleLoad = () => console.log('Video loaded successfully')

    videoElement.addEventListener('error', handleError)
    videoElement.addEventListener('loadeddata', handleLoad)

    return () => {
      videoElement.removeEventListener('error', handleError)
      videoElement.removeEventListener('loadeddata', handleLoad)
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      {/* {!videoError ? (      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10"></div>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          loop
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src={videoUrl?.url ?? '/exidenew.mp4'} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : ( */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black overflow-hidden"
        style={{
          backgroundImage: "url('/images/exide3.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
      ></motion.div>
      {/* )} */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10"></div>

      <div className="relative z-20 container mx-auto px-4 md:px-14 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.1 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Next-Gen
            <span className="text-red-600 block">Security Solutions</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Protecting what matters most with cutting-edge technology and unmatched reliability.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-md text-lg font-medium transition-all"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 text-white rounded-md text-lg font-medium transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
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
      </motion.div>
    </section>
  )
}

export default HeroSection
