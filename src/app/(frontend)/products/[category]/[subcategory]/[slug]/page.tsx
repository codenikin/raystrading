export const dynamic = 'force-dynamic'
import { getPayload } from '@/lib/payload'
import type { Product } from '@/payload-types'
import { draftMode } from 'next/headers'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import ProductImageSection from '@/components/ProductImageSection'
import { ShareButtons } from '@/components/ShareButtons'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; category: string; subcategory: string }>
}): Promise<Metadata> {
  const configPromise = import('@/payload.config')
  const payload = await getPayload({ config: configPromise })

  const productResult = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: (await params).slug,
      },
    },
  })

  const product = productResult.docs[0]

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }
  {
  }
  return {
    title: product.title,
    description: product.meta?.description ?? '',
    metadataBase: new URL('https://raystrading.com'),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en-US',
      },
    },
    openGraph: {
      title: product.title,
      description: product?.meta?.description ?? '',
      siteName: 'https://raystrading.com',

      locale: 'en_US',
      type: 'website',
    },
  }
}

type Args = {
  category: string
  subcategory: string
  slug: string
}

export default async function Product({ params }: { params: Promise<Args> }) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params
  const configPromise = import('@/payload.config')
  const payload = await getPayload({ config: configPromise })
  const productResult = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const product = productResult.docs[0]
  function formatIndianPrice(price: number | string) {
    return Number(price).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    })
  }
  if (!product) {
    return (
      <div className="pt-[90px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product could not be found</p>
        </div>
      </div>
    )
  }

  const selectedImage =
    typeof product.heroImage === 'object' &&
    product.heroImage !== null &&
    'url' in product.heroImage
      ? (product.heroImage.url ?? '/placeholder.jpg') // <- THIS ENSURES it's never null
      : '/placeholder.jpg'
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product.schemaMarkup) }}
        key="product-schema-markup"
      />

      <div className="pt-[80px] min-h-screen flex flex-col bg-white">
        <div className="relative w-full h-[320px] md:h-[620px]">
          <Image
            src="/images/bg.jpg"
            alt="Dahua Solutions Banner"
            fill
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
            <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg animate-bounce m-8">
              <span className="text-white font-anton text-5xl md:text-7xl">RAYS</span>
              <span className="text-red-500 font-anton text-5xl md:text-7xl"> TRADING HOSUR</span>
            </h1>
            <p className="text-xl max-w-3xl text-white/90 p-8 md:pd-0">
              Trusted Exide battery distributor, Rays Trading delivers reliable power solutions for
              cars, inverters & industries. Quality you can count on.
            </p>
          </div>
        </div>

        <div className="flex-grow">
          <section className="py-16 bg-gray-50">
            <div className="py-4 px-2 sm:py-8 sm:px-4 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900 animate-bounce">
                    {product.title}
                  </h2>
                  <p className="text-lg text-gray-700 mx-auto animate-pulse">
                    Browse through our extensive product categories to find the perfect security
                    solution for your needs.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {/* Image Gallery Section - Enhanced */}
                    <ProductImageSection
                      selectedImage={selectedImage}
                      productHighlights={product.highlights}
                      productTitle={product.title}
                    />
                    {/* Product Details Section */}
                    <div className="p-2 sm:p-6 lg:p-8">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            {product.title}
                          </h2>

                          {/* Price and Rating Section */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg
                                    key={star}
                                    className="w-5 h-5 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">(4.8 / 150 reviews)</span>
                            </div>
                            <div className="text-2xl font-bold text-red-600">
                              {formatIndianPrice(product.pricep)}
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-base text-gray-600 leading-relaxed mb-6">
                            {product.description}
                          </p>

                          <div className="space-y-6 mb-6">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900 mb-4">
                                Battery Capacity
                              </h3>
                              <div className="grid grid-cols-3 gap-3">
                                {['100ah', '150ah', '200ah'].map((capacity) => (
                                  <div
                                    key={capacity}
                                    className={`px-4 py-2 rounded-lg border-2 cursor-pointer transition-all
            ${
              product.batteryCapacity === capacity
                ? 'border-red-600 bg-red-50 text-red-600 font-medium'
                : 'border-gray-200'
            }`}
                                  >
                                    {capacity.toUpperCase()}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Product Highlights */}
                          {product.specifications && product.specifications.length > 0 && (
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                              <h3 className="text-sm font-medium text-gray-900 mb-3">
                                Specifications
                              </h3>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                                {product.specifications.map((spec, index) => (
                                  <li key={index} className="text-gray-600">
                                    {spec.spec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Contact Button */}
                        <div className="pt-3 sm:pt-4">
                          <Link
                            href="/Contact"
                            className="group relative w-full inline-flex items-center justify-center px-6 py-4 bg-red-600 text-white text-base font-medium rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            Get a Quote
                          </Link>
                        </div>

                        <div className="share-container pt-4 border-t border-gray-100">
                          <p className="mb-3 text-sm font-medium text-gray-600">Share:</p>
                          <ShareButtons title={product.title} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
