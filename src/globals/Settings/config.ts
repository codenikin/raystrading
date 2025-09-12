import { authenticated } from '@/access/authenticated'
import { GlobalConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'site-name',
      label: 'Site Name',
      type: 'text',
      required: true,
    },

    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'siteImage',
      type: 'upload',
      relationTo: 'media',
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
      name: 'favicon',
      label: 'Favicon',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'whatsapp',
      label: 'WhatsApp Configuration',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          label: 'Enable WhatsApp Button',
          type: 'radio',
          options: [
            {
              label: 'Enable',
              value: 'true',
            },
            {
              label: 'Disable',
              value: 'false',
            },
          ],
          defaultValue: 'true',
          required: true,
        },
        {
          name: 'phoneNumber',
          label: 'WhatsApp Phone Number',
          type: 'text',
          required: true,
          validate: (val: unknown) => {
            const value = val as string
            if (!value || !value.match(/^\+?[\d\s-]+$/)) {
              return 'Please enter a valid phone number with country code (e.g., +971552929644)'
            }
            return true
          },
          admin: {
            description: 'Include country code (e.g., +971552929644)',
          },
        },
        {
          name: 'accountName',
          label: 'WhatsApp Account Name',
          type: 'text',
          required: true,
        },
        {
          name: 'statusMessage',
          label: 'Status Message',
          type: 'textarea',
          required: true,
          admin: {
            description: 'You can include HTML links using <a> tags or plain URLs',
          },
        },
        {
          name: 'chatMessage',
          label: 'Default Chat Message',
          type: 'textarea',
          required: true,
          admin: {
            description:
              'This message will appear in the chat when a user opens it.\n\nTo add links, you can:\n1. Add a full URL: https://example.com\n2. Use HTML tags: <a href="https://example.com">click here</a>\n\nExample: "Hi! Visit our website https://example.com for more details!"',
            placeholder: 'Hi! How can we help you? Check out our website: https://example.com',
          },
        },
      ],
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
            {
              type: 'text',
              name: 'canonicalUrl',
              label: 'Canonical URL',
              hooks: {
                beforeChange: [
                  async ({ data, value }) =>
                    !value ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${data?.slug}` : value,
                ],
              },
            },
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
          ],
        },
      ],
    },
    ...slugField(),
    {
      name: 'socials',
      label: 'Socials',
      type: 'array',
      fields: [
        {
          name: 'platform',
          label: 'Platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
