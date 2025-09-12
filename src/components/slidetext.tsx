'use client'

import { motion } from 'framer-motion'

export default function SlidingTextBackground() {
  return (
    <div className="relative flex min-h-64 items-center justify-center bg-black overflow-hidden">
      {/* Sliding Background Text */}
      <motion.div
        className="absolute whitespace-nowrap text-[15rem] font-black text-white/10 tracking-[1rem] leading-none font-anton"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
        }}
        // style={{
        //   textShadow: '0 0 10px rgba(255,255,255,0.1)',
        // }}
      >
        RAYS TRADING ✦ HOSUR ✦ RAYS TRADING ✦ HOSUR ✦
      </motion.div>

      {/* Foreground Content */}
      <h1 className="relative text-white text-5xl md:text-7xl font-bold z-10 text-center leading-tight tracking-wide">
        <span className="font-anton">RAYS TRADING HOSUR</span>
        <span className="text-red-600 block mt-4 text-3xl md:text-4xl font-anton">
          Indias No.1 Battery Dealer
        </span>
      </h1>
    </div>
  )
}
