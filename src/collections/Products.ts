import type { CollectionConfig, Field } from 'payload'
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
import { Media } from '@/payload-types'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    subcategories: true,
    meta: {
      image: true,
      description: true,
    },
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
      name: 'onSale',
      type: 'checkbox',
      label: 'On Sale',
      defaultValue: false,
      admin: {
        description: 'Check this to display an offer ribbon on the product',
        position: 'sidebar',
      },
    },
    {
      name: 'offerText',
      type: 'text',
      label: 'Offer Text',
      admin: {
        description: 'Text to display in the offer ribbon (e.g., "20% OFF")',
        condition: (data) => Boolean(data?.onSale),
      },
    },

    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
      required: true,
    },
    {
      name: 'content1',
      type: 'richText',
      editor: lexicalEditor({}),
      required: true,
    },
    {
      name: 'content2',
      type: 'richText',
      editor: lexicalEditor({}),
      required: true,
    },

    {
      name: 'pricep',
      type: 'text',
      required: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'subcategories',
      type: 'relationship',
      relationTo: 'subcategories',
      required: true,
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

            MetaDescriptionField({}),
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
      async ({ data, operation }) => {
        if (operation === 'create' || operation === 'update') {
          const media = data.heroImage as Media
          const price = data.pricep
          const schema = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: data.title,
            description: data.description,
            sku: data.sku,
            image: media?.url || '',
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD',
              price: price,
              availability: 'https://schema.org/InStock',
              itemCondition: 'https://schema.org/NewCondition',
              seller: {
                '@type': 'Organization',
                name: 'Rays Trading',
              },
            },
          }

          data.schemaMarkup = schema
          return data
        }
      },
    ],
  },
}
