import Link from 'next/link'

interface Props {
  label: string
  url: string
  setMobileOpen: (open: boolean) => void
  setMobileSubMenu: (menu: string | null) => void
}

const SingleMobileLink = ({ label, url, setMobileOpen }: Props) => {
  return (
    <ul className="flex flex-col gap-2 text-center mt-4">
      <li
        style={{
          animation: 'fadeInUp 0.5s ease-out forwards',
          animationDelay: '0.1s',
          opacity: 0,
        }}
      >
        <Link
          href={url}
          onClick={() => setMobileOpen(false)}
          className="text-black text-2xl font-light hover:text-red-400 transition-colors duration-300 block py-4"
        >
          {label}
        </Link>
      </li>
    </ul>
  )
}

export default SingleMobileLink
