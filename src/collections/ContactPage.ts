import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
export const ContactPage: CollectionConfig = {
  slug: 'contactpage',

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
      name: 'Telephone',
      type: 'text',
      required: true,
    },
    {
      name: 'Email',
      type: 'text',
      required: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validate: (value: any) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address'
        }
        return true
      },
    },
    {
      name: 'address',
      type: 'group',
      label: 'Address',
      fields: [
        {
          name: 'street',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'postalCode',
          type: 'text',
        },
        {
          name: 'country',
          type: 'text',
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
            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
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
                '@type': 'Organization',
                name: data.title,
                url: 'https://raystrading.com',
                logo: 'https://raystrading.com/images/roundlogowhite.jpg',
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: data.Telephone,
                  contactType: 'customer service',
                  areaServed: 'IN',
                  availableLanguage: ['English', 'Hindi'],
                },
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: data.address?.street,
                  addressLocality: data.address?.city,
                  addressRegion: data.address?.state,
                  postalCode: data.address?.postalCode,
                  addressCountry: data.address?.country,
                },
                sameAs: [
                  'https://www.facebook.com',
                  'https://www.instagram.com',
                  'ttps://www.linkedin.com/company',
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
export default ContactPage
