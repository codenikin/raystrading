interface Props {
  label: string
  url: string
  submenus?: {
    sub_type?: 'custom' | null | undefined
    sub_newTab?: boolean | null | undefined
    sub_url?: string | null | undefined
    label: string
    id?: string | null | undefined
  }[]
  setMobileOpen: (open: boolean) => void
  setMobileSubMenu: (menu: string | null) => void
}

const MegaLinkMobile = ({ label, setMobileSubMenu }: Props) => {
  return (
    <>
      {/* Main Menu Item - clicking this shows submenus */}
      <ul className="flex flex-col gap-2 text-center mt-4">
        <li
          style={{
            animation: 'fadeInUp 0.5s ease-out forwards',
            animationDelay: '0.1s',
            opacity: 0,
          }}
        >
          <button
            type="button"
            className="text-black text-2xl font-light hover:text-red-400 transition-colors duration-300 flex items-center justify-center w-full py-4"
            onClick={() => {
              console.log('Setting mobile submenu to parent label:', label.toLowerCase())
              setMobileSubMenu(label.toLowerCase())
            }}
          >
            {label}
            <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </li>
      </ul>
    </>
  )
}

export default MegaLinkMobile
