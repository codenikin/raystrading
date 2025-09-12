import { getPayload } from '@/lib/payload'
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton'
import { SiteSetting } from '@/payload-types'

const defaultConfig: SiteSetting['whatsapp'] = {
  enabled: 'true' as const,
  phoneNumber: '971123456789',
  accountName: 'PayloadShadow',
  statusMessage: 'Typically replies within 1 hour',
  chatMessage: 'Hello! How can we help you today?',
}

export async function WhatsAppWrapper() {
  let whatsappConfig: SiteSetting['whatsapp'] = defaultConfig

  try {
    const payload = await getPayload()
    const settings = await payload.findGlobal({
      slug: 'site-settings',
    })

    if (settings?.whatsapp) {
      whatsappConfig = settings.whatsapp
    }
  } catch (error) {
    console.error('Error fetching WhatsApp settings:', error)
  }

  return <FloatingWhatsAppButton config={whatsappConfig} />
}
