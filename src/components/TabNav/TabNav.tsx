'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// const ScrollRotationWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { scrollYProgress } = useScroll()
//   const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

//   return <motion.div style={{ rotate }}>{children}</motion.div>
// }

interface TabNavProps {
  id: string
  dataTab: string
  aria: string
  heading?: string | null
  content?: string | null
  first?: boolean
  children: React.ReactNode
  isActive: boolean
  onClick: () => void
}

export const TabNav: React.FC<TabNavProps> = ({
  id,
  dataTab,
  aria,
  heading,
  content,
  children,
  isActive,
  onClick,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      className={`hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent w-full rounded-xl p-4 text-left hover:bg-gray-100 
        ${isActive ? 'bg-white shadow-md hover:border-transparent' : 'bg-transparent'}`}
      id={id}
      data-hs-tab={dataTab}
      aria-controls={aria}
      role="tab"
      onClick={onClick}
    >
      <span className="flex">
        <motion.span
          className={`inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${isActive ? 'bg-red-600' : 'bg-gray-500'}`}
          initial={{ rotate: 0 }}
          animate={{
            rotate: 360,
            transition: {
              duration: 2,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
            },
          }}
        >
          {children}
        </motion.span>
        {/* </ScrollRotationWrapper> */}
        <span className="ml-5 grow">
          <span className="block text-lg font-semibold text-black">{heading || 'Untitled'}</span>
          <span className="mt-1 block text-black ">{content || 'No description available'}</span>
        </span>
      </span>
    </motion.button>
  )
}

export default TabNav
