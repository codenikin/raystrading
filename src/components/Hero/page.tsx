import HeroSection from './hero-section'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Homepage } from '@/payload-types'
export default async function ContactPage() {
  const payload = await getPayload({ config: configPromise })
  const homepageres = await payload.find({
    collection: 'homepage',
    overrideAccess: false,
    pagination: false,
    depth: 2,
  })
  const homepage: Homepage | undefined = homepageres.docs?.[0]

  return <HeroSection homepage={homepage} />
}
