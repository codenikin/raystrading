import React from 'react'
import './global.css'
import { Header } from '@/Header/Component'
import { Media } from '@/payload-types'
import { getPayload } from '@/lib/payload'
import Footer from '@/components/Footer/Footer'
import { Anton } from 'next/font/google'
import { WhatsAppWrapper } from '../components/WhatsAppWrapper'

const anton = Anton({
  weight: '400', // Anton only comes in weight 400
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anton',
})
export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  let favicon: Media | null = null
  let faviconUrl = '/favicon.ico' // Default fallback

  try {
    const payload = await getPayload()
    const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
    favicon = siteSettings?.favicon as Media
    if (favicon?.url) {
      faviconUrl = favicon.url
    }
  } catch (error) {
    // Database might not be initialized yet, continue with fallback favicon
    console.warn('Could not load site settings:', error)
  }

  return (
    <html className={`${anton.variable}`} lang="en">
      <head>
        <link href={faviconUrl} rel="icon" sizes="32x32" />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <WhatsAppWrapper />
        <Footer />
      </body>
    </html>
  )
}
