export const dynamic = 'force-dynamic'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Category, Product } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

type Media = {
  url: string
  width?: number
  height?: number
  alt?: string
}
type Args = { params: Promise<{ slug?: string }>; category: string }
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const payload = await getPayload({ config: configPromise })

  const categoryDoc = await payload
    .find({
      collection: 'categories',
      where: { slug: { equals: category } },
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
      url: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002'}/products/${category}`,
      siteName: 'Lovosis Technology L.L.C',
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
  const { category } = await params
  const payload = await getPayload({ config: configPromise })
  const categoryResult = await payload.find({
    collection: 'categories',
    depth: 2,
    limit: 12,
    overrideAccess: false,
    where: {
      slug: {
        equals: category,
      },
    },
  })

  const categoryDoc = categoryResult.docs[0] as Category

  if (!categoryDoc) {
    console.error(`Category not found: ${category}`)
    return (
      <div className="pt-[90px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category &ldquo;{category}&rdquo; could not be found.</p>
        </div>
      </div>
    )
  }
  const subcategories = categoryDoc?.subcategories
  const categoryTitle = categoryDoc?.title
  return (
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
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{categoryTitle}</h2>
              <p className="text-lg  text-gray-700  mx-auto">
                Browse through our extensive product categories to find the perfect security
                solution for your needs.
              </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {subcategories?.map((cat) => {
                  if (typeof cat !== 'object' || cat === null || !('id' in cat)) return null
                  return (
                    <div key={cat.id} className="p-4 ">
                      <Link href={`/products/${category}/${cat.slug}`}>
                        {cat.title}
                        <div className="group relative">
                          {/* Card */}
                          <div
                            className="bg-white rounded-2xl p-6 transition-all duration-300 
                                            shadow-[0_0_20px_rgba(0,0,0,0.05)] 
                                            hover:shadow-[0_0_25px_rgba(0,0,0,0.2)]
                                            border border-slate-100 hover:border-red-100"
                          >
                            {/* Image Wrapper */}
                            <div className="relative h-64 mb-6 bg-gradient-to-b from-red-50/50 to-transparent rounded-xl p-4">
                              <div className="absolute inset-0 bg-red-50/30 rounded-xl transform rotate-3 scale-95 transition-transform duration-300 group-hover:rotate-6"></div>
                              <div className="absolute inset-0 bg-white/80 rounded-xl transform -rotate-3 scale-95 transition-transform duration-300 group-hover:-rotate-6"></div>
                              {typeof cat.SubcategoryImage === 'object' &&
                              cat.SubcategoryImage !== null &&
                              'url' in cat.SubcategoryImage ? (
                                <Image
                                  src={(cat.SubcategoryImage as Media).url}
                                  alt={cat.title}
                                  width={600}
                                  height={384}
                                  className="relative h-full w-full object-contain p-4 transform transition-transform duration-300 group-hover:scale-110"
                                />
                              ) : (
                                <div className="relative h-full w-full flex items-center justify-center">
                                  <div className="text-2xl font-bold text-red-600/80">
                                    {cat.title}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="relative">
                              <h2 className="text-xl font-semibold text-slate-800 mb-3 text-center">
                                {cat.title}
                              </h2>

                              {cat.description && (
                                <p className="text-gray-600 text-sm mb-4 text-center line-clamp-2">
                                  {cat.description}
                                </p>
                              )}

                              {/* Button */}
                              <div className="flex items-center justify-center space-x-2 text-red-600">
                                <span className="relative">
                                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                  <span className="font-medium">Learn Mor</span>
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
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
