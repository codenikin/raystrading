import { CollectionConfig } from 'payload'
import type { Media } from '../payload-types'
export const HomePage: CollectionConfig = {
  slug: 'homepage',

  access: {
    read: () => true,
    create: () => false,
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
                '@id': '${process.env.NEXT_PUBLIC_SERVER_URL}/#website',
                url: 'https://unv-dubai-uae.com',
                name: 'UNV Dubai UAE',
                description: 'Leading provider of advanced security solutions in Dubai, UAE.',
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://unv-dubai-uae.com/search?q={search_term_string}',
                  'query-input': 'required name=search_term_string',
                },
              },
              {
                '@type': 'Organization',
                '@id': '${process.env.NEXT_PUBLIC_SERVER_URL}/#organization',
                name: 'UNV Dubai UAE',
                url: '${process.env.NEXT_PUBLIC_SERVER_URL}',
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
                '@id': 'https://unv-dubai-uae.com/#organization',
                name: 'UNV Dubai UAE',
                url: 'https://unv-dubai-uae.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://unv-dubai-uae.com/logo.png',
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+971-123-4567',
                  contactType: 'customer service',
                  areaServed: 'AE',
                  availableLanguage: ['English', 'Arabic'],
                },
                sameAs: [
                  'https://www.facebook.com/unvdubai',
                  'https://www.instagram.com/unvdubai',
                  'https://www.linkedin.com/company/unvdubai',
                ],
              },
              {
                '@type': 'WebPage',
                '@id': 'https://unv-dubai-uae.com/#webpage',
                url: 'https://unv-dubai-uae.com',
                inLanguage: 'en',
                name: 'Home',
                description: 'Next-gen security solutions for homes and businesses in Dubai.',
                isPartOf: {
                  '@id': 'https://unv-dubai-uae.com/#website',
                },
                about: {
                  '@id': 'https://unv-dubai-uae.com/#organization',
                },
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://unv-dubai-uae.com/#breadcrumb',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://unv-dubai-uae.com',
                  },
                ],
              },
            ],
          }

          // req.payload.update({
          //   collection: 'homepage',
          //   id: doc.id,
          //   data: {
          //     schemaMarkup: schema,
          //   },
          // })
          doc.schemaMarkup = schema
          return doc
        }
      },
    ],
  },
}
