import { useEffect, useRef } from 'react'
import { EditableImage } from './admin/Editable.jsx'
import { useContent } from '../context/ContentContext.jsx'

export default function Hero() {
  const { isAdmin } = useContent()
  const bgRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 will-change-transform" style={{ height: '120%', top: '-10%' }}>
        <EditableImage
          contentKey="hero_image"
          defaultSrc="/assets/hero.png"
          alt="Zemní práce Novák — hero"
          className="w-full h-full object-cover"
          persistent
        />
      </div>
      <div className={`hero-gradient absolute inset-0 ${isAdmin ? 'pointer-events-none' : ''}`} />

      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-8 md:px-12 max-w-[1920px] mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-on-surface leading-[0.9] mb-8">
            Architektura terénu
            <br />
            s precizností.
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary-gradient text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Poptat realizaci
            </button>
            <button
              onClick={() => document.querySelector('#technika')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-surface-container-highest text-on-surface px-8 py-4 rounded-xl font-bold text-lg hover:bg-surface-variant transition-colors"
            >
              Prohlédnout techniku
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-on-surface/40">expand_more</span>
        </div>
      </div>
    </section>
  )
}
