import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Product, Subcategory } from '@/payload-types'

type SitemapItem = {
  loc: string
  lastmod?: string
}

const getPagesSitemap = async (): Promise<SitemapItem[]> => {
  const payload = await getPayload({ config })
  const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://raystrading.com/'
  const dateFallback = new Date().toISOString()

  // Fetch all categories with nested subcategories and products
  const results = await payload.find({
    collection: 'categories',
    overrideAccess: true,
    pagination: false,
    depth: 4,
  })

  if (!results.docs) return []

  // Category URLs
  const categorySitemap = results.docs
    .filter((category) => Boolean(category?.slug))
    .map((category) => ({
      loc: `${SITE_URL}/products/${category.slug}`,
      lastmod: category.updatedAt || dateFallback,
    }))

  // Subcategory URLs
  const subCategorySitemap = results.docs
    ? results.docs
        .filter((category) => Boolean(category?.slug))
        .map((category) => {
          const subCategories = Array.isArray(category.subcategories?.docs)
            ? category.subcategories.docs.filter(
                (subCat): subCat is Subcategory =>
                  typeof subCat === 'object' && subCat !== null && 'slug' in subCat,
              )
            : []
          return subCategories.map((subCat) => {
            return {
              loc: `${SITE_URL}/products/${category.slug}/${subCat.slug}`,
              lastmod: subCat.updatedAt || category.updatedAt || dateFallback,
            }
          })
        })
        .filter((item) => item !== undefined)
        .flat()
    : []

  // Product URLs
  const productSitemap = results.docs
    ? (
        await Promise.all(
          results.docs
            .filter((category) => Boolean(category?.slug))
            .map(async (category) => {
              const subCategories = Array.isArray(category.subcategories?.docs)
                ? category.subcategories.docs.filter(
                    (subCat): subCat is Subcategory =>
                      typeof subCat === 'object' && subCat !== null && 'slug' in subCat,
                  )
                : []
              return await Promise.all(
                subCategories.map(async (subCat) => {
                  if (!subCat.products?.docs) return []
                  return await Promise.all(
                    subCat.products.docs.map(async (product) => {
                      let prod = product as Product | number | string
                      if (typeof prod === 'number' || typeof prod === 'string') {
                        prod = await payload.findByID({ collection: 'products', id: prod })
                      }
                      if (typeof prod === 'object' && prod !== null && 'slug' in prod) {
                        return {
                          loc: `${SITE_URL}/products/${category.slug}/${subCat.slug}/${prod.slug}`,
                          lastmod:
                            prod.updatedAt ||
                            subCat.updatedAt ||
                            category.updatedAt ||
                            dateFallback,
                        }
                      }
                      return undefined
                    }),
                  )
                }),
              )
            }),
        )
      )
        .flat(2)
        .filter((item) => item !== undefined)
    : []

  // Combine all sitemaps
  return [...categorySitemap, ...subCategorySitemap, ...productSitemap].map((item) => ({
    ...item,
    lastmod:
      typeof item.lastmod === 'string' && !isNaN(Date.parse(item.lastmod))
        ? new Date(item.lastmod).toISOString()
        : item.lastmod || dateFallback,
  }))
}

export async function GET() {
  const sitemap = await getPagesSitemap()
  return getServerSideSitemap(sitemap)
}
