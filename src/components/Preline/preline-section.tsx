'use client'

import { useEffect, useState } from 'react'
import { TabNav } from '../TabNav/TabNav'
import { Icon } from '../Icon/Icon'
import { TabContent } from '../TabContent/TabContent'
import { Homepage } from '@/payload-types'

interface PrelineSectionProps {
  homepage: Homepage
}

declare global {
  interface Window {
    HSTab: {
      new (el: Element): { show: () => void }
      init: () => void
    }
    $hsOverlayCollection: Array<{
      element: {
        moveOverlayToBody: boolean
        initContainer: Element | null
        el: Element | null
      }
    }>
  }
}

export const PrelineSection: React.FC<PrelineSectionProps> = ({ homepage }) => {
  const brands = homepage?.brands || []
  const [activeTab, setActiveTab] = useState(0)
  useEffect(() => {
    let mounted = true
    let resizeTimer: NodeJS.Timeout
    let initialized = false

    const safeInitialize = () => {
      if (!window.$hsOverlayCollection) {
        window.$hsOverlayCollection = []
      }
      if (window.HSTab) {
        window.HSTab.init()
      }
    }

    const showActiveTab = () => {
      const tabEl = document.querySelector(`#tabs-with-card-item-${activeTab + 1}`)
      if (tabEl && window.HSTab) {
        const tab = new window.HSTab(tabEl)
        tab.show()
      }
    }

    const initializePreline = async () => {
      try {
        if (!initialized) {
          await import('preline/dist/preline.js')
          initialized = true
        }
        if (mounted) {
          window.$hsOverlayCollection = []
          safeInitialize()
          showActiveTab()
        }
      } catch (err) {
        console.error('Error initializing Preline:', err)
      }
    }

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)

      // Ensure overlay collection exists and is empty
      if (!window.$hsOverlayCollection) {
        window.$hsOverlayCollection = []
      } else {
        window.$hsOverlayCollection.length = 0
      }

      resizeTimer = setTimeout(() => {
        if (mounted) {
          safeInitialize()
          showActiveTab()
        }
      }, 100)
    }

    initializePreline()

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
    }

    return () => {
      mounted = false
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
        if (window.$hsOverlayCollection) {
          window.$hsOverlayCollection = []
        }
      }
      if (resizeTimer) {
        clearTimeout(resizeTimer)
      }
    }
  }, [activeTab])

  useEffect(() => {
    const handleTabChange = () => {
      const tabEl = document.querySelector(`[data-hs-tab='#tabs-with-card-${activeTab + 1}']`)
      if (tabEl) {
        document.querySelectorAll('[data-hs-tab]').forEach((el) => {
          el.setAttribute('aria-selected', 'false')
        })
        tabEl.setAttribute('aria-selected', 'true')
      }
    }
    handleTabChange()
  }, [activeTab])
  return (
    <section className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 2xl:max-w-full">
      <div className="mx-auto mb-12 w-full space-y-1 text-center sm:w-1/2 lg:w-1/3">
        <h2 className="text-4xl font-bold mb-8 text-center font-anton text-gray-900">
          Our <span className="text-red-600">Brands</span>
        </h2>
      </div>

      <div className="relative p-8 md:p-16">
        <div className="relative z-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="mb-10 lg:order-2 lg:col-span-8 lg:col-start-8 lg:mb-0">
            <p className="text-black">
              <b>Rays Trading</b> is your <b>authorized Exide dealer in Hosur</b> and Bangalore,
              providing a complete range of automotive, inverter, UPS, and industrial batteries.
              With years of expertise, we deliver genuine batteries, professional installation, and
              reliable maintenance services to keep your power uninterrupted.
            </p>
            <nav
              className="mt-5 grid gap-3 md:mt-10 fadeInRight max-h-[260px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              aria-label="Tabs"
              role="tablist"
            >
              {brands && brands.length > 0 ? (
                brands.map((brand, index) => {
                  if (brand && typeof brand === 'object') {
                    return (
                      <TabNav
                        key={index}
                        id={`tabs-with-card-item-${index + 1}`}
                        dataTab={`#tabs-with-card-${index + 1}`}
                        aria={`tabs-with-card-${index + 1}`}
                        heading={brand.title}
                        content={brand.description}
                        first={index === 0}
                        isActive={activeTab === index}
                        onClick={() => setActiveTab(index)}
                      >
                        <Icon name={brand.title || 'building'} />
                      </TabNav>
                    )
                  }
                  return null
                })
              ) : (
                <div className="text-center p-4 text-black">No brands available</div>
              )}
            </nav>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              {brands?.map((brand, index) => {
                if (typeof brand === 'object' && brand !== null && brand.image) {
                  const imageSrc =
                    typeof brand.image === 'object' && brand.image !== null
                      ? brand.image.url || ''
                      : ''
                  return (
                    <TabContent
                      key={index}
                      id={`tabs-with-card-${index + 1}`}
                      aria={`tabs-with-card-item-${index + 1}`}
                      src={imageSrc}
                      alt={brand.title || ''}
                      isVisible={activeTab === index}
                    />
                  )
                }
                return null
              })}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 grid h-full w-full grid-cols-12">
          <div className="col-span-full h-5/6 w-full rounded-xl bg-neutral-100 dark:bg-white/[.075] sm:h-3/4 lg:col-span-7 lg:col-start-6 lg:h-full"></div>
        </div>
      </div>
    </section>
  )
}

export default PrelineSection
