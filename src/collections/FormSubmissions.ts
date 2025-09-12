import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    useAsTitle: 'submittedAt',
    defaultColumns: ['form', 'submittedAt'],
    description: 'Form submissions from the website',
    group: 'Content',
  },
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    {
      name: 'formType',
      type: 'text',
      required: true,
      admin: {
        description: 'Type of form that was submitted (e.g., contact, newsletter)',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Email address of the submitter',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the submitter',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Message content',
      },
    },
    {
      name: 'subject',
      type: 'text',
      required: false,
      admin: {
        description: 'Subject of the message',
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
      admin: {
        description: 'Phone number (optional)',
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Status of this submission',
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Ensure submittedAt is set on creation
        if (!data.submittedAt) {
          data.submittedAt = new Date()
        }
        return data
      },
    ],
  },
}
