'use client'

import React from 'react'
import type { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  return (
    <div>
      {data?.rowNumber && <span className="row-number">{data.rowNumber}</span>}
      {data?.data?.link?.label && <span className="row-label">{data.data.link.label}</span>}
      {!data?.data?.link?.label && <span className="row-label-placeholder">Untitled</span>}
    </div>
  )
}
