import { useState } from 'react'

interface ShareButtonsProps {
  breedName: string
}

function ShareButtons({ breedName }: ShareButtonsProps) {
  const [copiedText, setCopiedText] = useState('')

  const shareOnTwitter = () => {
    const text = `I just found out my inner dog breed is a ${breedName}! 🐾 Take the Pawjection quiz to discover yours!`
    const url = window.location.href
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank', 'width=600,height=400')
  }

  const shareOnFacebook = () => {
    const url = window.location.href
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }

  const copyShareLink = () => {
    const text = `I'm a ${breedName}! 🐾 Discover your inner dog breed at ${window.location.href}`
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopiedText('✅ Copied!')
          setTimeout(() => {
            setCopiedText('')
          }, 2000)
        })
        .catch(err => {
          console.error('Failed to copy:', err)
        })
    }
  }

  return (
    <div className="share-section">
      <h3>Share Your Result</h3>
      <div className="share-buttons">
        <button className="btn btn-share" onClick={shareOnTwitter}>
          🐦 Twitter
        </button>
        <button className="btn btn-share" onClick={shareOnFacebook}>
          📘 Facebook
        </button>
        <button className="btn btn-share" onClick={copyShareLink}>
          {copiedText || '📋 Copy Link'}
        </button>
      </div>
    </div>
  )
}

export default ShareButtons