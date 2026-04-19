const stats = [
  { value: '15+ let', label: 'Zkušeností' },
  { value: '500+', label: 'Dokončených projektů' },
  { value: '3 stroje', label: 'Vždy připraveny' },
]

export default function About() {
  return (
    <section id="onas" className="bg-surface py-32 md:py-48">
      <div className="max-w-[1920px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-8">
            <p className="text-sm font-bold tracking-widest uppercase text-primary mb-6 reveal">
              DISCIPLÍNA &amp; ZKUŠENOSTI
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-tight reveal stagger-1">
              Více než 15 let budujeme základy pro vaši budoucnost. Každý pohyb stroje je promyšleným aktem inženýrské přesnosti.
            </h2>
          </div>
          <div className="md:col-span-4 flex items-end pb-2">
            <p className="text-on-surface-variant text-lg leading-relaxed reveal stagger-2">
              Nejsme jen obsluha strojů. Jsme specialisté, kteří chápou fyziku terénu a nároky moderního stavitelství. Naše práce je definována efektivitou, čistotou a absolutním dodržením milimetrových specifikací.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 border-t border-surface-container pt-12">
          {stats.map((s, i) => (
            <div key={s.label} className={`reveal stagger-${i + 1}`}>
              <div className="font-black text-5xl text-primary mb-2">{s.value}</div>
              <div className="text-sm uppercase tracking-widest text-on-surface-variant font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
