import type { GlobalConfig } from 'payload'
import { revalidateHeader } from './hooks/revalidateHeader'
import { link } from '@/fields/link'
export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    // {
    //   name: 'logo',
    //   type: 'group',
    //   label: 'Logo',
    //   fields: [
    //     {
    //       name: 'type',
    //       type: 'select',
    //       options: ['image', 'text'],
    //       label: 'Type',
    //     },
    //     {
    //       name: 'logo',
    //       type: 'upload',
    //       relationTo: 'media',
    //       label: 'Image',
    //       admin: {
    //         condition: (data) => {
    //           if (data.logo.type === 'image') {
    //             return true
    //           } else {
    //             return false
    //           }
    //         },
    //       },
    //     },
    //     {
    //       name: 'alt',
    //       type: 'text',
    //       label: 'Alt',
    //       admin: {
    //         condition: (data) => {
    //           if (data.logo.type === 'image') {
    //             return true
    //           } else {
    //             return false
    //           }
    //         },
    //       },
    //     },
    //     {
    //       name: 'fontawesome_icon',
    //       type: 'text',
    //       label: 'Logo Icon',
    //       admin: {
    //         condition: (data) => {
    //           if (data.logo.type === 'text') {
    //             return true
    //           } else {
    //             return false
    //           }
    //         },
    //       },
    //     },
    //     {
    //       name: 'text',
    //       type: 'text',
    //       label: 'Logo Text',
    //       admin: {
    //         condition: (data) => {
    //           if (data.logo.type === 'text') {
    //             return true
    //           } else {
    //             return false
    //           }
    //         },
    //       },
    //     },
    //     {
    //       name: 'link',
    //       type: 'text',
    //       label: 'Link',
    //     },
    //   ],
    // },
    // {
    //   name: 'contact',
    //   type: 'group',
    //   label: 'Contact Button',
    //   fields: [
    //     {
    //       name: 'label',
    //       type: 'text',
    //       label: 'Label',
    //     },
    //     {
    //       name: 'value',
    //       type: 'text',
    //       label: 'Value',
    //     },
    //     {
    //       name: 'fontawesome_icon',
    //       type: 'text',
    //       label: 'FontAwesome Icon',
    //     },
    //     {
    //       name: 'link',
    //       type: 'text',
    //       label: 'Link',
    //     },
    //   ],
    // },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Header/RowLabel#RowLabel',
        },
      },
    },
    // {
    //   name: 'blog',
    //   type: 'group',
    //   label: 'Latest Blog',
    //   fields: [
    //     {
    //       name: 'limit',
    //       type: 'number',
    //       label: 'Limit',
    //     },
    //     {
    //       name: 'title',
    //       type: 'text',
    //       label: 'Title',
    //     },
    //   ],
    // },
    {
      name: 'social',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
        },
        {
          name: 'icon_fontawesome',
          type: 'text',
          label: 'FontAwesone Icon Class',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
