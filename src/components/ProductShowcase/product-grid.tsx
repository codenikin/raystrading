'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Category, Product, Subcategory } from '@/payload-types'
import Link from 'next/link'
type Media = {
  url: string
}

export default function ProductGrid({
  products,
  categories,
}: {
  products: Product[]
  categories: Category[]
}) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [setHoveredProduct] = useState<string | null>(null)

  // Debug logging

  // Ensure we have valid arrays
  const validProducts = Array.isArray(products) ? products : []
  const validCategories = Array.isArray(categories) ? categories : []

  const filteredProducts =
    selectedCategory === 'all'
      ? validProducts
      : validProducts.filter((product) => {
          if (!product.categories) return false

          // Handle both array and single category cases
          if (Array.isArray(product.categories)) {
            return product.categories.some(
              (cat) =>
                typeof cat === 'object' &&
                cat !== null &&
                'id' in cat &&
                cat.id === selectedCategory,
            )
          } else if (
            typeof product.categories === 'object' &&
            product.categories !== null &&
            'id' in product.categories
          ) {
            return String(product.categories.id) === String(selectedCategory)
          }

          return false
        })

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900 font-anton ">
            Our <span className="text-black">Products</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              key={'all'}
              className={`px-4 py-2 rounded-full text-sm transition-all
                  ${
                    selectedCategory === 'all'
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 border border-gray-300'
                  }
                `}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            {validCategories
              .filter((category) => category && category.id && category.title) // Filter out invalid categories
              .map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm transition-all
                  ${
                    selectedCategory === String(category.id)
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 border border-gray-300'
                  }
                `}
                  onClick={() => setSelectedCategory(String(category.id))}
                >
                  {category.title}
                </button>
              ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="sync">
            {filteredProducts
              .filter((product) => product && product.id) // Filter out invalid products
              .map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden rounded-lg aspect-[3/4] group shadow-md border border-gray-200 hover:shadow-lg transition-shadow bg-white p-8"
                  onMouseEnter={() => String(product.id)}
                  onMouseLeave={() => null}
                >
                  {/* Offer Ribbon */}
                  {product.onSale && (
                    <div className="absolute -right-[40px] top-[25px] z-10">
                      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-bold px-12 py-1 transform rotate-45 shadow-lg before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-white/20 before:animate-shimmer">
                        {product.offerText || 'OFFER'}
                      </div>
                      {/* <div className="absolute top-0 -left-[10px] w-[10px] h-[5px] bg-red-800"></div>
                      <div className="absolute -bottom-[10px] -right-[10px] w-[10px] h-[10px] bg-red-800"></div> */}
                    </div>
                  )}
                  {/* Image Container - Takes up 70% of the card */}
                  <Link
                    href={`/products/${(() => {
                      if (!product.categories) return 'unknown'

                      if (Array.isArray(product.categories)) {
                        const firstCategory = product.categories[0] as Category
                        return firstCategory?.slug || 'unknown'
                      } else {
                        const category = product.categories as Category
                        return category?.slug || 'unknown'
                      }
                    })()}/${(() => {
                      if (!product.subcategories) return 'unknown'

                      if (Array.isArray(product.subcategories)) {
                        const firstCategory = product.subcategories[0] as Subcategory
                        return firstCategory?.slug || 'unknown'
                      } else {
                        const subcategory = product.subcategories as Subcategory
                        return subcategory?.slug || 'unknown'
                      }
                    })()}/${product.slug || 'unknown'}`}
                  >
                    <div className="relative w-full h-[60%] bg-gray-50">
                      <Image
                        src={(product.heroImage as Media)?.url || '/dahua.webp'}
                        alt={product.title || 'Product'}
                        width={400}
                        height={400}
                        className="object-contain w-full h-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/dahua.webp'
                        }}
                      />
                    </div>
                  </Link>
                  {/* Content Area - Takes up 40% of the card */}
                  <div className="relative h-[40%] p-2 flex flex-col justify-between bg-white ">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                        {product.title || 'Untitled Product'}
                      </h3>
                      <p className="text-gray-600 text-base line-clamp-2 mb-1">
                        {product.description || 'No description available'}
                      </p>
                      <p className="text-red-600 text-sm line-clamp-4 mb-3">warranty 48 months</p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
