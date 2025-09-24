import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },

    {
      name: 'categoryImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'subcategories',
      type: 'relationship',
      relationTo: 'subcategories',
      hasMany: true,
    },
    {
      name: 'schemaMarkup',
      type: 'json',
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({
              hasGenerateFn: true,
            }),
            PreviewField({
              hasGenerateFn: true,

              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://raystrading.com'

        if ((operation === 'create' || operation === 'update') && data.products?.length) {
          const items = await Promise.all(
            data.products.map(async (productEntry: string | { id: string }, index: number) => {
              const productId = typeof productEntry === 'string' ? productEntry : productEntry?.id
              if (!productId) return null

              try {
                const product = await req.payload.findByID({
                  collection: 'products',
                  id: productId,
                })

                if (!product || !product.title || !product.slug) {
                  console.warn(`Product ${productId} missing required fields`)
                  return null
                }

                return {
                  '@type': 'ListItem',
                  position: index + 1,
                  name: product.title,
                  url: `${baseUrl}/products/${product.slug}`,
                }
              } catch (err) {
                console.error(`Failed to fetch product ${productId}:`, err)
                return null
              }
            }),
          )

          const filteredItems = items.filter(Boolean)

          const schema = {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'CollectionPage',
                name: data.title,
                description: data.description || '',
                url: `${baseUrl}/categories/${data.slug}`,
                mainEntity: {
                  '@type': 'ItemList',
                  itemListElement: filteredItems,
                },
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: baseUrl,
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'products',
                    item: `${baseUrl}/products`,
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: data.title,
                    item: `${baseUrl}/products/${data.slug}`,
                  },
                ],
              },
            ],
          }

          data.schemaMarkup = schema
          return data
        }
      },
    ],
  },
}
