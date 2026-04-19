import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'true')
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem('cookie_consent', 'false')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-on-surface text-inverse-on-surface p-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-inverse-on-surface max-w-2xl">
        Tento web používá cookies pro základní funkce a Vercel Analytics. Souhlasíte?
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={accept}
          className="btn-primary-gradient px-6 py-2.5 rounded-lg text-white font-bold text-sm"
        >
          Přijmout
        </button>
        <button
          onClick={reject}
          className="bg-surface-container text-on-surface px-6 py-2.5 rounded-lg font-bold text-sm"
        >
          Odmítnout
        </button>
      </div>
    </div>
  )
}
