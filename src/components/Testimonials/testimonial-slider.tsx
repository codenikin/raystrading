'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    text: 'Dahua security solutions completely transformed our approach to campus safety. The high-resolution cameras and intuitive software make monitoring effortless.',
    name: 'Michael Johnson',
    role: 'Security Director',
    company: 'West Valley College',
  },
  {
    id: 2,
    text: "The AI-powered detection capabilities have reduced our false alarms by 87%. I can't imagine running our facility security without Dahua innovative solutions.",
    name: 'Sarah Williams',
    role: 'Operations Manager',
    company: 'Metro Shopping Centers',
  },
  {
    id: 3,
    text: 'Implementation was seamless and the ongoing support has been exceptional. Our team was up and running on the new system in less than a day.',
    name: 'David Chen',
    role: 'CTO',
    company: 'Nexus Technologies',
  },
]

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto relative">
          <div
            className="absolute top-0 left-4 text-9xl font-serif text-red-600 opacity-30"
            aria-hidden="true"
          ></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 text-center px-6 py-12"
            >
              <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                {testimonials[current].text}
              </p>

              <div>
                <p className="text-lg font-bold text-white">{testimonials[current].name}</p>
                <p className="text-red-500">
                  {testimonials[current].role} at {testimonials[current].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`w-12 h-12 rounded-full transition-all ${
                  current === index ? 'bg-red-600 scale-90' : 'bg-gray-600 hover:bg-gray-400'
                }`}
                style={{ touchAction: 'manipulation' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
