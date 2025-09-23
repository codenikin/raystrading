import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  // Default to env or localhost
  let url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002'

  // If missing protocol, prepend https://
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`
  }

  return url
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port
    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  const envUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''
  if (!envUrl) return ''

  return /^https?:\/\//i.test(envUrl) ? envUrl : `https://${envUrl}`
}
