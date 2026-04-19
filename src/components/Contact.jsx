export default function Contact() {
  return (
    <section id="kontakt" className="bg-surface-container-low py-32 md:py-48">
      <div className="max-w-[1920px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
          <div className="reveal">
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-12">
              Kontakt.
            </h2>

            <img
              src="/assets/machines/Logo.jpeg"
              alt="Novák Jan — Zemní práce"
              className="w-48 mb-12 opacity-90 rounded-xl"
              loading="lazy"
            />

            <div className="flex flex-col gap-8">
              {[
                { icon: 'call', label: 'Telefon', value: '+420 723 753 374', href: 'tel:+420723753374' },
                { icon: 'mail', label: 'Email', value: 'novaja46@seznam.cz', href: 'mailto:novaja46@seznam.cz' },
                { icon: 'location_on', label: 'Adresa', value: 'Krtely 6, 384 11 Netolice, Jižní Čechy' },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-5">
                  <span className="material-symbols-outlined text-primary text-3xl mt-1">{c.icon}</span>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                      {c.label}
                    </div>
                    {c.href ? (
                      <a href={c.href} className="text-2xl font-bold text-on-surface hover:text-primary transition-colors">
                        {c.value}
                      </a>
                    ) : (
                      <div className="text-2xl font-bold text-on-surface">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal stagger-1 flex flex-col justify-center">
            <p className="text-sm font-bold tracking-widest uppercase text-primary mb-6">NAPIŠTE NÁM</p>
            <h3 className="text-4xl font-extrabold tracking-tighter text-on-surface mb-6 leading-tight">
              Připraveni odpovědět<br />na váš dotaz.
            </h3>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
              Kontaktujte nás telefonicky nebo e-mailem. Odpovídáme zpravidla do 24 hodin a rádi vám připravíme nezávaznou nabídku.
            </p>
            <a
              href="tel:+420723753374"
              className="btn-primary-gradient text-white font-bold py-5 px-8 rounded-xl hover:opacity-95 active:scale-[0.99] transition-all text-center text-lg inline-block"
            >
              Zavolat nyní
            </a>
          </div>
        </div>

        <div className="mt-24 reveal">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2581.5!2d14.1!3d49.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKrtely+6%2C+384+11+Netolice!5e0!3m2!1scs!2scz!4v1"
            width="100%"
            height="450"
            style={{ border: 0, filter: 'grayscale(1) contrast(1.1)', borderRadius: '1.5rem' }}
            allowFullScreen
            loading="lazy"
            title="Mapa — Krtely 6, Netolice"
          />
        </div>
      </div>
    </section>
  )
}
