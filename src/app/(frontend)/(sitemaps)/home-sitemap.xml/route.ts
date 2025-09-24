// app/pages-sitemap.xml/route.ts
import { getServerSideSitemap } from 'next-sitemap'
export async function GET() {
  const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://raystrading.com/'

  const pages = ['/', '/amaron', '/about-us', '/contact']

  return getServerSideSitemap(
    pages.map((page) => ({
      loc: `${SITE_URL}${page}`,
      lastmod: new Date().toISOString(),
    })),
  )
}
