// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { Categories } from './collections/Categories'
import { Subcategories } from './collections/Subcategories'
import { HomePage } from './collections/homepage'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Product as ProductsType } from './payload-types'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/Settings/config'
import { ContactPage } from './collections/ContactPage'
import { Header } from './globals/Header/config'
import { Forms } from './collections/Forms'
import { FormSubmissions } from './collections/FormSubmissions'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Products,
    Categories,
    Subcategories,
    HomePage,
    ContactPage,
    Forms,
    FormSubmissions,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  globals: [Header, SiteSettings],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    seoPlugin({
      collections: ['Products'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: { doc: ProductsType }) => `Lovosis Technology L.L.C — ${doc.title}`,
      generateURL: (args) => {
        const { doc, collectionConfig, collectionSlug } = args
        const slug = collectionSlug ?? collectionConfig?.slug ?? 'products'
        return `${process.env.NEXT_PUBLIC_SERVER_URL}/${slug}/${doc?.slug}`
      },
    }),
  ],
})
