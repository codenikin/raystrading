'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ProductGrid from '@/components/ProductShowcase/product-grid'
import type { Product, Category } from '@/payload-types'

interface AmronClientProps {
  products: Product[]
  categories: Category[]
}

const technologiesData = [
  {
    id: 1,
    title: 'Long-Lasting Performance',
    description:
      'Amaron batteries are built with advanced technology that ensures high durability and consistent performance, whether for cars, inverters, or heavy commercial use..',
    image: '/images/amron.png',
    link: '/technologies/wizsense',
  },
  {
    id: 2,
    title: 'Warranty & Maintenance Service',
    description:
      'At Rays Trading, we don’t just sell Amaron batteries – we provide complete after-sales support. Every Amaron battery comes with a manufacturer’s warranty (24 to 72 months depending on the model), and we ensure a hassle-free warranty claim process for our customers..',
    image: '/images/bbb.png',
    link: '/technologies/wizmind',
  },
  {
    id: 3,
    title: 'Amaron E-Rickshaw Batteries',
    description:
      'Amaron E-Rickshaw batteries are specially designed for longer mileage, higher load capacity, and quick charging, making them the perfect choice for daily commercial use. Built with high cycle life technology, these batteries ensure maximum savings for owners and drivers by reducing frequent replacements.',
    image: '/images/e-riksha.png',
    link: '/technologies/full-color',
  },
  {
    id: 4,
    title: 'Amaron Inverter Batteries',
    description:
      'Amaron inverter batteries are built for uninterrupted power supply, ensuring your home, office, or business never faces downtime. Designed with advanced tall tubular technology, they deliver long backup hours, quick recharge, and exceptional durability.',
    image: '/images/inverter.png',
    link: '/technologies/auto-tracking',
  },
  {
    id: 5,
    title: 'Amaron Car Batteries',
    description:
      'Amaron car batteries are trusted for their high cranking power, long life, and zero-maintenance design, ensuring your vehicle starts instantly every time. Built with advanced silver alloy technology, these batteries deliver reliable performance even in extreme weather conditions.',
    image: '/images/sss1.png',
    link: '/technologies/hdcvi-ten',
  },
  {
    id: 6,
    title: 'Amaron Commercial Batteries',
    description:
      'Amaron commercial batteries are engineered for heavy-duty performance, making them the perfect choice for trucks, buses, tractors, and other commercial vehicles. Built with high cranking power and rugged technology, these batteries are designed to withstand tough road conditions and long working hours.',
    image: '/images/Commerical.jpg',
    link: '/technologies/predictive-focus',
  },
]
export default function AmronClient({ products, categories }: AmronClientProps) {
  return (
    <div className="pt-20">
      <div className="relative h-[320px] md:h-[620px] w-full bg-[#cccccc] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/amron.png"
            alt="Amron Background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          {/* Text Overlay */}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: 'easeOut',
              }}
              className="text-7xl font-anton md:text-6xl font-bold text-center mb-4"
            >
              Welcome to Amron
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: 'easeOut',
              }}
              className="text-xl md:text-2xl text-center max-w-3xl font-anton"
            >
              Innovative Security Solutions for Tomorrow&apos;s Challenges
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: 'easeOut',
              }}
              className="mt-8"
            >
              <a
                href="#contact"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
              >
                Get Started
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-black font-anton">
            RAYS AMRON CARE
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologiesData.map((tech) => (
              <motion.div
                key={tech.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: tech.id * 0.1,
                }}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={tech.image}
                    alt={tech.title}
                    fill
                    className="object-cover object-center w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-bold mb-1 text-black">{tech.title}</h3>
                  <p className="text-black text-lg leading-relaxed">{tech.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <ProductGrid products={products} categories={categories} />
        </div>
      </div>
      {/* Get Free Consultation Section */}
      <div
        style={{
          background: '#95C93D',
          padding: '64px 0',
          color: 'white',
          textAlign: 'center',
          marginTop: '60px',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2
              style={{
                fontSize: '2.2rem',
                fontWeight: 'bold',
                marginBottom: '28px',
              }}
            >
              Need a New Battery Today?
            </h2>
            <p
              style={{
                fontSize: '1.15rem',
                marginBottom: '36px',
                opacity: 0.95,
              }}
            >
              Get reliable car, inverter, and commercial batteries at the best price in Hosur. Call
              us now for quick installation and same-day delivery!
            </p>
            <a
              href="/contact"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold px-10 py-4 rounded-full text-lg shadow transition-colors duration-200"
              style={{
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(24,90,219,0.10)',
                display: 'inline-block',
              }}
            >
              Get Free Consultation
            </a>
          </div>
        </div>
      </div>

      {/* Products Grid Section */}
    </div>
  )
}
