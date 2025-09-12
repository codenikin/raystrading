import Link from 'next/link'
import Image from 'next/image'
interface Props {
  label: string
  url: string
  activeDropdown?: string | null
  setActiveDropdown: (dropdown: string | null) => void
  submenus?: {
    sub_type?: 'custom' | null | undefined
    sub_newTab?: boolean | null | undefined
    sub_url?: string | null | undefined
    label: string
    id?: string | null | undefined
  }[]
}
const MegaLink = ({ label, url, activeDropdown, setActiveDropdown, submenus }: Props) => {
  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setActiveDropdown(label.toLowerCase())}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <Link
        href={url}
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '15px 0',
          filter: 'brightness(1.1)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          ;(e.target as HTMLElement).style.textShadow = '0 0px 0px rgba(3, 58, 8, 0.6)'
          ;(e.target as HTMLElement).style.color = 'red'
        }}
        onMouseLeave={(e) => {
          const target = e.target as HTMLElement
          target.style.textShadow = 'none'
          target.style.color = 'black' // reset to original color
        }}
      >
        {label}
        <svg
          style={{
            width: '12px',
            height: '12px',
            fill: 'white',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))',
          }}
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </Link>

      {/* Technologies Dropdown Menu with Curved Image */}
      {activeDropdown === label.toLowerCase() && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              right: '0',
              height: '10px',
              backgroundColor: 'transparent',
            }}
          />

          <div
            className="dropdown-menu"
            style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              left: '0',
              width: '500px',
              zIndex: 10000,
              overflow: 'hidden',
            }}
            onMouseEnter={() => setActiveDropdown(label.toLowerCase())}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div style={{ display: 'flex' }}>
              {/* Left Side - Menu Items */}
              <div style={{ width: '280px', padding: '20px' }}>
                {submenus &&
                  submenus.map((submenu) => (
                    <a
                      href={submenu.sub_url!}
                      key={submenu.id}
                      style={{
                        display: 'block',
                        padding: '12px 0',
                        color: '#1f2937',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        ;(e.target as HTMLElement).style.color = '#1e40af'
                        ;(e.target as HTMLElement).style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        ;(e.target as HTMLElement).style.color = '#1f2937'
                        ;(e.target as HTMLElement).style.transform = 'translateX(0)'
                      }}
                    >
                      {submenu.label}
                    </a>
                  ))}
              </div>

              {/* Right Side - Full Image */}
              <div
                style={{
                  width: '220px',
                  height: '280px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src="/images/wiz.png"
                  alt="Technologies"
                  width={200}
                  height={150}
                  style={{
                    objectFit: 'contain',
                    opacity: '0.95',
                    filter: 'drop-shadow(0 8px 25px rgba(0,0,0,0.15))',
                  }}
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MegaLink
