import { HeaderClient } from './Component.client'
import React from 'react'
import type { Media } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
export const dynamic = 'force-dynamic'
export async function Header() {
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  const header1 = await payload.findGlobal({ slug: 'header' })
  const logo = settings.logo as Media
  const telephone = settings.Telephone
  const favicon = settings.favicon as Media
  const email = settings.Email

  return (
    <HeaderClient
      headerdata={header1}
      logo={logo}
      favicon={favicon}
      telephone={telephone}
      email={email}
    />
  )
}
