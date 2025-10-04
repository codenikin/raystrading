import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { Product, Subcategory } from '@/payload-types'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://raystrading.com/'

    const results = await payload.find({
      collection: 'categories',
      overrideAccess: false,
      pagination: false,
    })

    const dateFallback = new Date().toISOString()
    const categorySitemap = results.docs
      ? results.docs
          .filter((category) => Boolean(category?.slug))
          .map((category) => {
            return {
              loc: `${SITE_URL}/products/${category?.slug}`,
              lastmod: category.updatedAt || dateFallback,
            }
          })
      : []

    const subCategorySitemap = results.docs
      ? results.docs
          .filter((category) => Boolean(category?.slug))
          .map((category) => {
            return category.subcategories?.docs?.map((subCategory) => {
              const subCat = subCategory as Subcategory
              return {
                loc: `${SITE_URL}/products/${category?.slug}/${subCat.slug}`,
                lastmod: category.updatedAt || dateFallback,
              }
            })
          })
          .filter((item) => item !== undefined)
          .flat()
      : []

    const productSitemap = results.docs
      ? results.docs
          .filter((category) => Boolean(category?.slug))
          .map((category) => {
            return category.subcategories?.docs?.map((subCategory) => {
              const subCat = subCategory as Subcategory
              return subCat.products?.docs?.map((product) => {
                const prod = product as Product
                return {
                  loc: `${SITE_URL}/products/${category?.slug}/${subCat.slug}/${prod.slug}`,
                  lastmod: prod.updatedAt || dateFallback,
                }
              })
            })
          })
          .filter((item) => item !== undefined)
          .flat()
          .filter((item) => item !== undefined)
          .flat()
      : []

    return [...categorySitemap, ...subCategorySitemap, ...productSitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
