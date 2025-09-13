export const dynamic = 'force-dynamic'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Product } from '@/payload-types'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
type Args = {
  category: string
  subcategory: string
  params: Promise<{ slug?: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ Subcategory: string; Category: string }>
}): Promise<Metadata> {
  const { Subcategory, Category } = await params

  const payload = await getPayload({ config: configPromise })

  const categoryDoc = await payload
    .find({
      collection: 'categories',
      where: { slug: { equals: Subcategory } },
      limit: 1,
      pagination: false,
    })
    .then((res) => res.docs?.[0])

  const title = categoryDoc?.meta?.title || categoryDoc?.title || 'Category Page'
  const description =
    categoryDoc?.meta?.description || `Explore products in the ${categoryDoc?.title} category.`

  const image = categoryDoc?.meta?.image
  const isImageObject = typeof image === 'object' && image !== null && 'url' in image

  const imageUrl = isImageObject
    ? `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002'}${image.url}`
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002'}/products/${Category}/${Subcategory}`,

      siteName: 'Lovosis ,Technology L.L.C',
      locale: 'en_US',
      type: 'website',
      images: isImageObject
        ? [
            {
              url: imageUrl!,
              width: image.width || 1200,
              height: image.height || 630,
              alt: image.alt || title,
            },
          ]
        : [],
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002'),
  }
}

export default async function Product({ params }: { params: Promise<Args> }) {
  const { isEnabled: draft } = await draftMode()
  const { subcategory, category } = await params
  const payload = await getPayload({ config: configPromise })
  const subcategoryResult = await payload.find({
    collection: 'subcategories',
    draft,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: subcategory,
      },
    },
    depth: 3,
  })

  // Handle case where subcategory is not found
  if (!subcategoryResult.docs || subcategoryResult.docs.length === 0) {
    console.error(`Subcategory not found: ${subcategory}`)
    // You might want to redirect to a 404 page or show an error
    return (
      <div className="pt-[90px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Subcategory Not Found</h1>
          <p className="text-gray-600">
            The subcategory &ldquo;{subcategory}&rdquo; could not be found.
          </p>
        </div>
      </div>
    )
  }

  const subcategoryId = subcategoryResult.docs[0].id

  const productsResult = await payload.find({
    collection: 'products',
    draft,
    overrideAccess: false,
    pagination: false,
    where: {
      subcategories: {
        equals: subcategoryId,
      },
    },
  })

  const products = productsResult.docs || []

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log(`Found ${products.length} products for subcategory: ${subcategory}`)
  }

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002'

  const productSchemas = products
    .filter((product) => product && product.title && product.slug) // Filter out invalid products
    .map((product) => ({
      '@type': 'Product',
      name: product.title,
      url: `${baseUrl}/products/${category}/${subcategory}/${product.slug}`,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: product.pricep ? String(product.pricep) : '0.00',
        availability: 'https://schema.org/InStock',
      },
    }))
  const filteredProductSchemas = productSchemas.filter((item) => item['@type'] !== 'Product')
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@graph': [
      ...filteredProductSchemas,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': baseUrl,
              '@type': 'WebPage',
              name: 'Home',
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@id': `${baseUrl}/products/${category}`,
              '@type': 'WebPage',
              name: category,
            },
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@id': `${baseUrl}/products/${category}/${subcategory}`,
              '@type': 'WebPage',
              name: subcategory,
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        key="product-schema"
      />

      <div className="pt-[80px] min-h-screen flex flex-col bg-white">
        <div className="relative w-full h-[320px] md:h-[420px]">
          <Image
            src="/images/bg.jpg"
            alt="Dahua Solutions Banner"
            fill
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
            <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
              <span className="text-white">Dahua</span>
              <span className="text-red-500"> Products</span>
            </h1>
            <p className="text-xl max-w-3xl text-white/90">
              Discover our comprehensive range of security products designed to meet all your
              surveillance and safety needs.
            </p>
          </div>
        </div>
        <div className="flex-grow">
          {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products && products.length > 0 ? (
              products
                .filter((product) => product && typeof product !== 'string' && product.id)
                .map((product) => (
                  <div key={product.id} className="p-4 ">
                    <Link
                      href={`/products/${category}/${subcategory}/${product.slug || 'unknown'}`}
                    >
                      {product.title || 'Untitled Product'}

                      <div className="group relative">
                        <div
                          className="bg-white rounded-2xl p-6 transition-all duration-300 
                                        shadow-[0_0_20px_rgba(0,0,0,0.05)] 
                                        hover:shadow-[0_0_25px_rgba(0,0,0,0.2)]
                                        border border-slate-100 hover:border-red-100"
                        >
                          <div className="relative h-48 mb-6 bg-gradient-to-b from-red-50/50 to-transparent rounded-xl p-4">
                            <div className="absolute inset-0 bg-red-50/30 rounded-xl transform rotate-3 scale-95 transition-transform duration-300 group-hover:rotate-6"></div>
                            <div className="absolute inset-0 bg-white/80 rounded-xl transform -rotate-3 scale-95 transition-transform duration-300 group-hover:-rotate-6"></div>
                            {typeof product.heroImage === 'object' &&
                            product.heroImage !== null &&
                            'url' in product.heroImage ? (
                              <Image
                                src={product.heroImage.url ?? '/placeholder.jpg'}
                                alt={product.title || 'Product Image'}
                                width={500}
                                height={384}
                                className="relative h-full w-full object-contain p-4 transform transition-transform duration-300 group-hover:scale-110"
                              />
                            ) : (
                              <div className="relative h-full w-full flex items-center justify-center">
                                <div className="text-2xl font-bold text-red-600/80">
                                  {product.title || 'Product'}
                                </div>
                              </div>
                            )}
                            {/* 
                          <img
                            src={(product.heroImage as Media)?.url ?? undefined}
                            alt={product.title}
                            className="relative h-full w-full object-contain p-4 transform transition-transform duration-300 group-hover:scale-110"
                          /> */}

                            {/* {product.heroImage && typeof product.heroImage !== 'string' && (
                            <img src={product.heroImage.url!} alt="" />
                          )} */}
                          </div>

                          {/* Content */}
                          <div className="relative">
                            <h2 className="text-xl font-semibold text-slate-800 mb-3 text-center">
                              {product.title || 'Untitled Product'}
                            </h2>

                            <p className="text-gray-600 text-sm mb-4 text-center line-clamp-2">
                              {product.description || 'No description available'}
                            </p>

                            {/* Button */}
                            <div className="flex items-center justify-center space-x-2 text-red-600">
                              <span className="relative">
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                <span className="font-medium">View Details</span>
                              </span>
                              <svg
                                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                            </div>

                            {/* Corner Accent */}
                            <div className="absolute -top-2 -right-2 w-8 h-8">
                              <div className="absolute inset-0 transform rotate-45 translate-x-4 -translate-y-4 bg-red-600/0 group-hover:bg-red-600/10 transition-all duration-300"></div>
                            </div>
                          </div>
                        </div>

                        {/* Hover Effects */}
                        <div className="absolute inset-0 -z-10 bg-red-600 rounded-2xl opacity-0 group-hover:opacity-5 transform scale-90 group-hover:scale-100 transition-all duration-300"></div>
                      </div>
                    </Link>
                  </div>
                ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">
                  There are no products available in this subcategory.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
