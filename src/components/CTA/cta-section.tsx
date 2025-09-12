'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">
      {/* Background pattern elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-64 -top-64 w-[40rem] h-[40rem] rounded-full bg-red-600/20 blur-3xl"></div>
        <div className="absolute -left-64 -bottom-64 w-[30rem] h-[30rem] rounded-full bg-blue-600/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10  items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto  flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-anton leading-tight">
            we bring you trusted performance, long life, and unmatched reliability
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust Dahua for their security needs. Our team
            is ready to provide a personalized solution for your requirements.
          </p>

          <motion.div
            className="grid md:grid-cols-2 gap-8 mt-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href="/contact"
                className="block w-full py-4   px-8 bg-red-600 hover:bg-red-700 rounded-lg text-xl font-medium transition-all"
              >
                Request a Demo
              </Link>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href="/products"
                className="block w-full py-4 px-8 bg-transparent hover:bg-white/10 border-2 border-white rounded-lg text-xl font-medium transition-all"
              >
                Explore Products
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
