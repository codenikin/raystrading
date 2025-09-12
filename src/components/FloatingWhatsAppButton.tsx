'use client'

import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { SiteSetting } from '@/payload-types'

interface FloatingWhatsAppButtonProps {
  config: SiteSetting['whatsapp']
}

const FloatingWhatsAppButton = ({ config }: FloatingWhatsAppButtonProps) => {
  if (!config || config.enabled === 'false') return null

  const cleanMessage = (message: string) => {
    const textOnly = message.replace(/<[^>]*>/g, '')
    return textOnly.replace(/&[^;]+;/g, '')
  }

  const statusMessage = cleanMessage(config.statusMessage)
  const chatMessage = cleanMessage(config.chatMessage)

  return (
    <div className="whatsapp-button-wrapper">
      <div className="fixed bottom-4 right-4 text-black z-20">
        <FloatingWhatsApp
          phoneNumber={config.phoneNumber}
          accountName={config.accountName}
          statusMessage={statusMessage}
          chatMessage={chatMessage}
          allowClickAway={false}
          avatar="/images/roundlogowhite.jpg"
          notification={false}
          notificationSound={false}
          chatboxHeight={420}
          allowEsc={true}
        />
      </div>
    </div>
  )
}

export default FloatingWhatsAppButton
