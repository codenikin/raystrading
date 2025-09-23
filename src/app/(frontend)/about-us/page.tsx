export const dynamic = 'force-dynamic'
import { getPayload } from '@/lib/payload'
import configPromise from '@payload-config'
import { Metadata } from 'next'
import type { AboutPage } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { AboutClient } from './AboutClient'

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })

  const AboutPageres = await payload.find({
    collection: 'about-page',
    overrideAccess: false,
    pagination: false,
    depth: 3,
  })
  const aboutPage = AboutPageres.docs?.[0]
  const schemaMarkup = aboutPage?.schemaMarkup ? JSON.stringify(aboutPage.schemaMarkup) : ''
  return <AboutClient schemaMarkup={schemaMarkup} />
}
export async function generateMetadata(p0: { doc: AboutPage }): Promise<Metadata> {
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
