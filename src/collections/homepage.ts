import { CollectionConfig } from 'payload'
import type { Media } from '../payload-types'
export const HomePage: CollectionConfig = {
  slug: 'homepage',

  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'slug',
      type: 'text',
      required: false,
      unique: true,
    },

    {
      name: 'brands',
      type: 'array',
      label: 'Brand Partners',
      admin: {
        description: 'Add brand logos and information for the slider',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Brand Name',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Brand Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Brand image',
          filterOptions: {
            mimeType: { equals: 'image/png' },
          },
          admin: {
            description: 'Required size: 1000x700px, transparent PNG',
          },
          hooks: {
            beforeValidate: [
              async ({ value, req }) => {
                if (!value) return value

                try {
                  const media = (await req.payload.findByID({
                    collection: 'media',
                    id: value,
                  })) as Media

                  if (!media) return value

                  if (media.width !== 1000 || media.height !== 700) {
                    throw new Error('Image must be exactly 1000x700 pixels')
                  }

                  return value
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                  return value
                }
              },
            ],
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Website Link',
          admin: {
            description: "Optional: Add a link to the brand's website",
          },
        },
      ],
    },
    {
      name: 'iconslider',
      type: 'array',
      label: 'Icon Slider Images',
      admin: {
        description: 'Add images for the icon slider',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Slider Image',
          admin: {
            description: 'Recommended size: 40x80px, transparent PNG',
          },
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
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create' || operation === 'update') {
          const schema = {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': 'https://raystrading.com/#website',
                url: 'https://raystrading.com/',
                name: 'Rays Trading',
                description: doc.description,
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://raystrading.com/search?q={search_term_string}',
                  'query-input': 'required name=search_term_string',
                },
              },
              {
                '@type': 'Organization',
                '@id': 'https://raystrading.com/#organization',
                name: 'Rays Trading',
                url: 'https://raystrading.com',
                brand:
                  doc.brands?.map(
                    (brand: {
                      title: string
                      description?: string
                      image?: { url?: string }
                      link?: string
                    }) => ({
                      '@type': 'Brand',
                      name: brand.title,
                      description: brand.description,
                      logo: brand.image?.url,
                      url: brand.link,
                    }),
                  ) || [],
              },
              {
                '@type': 'Organization',
                '@id': 'https://raystrading.com/#organization',
                name: 'Rays Trading',
                url: 'https://raystrading.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://raystrading.com/images/rayslogo.png',
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+919442532024',
                  contactType: 'customer service',
                  areaServed: 'IN',
                  availableLanguage: ['English', 'Hindi'],
                },
                sameAs: [
                  'https://www.facebook.com/raystrading',
                  'https://www.instagram.com/raystrading',
                  'https://www.linkedin.com/company/raystrading',
                ],
              },
              {
                '@type': 'WebPage',
                '@id': 'https://raystrading.com/#webpage',
                url: 'https://raystrading.com',
                inLanguage: 'en',
                name: 'Home',
                description: doc.description,
                isPartOf: {
                  '@id': 'https://raystrading.com/#website',
                },
                about: {
                  '@id': 'https://raystrading.com/#organization',
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
                    item: 'https://raystrading.com',
                  },
                ],
              },
            ],
          }
          doc.schemaMarkup = schema
          return doc
        }
      },
    ],
  },
}
