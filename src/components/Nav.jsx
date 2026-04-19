import { useState, useEffect } from 'react'

const links = [
  { label: 'Služby', href: '#sluzby' },
  { label: 'Technika', href: '#technika' },
  { label: 'Realizace', href: '#projekty' },
  { label: 'O nás', href: '#onas' },
  { label: 'Kontakt', href: '#kontakt' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = (href) => {
    setActive(href)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 h-20 flex items-center ${
          scrolled ? 'bg-white/70 glass-nav shadow-[0_20px_40px_rgba(26,28,29,0.04)]' : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-8 md:px-12 flex items-center justify-between">
          <a
            href="/"
            className="text-xl font-extrabold tracking-tighter text-on-surface uppercase"
          >
            Zemní Práce Novák
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`font-semibold text-sm tracking-tight transition-colors ${
                  active === link.href
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-secondary hover:text-on-surface'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLinkClick('#kontakt')}
              className="hidden md:block btn-primary-gradient text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Poptat stroj
            </button>
            <button
              className="md:hidden text-on-surface"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span className="text-2xl font-bold">{menuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-surface flex flex-col items-center justify-center gap-10">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="text-2xl font-bold text-on-surface hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleLinkClick('#kontakt')}
            className="btn-primary-gradient text-white px-8 py-4 rounded-xl font-bold text-lg mt-4"
          >
            Poptat stroj
          </button>
        </div>
      )}
    </>
  )
}
