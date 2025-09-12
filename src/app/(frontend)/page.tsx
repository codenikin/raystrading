import { getPayload } from 'payload'
import HeroSection from '@/components/Hero/hero-section'
import ProductGrid from '@/components/ProductShowcase/product-grid'
import FeatureBlocks from '@/components/Features/feature-blocks'
import CTASection from '@/components/CTA/cta-section'
import { Metadata } from 'next'
import { Media } from '@/payload-types'
import Script from 'next/script'
import PrelineSection from '@/components/Preline/preline-section'
import SlidingTextBackground from '@/components/slidetext'
import BrandSlider from '@/components/BrandSlider/BrandSlider'
import TestimonialSlider from '@/components/Testimonials/testimonial-slider'
import configPromise from '@/payload.config' // Add this line to import configPromise
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  // Make sure to import or define configPromise above if not already
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 5 })
  const ogImageUrl = settings.siteImage as Media
  const metaTitle = settings.meta?.title || 'Default Site Title'
  const metaDescription = settings.meta?.description || 'Default description for SEO.'

  return {
    title: settings.meta?.title,
    description: settings.meta?.description ?? '',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002'),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en-US',
      },
    },
    openGraph: {
      title: settings.meta?.title ?? '',
      description: settings.meta?.description ?? '',
      url: settings.slug ?? '',
      siteName: settings.meta?.title || 'My Site',
      alternateLocale: '',
      countryName: 'U.A.E',
      phoneNumbers: '+971503308608',
      emails: 'sales@unvdubai.com',
      images: [
        {
          url: ogImageUrl?.sizes?.ogImage?.url ?? '',
          alt: settings.meta?.title || 'Site image',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      description: 'new description',
      images: [
        {
          url: ogImageUrl?.sizes?.ogImage?.url ?? '',
          alt: settings.meta?.title || 'Site image',
        },
      ],
    },
  }
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const homePageData = await payload.find({
    collection: 'homepage',
    depth: 1,
    limit: 1,
    overrideAccess: false,
  })

  const HomePage = homePageData.docs?.[0] ?? null
  const exideSubcategory = (
    await payload.find({
      collection: 'subcategories',
      // where: {
      //   slug: {
      //     equals: 'exide',
      //   },
      // },
    })
  ).docs[0]
  const products = exideSubcategory
    ? (
        await payload.find({
          collection: 'products',
          where: {
            subcategories: {
              equals: exideSubcategory.id,
            },
          },
          overrideAccess: false,
          pagination: false,
          depth: 2,
        })
      ).docs
    : []
  const categories = (
    await payload.find({
      collection: 'categories',
      overrideAccess: false,
      pagination: false,
      depth: 1,
    })
  ).docs
  return (
    <>
      <Script id="product-schema-markup" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(HomePage?.schemaMarkup)}
      </Script>
      <div className="relative w-full overflow-hidden">
        <HeroSection homepage={HomePage} />
        <SlidingTextBackground />
        <ProductGrid products={products} categories={categories} />
        {/* <BrandSlider /> */}
        <PrelineSection homepage={HomePage} />
        <FeatureBlocks />
        <CTASection />
        <TestimonialSlider />
      </div>
    </>
  )
}
