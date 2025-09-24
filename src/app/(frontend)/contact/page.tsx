export const dynamic = 'force-dynamic'
import { ContactClient } from './ContactClient'
import { getPayload } from '@/lib/payload'
import configPromise from '@payload-config'
import { Metadata } from 'next'
import { Contactpage } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
export default async function ContactPage() {
  const payload = await getPayload({ config: configPromise })

  const contactPageRes = await payload.find({
    collection: 'contactpage',
    overrideAccess: false,
    pagination: false,
    depth: 3,
  })

  const contactPage = contactPageRes.docs?.[0]
  const schemaMarkup = contactPage?.schemaMarkup ? JSON.stringify(contactPage.schemaMarkup) : ''
  return <ContactClient schemaMarkup={schemaMarkup} />
}
export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const postsData = await payload.find({
    collection: 'contactpage',
    depth: 1,
    limit: 3,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
  })

  return generateMeta({ doc: postsData.docs[0] })
}
