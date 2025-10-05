import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Product, Subcategory } from '@/payload-types'

const getPagesSitemap = async () => {
  const payload = await getPayload({ config })
  const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://raystrading.com/'

  const results = await payload.find({
    collection: 'categories',
    overrideAccess: true,
    pagination: false,
    depth: 4,
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
    ? (
        await Promise.all(
          results.docs
            .filter((category) => Boolean(category?.slug))
            .map(async (category) => {
              return await Promise.all(
                category.subcategories?.docs?.map(async (subCategory) => {
                  const subCat = subCategory as Subcategory
                  return await Promise.all(
                    subCat.products?.docs?.map(async (product) => {
                      let prod = product as Product | number
                      console.log('subCat.products?.docs:', subCat.products?.docs)
                      console.log('prod before fetch:', prod)
                      if (typeof prod === 'number') {
                        prod = await payload.findByID({ collection: 'products', id: prod })
                        console.log('prod after fetch:', prod)
                      }
                      if (!prod || typeof prod !== 'object' || !('slug' in prod)) return undefined
                      return {
                        loc: `${SITE_URL}/products/${category?.slug}/${subCat.slug}/${prod?.slug}`,
                        lastmod: prod.updatedAt || dateFallback,
                      }
                    }) || [],
                  )
                }) || [],
              )
            }),
        )
      )
        .flat(2)
        .filter((item) => item !== undefined)
    : []

  const sitemapArray = [...categorySitemap, ...subCategorySitemap, ...productSitemap]
    .filter(Boolean)
    .map((item) => {
      let lastmod = item.lastmod
      if (
        lastmod &&
        typeof lastmod === 'object' &&
        Object.prototype.toString.call(lastmod) === '[object Date]'
      ) {
        lastmod = (lastmod as Date).toISOString()
      } else if (typeof lastmod !== 'string') {
        lastmod = dateFallback
      }
      return {
        ...item,
        lastmod,
      }
    })
  return sitemapArray
}

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
