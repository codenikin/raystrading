import type { CollectionConfig } from 'payload'
export const ContactPage: CollectionConfig = {
  slug: 'contactpage',

  access: {
    read: () => true,
    create: () => true,
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
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
      async ({ doc, operation, req }) => {
        if (operation === 'create' || operation === 'update') {
          const schema = {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: doc.title,
            url: '${process.env.NEXT_PUBLIC_SERVER_URL}',
            logo: '',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: doc.Telephone,
              contactType: 'customer service',
              areaServed: 'AE',
              availableLanguage: ['English', 'Arabic'],
            },
            address: {
              '@type': 'PostalAddress',
              streetAddress: doc.address?.street,
              addressLocality: doc.address?.city,
              addressRegion: doc.address?.state,
              postalCode: doc.address?.postalCode,
              addressCountry: doc.address?.country,
            },
            sameAs: [
              'https://www.facebook.com/unvdubai',
              'ps://www.instagram.com/unvdubai',
              'ttps://www.linkedin.com/company/unvdubai',
            ],
          }

          req.payload.update({
            collection: 'contactpage',
            id: doc.id,
            data: {
              schemaMarkup: schema,
            },
          })
          doc.schemaMarkup = schema
          return doc
        }
      },
    ],
  },
}
