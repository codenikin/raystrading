import { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
export const AboutPage: CollectionConfig = {
  slug: 'about-page',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
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
      name: 'vision',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'FaqSection',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'text',
          required: true,
        },
      ],
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
      async ({ data, operation }) => {
        if (operation === 'create' || operation === 'update') {
          const schema = {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': 'https://raystrading.com/#website',
                url: 'https://raystrading.com',
                name: process.env.NEXT_PUBLIC_ORG_NAME,
                description: data.meta?.description,
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://raystrading.com/search?q={search_term_string}',
                  'query-input': 'required name=search_term_string',
                },
              },
              {
                '@type': 'Organization',
                '@id': 'https://raystrading.com/#organization',
                name: process.env.NEXT_PUBLIC_ORG_NAME,
                url: 'https://raystrading.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://raystrading.com/api/media/file/rayslogo-7.png',
                },

                sameAs: [
                  'https://www.facebook.com/raystrading',
                  'https://www.instagram.com/raystrading',
                  'https://www.linkedin.com/company/raystrading',
                ],
              },
              {
                '@type': 'AboutPage',
                '@id': 'https://raystrading.com/about-us/#contactpage',
                url: 'https://raystrading.com/about-us',
                name: 'About Us',
                description: data.description,
                about: {
                  '@id': 'https://raystrading.com/#organization',
                },
                breadcrumb: {
                  '@id': 'https://raystrading.com/#breadcrumb',
                },
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://raystrading.com/#breadcrumb',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'raystrading.com',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'about-us',
                    item: 'https://raystrading.com/about-us',
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

export default AboutPage
