'use client'
import { Header, Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import MegaLink from './components/MegaLink'
import SingleLink from './components/SingleLink'
import MegaLinkMobile from './components/MegaLinkMobile'
import SingleMobileLink from './components/SingleMobileLink'
import './header.css'

interface HeaderClientProps {
  logo: Media
  favicon: Media
  telephone: string
  email: string
  headerdata: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  logo,
  headerdata,
  email,
  telephone,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null)
  const [logoError, setLogoError] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const logoUrl = React.useMemo(() => {
    if (logoError || !logo?.url) return '/images/dahualogo-removebg-preview.png'
    if (logo.url.startsWith('http')) {
      return logo.url
    }
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''
    return `${serverUrl}${logo.url}`
  }, [logo?.url, logoError])

  const handleLogoError = useCallback(() => {
    console.log('Logo failed to load, switching to fallback')
    setLogoError(true)
  }, [])
  useEffect(() => {
    if (!isClient) return

    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [mobileOpen, isClient])

  useEffect(() => {
    if (!isClient) return
    const controller = new AbortController()
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside, {
      passive: true,
      signal: controller.signal,
    })

    return () => {
      controller.abort()
    }
  }, [isClient])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200 header-container">
        <nav
          ref={navRef}
          style={{
            width: '100%',
            padding: '15px 0',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 15px',
              margin: '0 auto',
            }}
          >
            <div className="flex w-full md:hidden items-center justify-between">
              <button
                className="flex items-center md:hidden z-[100000] relative"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                }}
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                <div className="w-6 h-6 relative flex flex-col justify-center items-center">
                  <div
                    className="w-5 h-0.5 bg-red-600 rounded-full transition-all duration-300 ease-in-out absolute"
                    style={{
                      transform: mobileOpen ? 'rotate(45deg)' : 'rotate(0) translateY(-6px)',
                      transformOrigin: 'center',
                    }}
                  />
                  <div
                    className="w-5 h-0.5 bg-red-600 rounded-full transition-all duration-300 ease-in-out absolute"
                    style={{
                      opacity: mobileOpen ? 0 : 1,
                      transform: mobileOpen ? 'scale(0)' : 'scale(1)',
                    }}
                  />
                  <div
                    className="w-5 h-0.5 bg-red-600 rounded-full transition-all duration-300 ease-in-out absolute"
                    style={{
                      transform: mobileOpen ? 'rotate(-45deg)' : 'rotate(0) translateY(6px)',
                      transformOrigin: 'center',
                    }}
                  />
                </div>
              </button>
              {/* Logo on the right */}
              <Link href="/" style={{ display: 'block' }}>
                <Image
                  src={logoUrl}
                  alt={logo?.alt || 'Site Logo'}
                  width={100}
                  height={30}
                  priority
                  className="object-contain"
                  onError={handleLogoError}
                />
              </Link>
            </div>

            <div
              style={{ width: '150px', marginLeft: '16px' }}
              className="hidden md:flex items-center justify-start"
            >
              <Link href="/" style={{ display: 'block' }}>
                <Image
                  src={logoUrl}
                  alt={logo?.alt || 'Site Logo'}
                  width={140}
                  height={40}
                  priority
                  className="object-contain transition-all duration-300 hover:scale-105"
                  style={{
                    filter: 'brightness(1.2) contrast(1.1)',
                  }}
                  onError={handleLogoError}
                />
              </Link>
            </div>
            <div
              className="hidden md:flex items-center gap-8"
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
            >
              {/* Main Navigation - Center */}
              {headerdata.navItems?.map((item) => {
                if (item.link.submenu?.length) {
                  return (
                    <MegaLink
                      key={item.id}
                      label={item.link.label}
                      url={item.link.url!}
                      submenus={item.link.submenu}
                      setActiveDropdown={setActiveDropdown}
                      activeDropdown={activeDropdown}
                    />
                  )
                } else {
                  return <SingleLink key={item.id} label={item.link.label} url={item.link.url!} />
                }
              })}
            </div>
            <div
              className="mobile-right"
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <div className="px-4 py-3 border-none border-gray-200 dark:border-red-700 text-black hidden md:block  ">
                <div className="space-y-2">
                  <a
                    href="mailto:sales@rayasgroup.com"
                    className="flex items-center text-black text-sm"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    {email}
                  </a>
                  <a href="tel:+919442532024" className="flex items-center text-black  text-sm">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                    {telephone}
                  </a>
                </div>
              </div>
            </div>
          </div>
          {mobileOpen && (
            <div
              className="fixed inset-0 z-[99999] md:hidden"
              style={{
                animation: 'fadeIn 0.3s ease-out forwards',
              }}
            >
              <div className="absolute inset-0 bg-white mobile-menu-bg" />

              <div
                className="relative h-full flex flex-col [&_a]:!text-black [&_button]:!text-black [&_div]:!text-black"
                style={{
                  animation: 'slideInLeft 0.4s ease-out forwards',
                }}
              >
                {/* Menu Content */}
                <div className="flex-1 flex flex-col justify-center px-8">
                  {mobileSubMenu ? (
                    <>
                      {/* Back Button */}
                      <button
                        className="text-black text-xl mb-8 flex font-anton items-center hover:text-red-400 transition-colors duration-300"
                        onClick={() => setMobileSubMenu(null)}
                      >
                        <svg
                          className="mr-2 w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Back
                      </button>
                      {/* Submenu Items */}
                      {headerdata.navItems?.map((item) => {
                        if (
                          item.link.submenu?.length &&
                          item.link.label.toLowerCase() === mobileSubMenu
                        ) {
                          return (
                            <div key={item.id} className="space-y-4">
                              <h3 className="text-black text-2xl font-bold  font-anton mb-6">
                                {item.link.label}
                              </h3>
                              {item.link.submenu.map((subItem, subIndex) => (
                                <Link
                                  key={subItem.id || subIndex}
                                  href={subItem.sub_url || '#'}
                                  onClick={() => setMobileOpen(false)}
                                  className="text-black text-xl font-light hover:text-red-400 transition-colors duration-300 block py-3 border-b border-gray-700/50"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          )
                        }
                        return null
                      })}
                    </>
                  ) : (
                    <>
                      {/* Main Menu Items */}
                      {headerdata.navItems?.map((item) => {
                        if (item.link.submenu?.length) {
                          return (
                            <MegaLinkMobile
                              key={item.id}
                              label={item.link.label}
                              url={item.link.url!}
                              submenus={item.link.submenu}
                              setMobileOpen={setMobileOpen}
                              setMobileSubMenu={setMobileSubMenu}
                            />
                          )
                        } else {
                          return (
                            <SingleMobileLink
                              key={item.id}
                              label={item.link.label}
                              url={item.link.url!}
                              setMobileOpen={setMobileOpen}
                              setMobileSubMenu={setMobileSubMenu}
                            />
                          )
                        }
                      })}
                    </>
                  )}
                </div>

                {/* Footer Contact Info */}
                <div className="p-8 pb-12 border-t border-gray-700">
                  <div className="text-center space-y-4">
                    <div className="text-black text-sm">Get in touch</div>
                    <div className="space-y-2">
                      <a
                        href="mailto:sales@unvdubai.com"
                        className="flex items-center justify-center text-black text-lg hover:text-red-400 transition-colors duration-300"
                      >
                        <svg
                          className="w-5 h-5 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        sales@rayasgroup.com
                      </a>
                      <a
                        href="tel:++919442532024"
                        className="flex items-center justify-center text-black text-lg hover:text-red-400 transition-colors duration-300"
                      >
                        <svg
                          className="w-5 h-5 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        +919442532024
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  )
}
