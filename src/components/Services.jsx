const services = [
  {
    num: '01',
    name: 'Výkopové práce',
    desc: 'Přesné hloubení základů, rýh pro inženýrské sítě a terénní úpravy. Pracujeme na rodinných i průmyslových stavbách.',
  },
  {
    num: '02',
    name: 'Doprava materiálu',
    desc: 'Přeprava zeminy, štěrku, písku a stavebního materiálu sklápěčem Tatra 15T.',
  },
  {
    num: '03',
    name: 'Zakládání staveb',
    desc: 'Příprava stavebního pozemku, výkopy pro základové pásy a desky.',
  },
  {
    num: '04',
    name: 'Terénní úpravy',
    desc: 'Modelování terénu, srovnání pozemků, budování svahů a odvodňovacích systémů.',
  },
]

export default function Services() {
  return (
    <section id="sluzby" className="bg-surface py-32 md:py-48">
      <div className="max-w-[1920px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
            <p className="text-sm font-bold tracking-widest uppercase text-primary mb-4 reveal">
              NAŠE SLUŽBY
            </p>
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface reveal stagger-1">
              Co umíme.
            </h2>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <div
                key={s.num}
                className={`bg-surface-container-lowest p-8 rounded-2xl reveal stagger-${i + 1}`}
              >
                <div className="text-6xl font-black text-primary/10 leading-none mb-4">
                  {s.num}
                </div>
                <h3 className="text-xl font-bold mb-3 text-on-surface">{s.name}</h3>
                <p className="text-on-surface-variant leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
