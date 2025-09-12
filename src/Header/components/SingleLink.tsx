import Link from 'next/link'

interface Props {
  label: string
  url: string
}

const SingleLink = ({ label, url }: Props) => {
  return (
    <Link
      href={url}
      style={{
        color: 'black',
        fontWeight: 'bold',
        fontSize: '16px',
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
    </Link>
  )
}

export default SingleLink
