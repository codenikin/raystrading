'use client'

import React from 'react'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel()

  return (
    <div>
      {data?.rowNumber && <span className="row-number">{data.rowNumber}</span>}
      <span className="row-label">Sub Link {data?.rowNumber || ''}</span>
    </div>
  )
}
