import type { Metadata } from 'next'
import type { Media, Config, Contactpage, AboutPage } from '../payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  let url = serverUrl + '/website-template-OG.webp'
  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.ogImage?.url
    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }
  return url
}

export const generateMeta = async (args: {
  doc: Partial<Contactpage> | Partial<AboutPage> | null
}): Promise<Metadata> => {
  const { doc } = args
  const ogImage = getImageURL(doc?.meta?.image)
  const title = doc?.meta?.title ? doc?.meta?.title + ' | Codenik' : 'Codenik'
  const slugPath = Array.isArray(doc?.slug) ? `/${doc?.slug.join('/')}` : `/${doc?.slug || ''}`
  return {
    description: doc?.meta?.description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002'),
    alternates: {
      canonical: slugPath,
      languages: {
        'en-US': '/en-US',
      },
    },
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
