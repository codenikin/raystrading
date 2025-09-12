export const dynamic = 'force-dynamic'
import { ContactClient } from './ContactClient'
import { getPayload } from '@/lib/payload'
import { notFound } from 'next/navigation'

export default async function ContactPage() {
  const payload = await getPayload()

  if (!payload) {
    return notFound()
  }

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
