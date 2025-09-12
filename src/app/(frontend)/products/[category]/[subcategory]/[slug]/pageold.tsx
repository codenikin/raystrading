const shareButtons = document.querySelectorAll('.share-btn')
const pageTitle = encodeURIComponent(product.title)
const pageUrl = encodeURIComponent(window.location.href)
function showNotification(message: string | null) {
  const notification = document.getElementById('notification')
  const notificationText = document.getElementById('notification-text')

  if (notification && notificationText) {
    notificationText.textContent = message
    notification.classList.add('show')

    setTimeout(() => {
      notification.classList.remove('show')
    }, 3000)
  }
}
function shareContent(platform: string) {
  let shareUrl = ''

  switch (platform) {
    case 'whatsapp':
      const message = `Check out this security camera: ${decodeURIComponent(pageTitle)} ${decodeURIComponent(pageUrl)}`
      shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
      break
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`
      break
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`
      break
    default:
      return
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400')
    showNotification(`Shared on ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`)
  }
}
shareButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    const platform = (btn as HTMLElement).dataset.platform
    if (platform) {
      shareContent(platform)
    }
  })
})
