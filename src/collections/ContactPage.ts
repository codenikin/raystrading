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
            '@type': 'LocalBusiness',
            image: [
              'https://raystrading.com/api/media/file/1X1.jpg',
              'https://raystrading.com/api/media/file/400X300.jpg',
              'https://raystrading.com/api/media/file/16x19.jpg',
            ],
            name: 'Rays Trading',

            '@id': 'https://raystrading.com',
            url: 'https://raystrading.com',
            telephone: data.Telephone,
            priceRange: '₹₹',
            address: {
              '@type': 'PostalAddress',
              streetAddress: data.address?.street,
              addressLocality: data.address?.city,
              addressRegion: data.address?.state,
              postalCode: data.address?.postalCode,
              addressCountry: data.address?.country,
            },

            review: {
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: 4.9,
                bestRating: 5,
              },
              author: {
                '@type': 'Person',
                name: 'Prasad YR',
              },
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '12.723610',
              longitude: '77.825241',
            },

            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
                opens: '00:00',
                closes: '23:59',
              },
            ],

            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://raystrading.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Contact Us',
                  item: 'https://raystrading.com/contact',
                },
              ],
            },
          }
          data.schemaMarkup = schema
          return data
        }
      },
    ],
  },
}
export default ContactPage
