import type { Field, GroupField } from 'payload'
import deepMerge from '@/utilities/deepMerge'
export type LinkAppearances = 'default' | 'outline'
export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'custom',
            options: [
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  /*submenu start*/
  const sublinkResult: GroupField = {
    name: 'sub_link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'sub_type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'custom',
            options: [
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'sub_newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const sublinkTypes: Field[] = [
    {
      name: 'sub_url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.sub_type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  sublinkTypes.map((linkType) => ({
    ...linkType,
    admin: {
      ...linkType.admin,
      width: '50%',
    },
  }))

  linkResult.fields.push({
    name: 'submenu',
    type: 'array',
    label: 'Submenu',
    fields: [
      ...sublinkResult.fields,
      ...sublinkTypes,
      {
        name: 'label',
        type: 'text',
        label: 'Label',
        required: true,
      },
    ],
    admin: {
      initCollapsed: true,
      components: {
        RowLabel: '@/globals/Header/SubRowLabel#RowLabel',
      },
    },
  })
  /*submenu end*/

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
