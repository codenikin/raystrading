export const dynamic = 'force-dynamic'
import Amronclient from './AmronClient'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function AmronClient() {
  const payload = await getPayload({ config: configPromise })

  const amronSubcategory = (
    await payload.find({
      collection: 'subcategories',
      where: {
        slug: {
          equals: 'amron',
        },
      },
    })
  ).docs[0]

  const products = amronSubcategory
    ? (
        await payload.find({
          collection: 'products',
          where: {
            subcategories: {
              equals: amronSubcategory.id,
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

  return <Amronclient products={products} categories={categories} />
}
