'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { CarFront, Bike, Truck, Battery } from 'lucide-react'

const features = [
  {
    icon: CarFront,
    title: 'Battery Sales & Installation',
    description:
      'Looking to exchange or resell your old battery? We offer the best buyback value in Hosur. Trade in your used battery and upgrade to a brand-new one at unbeatable prices..',
    color: 'bg-blue-500',
  },
  {
    icon: Bike,
    title: 'Battery Repair & Maintenance',
    description:
      'Extend the life of your battery with our expert repair and maintenance services. From testing to recharging, we make sure your battery runs efficiently and reliably.',
  },
  {
    icon: Truck,
    title: 'Water Purifier Installation',
    description:
      'Enjoy clean and safe drinking water with our professional water purifier installation service. Our technicians set up your system quickly and correctly for maximum efficiency.',
    color: 'bg-yellow-500',
  },

  {
    icon: Truck,
    title: 'Water Purifier Service & Maintenance',
    description:
      'Keep your water purifier performing at its best. We provide regular servicing, filter replacements, and complete maintenance to ensure pure, healthy water every day.',
    color: 'bg-yellow-500',
  },
  {
    icon: Battery,
    title: 'UPS Installation & service',
    description:
      'Power cuts are no longer a problem with our professional UPS installation services. We help you choose the right UPS and install it to keep your home or office running smoothly.',
  },
  {
    icon: Battery,
    title: 'Doorstep Battery Delivery',
    description:
      'Save time with our battery delivery and installation at your doorstep. Whether it’s a car, bike, inverter, or UPS battery, we bring genuine Exide batteries directly to you with professional fitting.',
    color: 'bg-red-500',
  },
  {
    icon: Truck,
    title: 'Battery Recharging',
    description:
      'Bring back life to your weak or drained battery with our professional recharging service. Our advanced charging equipment ensures safe, fast, and effective recharging, helping you save money and extend the life of your battery.',
  },
  {
    icon: Truck,
    title: 'Emergency Roadside Assistance',
    description:
      'Stuck on the road with a dead battery? Don’t worry—we’ve got you covered. Our emergency roadside assistance service provides quick battery jump-starts, replacements, and support to get you back on the move without delays.',
  },
]

export default function FeatureBlocks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const stats = [
    { value: 98, label: 'Customer Satisfaction', symbol: '%' },
    { value: 15, label: 'Years of Excellence', symbol: '+' },
    { value: 500, label: 'Happy Clients', symbol: '+' },
    { value: 24, label: 'Hours Support', symbol: '/7' },
  ]

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden"
    >
      <div className="mx-auto mb-12 w-full space-y-1 text-center sm:w-1/2 lg:w-1/3">
        <h2 className="text-4xl font-bold mb-8 text-center font-anton text-gray-900">
          Our <span className="text-white">Our Services</span>
        </h2>
      </div>
      <div
        className="absolute inset-0 z-0 animate-bg-slide"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none opacity-5"
        initial={{ scale: 0.5, y: 100 }}
        animate={{
          scale: 1,
          y: 0,
          rotate: [-2, 2],
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 8,
            ease: 'easeInOut',
          },
          scale: {
            duration: 1,
            ease: 'easeOut',
          },
          y: {
            duration: 1,
            ease: 'easeOut',
          },
        }}
      >
        <h1 className="text-[15rem] md:text-[20rem] font-bold text-white whitespace-nowrap tracking-tighter !font-anton">
          RAYS
        </h1>
      </motion.div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          // animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          // transition={{ duration: 0.8 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'mirror',
          }}
          className="absolute w-full rounded-full bg-red-600 blur-3xl opacity-40"
        >
          <h2 className="text-4xl md:text-5xl text-white max-w-3xl font-bold mb-6">
            Why Rays Trading Hosur
          </h2>
          <div className="h-1 w-24 bg-red-600 mb-8"></div>
          <p className="text-4xl md:text-5xl text-gray-300 max-w-3xl mb-6">
            Exide & Amaron Battery Dealers in Hosur | Rays Trading
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group"
            >
              <div
                className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-all`}
              >
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter
                to={stat.value}
                duration={1.5}
                delay={0.8 + index * 0.2}
                isInView={isInView}
                className="text-5xl md:text-6xl font-bold text-red-500"
                suffix={stat.symbol}
              />
              <p className="text-lg text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Animated counter component
function AnimatedCounter({
  to,
  duration = 1,
  delay = 0,
  isInView,
  className = '',
  suffix = '',
}: {
  to: number
  duration?: number
  delay?: number
  isInView: boolean
  className?: string
  suffix?: string
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = to
    const totalFrames = Math.round(duration * 60)
    const counter = setTimeout(() => {
      const changePerFrame = end / totalFrames
      const timer = setInterval(() => {
        start = start + changePerFrame
        if (start > end) {
          clearInterval(timer)
          setCount(end)
        } else {
          setCount(Math.floor(start))
        }
      }, 1000 / 60)

      return () => clearInterval(timer)
    }, delay * 1000)

    return () => clearTimeout(counter)
  }, [to, duration, isInView, delay])

  return (
    <span className={className}>
      {count}
      {suffix}
    </span>
  )
}
